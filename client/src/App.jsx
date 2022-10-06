import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home/Home'
import ConfirmOTP from './Pages/Otp/Otp'
import SignIn from './Pages/SignIn/SignIn'
import SignUp from './Pages/SignUp/SignUp'

function App() {

  return (
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/SignUp' element={<SignUp />} />
        <Route path='/SignIn' element={<SignIn />} />
        <Route path='/confirm-otp' element={<ConfirmOTP />} />
        <Route path='*' element={<h1>Path didn't exists.</h1>} />
      </Routes>
  )
}

export default App
