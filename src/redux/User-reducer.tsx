import {usersAPI} from "../API/Api";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import {AxiosResponse} from "axios";
import {updateObjectInArray} from "../utilits/object-helper";

const FOLLOW = 'userReducer/FOLLOW'
const UN_FOLLOW = 'userReducer/UN-FOLLOW';
const SET_USERS = "userReducer/SET_USERS";
const SET_CURRENT_PAGES = "userReducer/SET_CURRENT_PAGES";
const SET_TOTAL_USERS_COUNT = "userReducer/SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_FETCHING = "userReducer/TOGGLE_IS_FETCHING";
const TOGGLE_IS_FOLLOWING_PROGRESS = "userReducer/TOGGLE_IS_FOLLOWING_PROGRESS";
export type userType = {
    id: number
    photos: {
        small: string
    }
    followed: boolean
    name: string
    status: string
}
export type InitialStateType = typeof initialState

let initialState = {
    users: [] as Array<userType>,
    pageSize: 8,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number>
}


export const userReducer = (state: InitialStateType = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            let newUsers: userType[] = updateObjectInArray(state.users, action.userID, 'id', {followed: true})
            return {
                ...state,
                users: newUsers
            }
        case UN_FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userID, 'id', {followed: false})
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
            return {
                ...state,
                followingInProgress: action.isFetching ?
                    [...state.followingInProgress, action.userID]
                    : [...state.followingInProgress.filter(id => id !== action.userID)]
            }
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
export const setToggleFollowingProgress = (isFetching: boolean, userID: number) => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching,
    userID
}) as const

export const requestUsers = (page: number, pageSize: number): ThunkAction<Promise<void>, InitialStateType, unknown, ActionTypes> => async (dispatch: Dispatch<ActionTypes>) => {
    dispatch(setToggleIsFetching(true));
    dispatch(setCurrentPages(page))

    let data = await usersAPI.getUsers(page, pageSize)
    dispatch(setToggleIsFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount))
}

type ObjectType = {
    dispatch: Dispatch<ActionTypes>,
    userID: number,
    ApiMethod: (userID: number) => Promise<AxiosResponse>
    AC: typeof followSuccess | typeof unFollowSuccess
}

export const followUnfollow = async ({dispatch, userID, ApiMethod, AC}: ObjectType) => {
    dispatch(setToggleFollowingProgress(true, userID));
    let response = await ApiMethod(userID)
    if (response.data.resultCode === 0) {
        dispatch(AC(userID))
    }
    dispatch(setToggleFollowingProgress(false, userID))
}

export const follow = (userID: number) => async (dispatch: Dispatch<ActionTypes>) => {
    let ApiMethod = usersAPI.follow.bind(userID)
    let AC = followSuccess;
    await followUnfollow({dispatch, userID, ApiMethod, AC})
}
export const unFollow = (userID: number): ThunkType => async (dispatch) => {
    let ApiMethod = usersAPI.unfollow.bind(userID);
    let AC = unFollowSuccess;
    await followUnfollow({dispatch, userID, ApiMethod, AC})
}

export type ThunkType = ThunkAction<Promise<void>, InitialStateType, unknown, ActionTypes>

