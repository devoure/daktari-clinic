import React, {useContext} from 'react'
import modelimg from './pages-assets/model.jpg'
import supportimg from './pages-assets/support.jpg'
import appointimg from './pages-assets/appoin.jpg'
import logoimg from './pages-assets/logoproj.png'
import {AuthContext} from '../context/AuthContext'
import  './pages-assets/LoginPage.css'


function LoginPage(){
  let {loginUser} = useContext(AuthContext)
  const [bulletActive, setBulletActive] = React.useState([true, false, false])
  const textGroupRef = React.useRef()
  const [inputFocus, setInputFocus] = React.useState(false)
  const [toggle, setToggle] = React.useState(false)
  const [formData, setFormData] = React.useState({
    email : "",
    password : ""
  })
  const [signUpForm, setSignUpForm] = React.useState({
    email : "",
    password : "",
    user_name : "",
    first_name : "",
    password2 : "",
    status : ""
  })

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
    textGroupRef.current.style.transform = `translateY(${-(index)*2.2}rem)`
  }

  function inputFocusEvent(){
    setInputFocus(true)
  }

  function inputBlurEvent(){
    setInputFocus(false)
  }

  function toggleSlider(){
    setToggle((prev)=>{
      return(
        !prev
      )
    })
  }

  function handleLogInInput(e){
    setFormData((prevFormData)=>{
      return(
        {...prevFormData,
          [e.target.name]: e.target.value}
      )
    })
  }

  function handleSignUpChange(event) {
        const {name, value, type, checked} = event.target
        setSignUpForm(prevFormData => {
            return {
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value
            }
        })
    }
    
  return (
    <main className={toggle ? "sign-up-mode" : ""}>

    <div className="box">

        <div className="inner-box">

          <div className="forms-wrap">
            <form onSubmit={(e)=>loginUser(e, formData)} autoComplete="off" className="sign-in-form">
              <div className="logo">
               <img src={logoimg} alt="daktari" />
                <h3>daktari</h3>
              </div>

              <div className="heading">
                <h2>Welcome Back</h2>
                <h6>Not registered yet?</h6>
                <a href="#" className="toggle" onClick={toggleSlider}>Sign Up</a>
              </div>

              <div className="actual-form">
                <div className="input-wrap">
                  <input type="email"
                    minLength="4"
                    className={`input-field ${inputFocus ? "active" : ""}`}
                    autoComplete="off"
                    required
                    onFocus={inputFocusEvent}
                    onBlur={inputBlurEvent}
                    name = "email"
                    value = {formData.email}
                    onChange={handleLogInInput}
                  />
                  <label>Email</label>
                </div>

                <div className="input-wrap">
                  <input type="password"
                    minLength="8"
                    className={`input-field ${inputFocus ? "active" : ""}`}
                    autoComplete="off"
                    required
                    onFocus={inputFocusEvent}
                    onBlur={inputBlurEvent}  
                    name = "password"
                    value = {formData.password}
                    onChange={handleLogInInput}
                  />
                  <label>Password</label>
                </div>
                <button className="sign-btn">Submit</button>
                <p className="text">
                Forgotten your password or login details?
                <a href="#">Get help</a> signing in </p>
              </div>

            </form>
            <form action="index.html" autoComplete="off" className="sign-up-form">
              <div className="logo">
                <img src={logoimg} alt="daktari" />
                <h3>daktari</h3>
              </div>

              <div className="heading">
                <h2>Get Started</h2>
                <h6>Already have an account?</h6>
                <a href="#" className="toggle" onClick={toggleSlider}>Sign in</a>
              </div>

              <div className="actual-form">
                <div className="input-wrap">
                  <input type="text"
                    minLength="4"
                    className="input-field"
                    autoComplete="off"
                    required
                  />
                  <label>Username</label>
                </div>

             {/*   <div className="input-wrap">
                  <input type="text"
                    minLength="4"
                    className="input-field"
                    autoComplete="off"
                    required
                  />
                  <label>First Name</label>
                </div> */}

                <div className="input-wrap">
                  <input type="email"
                         minLength="4"
                         className="input-field"
                         autoComplete="off"
                         required
                  />
                  <label>Email</label>
                </div>
                {/*
                <div className="input-wrap">
                  <fieldset>
                    <legend>Are you a Doctor or Patient ?</legend>
                    <input 
                      type="radio"
                      id="is_doctor"
                      name="status"
                      value="doctor"
                      checked={signUpForm.status === "doctor"}
                      onChange={handleSignUpChange}
                    />
                    <label htmlFor="is_doctor">Doctor</label>
                    <br />
                    <input 
                      type="radio"
                      id="is_patient"
                      name="status"
                      value="patient"
                      checked={signUpForm.status === "patient"}
                      onChange={handleSignUpChange}
                    />
                    <label htmlFor="part-time">Part-time</label>
                    <br />
                  </fieldset>
                </div>
                */}
                <div className="input-wrap">
                  <input type="password"
                         minLength="4"
                         className="input-field"
                         autoComplete="off"
                         required
                  />
                  <label>Password</label>
                </div>
                {/*
                <div className="input-wrap">
                  <input type="password"
                         minLength="4"
                         className="input-field"
                         autoComplete="off"
                         required
                  />
                  <label>Confirm Password</label>
                </div>
                */}
                <input type="submit" value="Sign Up" className="sign-btn" />
                <p className="text">
                By signing up, I agree to the <a href="#">Terms of Services</a> and <a href="#">Privacy Policy</a></p>
              </div>
            </form>          
          </div>

          <div className="carousel">
            <div className="images-wrapper">
              <img src={appointimg} className={`image img-1 ${bulletActive[0] ? "show" : ""}`}  alt=""/>
              <img src={modelimg} className={`image img-2 ${bulletActive[1] ? "show" : ""}`}  alt=""/>
              <img src={supportimg} className={`image img-3 ${bulletActive[2] ? "show" : ""}`}  alt=""  />
            </div>

            <div className="text-slider">
              <div className="text-wrap">
                <div className="text-group" ref={textGroupRef}>
                  <h2>Book appointment with daktari</h2>
                  <h2>AI breast cancer prediction model</h2>
                  <h2>Virtual Support Group</h2>
                </div>
              </div>
              <div className="bullets">
                <span className={bulletActive[0] ? "active" : ""} data-value="1" onClick={moveSlider}></span>
                <span className={bulletActive[1] ? "active" : ""} data-value="2" onClick={moveSlider}></span>
                <span className={bulletActive[2] ? "active" : ""} data-value="3" onClick={moveSlider}></span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  )
}

export default LoginPage
