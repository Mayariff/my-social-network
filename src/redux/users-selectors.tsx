import {AppStateType} from "./redux-store";

export const getUsers = (state: AppStateType) => {
    return state.users
}

//export const getUsersSuperSelector= createSelector(getUsers,getIsFetching, (users,isFetching)=> users.filter(u=>true) )
export const getPageSize = (state: AppStateType) => {
    return state.users.pageSize
}

export const getTotalUsersCount = (state: AppStateType) => {
    return state.users.totalUsersCount
}
export const getCurrentPage = (state: AppStateType) => {
    return state.users.currentPage
}
export const getIsFetching = (state: AppStateType) => {
    return state.users.isFetching
}
export const getFollowingInProgress = (state: AppStateType) => {
    return state.users.followingInProgress
}

/*
    isFetching: state.users.isFetching,
    followingInProgress:  state.users.followingInProgress*/
