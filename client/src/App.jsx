import React,{ useState } from 'react'
import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
// import Home from './Pages/Home/Home'
// import ConfirmOTP from './Pages/Otp/Otp'
// import SignIn from './Pages/SignIn/SignIn'
// import SignUp from './Pages/SignUp/SignUp'
const SignUp = React.lazy(() => import('./Pages/SignUp/SignUp'))
const Home = React.lazy(() => import('./Pages/Home/Home'))
const ConfirmOTP = React.lazy(() => import('./Pages/Otp/Otp'))
const SignIn = React.lazy(() => import('./Pages/SignIn/SignIn'))
import {ErrorBoundary} from 'react-error-boundary'

function App() {

  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/SignUp' element={<SignUp />} />
        <Route path='/SignIn' element={<SignIn />} />
        <Route path='/confirm-otp' element={<ConfirmOTP />} />
        <Route path='*' element={<h1>Path didn't exists.</h1>} />
      </Routes>
    </Suspense>
  )
}

export default App
