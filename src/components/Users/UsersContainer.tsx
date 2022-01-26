import React from 'react';
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {
    followSuccess,
    unFollowSuccess,
    InitialStateType,
    setCurrentPages, setToggleFollowingProgress,
    userType, requestUsers,
} from "../../redux/User-reducer";

import Users from "./Users";
import Preloader from "../common/Preloader";
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from "../../redux/users-selectors";
import {Pagenator} from "../common/Pagenator/Pagenator";



type MapStatePropsType={
    usersPage: InitialStateType
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number>
}
export type mapDispatchToPropsType={
    acceptFollow: (userID: number) =>void
    acceptUnFollow: (userID: number) => void
    setCurrentPages: (pageNumber: number)=>void
    setToggleFollowingProgress: (followingInProgress: boolean, userID: number)=> void
    requestUsers: (currentPage: number, pageSize: number)=> void
}
export type UsersPropsType = MapStatePropsType & mapDispatchToPropsType
export  type dataType = {
    error: string
    items : Array<userType>
    totalCount: number
}

class UsersAPIComponent extends React.Component <UsersPropsType> {
    componentDidMount() {
        let {currentPage, pageSize} = this.props
        this.props.requestUsers(currentPage, pageSize);
    }

    onPageChanged = (pageNumber: number) => {
        let {pageSize} = this.props
        this.props.requestUsers(pageNumber,pageSize);
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/>: null}
            <Pagenator totalUsersCount={this.props.usersPage.totalUsersCount}
                       pageSize={this.props.usersPage.pageSize}
                       currentPage={this.props.currentPage}
                       onPageChanged={this.onPageChanged} />
            <Users
            users={this.props.usersPage.users}
            onPageChanged={this.onPageChanged}
            unfollow={this.props.acceptUnFollow}
            follow={this.props.acceptFollow}
            followingInProgress ={this.props.followingInProgress}
        />
        </>
    }
}

const mapStateToProps = (state: AppStateType):MapStatePropsType  => {
    return {
        usersPage: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps,  {
        acceptUnFollow: unFollowSuccess,
        acceptFollow: followSuccess,
        setCurrentPages,
        setToggleFollowingProgress,
        requestUsers,
    }))(UsersAPIComponent)
