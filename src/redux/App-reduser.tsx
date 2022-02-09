import {getAuthUserData} from "./Auth-reduser";
import {AppThunk} from "./redux-store";

export const INITIALIZE_SUCCESS = 'appReducer/INITIALIZE_SUCCESS'

const initialState:InitialStateType  ={
    initialized: false
}
export type InitialStateType = {
    initialized: boolean
}
export type initializeAT= {
    type: 'appReducer/INITIALIZE_SUCCESS'
}
 export type initialActionTypes= initializeAT


export const appReducer = (state: InitialStateType = initialState, action: initialActionTypes): InitialStateType => {
    switch (action.type) {
        case INITIALIZE_SUCCESS:
            return {
                ...state,
                initialized: true,
            }
        default:
            return state
    }
};


export const initializeAC = () => ({type: INITIALIZE_SUCCESS}) as const

export const initializeApp = ():AppThunk  =>(dispatch) => {
   let promise = dispatch(getAuthUserData())
   Promise.all([promise])
       .then(()=>{dispatch(initializeAC())})
}
