import React from 'react';
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {Dispatch} from "redux";
import {followAC, InitialStateType, setUsersAC, unFollowAC, userType} from "../../redux/User-reducer";
import Users from "./Users";


type MapStatePropsType={
    usersPage: InitialStateType
}
type mapDispatchToPropsType={
    follow: (userID: number) =>void
    unfollow: (userID: number) => void
    setUsers: (users: Array<userType>) => void
}

export type UsersPropsType = MapStatePropsType & mapDispatchToPropsType

const mapStateToProps = (state: AppStateType):MapStatePropsType  => {
    return {
        usersPage: state.users
    }
}

const mapDispatchToProps = (dispatch: Dispatch):mapDispatchToPropsType => {
    return {
        follow: (userID: number) => dispatch(followAC(userID)),
        unfollow: (userID: number) => dispatch(unFollowAC(userID)),
        setUsers: (users: Array<userType>) => dispatch(setUsersAC(users))
    }
}


export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);
