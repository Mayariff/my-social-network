import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter} from "react-router-dom";
import MainApp from "./App";


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