import React from 'react'
import DatePicker from "react-datepicker";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import subDays from "date-fns/subDays"
import addDays from "date-fns/addDays"
import "react-datepicker/dist/react-datepicker.css";

import fight from '../pages/pages-assets/fight.jpg'
import cancerSupport from '../pages/pages-assets/cancersupport.jpg'
import doctor from '../pages/pages-assets/doctor.jpg'

import picprof from '../pages/pages-assets/picprof.jpg'

export default function DocSchedComponent(props){
  const [bookSearch, setBookSearch] = React.useState(false)
  const [startDate, setStartDate] = React.useState(setHours(setMinutes(new Date(), 30), 16))
  const [bookingData, setBookingData] = React.useState([])
  const [change, setChange] = React.useState(false)
  const [searchBooking, setSearchBooking] = React.useState("")

  React.useEffect(()=> {
    const loadBookings = async () => {
      const response = await fetch(
        `http://127.0.0.1:8081/api/bookings/doctor/${props.user.username}`
      )
      let bookingData = await response.json()
      setBookingData(bookingData)
    }
    loadBookings()
  }, [change])

  console.log(bookingData)
  function handleFocusSearch(){
    setBookSearch(true)
  }
  function handleBlurSearch(){
    setBookSearch(false)
  }
  const bookingsCard = bookingData.filter((value)=>{
    if (searchBooking === ""){
      return value
    } else if (
      value.patient_name.toLowerCase().includes(searchBooking.toLowerCase())
    ) {
      return value
    }
  }).map((item)=>{
    return (
    <div className="sched-card">
      <div className="sched-card-image">
        <img src = {picprof} />
          <div className="sched-card-detail">
            <div><span> <ion-icon name="person-outline"></ion-icon></span><span>{item.patient_name}</span></div>
            <div><span> <ion-icon name="calendar-outline"></ion-icon></span><span> 24th Dec</span></div>
            <div><span> <ion-icon name="time-outline"></ion-icon></span><span>Time</span><span> 5:40</span></div>
          </div>
      </div>
        <div className="sched-card-date-picker">
          <DatePicker className="date-picker" selected={startDate} onChange={(date) => setStartDate(date)}        showTimeSelect includeTimes={[ setHours(setMinutes(new Date(), 0), 8),setHours(setMinutes(new Date(), 30), 10), setHours(setMinutes(new Date(), 30), 14), setHours(setMinutes(new Date(), 30), 15),]} dateFormat="MMMM d, yyyy h:mm aa" minDate={subDays(new Date(), 0)} maxDate={addDays(new Date(), 5)} />
        </div>
      </div>
    )
  })
  return (
    <div className="booking-service">
      <div className="book-box">

        <div className="patbook-search">
          <div className="search-bar">
            <input type="text" placeholder="Search Booking.." onFocus={handleFocusSearch} onBlur={handleBlurSearch} onChange={(e)=>{return(setSearchBooking(e.target.value))}}/>
            <div className="book-search">{ bookSearch ? <ion-icon name="eye-outline"></ion-icon> :<ion-icon name="eye-off-outline"></ion-icon>}</div>
            <div className="booking-num"><span>{bookingData.length}</span> Bookings</div>
          </div>         
        </div>

        <div className="booking-list">
          <div className="list-scroll-left">
            <span><ion-icon name="arrow-back-circle-outline"></ion-icon></span>
          </div>
          <div className="booking-list-detail">
            {bookingsCard}
          </div>
          <div className="list-scroll-right">
            <span><ion-icon name="arrow-forward-circle-outline"></ion-icon></span>
          </div>

        </div>

        <div className="schedule-sum">
          <div className="schedule-sum-header">
            <span>Next Schedules</span>
          </div>
          <div className="schedule-sum-list">
            <div className="schedule-sum-card">
              <span>Patient User</span>
              <span>at</span>
              <span>4:30 12th June</span>
              <span className="card-tag"><ion-icon name="pricetag-outline"></ion-icon></span>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
