import React from 'react';
import {NavLink} from "react-router-dom";
import userPhoto from "../../assets/image/anonim.png";
import s from "./Users.module.css";
import {userType} from "../../redux/User-reducer";

type propsType = {
    user: userType
    unfollow: (userID: number) => void
    follow: (userID: number) => void
    followingInProgress: Array<number>
}

const User = ({user, unfollow, follow, followingInProgress}: propsType) => {
    return (
        <div className={s.card}>
            <div>
                <NavLink to={'/profile/' + user.id}>
                    <img src={user.photos.small != null ? user.photos.small : userPhoto} className={s.photo}
                         alt={"small Avatar"}/>
                </NavLink>
            </div>
            <div className={s.text}>{user.name}</div>
            {user.followed ?
                <button disabled={followingInProgress.some(id => id === user.id)}
                        onClick={() => {
                            unfollow(user.id)
                        }} className={`${s.btn} ${s.unfollow}`}> UnFollow</button> :
                <button disabled={followingInProgress.some(id => id === user.id)}
                        onClick={() => {
                            follow(user.id)
                        }} className={s.btn}>Follow</button>}
        </div>
    );
};

export default User;