import React, { useState } from 'react'
import { Suspense } from 'react'
import { Route, Routes, Outlet, Navigate } from 'react-router-dom'
import './App.css'
// import Home from './Pages/Home/Home'
// import ConfirmOTP from './Pages/Otp/Otp'
// import SignIn from './Pages/SignIn/SignIn'
// import SignUp from './Pages/SignUp/SignUp'
const SignUp = React.lazy(() => import('./Pages/SignUp/SignUp'))
const Home = React.lazy(() => import('./Pages/Home/Home'))
const ConfirmOTP = React.lazy(() => import('./Pages/Otp/Otp'))
const SignIn = React.lazy(() => import('./Pages/SignIn/SignIn'))
import { ErrorBoundary } from 'react-error-boundary'
import { ToastContainer } from 'react-toastify';
import ProtectedRoutes from "./ProtectedRoutes.jsx"
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux"
import { useLoadingWithRefresh } from './hooks/useLoadingWithRefresh.js'


function AuthenticationRoutes() {

  const User = useSelector(state => state.user)
  // const User = {
  //     auth: false
  // }

  return (
    !User.auth ? <Outlet /> : <Navigate to="/Home" />
  )
}





function App() {


  const {loading} = useLoadingWithRefresh()


  if (loading) {
    return <h1>Loading...</h1>
  }
  else {
    return (
      <>
        <Suspense fallback={<h1>Loading...</h1>}>
          <Routes>
            <Route element={<ProtectedRoutes />}>
              <Route path='/Home' element={<Home />} />
            </Route>
            <Route element={<AuthenticationRoutes />}>
              <Route path='/SignUp' element={<SignUp />} />
              <Route path='/SignIn' element={<SignIn />} />
              <Route path='/confirm-otp' element={<ConfirmOTP />} />
            </Route>
            <Route path='*' element={<h1>Path didn't exists.</h1>} />
          </Routes>
        </Suspense>
        <ToastContainer />
      </>
    )
  }
}



export default App
