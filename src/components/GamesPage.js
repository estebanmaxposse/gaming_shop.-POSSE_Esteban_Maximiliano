import React from 'react';
import ItemListContainer from "./ItemListContainer";

function GamesPage({categoryID}) {
  return (
    <div className='card-container'>
        <h1>GAMES</h1>
        <ItemListContainer categoryID={categoryID}/>
    </div>
  )
}

export default GamesPage