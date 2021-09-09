import React from 'react';
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {
    follow,
    InitialStateType,
    setCurrentPages, setToggleIsFetching, setTotalUsersCount,
    setUsers,
    unFollow,
    userType
} from "../../redux/User-reducer";

import * as axios from "axios";
import Users from "./Users";
import Preloader from "../common/Preloader";


type MapStatePropsType={
    usersPage: InitialStateType
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
}
type mapDispatchToPropsType={
    follow: (userID: number) =>void
    unFollow: (userID: number) => void
    setUsers: (users: Array<userType>) => void
    setCurrentPages: (pageNumber: number)=>void
    setTotalUsersCount: (totalCount: number)=> void
    setToggleIsFetching:(isFetching: boolean)=> void
}
export type UsersPropsType = MapStatePropsType & mapDispatchToPropsType

class UsersAPIComponent extends React.Component <UsersPropsType> {
    componentDidMount() {
        this.props.setToggleIsFetching(true);
        axios.default.get('https://social-network.samuraijs.com/api/1.0/users?page=' + this.props.currentPage + '&count=' + this.props.pageSize)
            .then(response => {
                this.props.setToggleIsFetching(false);
                this.props.setUsers(response.data.items);
                this.props.setTotalUsersCount(response.data.totalCount)
            });
    }

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPages(pageNumber);
        axios.default.get('https://social-network.samuraijs.com/api/1.0/users?page=' + pageNumber + '&count=' + this.props.pageSize)
            .then(response => {
                this.props.setUsers(response.data.items)
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
        isFetching: state.users.isFetching
    }
}


export default connect(mapStateToProps,  {
    follow,
    unFollow,
    setUsers,
    setCurrentPages,
    setTotalUsersCount,
    setToggleIsFetching
})(UsersAPIComponent);

