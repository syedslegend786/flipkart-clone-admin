import './App.css';
import { Route, Routes } from 'react-router-dom'
import Home from './components/home/Home';
import SignIn from './components/signin/SignIn';
import SignUp from './components/signup/SignUp';
import MyPages from './components/mypages/MyPages';
//HOC
import ProtectedRoute from './HOC/ProtectedRoute'
import { keepUserLogin } from './actions/auth.actions';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Product from './components/products/Product';
import Orders from './components/orders/Orders';
import Catagories from './components/catagory/Catagories';
import { initialData } from './actions/initialData.actions';
function App() {
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()
  //it will keep user login until he/she logout or their token expired
  useEffect(() => {
    if (auth.authenticate == false) {
      dispatch(keepUserLogin())
    }
  }, [])
  useEffect(() => {
    if (auth.authenticate) {
      dispatch(initialData())
    }
  }, [auth.authenticate])
  return (
    <div className="App">
      <Routes>
        <ProtectedRoute path='/' element={<Home />} />
        <ProtectedRoute path='/page' element={<MyPages />} />
        <ProtectedRoute path='/products' element={<Product />} />
        <ProtectedRoute path='/orders' element={<Orders />} />
        <ProtectedRoute path='/catagories' element={<Catagories />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
