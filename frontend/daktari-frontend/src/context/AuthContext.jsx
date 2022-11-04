import {useState, useEffect, createContext} from 'react'
import jwt_decode from 'jwt-decode'

export const AuthContext = createContext()

export default function AuthProvider(props){
  let [authToken, setAuthToken] = useState(null)
  let [user, setUser] = useState(null)

  let loginUser = async (e, formData)=>{

    e.preventDefault()

    let response = await fetch('http://127.0.0.1:8000/api/token/',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify(formData)
    })

    let data = await response.json()
    if(response.status === 200){
      setAuthToken(data)
      setUser(jwt_decode(data.access))
    }else{
      alert("Something went wrong!")
    }
  }

  let contextData = {
    user:user,
    loginUser:loginUser
  }
  return(
    <AuthContext.Provider value = {contextData}>
      {props.children}
    </AuthContext.Provider>
  )

}
