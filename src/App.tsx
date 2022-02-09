import React from 'react';
import './App.css';
import Nav from "./components/Nav/Nav";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import {BrowserRouter, HashRouter, Route} from "react-router-dom";
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginPage from "./components/Login/Login";
import {initializeApp} from "./redux/App-reduser";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import store, {AppStateType} from "./redux/redux-store";
import Preloader from "./components/common/Preloader";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";


//const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
//const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));

class App extends React.Component<any,any> {

    componentDidMount() {
        this.props.initializeApp()
    }
    render() {
        if(!this.props.initialized){return <Preloader />}
        return (
                <div className='app-w'>
                    <HeaderContainer/>
                    <Nav/>
                    <div className='app-wrapper-content'>
                        <Route path='/dialogs'
                                  render={() => <DialogsContainer/>}/>
                        <Route path='/profile/:userId?' render={() => <ProfileContainer/>
                               }/>
                        <Route path='/news' render={() => <News/>}/>
                        <Route path='/music' render={() => <Music/>}/>
                        <Route path='/settings' render={() => <Settings/>}/>
                        <Route path='/users' render={() => <UsersContainer/>}/>
                        <Route path='/login' render={() => <LoginPage/>}/>
                    </div>
                </div>
        );
    }
}

type MapStatePropsType={
    initialized: boolean
}
const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    initialized: state.app.initialized
})

let AppContainer = compose(connect(mapStateToProps, {initializeApp}))(App);
let MainApp= ()=>{
    return (<HashRouter basename={process.env.PUBLIC_URL}>
        <Provider store={store}>
            <AppContainer />
        </Provider>
    </HashRouter>)
}
export default MainApp;


