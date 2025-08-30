import React from 'react'
import {Navigate, Outlet} from 'react-router-dom'

const ProtectedRoute = ({childern , user, redirect='/login'}) => {

    if(!user) return <Navigate to={redirect} />
    return childern ? childern : <Outlet />
}

export default ProtectedRoute