import {applyMiddleware, combineReducers, createStore} from "redux";
import {addPostAC, profileReducer, setUserProfile, UpdateNewPostTextAC} from "./Profile-reducer";
import {AddMessageAC, dialogReducer, UpdateNewMessageTextAC} from "./Dialog-reducer";
import {navbarReducer} from "./Navbar-reducer";
import {userReducer} from "./User-reducer";
import {authReducer} from "./Auth-reduser";
import  thunkMiddleware from "redux-thunk"

export type ActionTypes = ReturnType<typeof addPostAC> |
    ReturnType<typeof UpdateNewPostTextAC> |
    ReturnType<typeof AddMessageAC> |
    ReturnType<typeof UpdateNewMessageTextAC>|
    ReturnType<typeof setUserProfile>

let rootReduser = combineReducers({
    profilePage: profileReducer,
    dialogPage: dialogReducer,
    navbarBlock: navbarReducer,
    users: userReducer,
    auth: authReducer
});


export type AppStateType = ReturnType<typeof rootReduser>
let store = createStore(rootReduser, applyMiddleware(thunkMiddleware));
export default store;