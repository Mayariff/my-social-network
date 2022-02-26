import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {addPost, deletePost, profileReducer, savePhotoSuccess, setStatus, setUserProfile} from "./Profile-reducer";
import {AddMessageAC, dialogReducer} from "./Dialog-reducer";
import {navbarReducer} from "./Navbar-reducer";
import {userReducer} from "./User-reducer";
import {AuthActionTypes, authReducer} from "./Auth-reduser";
import thunkMiddleware, {ThunkAction} from "redux-thunk";
import {FormAction, reducer as formReducer} from 'redux-form'
import {appReducer, initialActionTypes} from "./App-reduser";


export type ActionTypes = ReturnType<typeof addPost> |
    ReturnType<typeof AddMessageAC> |
    ReturnType<typeof setUserProfile>|
    ReturnType<typeof setStatus> | ReturnType<typeof deletePost> | ReturnType<typeof savePhotoSuccess>

let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogPage: dialogReducer,
    navbarBlock: navbarReducer,
    users: userReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
});

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));


export type AppStateType = ReturnType<typeof rootReducer>
//let store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
export default store;

export type RootActionTypes = ActionTypes| AuthActionTypes |initialActionTypes
export type AppThunk= ThunkAction<void, AppStateType, unknown, RootActionTypes>


// @ts-ignore
window._store_ =store