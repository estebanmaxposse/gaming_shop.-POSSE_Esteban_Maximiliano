import React from 'react';
import ItemListContainer from "./ItemListContainer";

function AccessoriesPage({categoryID}) {
  return (
    <div className='card-container'>
        <h1>ACCESSORIES</h1>
        <ItemListContainer categoryID={categoryID}/>
    </div>
  )
}

export default AccessoriesPage