import React from 'react'
import { useSelector } from "react-redux"
import { Outlet,Navigate,useLocation } from 'react-router-dom'

function ProtectedRoutes() {

    const User = useSelector(state => state.user)

    const location = useLocation();


    if(location.pathname.substring("bug").split("/")[1] === "bug") {
        return <Outlet />
    }


    return (
        User.auth ? <Outlet /> : <Navigate to="/SignIn" />
    )
}

export default ProtectedRoutes