import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter} from "react-router-dom";
import MainApp from "./App";

/*"homepage": "https://Mayariff.github.io/my-social-network",*/

    ReactDOM.render(
        <BrowserRouter>
            <MainApp />
        </BrowserRouter>,
        document.getElementById('root')
    );


   /* store.subscribe(()=>{
    //let state= store.getState();
    let state= store.getState();
    rerenderEntireTree()});*/
//reportWebVitals(rerenderEntireTree);