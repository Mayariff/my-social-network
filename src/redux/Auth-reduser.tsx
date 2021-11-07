import {AuthAPI, LoginMeResponseType} from "../API/Api";
import {Dispatch} from "redux";
import {AxiosResponse} from "axios";
import {stopSubmit} from "redux-form";
import {AppThunk} from "./redux-store";


const SET_USER_DATA = 'SET_USER_DATA'


export type InitialStateType = {
    userId: number|null
    email: string|null
    login: string|null
    isAuth: boolean}

let initialState :InitialStateType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
   /* id: 2 as number,
    email: 'blabla@bla.bla' as string|null,
    login: 'samurai' as string|null,
    isAuth: false*/
}

export const authReducer = (state: InitialStateType = initialState, action: AuthActionTypes): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state
    }
};
export type AuthActionTypes = ReturnType<typeof setAuthUserData>



export const setAuthUserData = (userId: number, email: string, login: string, isAuth:boolean) => {
    return {
       type: SET_USER_DATA,
       payload: {userId, email, login,isAuth}
    } as const
}

export enum ResultCodesEnum {
    Success,
    Error = 1,
}

export type  MeResponseType = {
   data: {
        id: number
        email: string
        login: string
    }
    resultCode: ResultCodesEnum
    messages: Array<string>
}


export const getAuthUserData = () => async (dispatch: Dispatch<AuthActionTypes>) => {
 let response = await AuthAPI.me()
    if (response.resultCode === ResultCodesEnum.Success) {
        let {id, email, login} = response.data
        dispatch(setAuthUserData(id, email, login, true));
    }
    /*return  AuthAPI.me()
        .then((response: AxiosResponse<MeResponseType>) =>{
        if (response.data.resultCode === ResultCodesEnum.Success) {
            let {id, email, login} = response.data.payload
            dispatch(setAuthUserData(id, email, login, true));
        }
    }
)
    ;*/
}

export const login=(email:string, password:string, rememberMe:boolean):AppThunk=> async (dispatch)=>{
    let response = await AuthAPI.login(email, password, rememberMe)
    if (response.resultCode === ResultCodesEnum.Success) {
        dispatch(getAuthUserData());
    } else {
        let message = response.messages.length > 0 ? response.messages[0] : "Some error";
        dispatch(stopSubmit('login', {_error: message}));
    }
    /*return AuthAPI.login(email, password, rememberMe)
        .then((response: AxiosResponse<LoginMeResponseType>) =>{
                if (response.data.resultCode === ResultCodesEnum.Success) {
                    dispatch(getAuthUserData());
                } else{
                   let message= response.data.messages.length> 0? response.data.messages[0]: "Some error";
                    dispatch(stopSubmit('login',{_error: message}));
                }
            }
        )*/
}
export const logout=()=>(dispatch: Dispatch<AuthActionTypes>)=>{
    return AuthAPI.logout()
        .then((response: AxiosResponse<MeResponseType>) =>{
                if (response.data.resultCode === ResultCodesEnum.Success) {
                    dispatch(setAuthUserData(0, " ", " ", false));
                }
            }
        )
}