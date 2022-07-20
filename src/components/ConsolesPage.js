import React from 'react';
import ItemListContainer from "./ItemListContainer";

function ConsolesPage({categoryID}) {
  return (
    <div className='card-container'>
        <h1>CONSOLES</h1>
        <ItemListContainer categoryID={categoryID}/>
    </div>
  )
}

export default ConsolesPage