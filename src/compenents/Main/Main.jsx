import axios from 'axios'
import React, { useState } from 'react'

function Main() {

  // const data = new Data();

  // const month = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь","Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"]

  const KEY = '8efba953348d1defe97ff57a2c1a01f7'
  const [nameCity, setNameCity] = useState("");

  const [arr, setArr] = useState([]);

  const getWeather = (city) => {

    axios(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${KEY}&lang=ru&units=metric`
    ).then(({ data }) => setArr(data)).catch((error)=> alert("Вы ввели не правелно назвали города"));

    setNameCity("");
  };
  const keyEnter = (e) => {
    if (e.key === "Enter") {
      getWeather(nameCity)
    }
  }


  return (
    <div className='app'>

      <header className="header">
        <h1 className="title">Прогноз погоды</h1>
        <div className="form" id="weather-form">
          <input onKeyDown={(e) => keyEnter(e)} value={nameCity} onChange={(e) => setNameCity(e.target.value)} className="input" id="city-input" type="text" placeholder="Введите название города" />
          <button onClick={() => getWeather(nameCity)} className="btn">Показать</button>
        </div>
      </header>
      {arr.length === 0 ? <p className="title">Здесь будет ваша погода</p> :
        <div className="card">
          <h2 className="card-city">{arr.name} <span>{arr.sys.country}</span></h2>
          <div className="card-weather">
            <div className="card-value">{(arr.main.temp).toFixed(0,1)}<sup>°c</sup></div>
            <img className="card-img" src={`https://openweathermap.org/img/wn/${arr.weather[0].icon}.png`} alt="Weather"/>
          </div>

          <div className="card-description">{arr.weather[0].description}</div>
        </div>
      }

    </div>
  )
}

export default Main
