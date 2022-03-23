import {AuthAPI, securityAPI} from "../API/Api";
import {Dispatch} from "redux";
import {stopSubmit} from "redux-form";
import {AppThunk} from "./redux-store";


const SET_USER_DATA = 'authReducer/SET_USER_DATA'
const GET_CAPTCHA_URL_SUCCESS = 'authReducer/GET_CAPTCHA_URL_SUCCESS'


export type InitialStateType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
    captchaUrl: string | null
}

let initialState: InitialStateType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null
    /* id: 2 as number,
     email: 'blabla@bla.bla' as string|null,
     login: 'samurai' as string|null,
     isAuth: false*/
}

export const authReducer = (state: InitialStateType = initialState, action: AuthActionTypes): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state
    }
};
export type AuthActionTypes = ReturnType<typeof setAuthUserData> | ReturnType<typeof getCaptchaUrlSuccess>


export const setAuthUserData = (userId: number, email: string, login: string, isAuth: boolean, captcha?: string | null) => {
    return {
        type: SET_USER_DATA,
        payload: {userId, email, login, isAuth, captcha}
    } as const
}
export const getCaptchaUrlSuccess = (captchaUrl: string) => ({
    type: GET_CAPTCHA_URL_SUCCESS,
    payload: {captchaUrl}
} as const)

export enum ResultCodesEnum {
    Success,
    Error = 1,
    Captcha = 10,
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
}
export const getCaptchaUrl = () => async (dispatch: Dispatch) => {
    const res = await securityAPI.getCaptcha()
    const captchaUrl = res.data.url
    dispatch(getCaptchaUrlSuccess(captchaUrl))
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string | null): AppThunk => async (dispatch) => {
    let response = await AuthAPI.login(email, password, rememberMe, captcha)
    if (response.resultCode === ResultCodesEnum.Success) {
        dispatch(getAuthUserData());
    } else {
        if (response.resultCode === ResultCodesEnum.Captcha) {
            await dispatch(getCaptchaUrl())
        }
        let message = response.messages.length > 0 ? response.messages[0] : "Some error";
        dispatch(stopSubmit('login', {_error: message}));
    }
}
export const logout = () => async (dispatch: Dispatch<AuthActionTypes>) => {
    let response = await AuthAPI.logout()
    if (response.data.resultCode === ResultCodesEnum.Success) {
        dispatch(setAuthUserData(0, " ", " ", false));
    }
}