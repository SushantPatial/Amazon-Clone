import Navbar from './components/header/Navbar'
import Home from './components/home/Home';
import Footer from './components/footer/Footer';
import { Routes, Route } from 'react-router-dom';
import SignUp from './components/login-register/SignUp';
import SignIn from './components/login-register/SignIn';
import Product from './components/product/Product';
import Cart from './components/cart/Cart';
import Profile from './components/profile/Profile';
import Orders from './components/profile/Orders';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={ <> <Navbar /> <Home /> <Footer /> </> } />
        <Route path='/login' element={ <SignIn /> } />
        <Route path='/register' element={ <SignUp /> } />
        <Route path='/product/:id' element={ <> <Navbar /> <Product /> <Footer /> </> } />
        <Route path='/cart' element={ <> <Navbar /> <Cart /> <Footer /> </> } />
        <Route path='/profile' element={ <> <Navbar /> <Profile /> <Footer /> </> } />
        <Route path='/orders' element={ <> <Navbar /> <Orders /> <Footer /> </> } />
      </Routes>
    </div>
  );
}

export default App;
