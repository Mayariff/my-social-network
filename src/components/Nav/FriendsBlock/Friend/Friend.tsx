import React from 'react';
import s from "../FriendsBlock.module.css";
import {friendType} from "../../../../redux/Navbar-reducer";


const Friend = (props: friendType) => {
    return (
        <div className={s.friend}>
            <img src={props.avatar} alt='avatar'/>
            <br/><span className={s.name}> {props.name} </span>
        </div>
    );
};

export default Friend;