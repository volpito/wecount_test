import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";import './index.css'
import WeatherAPI from './page/WeatherAPI';
import Home from './page/Home';


const App = () => {
  return(
    <Router>
      <Routes>
      <Route path="/search" element={<WeatherAPI />} />
      <Route path="/" element={<Home/>} />
      </Routes>
    </Router>
  )}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

