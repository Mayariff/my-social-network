import React from 'react';
import './App.css';
import Nav from "./components/Nav/Nav";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import {BrowserRouter, HashRouter, Redirect, Route} from "react-router-dom";
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginPage from "./components/Login/Login";
import {initializeApp} from "./redux/App-reduser";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import store, {AppStateType} from "./redux/redux-store";
import Preloader from "./components/common/Preloader/Preloader";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import UnderConstructionPage from "./components/common/UnderСonstructionPage/UnderConstructionPage";


class App extends React.Component<any, any> {

    componentDidMount() {
        this.props.initializeApp()
        window.addEventListener('unhandledrejection', function (event) {
            console.error('Unhandled rejection (promise: ', event.promise, ', reason: ', event.reason, ').');
        });
    }

    componentWillUnmount() {
        window.removeEventListener('unhandledrejection', function (event) {
            console.error('Unhandled rejection (promise: ', event.promise, ', reason: ', event.reason, ').');
        });
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <div className='app-w'>
                <HeaderContainer/>
                <Nav/>
                <div className='app-wrapper-content'>
                    <Route exact path='/' render={() => <Redirect to={'/profile'}/>
                    }/>
                    <Route path='/dialogs'
                           render={() => <DialogsContainer/>}/>
                    <Route path='/profile/:userId?' render={() => <ProfileContainer/>
                    }/>
                    <Route path='/news' render={() => <UnderConstructionPage title={'News'}/>}/>
                    <Route path='/music' render={() => <UnderConstructionPage title={'Music'}/>}/>
                    <Route path='/settings' render={() => <UnderConstructionPage title={'Settings'}/>}/>
                    <Route path='/users' render={() => <UsersContainer/>}/>
                    <Route path='/login' render={() => <LoginPage/>}/>
                </div>
            </div>
        );
    }
}

type MapStatePropsType = {
    initialized: boolean
}
const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    initialized: state.app.initialized
})

let AppContainer = compose(connect(mapStateToProps, {initializeApp}))(App);
let MainApp = () => {
    return (/*<HashRouter basename={process.env.PUBLIC_URL}>*/
        <BrowserRouter>
            <Provider store={store}>
            <AppContainer/>
        </Provider></BrowserRouter>
    /*</HashRouter>*/)
}
export default MainApp;


