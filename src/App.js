
import './App.css';
import { React, useState, useEffect } from 'react';
import axios from 'axios';

import RingLoader from "react-spinners/RingLoader";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faDroplet} from '@fortawesome/free-solid-svg-icons'

import {faWind} from '@fortawesome/free-solid-svg-icons'

function App() {

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 3000)
  }, []);

  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  const [grades, setGrades] = useState(false)
  const [data, setData] = useState([])

  const weatherUrl=`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&execlute=hourly,daily&appid=9492796b0f6e7f0ed11fcbd5410e1b0e&units=metric`

  useEffect(() => {
    axios.get(weatherUrl).then((response) => {
      setData(response.data)
      console.log(response.data)      
    })    
    navigator.geolocation.getCurrentPosition(position => {
    setLatitude(position.coords.latitude)
    setLongitude(position.coords.longitude)
  })
},[weatherUrl])

const url = "http://openweathermap.org/img/wn/";

const iconUrl = url + data.weather?.[0].icon + "@2x.png";

console.log(data.weather?.[0].icon)

  return (
    <div className='loader'>
    {loading ? (
      <RingLoader color={"#D75836"} loading={loading} size={150}/> 
    ) : (  
      
    <div id="container" className="app">
      <div className='container'>
        <div className='top'>
          <div className='subTop'><h1>Weather</h1><button onClick={()=> setGrades(!grades)}> °C / °F </button></div>
        <div className='location'>
        <p>{data.name}  {data.sys?.country}</p></div>
        <div className="temp">
        {grades ? <h2>{data.main?.temp} °C </h2>:<h2>{(data.main?.temp*1.8+32).toFixed(1)} °F</h2>}
        </div>
        <div className='icon'>
          <p><img url={iconUrl} alt="i"/></p>
        </div>
          <div className="description">
            
           <p>{data.weather?.[0].description}</p>            
        </div>
        </div>
        <div className='bottom'>
        <div className="wind">
          <h3><FontAwesomeIcon icon={faWind}/> {data.wind?.speed} m/s</h3>
          <p>Wind Speed</p>
          </div>
        <div className="pressure">
          <h3>{data.main?.pressure} mb</h3>
          <p>Pressure</p>
        </div>
        <div className="humidity">
          <h3><FontAwesomeIcon icon={faDroplet} /> {data.main?.humidity} % </h3>
          <p>Humidity</p>
          </div>        
          </div>
    </div>
    </div>    
     )}  
    </div> 
  );
}

export default App;
