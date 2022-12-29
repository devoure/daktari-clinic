import React from 'react'
import {Outlet, Navigate} from 'react-router-dom'
import {AuthContext} from '../context/AuthContext'


export default function PrivateRoutes(){

  let {user} = React.useContext(AuthContext)
  return(
    user ? <Outlet /> : <Navigate to="/login"/>
  )
}
