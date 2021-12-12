import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';


function Home() {
  var [searchQuery, setSearchQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams('');

  const search = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(searchQuery)

    var URLParam = new URLSearchParams('q');
    setSearchParams(URLParam)
    searchParams.set('q', searchQuery);
    URLParam.set('q', searchQuery);

  }

  return (
    <div className="App">
      <h1 className="title">
        Bienvenue
      </h1>
      <h2 className="title">
        Merci de rentrer le nom d'une ville pour savoir s'il y fait plutôt chaud ou froid
      </h2>
      <form onSubmit={search}>

        <input 
          id="cityInput"
          type="text" 
          placeholder="Entrez un nom de ville"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
        />

        <button className="btnSearch" type="submit">
          <Link className="btnSearch" to={`/search?q=${searchQuery}`} > 
          Cliquez ici
          </Link>
        </button>

      </form>

    </div>
  )

}

export default Home
