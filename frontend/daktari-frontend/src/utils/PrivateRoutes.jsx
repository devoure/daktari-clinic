import React from 'react'
import {Outlet, Navigate} from 'react-router-dom'


export default function PrivateRouters(){
  const isAuthenticated = true
  console.log("Private router works")
  return(
    isAuthenticated ? <Outlet /> : <Navigate to="/login"/>
  )
}
