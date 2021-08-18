import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter} from "react-router-dom";
import App from "./App";
import {Provider} from "react-redux";
import store from "./redux/redux-store";


    ReactDOM.render(
        <BrowserRouter>
           <Provider store={store}>
            <App />
           </Provider>
        </BrowserRouter>,
        document.getElementById('root')
    );

   /* store.subscribe(()=>{
    //let state= store.getState();
    let state= store.getState();
    rerenderEntireTree()});*/
//reportWebVitals(rerenderEntireTree);