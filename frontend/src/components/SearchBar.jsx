import React from 'react';
import './styles/SearchBar.css'

const SearchBar = () => (
    <div className="searchBar">
        <h2>¿Qué quieres comprar?</h2>
        <input className="input" type="text" placeholder="Yo quiero..."/>
    </div>
)

export default SearchBar;
