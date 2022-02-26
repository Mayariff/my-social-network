import React from "react";
import classes from './Post.module.css'
import {postType} from "../../../../redux/Profile-reducer";


const Post = (props:postType) => {
    return (
        <div className={classes.post}>
            <div className={classes.item}>
                <img src="http://thepeoplesmovies.files.wordpress.com/2009/10/avatar1.jpg" alt="avatar1"/>
                {props.content}
                <br/><span> Likes </span>{props.likesCount}
            </div>
        </div>)
}
export default Post;