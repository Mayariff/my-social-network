import {applyMiddleware, combineReducers, createStore} from "redux";
import {addPostAC, profileReducer, setStatus, setUserProfile, UpdateNewPostTextAC} from "./Profile-reducer";
import {AddMessageAC, dialogReducer, UpdateNewMessageTextAC} from "./Dialog-reducer";
import {navbarReducer} from "./Navbar-reducer";
import {userReducer} from "./User-reducer";
import {authReducer} from "./Auth-reduser";
import  thunkMiddleware from "redux-thunk";
import { reducer as formReducer } from 'redux-form'


export type ActionTypes = ReturnType<typeof addPostAC> |
    ReturnType<typeof UpdateNewPostTextAC> |
    ReturnType<typeof AddMessageAC> |
    ReturnType<typeof UpdateNewMessageTextAC>|
    ReturnType<typeof setUserProfile>|
    ReturnType<typeof setStatus>

let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogPage: dialogReducer,
    navbarBlock: navbarReducer,
    users: userReducer,
    auth: authReducer,
    form: formReducer
});


export type AppStateType = ReturnType<typeof rootReducer>
let store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
export default store;