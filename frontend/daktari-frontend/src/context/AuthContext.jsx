import {useState, useEffect, createContext} from 'react'

export const AuthContext = createContext()

export default function AuthProvider(props){
  return(
    <AuthContext.Provider value = {{name:"Athumani"}}>
      {props.children}
    </AuthContext.Provider>
  )

}
