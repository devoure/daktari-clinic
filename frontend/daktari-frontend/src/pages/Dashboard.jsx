import React from 'react'
import {AuthContext} from '../context/AuthContext'

const Dashboard = () => {
  let {user} = React.useContext(AuthContext)
  return (
    <div>
      <p>You are logged to the home page!</p>
      <p>Hello {user.username}</p>
    </div>
  )
}

export default Dashboard
