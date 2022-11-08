import React from 'react'
import { useSelector } from "react-redux"
import { Outlet,Navigate } from 'react-router-dom'

function ProtectedRoutes() {

    const User = useSelector(state => state.user)


    return (
        User.auth ? <Outlet /> : <Navigate to="/SignIn" />
    )
}

export default ProtectedRoutes