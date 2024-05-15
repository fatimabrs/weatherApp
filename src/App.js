import React, { useState } from "react";
import './App.css';
import applogo from './applogo.png';


function App() {
  const [name, setName] = useState("");
  const [temp, setTemp] = useState("");
  const [main, setMain] = useState("");
  const [desc, setDesc] = useState("");
  const [icon, setIcon] = useState("");
  const [sunset, setSunset] = useState("");
  const [sunrise, setSunrise] = useState("");
  const [isReady, setReady] = useState(false);
  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');

  let date1 = new Date();

  let date = date1.toLocaleString("en-EN", {
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
  });


    const handleSubmit = (event) => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=04f1842ba3c7503c3053331feccdc406&units=metric`)
        .then((result) => result.json())
        .then((jsonresult) => {
          setName(jsonresult.name);
          setTemp(jsonresult.main.temp);
          setDesc(jsonresult.weather[0].description);
          setMain(jsonresult.weather[0].main);
          setIcon(jsonresult.weather[0].icon);
          setSunset(jsonresult.sys.sunset);
          setSunrise(jsonresult.sys.sunrise);
          setReady(true);
        })
        .catch((err) => console.error(err));
        event.preventDefault(); }

  React.useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=14.6937&lon=-17.4441&appid=04f1842ba3c7503c3053331feccdc406&units=metric`)
      .then((result) => result.json())
      .then((jsonresult) => {
        setName(jsonresult.name);
        setTemp(jsonresult.main.temp);
        setDesc(jsonresult.weather[0].description);
        setMain(jsonresult.weather[0].main);
        setIcon(jsonresult.weather[0].icon);
        setSunset(jsonresult.sys.sunset);
        setSunrise(jsonresult.sys.sunrise);
        setReady(true);
      })
      .catch((err) => console.error(err));
  }, []);

  if (isReady) {

    let color;
    let weather;


    if(temp >= 40){
       color ="orange-bg";
       weather="ensoleillePlus";
      }
     else if(temp > 25 && temp < 40){
         color = "yellow-bg";
         weather="ensoleille";
     }
     else if(temp >=10 && temp <=25){
         color ="blue-bg";
         weather="normal";
        }
      else if(temp < 10 ){
        color="grey-bg";
        weather="nuageux";
      }
      else if (temp < 0){
        color="black-bg";
        weather="nuageuxPlus";
      }



    return (
      <div id="app" className={weather}>
        <div id="part1">
          <div id="titre">
              <img src={applogo} width="80px"/>
              <h1> Weather</h1>
          </div>
          <div>
          <p id="date">{date}</p>
            <form onInput={handleSubmit} id="form">
            <h3> Put coordinates</h3>
              Latitude :      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; <input onChange={e => setLatitude(e.target.value)} value={latitude} /><br />
              Longitude: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input onChange={e => setLongitude(e.target.value)} value={longitude} /><br />
            </form>
          </div>
        </div>
        <div id="part2">
          <div id="main" className={color}>
            <p> &nbsp;&nbsp;&nbsp;City &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {name}</p>
            <p> &nbsp;&nbsp;&nbsp;Temperature &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {temp} °C</p>
            <p> &nbsp;&nbsp;&nbsp;Description &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{desc}</p>
            <p> &nbsp;&nbsp;&nbsp;Illustration</p>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <img
                 src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
                  alt="Icône météo"
              />
            <p> &nbsp;&nbsp;&nbsp;Main &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{main}</p>
            <p> &nbsp;&nbsp;&nbsp;Sunset &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{new Date(sunset *1000).toLocaleTimeString()}</p>
            <p> &nbsp;&nbsp;&nbsp;Sunrise &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{new Date(sunrise*1000).toLocaleTimeString()}</p>
          </div>
        </div>
      </div>
    );
  }
   else {
    return <div>Charging...</div>;
  }
}

export default App;
