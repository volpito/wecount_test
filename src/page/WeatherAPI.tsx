import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom';


function WeatherAPI() {

  var [foundWeather, setFoundWeather] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();

  var q = searchParams.get('q') || "";

  const API_key=(process.env.REACT_APP_API_KEY ? process.env.REACT_APP_API_KEY : "");

  const searchForCity = async (query: string, API_key: string): Promise<any> => {

    await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_key}&units=metric&lang=fr`)
    .then((response) => response.json())
    .then((data) => {setFoundWeather((data.main.temp < '15') ? 'cold coldImg' : 'warm warmImg')})
    .catch((error) => {
      console.log({ error });
      setFoundWeather('error errorImg');
    });
  }

  useEffect(() => {
    
    (async () => {
        await searchForCity(q, API_key);
      }
  )()})


  return (
    <div className={`result ${foundWeather}`}>
      {(foundWeather === 'cold coldImg') &&
      <p>
        Il fait froid !
      </p>
      }

      {(foundWeather === 'warm warmImg') &&
      <p>
        Il fait chaud !
      </p>
      }

      {foundWeather === 'error errorImg' && 
      <>
        <p>  
          Il semble que cette ville n'existe pas...
        </p>  
        <p>  
          Veuillez réessayer
        </p>  
      </>
      }
      <button className="btnSearch" >
          <Link to="/" style={{textDecoration:'none', color:'black'}}> Retourner à la page précédente </Link> 
      </button>
    </div>
  )
}

export default WeatherAPI
