import {useState, useEffect, createContext} from 'react'
import jwt_decode from 'jwt-decode'
import {useNavigate} from 'react-router-dom'

export const AuthContext = createContext()

export default function AuthProvider(props){ 
  let [count, setCount] = useState(0)
  let [authToken, setAuthToken] = useState(()=>localStorage.getItem('authToken') ? JSON.parse(localStorage.getItem('authToken')) : null)
  let [user, setUser] = useState(()=>localStorage.getItem('authToken') ? jwt_decode(localStorage.getItem('authToken')) : null)
  let [userDetails, setUserDetails] = useState(()=>localStorage.getItem('userDetails') ? JSON.parse(localStorage.getItem('userDetails')) : null)

  let navigate = useNavigate()

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
      localStorage.setItem('authToken', JSON.stringify(data))
    }else{
      alert("Something went wrong!")
    }

    let response2 = await fetch(`http://127.0.0.1:8000/api/users/${jwt_decode(data.access).username}`)
    let data2 = await response2.json()
    if(response2.status === 200){
      setUserDetails(data2)
      localStorage.setItem('userDetails', JSON.stringify(data2))
      navigate("/")
    }else{
      alert("Something went wrong!")
    }
  }

  function logOutUser(){
    setAuthToken(null)
    setUser(null)
    setUserDetails(null)
    localStorage.removeItem('authToken')
    localStorage.removeItem('userDetails')
  }

  let updateToken = async ()=>{
    let response = await fetch('http://127.0.0.1:8000/api/token/',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify({'refresh':authToken.refresh})
    })
    let data = await response.json()

    if (response.status === 200){
      setAuthToken(data)
      setUser(jwt_decode(data.access))
      localStorage.setItem('authToken', JSON.stringify(data))
    }else{
      logOutUser()
    }
  }

  let contextData = {
    user:user,
    loginUser:loginUser,
    logOutUser:logOutUser,
    userDetails:userDetails
  }
  return(
    <AuthContext.Provider value = {contextData}>
      {props.children}
    </AuthContext.Provider>
  )

}
