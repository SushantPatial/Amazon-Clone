const Product = require('./models/Product');
const productsData = require('./constant/productsData');

async function defaultData() {
  try {
    // Deleting all entries in the DB
    await Product.deleteMany({});
    // Inserting all entries from productsData in the DB
    await Product.insertMany(productsData);
    console.log("Data entered in Database");
  } catch (error) {
    console.log(error);
  }
};

module.exports = defaultData;