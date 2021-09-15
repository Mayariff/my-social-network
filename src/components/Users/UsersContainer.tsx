import React from 'react';
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {
    follow,
    InitialStateType,
    setCurrentPages, setToggleFollowingProgress, setToggleIsFetching, setTotalUsersCount,
    setUsers,
    unFollow,
    userType
} from "../../redux/User-reducer";

import Users from "./Users";
import Preloader from "../common/Preloader";
import { usersAPI} from "../../API/Api";

type MapStatePropsType={
    usersPage: InitialStateType
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number>
}
type mapDispatchToPropsType={
    follow: (userID: number) =>void
    unFollow: (userID: number) => void
    setUsers: (users: Array<userType>) => void
    setCurrentPages: (pageNumber: number)=>void
    setTotalUsersCount: (totalCount: number)=> void
    setToggleIsFetching: (isFetching: boolean)=> void
    setToggleFollowingProgress: (followingInProgress: boolean, userID: number)=> void
}
export type UsersPropsType = MapStatePropsType & mapDispatchToPropsType
export  type dataType = {
    error: string
    items : Array<userType>
    totalCount: number
}

class UsersAPIComponent extends React.Component <UsersPropsType> {
    componentDidMount() {
        this.props.setToggleIsFetching(true);
        usersAPI.getUsers(this.props.currentPage, this.props.pageSize).then(
            //@ts-ignore
            data => {
                this.props.setToggleIsFetching(false);
                this.props.setUsers(data.items);
                this.props.setTotalUsersCount(data.totalCount)
            });
    }

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPages(pageNumber);
        usersAPI.getUsers(pageNumber, this.props.pageSize).then(
            //@ts-ignore
            data => {
                this.props.setUsers(data.items)
            });
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
            unfollow={this.props.unFollow}
            follow={this.props.follow}
            setToggleFollowingProgress={ this.props.setToggleFollowingProgress}
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


export default connect(mapStateToProps,  {
    follow,
    unFollow,
    setUsers,
    setCurrentPages,
    setTotalUsersCount,
    setToggleIsFetching,
    setToggleFollowingProgress
})(UsersAPIComponent);

