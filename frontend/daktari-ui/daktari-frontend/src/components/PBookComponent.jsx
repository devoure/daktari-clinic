import React from 'react'

import fight from '../pages/pages-assets/fight.jpg'
import loadingGif from '../pages/pages-assets/loading-gif.gif'
import cancerSupport from '../pages/pages-assets/cancersupport.jpg'
import doctor from '../pages/pages-assets/doctor.jpg'

import picprof from '../pages/pages-assets/picprof.jpg'
import doctor1 from '../pages/pages-assets/doctor1.jpg'
import doctor2 from '../pages/pages-assets/doctor2.jpg'
import doctor3 from '../pages/pages-assets/doctor3.jpg'

export default function PBookComponent(props){
  const [activeBooking, setActiveBooking] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [slideClicked, setSlideClicked] = React.useState(false)
  const [searchDoctor, setSearchDoctor] = React.useState("")
  let [doctors, setDoctors] = React.useState([])
  const [arrayLength, setArrayLength] = React.useState(0)
  const [doctorsCounter, setDoctorsCounter] = React.useState(0)
  const doctorsCardElement = React.useRef()
  const [bookStatus, setBookStatus] = React.useState(true)
  const [scrollStatus, setScrollStatus] = React.useState(true)
  const [change, setChange] = React.useState(false)
  const [doctorspics, setDoctorsPics] = React.useState([doctor1,doctor2,picprof, doctor3])
  React.useEffect(() => {
    const loadDoctors = async () => {
      setLoading(true)
      const response = await fetch(
        "http://127.0.0.1:8000/api/users/doctors"
      )
      let doctorsData = await response.json()
      setDoctors(doctorsData);
      setArrayLength(doctorsData.length)
      setLoading(false);
    };

    const loadBookings = async () => {
      const bookingResponse = await fetch(
        `http://127.0.0.1:8081/api/bookings/user/${props.user.username}`
      )
      let bookingData = await bookingResponse.json()
      setActiveBooking(bookingData)
    }

    loadDoctors();
    loadBookings();
  }, [change]);
  function checkBookStatus(item){
    if (activeBooking.length > 0){
      let status = (activeBooking[0].doctor_name == item.user_name)
      return status
    } else{
      return false
    }
    console.log("The status", activeBooking[0].doctor_name == item.user_name)
  }
  function checkDefault(item){
    if (activeBooking.length > 0){
      let isDefault = false
      return isDefault
    } else{
      let isDefault = true
      return isDefault
    }
  }
  function getpic(name){
    if (name == "test_daktari"){
      return doctorspics[0]
    }else if (name == "patel"){
      return doctorspics[3]
    }else if (name == "krishna"){
      return picprof
    } else {
      return doctorspics[2]
    }
  }
  const doctorsCard = doctors.filter((value) => {
    if (searchDoctor === "") {
      return value;
    } else if (
      value.first_name.toLowerCase().includes(searchDoctor.toLowerCase())
    ) {
      return value;
    }
  }).map((item)=>{
    return (
      <div className={checkBookStatus(item) ? "doctor-box" : (checkDefault(item) ? "doctor-box":"doctor-box doctor-box-blur inactive")}>
      <div className="doctor-box-pic">
        <img src={getpic(item.user_name)}/>
      </div>
        <div className="doctor-box-info">
          <span className="info-username">Dr. {item.first_name}</span>
          <span className="info-status">Available</span>
          <div className={checkBookStatus(item) ? "info-book-button unbook" : "info-book-button booked"}  onClick={(e)=>{ checkBookStatus(item) ? deleteBooking(e, activeBooking[0].id): setBooking(e, item.user_name)}}>
            <span className="info-book-icon">
              {checkBookStatus(item) ? <ion-icon name="trash-outline"></ion-icon>:<ion-icon name="person-add-outline"></ion-icon>}
            </span>
            <span className="info-book">{checkBookStatus(item) ? "Unbook" : "Book"}</span>
          </div>
        </div>
      </div>
    )
  })
  const bookingCard = activeBooking.map((item)=>{
    return (
      <>
        <div className="summary-details">
          <span>Doctor Name</span>
          <span>Scheduled</span>
          <span>Date</span>
          <span>Time</span>
        </div>
        <div className="summary-list">
          <span>{item.doctor_name}</span>
          <span>Yes</span>
          <span>{item.date_time.split("T")[0]}</span>
          <span>{item.date_time.split("T")[1].split(".")[0]}</span>
        </div>
      </>
    )
  })
  function slideRight(){
    setSlideClicked(!slideClicked)
    console.log("this array length",arrayLength)
    let index = arrayLength - 1
    if (doctorsCounter < index){
      setDoctorsCounter(doctorsCounter + 1)
    }
    console.log(doctorsCounter)
    let slideperc = (100/index)*doctorsCounter
    doctorsCardElement.current.style.transform = `translateX(-${slideperc}%)`
  }
  function slideLeft(){
    setSlideClicked(!slideClicked)
    let index = arrayLength - 1
    if (doctorsCounter <= index && doctorsCounter > 0){
      setDoctorsCounter(doctorsCounter - 1)
    }
    console.log(doctorsCounter)
    let slideperc = (100/index)*doctorsCounter
    doctorsCardElement.current.style.transform = `translateX(-${slideperc}%)`
  }
  function setBooking(e, doctorName){
    async function createBooking(){
      let response = await fetch('http://127.0.0.1:8081/api/bookings/create',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body: JSON.stringify({
          doctor_name:doctorName,
          patient_name:props.user.username
        })
      })
      let data = await response.json()
      if(response.status === 200){
        console.log("created booking", data)
        setChange(!change)
      }else{
        alert("Something went wrong!")
      }     
    }
    createBooking()
  }
  function deleteBooking(e, bookingId){
    async function deleteABooking(){
      let response = await fetch(`http://127.0.0.1:8081/api/bookings/delete/${bookingId}`,{
        method:'DELETE'})
      let data = await response.json()
      if(response.status === 200){
        console.log("deleted booking", data)
        setChange(!change)
      }else{
        alert("Something went wrong!")
      }     
    }
    deleteABooking()

  }
  return (
    <div className="booking-service">
      <div className="book-box">

        <div className="patbook-search">
          <div className="search-bar">
            <input type="text" placeholder="Search Doctor.." onChange={(e) => {
              (searchDoctor == "") ? setScrollStatus(false) : setScrollStatus(true) 
            return(setSearchDoctor(e.target.value))
            }
            } />
            <div className="search-gif">{!scrollStatus && <img src={loadingGif} />}</div>
          </div>
          
        </div>

        <div className="patbook-book">
          
          {scrollStatus && <div className="slider-left" onClick={slideLeft}>
            <span><ion-icon name="chevron-back-outline"></ion-icon></span>
          </div>}

          <div className="book-doctor">

            <div className="doctors" ref={doctorsCardElement}>
              {doctorsCard}
            </div>
          </div>
          
          {scrollStatus && <div className="slider-right" onClick={slideRight}>
            <span><ion-icon name="chevron-forward-outline"></ion-icon></span>
          </div>}

          <div className="book-schedule">
            <div className="schedule-cont">
            <div className="schedule-title">
              <span>Next Schedule</span>
            </div>
            
            <div className="date-schedule">
              <div className="date-schedule-date">
                <span className="date-icon"><ion-icon name="calendar-outline"></ion-icon></span>
                <span className="date-month">JAN</span>
                <span className="date-day">04</span>
              </div>
              <div className="date-schedule-time">
                <span className="time-icon"><ion-icon name="alarm-outline"></ion-icon></span>
                <span className="time-hours">4:30</span>
                <span className="time-type">PM</span>
              </div>
            </div>

            <div className="schedule-doc">
                <div className="doc-name">
                  <span>Dr. Patel</span>
                </div>

                <div className="doc-pic">
                  <img src={doctorspics[3]} />
                </div>
            </div>
            </div>
          </div>

        </div>

        <div className="patbook-summary">
          <div className="summary">
            <div className="summary-title">
              <span>Active Bookings</span>
              <span className="summary-title-count">{activeBooking.length}</span>
            </div>
            {activeBooking.length > 0 ? bookingCard : <div className="no-booking"><span>No Active Bookings</span><span><ion-icon name="sad-outline"></ion-icon></span></div>}
          </div>
        </div>

    </div>
    </div>
  )
}
