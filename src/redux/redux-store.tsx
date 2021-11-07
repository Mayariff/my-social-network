import {applyMiddleware, combineReducers, createStore} from "redux";
import {addPostAC, profileReducer, setStatus, setUserProfile} from "./Profile-reducer";
import {AddMessageAC, dialogReducer} from "./Dialog-reducer";
import {navbarReducer} from "./Navbar-reducer";
import {userReducer} from "./User-reducer";
import {AuthActionTypes, authReducer} from "./Auth-reduser";
import thunkMiddleware, {ThunkAction} from "redux-thunk";
import { reducer as formReducer } from 'redux-form'
import {appReducer, initialActionTypes} from "./App-reduser";


export type ActionTypes = ReturnType<typeof addPostAC> |
  /*  ReturnType<typeof UpdateNewPostTextAC> |*/
    ReturnType<typeof AddMessageAC> |
   /* ReturnType<typeof UpdateNewMessageTextAC>|*/
    ReturnType<typeof setUserProfile>|
    ReturnType<typeof setStatus>

let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogPage: dialogReducer,
    navbarBlock: navbarReducer,
    users: userReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
});


export type AppStateType = ReturnType<typeof rootReducer>
let store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
export default store;

export type RootActionTypes = ActionTypes| AuthActionTypes |initialActionTypes

export type AppThunk= ThunkAction<void, AppStateType, unknown, RootActionTypes>


// @ts-ignore
window.store =store