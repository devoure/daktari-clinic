import React from 'react'
import {AuthContext} from '../context/AuthContext'

const Dashboard = () => {
  let {name} = React.useContext(AuthContext)
  return (
    <div>
      <p>You are logged to the home page!</p>
      <p>Hello {name}</p>
    </div>
  )
}

export default Dashboard
