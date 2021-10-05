import React from 'react';
import s from "./Users.module.css";
import userPhoto from "../../assets/image/user.jpg";
import {userType} from "../../redux/User-reducer";
import { NavLink } from 'react-router-dom';
import {v1} from "uuid";


type propsType = {
    totalUsersCount: number
    pageSize: number
    users: Array<userType>
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    unfollow: (userID: number) => void
    follow: (userID: number) => void

    followingInProgress : Array<number>

}
const Users = (props: propsType) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
    let pages = [];

    for (let i = 1; i < pagesCount; i++) {
        pages.push(i);
    }
    return (
        <div>
            <div>
                {pages.map(p => <span key ={v1()}
                    className={props.currentPage === p ? s.selectedPage : ""}
                    onClick={() => {
                        props.onPageChanged(p)
                    }}>
                        {p}</span>)}
            </div>
            {
                props.users.map(u => <div key={u.id}>
                        <span>
                        <div>
                            <NavLink to={'/profile/'+u.id}>
                                <img src={u.photos.small != null ? u.photos.small : userPhoto} className={s.photo}
                                    alt={"small Avatar"}/>
                            </NavLink>
                        </div>
                        <div>
                            {u.followed ?
                                <button disabled={props.followingInProgress.some(id=> id === u.id)}
                                    onClick={() => {props.unfollow(u.id)}
                                    }
                                >UnFollow</button> :
                                <button  disabled={props.followingInProgress.some(id=> id === u.id)}
                                         onClick={() => {props.follow(u.id)}}>Follow</button>}
                        </div>
                    </span>
                    <span>
                        <span>
                            <div>{u.name}</div>
                            <div>{u.status}</div>
                        </span>
                        <span>
                            <div>{"u.location.country"}</div>
                            <div>{"u.location.city"}</div>
                        </span>
                    </span>
                </div>)
            }
        </div>
    );
};
export default Users;