import React, {useState, useRef} from 'react'
import { Link  } from "react-router-dom"
import {AuthContext} from '../context/AuthContext'
import './pages-assets/PageLayout.css'
import DashboardComponent from '../components/DashboardComponent'

import logo from './pages-assets/logoblack.png'
import picProf from './pages-assets/picprof.jpg'

const Dashboard = () => {
  let {user, logOutUser, userDetails} = React.useContext(AuthContext)
  let [navSlider, setNavSlider] = useState(false)
  let [editProfile, setProfileEdit] = useState(false)
  let navSliderBtn = useRef()
  let serviceHeader = useRef()
  const [bulletActive, setBulletActive] = useState([true, false, false])

  function slideNavBar(e){
    navSliderBtn.current.classList.toggle("clicked")
    setNavSlider((prev)=>{
      return(
        !prev
      )
    })
  }

  function toggleEditProfile(){
    setProfileEdit((prev)=>{
      return(
        !prev
      )
    })
  }

  function moveSlider(e){
    let index = e.target.dataset.value - 1
    let newArray = [null, null, null]
    for(let i = 0; i < bulletActive.length; i++){
      if (i === index){
        newArray[i] = true
      }else{
        newArray[i] = false
      }
    }

    setBulletActive(newArray)
    serviceHeader.current.style.transform = `translateY(${-(index)*2.2}rem)`

  }


  return (
    <main className="dashboard">

      <section className="nav-section">
        <div className="nav-section-header">
          <div className="nav-header-pic">
            <img className="nav-header-pic-img" src={logo} />
          </div>

          <div className="nav-header-info">
            <h1>daktari</h1>
          </div>

        </div>

        <div className="nav-section-body">

          <Link to="/" className="nav-body-list">
            <div className="nav-body-pic">
              <ion-icon name="home-outline"></ion-icon>
            </div>

            <div className="nav-body-info">
              <span>Dashboard</span>
            </div>
          </Link>

          {userDetails.is_doctor &&
          <Link to="/prediction" className="nav-body-list">
            <div className="nav-body-pic">
              <ion-icon name="leaf-outline"></ion-icon>
            </div>

            <div className="nav-body-info">
              <span>Prediction</span>
            </div>
          </Link>}

          <Link to="/chat" className="nav-body-list">
            <div className="nav-body-pic">
              <ion-icon name="chatbubbles-outline"></ion-icon>
            </div>

            <div className="nav-body-info">
              <span>Meetings</span>
            </div>
          </Link>

          { userDetails.is_patient ?
          <Link to="/booking" className="nav-body-list">
            <div className="nav-body-pic">
              <ion-icon name="people-outline"></ion-icon>
            </div>

            <div className="nav-body-info">
              <span>Bookings</span>
            </div>
          </Link> :
          <Link to="/schedule" className="nav-body-list">
            <div className="nav-body-pic">
              <ion-icon name="people-outline"></ion-icon>
            </div>

            <div className="nav-body-info">
              <span>Schedule</span>
            </div>
          </Link> 

          }

        </div>

        <div className="nav-section-footer">

          <div className="footer-header-pic">
            <ion-icon name="log-out-outline"></ion-icon>
          </div>

          <div className="footer-header-info" onClick={logOutUser}>
            <span>Sign Out</span>
          </div>

        </div>
      </section>

      <section className={`content-section ${navSlider ? "nav-toggle" : ""}`}>
        <div className="content-header">
          <div className="header-left">
            <ion-icon  ref={navSliderBtn} name="arrow-back-circle-outline" onClick={slideNavBar} className="clicked"></ion-icon>
          </div>

          <div className="header-right">

            <div className="right-text">
              <span>{userDetails.is_patient ? 'Patient' : 'Doctor' }, {user.username}</span>
            </div>

            <div className="right-pic">
              <img src={picProf} onClick={toggleEditProfile} />
            </div>

          </div>
        </div>

        <div className="content-body">

          <div className={`profile-edit ${editProfile ? "active-profile-edit": ""}`}>

            <div className="edit-header">
              <span className="edit-header-close"><ion-icon name="close-circle-outline"></ion-icon></span>
              <span className="edit-header-title">Edit Profile</span>
              <span className="edit-header-save"><span>Save</span></span>
            </div>

            <div className="edit-image">
              <span className="edit-image-button">
                <img src={picProf} />
                <ion-icon name="camera-outline"></ion-icon>
              </span>
            </div>

            <div className="edit-username">
              <span>Username</span>
              <input type="text" />
            </div>

            <div className="edit-email">
              <span>Email</span>
              <input type="email" />
            </div>
          </div>
          <DashboardComponent  bullets={bulletActive} serviceHeader={serviceHeader}/>
        </div>
          <div className="content-footer">
            <span className={bulletActive[0] ? "bullet-active" : ""} data-value="1" onClick={moveSlider}>
              <ion-icon name="leaf-outline"></ion-icon>
            </span>
            <span className={bulletActive[1] ? "bullet-active" : ""} data-value="2" onClick={moveSlider}>
              <ion-icon name="chatbubbles-outline"></ion-icon>
            </span>
            <span className={bulletActive[2] ? "bullet-active" : ""} data-value="3" onClick={moveSlider}>
              <ion-icon name="people-outline"></ion-icon>
            </span>
          </div>
      </section>
    </main>
  )
}

export default Dashboard
