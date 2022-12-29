import React from 'react'


import picprof from '../pages/pages-assets/picprof.jpg'

export default function PredComponent(props){
  const [stepBox, setStepBox] = React.useState([false, false, false])
  const [image, setImage] = React.useState('')
  const [patientName, setPatientName] = React.useState('')
  const [prevImage, setPrevImage] = React.useState()
  const [answer, setAnswer] = React.useState(true)
  function getFile(event){
    setImage(event.target.files[0])
    console.log("Added File", image)
    setStepBox([true, false, false])
  }
  function handleUserInput(event){
    setPatientName(event.target.value)
    setStepBox([true, true, false])
    setPrevImage(URL.createObjectURL(image))
  }
  function predictoImage(e){
    setAnswer(!answer)
  }

  function predictoImage(e){
    if (stepBox[0] & stepBox[1]){
      let imageData = image
      let formData = new FormData()
      formData.append('file', imageData, imageData.name)
      formData.append('text', imageData.name)
      e.preventDefault()
      async function predict(){
        let response = await fetch('http://127.0.0.1:8082/api/prediction/create',{
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body: JSON.stringify({
            filename:imageData.name
          })
        })
        let data = await response.json()
        if(response.status === 200){
          console.log("The result:", data.result)
        }else{
          alert("Something went wrong!")
        }    
      }
      predict()
    }else{
      console.log("Not Ready")
    }
  }


  return (
    <div className="pred-service">

      <div className="pred-box">

        <div className="pred-box-upper">

          <div className="upper-content-box">
            <div className="step-show">
              <span className="step">Step</span><span className="number">{stepBox[0]?<ion-icon name="cloud-done-outline"></ion-icon> : "1"}</span>
            </div>

            <div className="step-name">
              <span>Upload Image</span>
            </div>

            <div className="step-content">
                <input type="file" required onChange={getFile}/>
                <span className="upload-icon">
                  <ion-icon name="person-add-outline"></ion-icon>
                </span>

            </div>
          </div>

          <div className="upper-content-box">
            <div className="step-show">
              <span className="step">Step</span><span className="number">{stepBox[1]?<ion-icon name="cloud-done-outline"></ion-icon> : "2"}</span>
            </div>

            <div className="step-name">
              <span>Attach Patient</span>
            </div>
            <div className="step-content">
              <div className="patient-select">
                <input type="text" id="fname" name="fname" onChange={handleUserInput}/>
              </div>
              <span className="upload-icon">
                <ion-icon name="person-add-outline"></ion-icon>
              </span>
            </div>
            {/*
            <div className="step-footer">
              <div className="step-footer-pic">
                <img src={picprof} />
              </div>
              <div className ="step-footer-name">
                <span>This guy</span>
              </div>
            </div> */}

          </div>

          <div className="upper-content-box">
            <div className="step-show">
              <span className="step">Step</span><span className="number">3</span>
            </div>

            <div className="step-name">
              <span>Predict</span>
            </div>
            <div className="step-content">
              <span className="predict" onClick={predictoImage}>
                Predict
              </span>
              <span className="upload-icon">
                <ion-icon name="bulb-outline"></ion-icon>
              </span>
            </div>

          </div>
        </div>

        <div className="pred-box-lower">
          <div className="result-box">
          <div className="pred-image">
            <img src={prevImage} />
          </div>
          <div className="pred-result">
            <span>{answer ? "Cancer threat" : "No Cancer Threat"}</span>
          </div>
          </div>
        </div>

      </div>
    </div>
   )
}
