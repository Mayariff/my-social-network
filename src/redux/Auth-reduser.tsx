import {AuthAPI} from "../API/Api";
import {Dispatch} from "redux";
import {AxiosResponse} from "axios";

const SET_USER_DATA = 'SET_USER_DATA'


export type InitialStateType = typeof initialState
let initialState = {
    id: 2,
    email: 'blabla@bla.bla',
    login: 'samurai',
    isAuth: false
}

export const authReducer = (state: InitialStateType = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
                isAuth: true
            }
        default:
            return state
    }
};
export type ActionTypes =
    ReturnType<typeof setAuthUserData>


export const setAuthUserData = (id: number, email: string, login: string) => {
    return {
        type: SET_USER_DATA,
        data: {id, email, login}
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

export const getAuthUserData = () => (dispatch: Dispatch<ActionTypes>) => {

    return AuthAPI.me()
        .then((response: AxiosResponse<MeResponseType>) =>{
        if (response.data.resultCode === ResultCodesEnum.Success) {
            let {id, email, login} = response.data.data
            dispatch(setAuthUserData(id, email, login));
        }
    }
)
    ;
}

