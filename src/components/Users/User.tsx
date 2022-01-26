import React from 'react';
import {NavLink} from "react-router-dom";
import userPhoto from "../../assets/image/user.jpg";
import s from "./Users.module.css";
import {userType} from "../../redux/User-reducer";

type propsType={
    user:userType
    unfollow: (userID: number) => void
    follow: (userID: number) => void
    followingInProgress : Array<number>
}

const User = ({user,unfollow, follow ,followingInProgress}:propsType) => {
    return (
        <div>
            <span>
                        <div>
                            <NavLink to={'/profile/'+user.id}>
                                <img src={user.photos.small != null ? user.photos.small : userPhoto} className={s.photo}
                                     alt={"small Avatar"}/>
                            </NavLink>
                        </div>
                        <div>
                            {user.followed ?
                                <button disabled={followingInProgress.some(id=> id === user.id)}
                                        onClick={() => {unfollow(user.id)} }> UnFollow</button> :
                                <button  disabled={followingInProgress.some(id=> id === user.id)}
                                         onClick={() => {follow(user.id)}}>Follow</button>}
                        </div>
                    </span>
            <span>
                        <span>
                            <div>{user.name}</div>
                            <div>{user.status}</div>
                        </span>
                        <span>
                            <div>{"u.location.country"}</div>
                            <div>{"u.location.city"}</div>
                        </span>
                    </span>
        </div>
    );
};

export default User;