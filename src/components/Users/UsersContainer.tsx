import React from 'react';
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {
    followSuccess,
    unFollowSuccess,
    getUsers,
    InitialStateType,
    setCurrentPages, setToggleFollowingProgress,
    userType
} from "../../redux/User-reducer";

import Users from "./Users";
import Preloader from "../common/Preloader";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";



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
    getUsers: (currentPage: number, pageSize: number)=> void
}
export type UsersPropsType = MapStatePropsType & mapDispatchToPropsType
export  type dataType = {
    error: string
    items : Array<userType>
    totalCount: number
}

class UsersAPIComponent extends React.Component <UsersPropsType> {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (pageNumber: number) => {
        this.props.getUsers(pageNumber, this.props.pageSize);
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/>: null}
            <Users
            totalUsersCount={this.props.usersPage.totalUsersCount}
            pageSize={this.props.usersPage.pageSize}
            users={this.props.usersPage.users}
            currentPage={this.props.currentPage}
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
        usersPage: state.users,
        pageSize: state.users.pageSize,
        totalUsersCount: state.users.totalUsersCount,
        currentPage: state.users.currentPage,
        isFetching: state.users.isFetching,
        followingInProgress:  state.users.followingInProgress
    }
}
//let withRedirect = withAuthRedirect(UsersAPIComponent)

/*export default withAuthRedirect(
    connect(mapStateToProps,  {
    acceptUnFollow: unFollowSuccess, acceptFollow: followSuccess, setCurrentPages,
    setToggleFollowingProgress,
    getUsers,
})(UsersAPIComponent));*/

export default compose<React.ComponentType>(
    withAuthRedirect,
    connect(mapStateToProps,  {
        acceptUnFollow: unFollowSuccess,
        acceptFollow: followSuccess,
        setCurrentPages,
        setToggleFollowingProgress,
        getUsers,
    }))(UsersAPIComponent)

