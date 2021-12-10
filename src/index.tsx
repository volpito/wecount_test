import React, { FormEvent, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import WeatherAPI from './page/WeatherAPI';

const API_key=(process.env.REACT_APP_API_KEY ? process.env.REACT_APP_API_KEY : "");


const App: React.FC = () => {

  var [searchQuery, setSearchQuery] = useState("");
  var [foundWeather, setFoundWeather] = useState("");

  const searchForCity = async (query: string, API_key: string): Promise<any> => {

    await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_key}&units=metric&lang=fr`)
    .then((response) => response.json())
    .then((data) => {setFoundWeather(data.main.temp)})
    .catch((error) => {
      console.log({ error });
      setFoundWeather('error');
    });
  }

  const search = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const input = form.querySelector('#cityInput') as HTMLInputElement;
    setSearchQuery(input.value);
  }

  useEffect(() => {
    (async () => {
      const query = encodeURIComponent(searchQuery);
      if(query) {
        await searchForCity(query, API_key);
      }
    }
  )()}, [searchQuery])

  return (
    <div className="App">
      <h1 className="title">
        Bienvenue
      </h1>
      <h2 className="title">
        Merci de rentrer le nom d'une ville pour en obtenir la température actuelle
      </h2>
      <form onSubmit={event => search(event)}>

        <input 
          id="cityInput"
          type="text" 
          placeholder="Entrez un nom de ville"
        />

        <button className="btnSearch" >
          click me 
        </button>

      </form>

      {foundWeather && foundWeather < '15' && (
        <div>
          <WeatherAPI foundWeather={foundWeather} content="Il fait froid !" className="cold coldImg"/>
        </div>
        )}

      {foundWeather && foundWeather >= '15' && (
        <div>
          <WeatherAPI foundWeather={foundWeather} content="Il fait chaud !" className="warm warmImg"/>
        </div>
        )}

      {foundWeather && foundWeather === 'error' && (
        <div>
          <WeatherAPI foundWeather={foundWeather} content="Il semblerait que cette ville n'existe pas, veuillez réessayer" className="error errorImg"/>
        </div>
        )}
        <p style={{textDecoration:'none', color:'black'}}>{foundWeather}</p>
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

