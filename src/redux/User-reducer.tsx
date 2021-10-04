import {UserResponseType, usersAPI} from "../API/Api";
import {Dispatch} from "redux";
import {AxiosResponse} from "axios";
import {MeResponseType} from "./Auth-reduser";

const FOLLOW = 'FOLLOW'
const UN_FOLLOW = 'UN-FOLLOW';
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGES = "SET_CURRENT_PAGES";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE_IS_FOLLOWING_PROGRESS";
export type userType = {
    id: number
    photos: {
        small: string
    }
    followed: boolean
    name: string
    status: string
    /*location: {
        city: string
        country: string
    }*/
}
export type InitialStateType = typeof initialState

let initialState = {
    users: [] as Array<userType>,
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number>
}


export const userReducer = (state: InitialStateType = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userID) {
                        return {...u, followed: true}
                    }
                    return u
                })
            }
        case UN_FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userID) {
                        return {...u, followed: false}
                    }
                    return u
                })
            }
        case SET_USERS:
            return {
                ...state,
                users: action.users
            }
        case SET_CURRENT_PAGES:
            return {...state, currentPage: action.currentPage}
        case SET_TOTAL_USERS_COUNT:
            return {...state, totalUsersCount: action.count}
        case TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching}
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {...state,
                followingInProgress: action.isFetching?
                    [...state.followingInProgress, action.userID]
                    :[...state.followingInProgress.filter(id=> id !== action.userID) ]}
        default:
            return state
    }
};

export type ActionTypes =
    ReturnType<typeof followSuccess>
    | ReturnType<typeof unFollowSuccess>
    | ReturnType<typeof setUsers>
    | ReturnType<typeof setCurrentPages>
    | ReturnType<typeof setTotalUsersCount>
    | ReturnType<typeof setTotalUsersCount>
    | ReturnType<typeof setToggleIsFetching>
    | ReturnType<typeof setToggleFollowingProgress>


export const followSuccess = (userID: number) => ({type: FOLLOW, userID}) as const
export const unFollowSuccess = (userID: number) => ({type: UN_FOLLOW, userID}) as const
export const setUsers = (users: Array<userType>) => ({type: SET_USERS, users}) as const
export const setCurrentPages = (currentPage: number) => ({type: SET_CURRENT_PAGES, currentPage}) as const
export const setTotalUsersCount = (totalUsersCount: number) => ({
    type: SET_TOTAL_USERS_COUNT,
    count: totalUsersCount
}) as const
export const setToggleIsFetching = (isFetching: boolean) => ({type: TOGGLE_IS_FETCHING, isFetching}) as const
export const setToggleFollowingProgress= (isFetching: boolean, userID: number) => ({type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userID}) as const

export const getUsers=(currentPage: number, pageSize: number)=>{
    return (dispatch: Dispatch<ActionTypes>)=> {

        dispatch(setToggleIsFetching(true));
        usersAPI.getUsers(currentPage, pageSize)
            .then( data => {
                dispatch(setToggleIsFetching(false));
                dispatch(setUsers(data.items));
                dispatch(setTotalUsersCount(data.totalCount))
            });
    }
}
export const follow = (userID: number)=>{
    return (dispatch: Dispatch<ActionTypes>)=> {
        dispatch(setToggleFollowingProgress (true, userID));
        usersAPI.follow(userID)
            .then((response: AxiosResponse<UserResponseType>) => {
                if(response.data.resultCode === 0){
                    dispatch(followSuccess(userID))
                }
                dispatch(setToggleFollowingProgress(false, userID))
            });
    }
}
export const unFollow = (userID: number)=>{
    return (dispatch: Dispatch<ActionTypes>)=> {
       dispatch(setToggleFollowingProgress(true, userID));
        usersAPI.unfollow(userID)
            .then((response: AxiosResponse<UserResponseType>) => {
                if (response.data.resultCode === 0) {
                    dispatch(unFollowSuccess(userID))
                }
                dispatch(setToggleFollowingProgress(false, userID))
            })
}
}