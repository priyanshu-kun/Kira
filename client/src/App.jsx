import React from 'react'
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
const ProjectDetails = React.lazy(() => import('./components/Dashboard-components/ProjectDetails'))
const SignIn = React.lazy(() => import('./Pages/SignIn/SignIn'))
import { ToastContainer } from 'react-toastify';
import ProtectedRoutes from "./ProtectedRoutes.jsx"
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux"
import { useLoadingWithRefresh } from './hooks/useLoadingWithRefresh.js'
import PrimaryLoader from './PrimaryLoader'
import BugDetails from './components/Dashboard-components/BugDetails'
import GetEmail from './Pages/TroubleShoot/GetEmail'
import ResetPassword from './Pages/TroubleShoot/ResetPassword'


function AuthenticationRoutes() {

  const User = useSelector(state => state.user)

  console.log("USER: ",User)
  return (
    !User.auth ? <Outlet /> : <Navigate to="/" />
  )
}





function App() {


  const {loading} = useLoadingWithRefresh()


  if (loading) {
    return <PrimaryLoader /> 
  }
  else {
    return (
      <>
        <Suspense fallback={<PrimaryLoader />}>
          <Routes>
            <Route element={<ProtectedRoutes />}>
              <Route path='/' element={<Home />} />
              <Route path='/details/project/:id' element={<ProjectDetails />} />
              <Route path='/bug/:projectId/:id' element={<BugDetails />} />
            </Route>
            <Route element={<AuthenticationRoutes />}>
              <Route path='/SignUp' element={<SignUp />} />
              <Route path='/SignIn' element={<SignIn />} />
              <Route path='/confirm-otp' element={<ConfirmOTP />} />
              <Route path='/troubleshoot' element={<GetEmail />} />
              <Route path='/forgot-password/:id' element={<ResetPassword />} />
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
