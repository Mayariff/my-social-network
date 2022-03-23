import React from "react";
import s from "./FriendsBlock.module.css";
import Friend from "./Friend/Friend";
import {navbarBlockType} from "../../../redux/store";


const FriendsBlock = (props: navbarBlockType) => {

    let elementFriend = props.friends.map((f) =>
        <Friend id={f.id} key={f.id} name={f.name} avatar={f.avatar}/>)
    return (

        <div className={s.friendAvatar}>
            <h2>Friends</h2>
            {elementFriend}
        </div>
    );
};

export default FriendsBlock;