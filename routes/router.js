// Libraries
const router = require('express').Router();
const Product = require('../models/Product');
const User = require('../models/User');
const Razorpay = require('razorpay');
const bcrypt = require('bcryptjs');
const authenticate = require('../middleware/authenticate');
const { check, validationResult } = require('express-validator');

// Get products API
router.get("/products", async function(req, res) {
  try {
    // Fetching data from database
    const productsData = await Product.find();
    res.status(200).json(productsData);
  } catch (error) {
    console.log(error);
  }
})

// Get individual data
router.get("/product/:id", async function(req, res) {
  try {
    const {id} = req.params;
    const individualData = await Product.findOne({ id: id });
    res.status(200).json(individualData);
  } catch (error) {
    console.log(error);
  }
})

// Post register data
router.post('/register', [
    // Check Validation of Fields
    check('name').not().isEmpty().withMessage("Name can't be empty")
                      .trim().escape(),

    check('number').not().isEmpty().withMessage("Number can't be empty")
                      .isNumeric().withMessage("Number must only consist of digits")
                      .isLength({max: 10, min: 10}).withMessage('Number must consist of 10 digits'),

    check('password').not().isEmpty().withMessage("Password can't be empty")
                      .isLength({min: 6}).withMessage("Password must be at least 6 characters long")
                      .matches(/\d/).withMessage("Password must contain a number")
                      .isAlphanumeric().withMessage("Password can only contain alphabets and numbers"),

    check('confirmPassword').not().isEmpty().withMessage("Confirm Password can't be empty"),

    check('email').not().isEmpty().withMessage("Email can't be empty")
                      .isEmail().withMessage("Email format is invalid")
                      .normalizeEmail()

  ], async function(req, res) {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        "status": false,
        "message": errors.array()
      });
    } else {
      const { name, number, email, password, confirmPassword } = req.body;
      const errors = [];

      // Check Duplicate Emails
      User.findOne({ email: email }, function (err, duplicateEmail) {
        if (err) {
          console.log(err);
        } else {
          if (duplicateEmail) {
            errors.push({msg: "Email already registered"});
            return res.status(400).json({
              "status": false,
              "message": errors
            })
          } else {
            // Check Duplicate Numbers
            User.findOne({ number: number }, async function (err, duplicateNumber) {
              if (err) {
                console.log(err);
              } else {
                if (duplicateNumber) {
                  errors.push({msg: "Number already registered"});
                  return res.status(400).json({
                    "status": false,
                    "message": errors
                  })
                } else {
                  // Check if Passwords Match
                  if (password != confirmPassword) {
                    errors.push({msg: "Passwords don't match"})
                    return res.status(400).json({
                      "status": false,
                      "message": errors
                    })
                  } else {
                    // Hashing the password
                    const saltRounds = 10;
                    const salt = await bcrypt.genSalt(saltRounds);
                    const hashedPassword = await bcrypt.hash(password, salt);

                    const newUser = new User({
                      name: name,
                      number: number,
                      email: email,
                      password: hashedPassword
                    })
        
                    const savedUser = await newUser.save();
        
                    res.status(201).json(savedUser);
                  }
                }
              }
            })
          }
        }
      })
    }
})

// Post registered data / login 
router.post('/login', [
    // Check fields validation
    check('email').not().isEmpty().withMessage("Email can't be empty")
                    .isEmail().withMessage("Email format invalid")
                    .normalizeEmail(),
    
    check('password').not().isEmpty().withMessage("Password can't be empty")
                    .isLength({min: 6}).withMessage("Password must be at least 6 characters long")
                    .matches(/\d/).withMessage("Password must contain a number")
                    .isAlphanumeric().withMessage("Password can only contain alphabets and numbers")

  ], async function(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        "status": false,
        "message": errors.array()
      })
    } else {
      const { email, password } = req.body;
      const errors = [];

      // Check if email exists
      User.findOne({ email: email }, async function(err, found) {
        if (err) {
          console.log(err);
        } else {
          if (!found) {
            errors.push({msg: "Incorrect Email or Password"});
            return res.status(400).json({
              "status": false,
              "message": errors
            })
          } else {
            // Comparing the password
            bcrypt.compare(password, found.password, async function(err, result) {
              if(result) {

                // Token generation
                const token = await found.generateAuthToken();

                // Cookie generation
                res.cookie("AmazonClone", token, {
                  expires: new Date(Date.now() + 3600000), // 60 Mins
                  httpOnly: true
                });

                return res.status(201).json({
                  "status": true,
                  "message": "Logged in successfully!"
                })
              } else {
                errors.push({msg: "Incorrect Email or Password"});
                return res.status(400).json({
                  "status": false,
                  "message": errors
                })
              }
            });

          }
        }
      })
    }
  })

// Adding items to cart
router.post('/addtocart/:id', authenticate, async function(req, res) {
  try {
    const {id} = req.params; // Getting id from url parameters 
    const productInfo = await Product.findOne({ id: id });
    // console.log(productInfo);

    const userInfo = await User.findOne({ _id: req.userId }); // req.UserId from authenticate.js
    // console.log(userInfo);

    if (userInfo) {
      let flag = true;

      for (let i = 0; i < userInfo.cart.length; i++) {
        // Incrementing qty by one if product already exists in cart
        if (userInfo.cart[i].id == id) {
          const test = await User.updateOne({ 'cart.id': id }, {
            $inc: {
              'cart.$.qty': 1 
            }
          });
          console.log(test);
          flag = false;
        }
      }

      if (flag) { // flag = true means the product is not in the cart
        await userInfo.addToCart(id, productInfo); // Adding new product into cart
      }

      // const cartData = await userInfo.addToCart(id, productInfo);
      // await userInfo.save();
      // console.log(cartData);
      res.status(201).json({
        status: true,
        message: userInfo
      })
    } else {
      res.status(400).json({
        status: false,
        message: "Invalid User"
      })
    }

  } catch (error) {
    console.log(error);
  }
})

// Delete items from cart
router.delete("/delete/:id", authenticate, async function(req, res) {
  try {
    const {id} = req.params;
    const userData = await User.findOne({ _id: req.userId });

    userData.cart = userData.cart.filter(function(cartItem) {
      return cartItem.id != id;
    })

    await userData.save();

    res.status(201).json({
      status: true,
      message: "Item deleted successfully"
    })

    console.log(userData);

  } catch (error) {
    res.status(400).json({
      status: false,
      message: error
    })
  }
})

// Logout 
router.get("/logout", authenticate, async function(req, res) {
  try {

    // Deleting current token on logout from database
    req.rootUser.tokens = req.rootUser.tokens.filter(function(currentToken) {
      return currentToken.token !== req.token
    })

    // Cookie expiration
    await res.cookie("AmazonClone", {
      expires: Date.now()
    });

    req.rootUser.save();

    return res.status(201).json({
      "status": true,
      "message": "Logged out successfully!"
    })
  } catch (error) {
    res.status(400).json({
      "status": false,
      "message": error
    })
  }
})

// Verify if user is logged in
router.get('/getAuthUser', authenticate, async function(req, res) {
  const userData = await User.findOne({ _id: req.userId });
  res.send(userData);
});

// Razorpay 
router.get("/get-razorpay-key", function(req, res) {
  res.send({ key: process.env.RAZORPAY_KEY_ID })
})

router.post("/create-order", authenticate, async function(req, res) {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET
    })
    const options = {
      amount: req.body.amount,
      currency: 'INR'
    }
    const order = await razorpay.orders.create(options);

    res.status(200).json({
      order: order
    });

  } catch (error) {
    res.status(400).json(error);
  }
})

router.post("/pay-order", authenticate, async function(req, res) {
  try {

    const userInfo = await User.findOne({ _id: req.userId }); // req.UserId from authenticate.js
    
    const { amount, razorpayPaymentId, razorpayOrderId, razorpaySignature, orderedProducts, dateOrdered } = req.body;
    const newOrder = ({
      products: orderedProducts,
      date: dateOrdered,
      isPaid: true,
      amount: amount,
      razorpay: {
        orderId: razorpayOrderId,
        paymentId: razorpayPaymentId,
        signature: razorpaySignature
      }
    })

    // Saving order model into user model
    if (userInfo) {
      await userInfo.addOrder(newOrder);
    } else {
      res.status(400).json("Invalid user");
    }

    res.status(200).json({
      message: "Payment was successful"
    })
  } catch(error) {
    res.status(400).json(error);
  }
})

module.exports = router;