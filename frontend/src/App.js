import React from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import './App.css';
import Header from "./components/Header";
import Home from "./screens/Home";
import ProductScreen from "./screens/ProductScreen";

function App() {
  return (
      <BrowserRouter>
        <Header/>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/product/:id" component={ProductScreen}/>

        </Switch>
      </BrowserRouter>
  );
}

export default App;
