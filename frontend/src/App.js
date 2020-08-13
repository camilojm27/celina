import React from 'react';
import './App.css';
import Header from "./components/Header";
import Home from "./components/Home";
import SearchBar from "./components/SearchBar";

function App() {
  return (
      <>
        <Header/>
        <SearchBar/>
        <Home/>
      </>
  );
}

export default App;
