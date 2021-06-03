import React from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import './App.css';
import Header from "./components/Header";
import Home from "./screens/Home";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import Register from "./screens/Register";
import Login from "./screens/Login";
import Admin from './screens/Admin';
import ProductEdit from "./components/ProductEdit";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import Footer from "./components/Footer";
import Categories from "./screens/Categories";
import Profile from "./screens/Profile"

function App() {
    return (

        <BrowserRouter>
            <ToastContainer position="top-center"
                            style={{fontSize: "24px"}}/>
            <Header/>
            <main>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/product/:id" component={ProductScreen}/>
                <Route exact path="/categories/:id?" render={(props) => <Categories fatherURL="categories" {...props} /> } />
                <Route exact path="/edit/:id" component={ProductEdit}/>
                <Route exact path="/cart" component={CartScreen}/>
                <Route exact path="/register" component={Register}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/admin/:id?" component={Admin}/>
                <Route exact path="/order/:id" component={OrderScreen}/>
                <Route exact path="/shipping" component={ShippingAddressScreen}/>
                <Route exact path="/payment" component={PaymentMethodScreen}/>
                <Route exact path="/placeorder" component={PlaceOrderScreen}/>
                <Route exact path="/profile" component={Profile}/>
            </Switch>
            </main>
            <Footer/>
        </BrowserRouter>
    );
}

export default App;
