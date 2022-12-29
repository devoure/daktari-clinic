import React from 'react'

import fight from '../pages/pages-assets/fight.jpg'
import cancerSupport from '../pages/pages-assets/cancersupport.jpg'
import doctor from '../pages/pages-assets/doctor.jpg'

export default function Dashboard(props){
  return (
      <div className="dashboard-box">
        
        <div className="dashboard-box-pics">
          <img src={fight} className={`image img-1 ${props.bullets[0] ? "show": ""}`} alt="" />
          <img src={cancerSupport} className={`image img-2 ${props.bullets[1] ? "show": ""}`} alt="" />
          <img src={doctor} className={`image img-3 ${props.bullets[2] ? "show": ""}`} alt="" />
        </div>

        <div className="dashboard-box-text">
          
          <div className="box-text-header">
            <div className="header-list-cont">
              <div className="box-text-header-list" ref={props.serviceHeader}>
                <span>Prediction Service</span>
                <span>Meeting Service</span>
                <span>Appointments Service</span>
              </div>
            </div>
          </div>

          <div className="box-text-body">
            <div className="body-list-cont">
              <div className="box-text-body-list">
                {props.bullets[0] && <span className="text-anims">Use our state of art model to know your health status, Doctors can send images to our prediction model and receive results, Patients can view their results and doctor's feedback</span> }
                {props.bullets[1] && <span className="text-anims">A victim of the Big C ? Need to talk with doctors and other patients ? This service will provide a suitable environments to talk with our connected community here at daktari</span>}
                {props.bullets[2] && <span className="text-anims">Book Appointments with experts and Schedule appointments. Patients can book appointments with our doctors and Doctors can schedule their appointments.</span> }
              </div>
            </div>
          </div>

          <div className="box-text-footer">
            <div className="box-footer-expl">
              <ion-icon name="arrow-back-outline"></ion-icon>
              <span>EXPLORE SIDE BAR</span>
            </div>
          </div>
        </div>
    </div>
  )
}
