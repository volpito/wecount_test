import React from 'react'

export interface Props {
  foundWeather: string;
  content: string;
  className: string;
}

function WeatherAPI(props: Props) {

  return (
    <div className={`result ${props.className}`}>
      <p>{`${props.content}`}</p>
      <button className="btnSearch" >
          <a href="/" style={{textDecoration:'none', color:'black'}}> Retourner à la page précédente </a> 
      </button>
    </div>
  )
}

export default WeatherAPI
