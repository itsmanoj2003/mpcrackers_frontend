// import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import { Route, Routes } from 'react-router-dom';
import React from 'react';
import Loader from './Components/Loader';
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {

  const LazyHome = React.lazy(()=>import('./Components/Home'))
  const LazyCrackers = React.lazy(()=>import('./Components/Crackers'))
  const LazyCart = React.lazy(()=>import('./Components/Cart'))
  const LazyOrdersuccess = React.lazy(()=>import('./Components/Ordersuccess'))
  const LazyAbout = React.lazy(()=>import('./Components/About'))
  const LazyContact = React.lazy(()=>import('./Components/Contact'))
  const LazyLogin = React.lazy(()=>import('./Components/Login'))
  const LazyAdmin = React.lazy(()=>import('./Components/Admin'))
  const LazyOrders = React.lazy(()=>import('./Components/ViewOrders'))

  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path='/' element={<React.Suspense fallback={<Loader/>}><LazyHome/></React.Suspense>}/>
        <Route path='/crackers' element={<React.Suspense fallback={<Loader/>}><LazyCrackers/></React.Suspense>}/>
        <Route path='/cart' element={<React.Suspense fallback={<Loader/>}><LazyCart/></React.Suspense>}/>
        <Route path='/order-success' element={<React.Suspense fallback={<Loader/>}><LazyOrdersuccess/></React.Suspense>}/>
        <Route path='/about' element={<React.Suspense fallback={<Loader/>}><LazyAbout/></React.Suspense>}/>
        <Route path='/contact' element={<React.Suspense fallback={<Loader/>}><LazyContact/></React.Suspense>}/>
        <Route path='/login' element={<React.Suspense fallback={<Loader/>}><LazyLogin/></React.Suspense>}/>
        <Route path='/admin' element={<ProtectedRoute><React.Suspense fallback={<Loader/>}><LazyAdmin/></React.Suspense></ProtectedRoute>}/>
        <Route path='/orders' element={<ProtectedRoute><React.Suspense fallback={<Loader/>}><LazyOrders/></React.Suspense></ProtectedRoute>}/>
      </Routes>
    </div>
  );
}

export default App;
