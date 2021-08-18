import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Nav from "./components/Nav/Nav";
import Profile from "./components/Profile/Profile";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import {BrowserRouter, Route} from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import {UsersContainer} from "./components/Users/UsersContainer";





/*
type appType = {
    state: stateType
    addPost: (p:string) => void
    updateNewPostText: (p:string) => void
    updateNewMessageTex: (p:string) => void
    addMessage: (p:string) => void
}
*/


function App() {
    //const state= props.store.getState();
    //const state= props.store.getState();
    return (
        <BrowserRouter>
            <div className='app-w'>
                <Header/>
               {/*<Nav friends = {state.navbarBlock.friends}/>*/}
                <Nav />
                <div className='app-wrapper-content'>
                    <Route path='/dialogs'
                           render={() => <DialogsContainer  />
                           }/>
                    <Route path='/profile'
                           render={() => <Profile />
                           }/>

                    <Route path='/news' render={() => <News/>}/>
                    <Route path='/music' render={() => <Music/>}/>
                    <Route path='/settings' render={() => <Settings/>}/>
                    <Route path='/users' render={() => <UsersContainer />}/>
                </div>
            </div>
        </BrowserRouter>
    );
}


export default App;


