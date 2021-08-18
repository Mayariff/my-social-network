import React, {ChangeEvent} from "react";
import classes from './My_posts.module.css'
import Post from "./Post/Post";

import {addPostAC, postType, UpdateNewPostTextAC} from "../../../redux/Profile-reducer";
import {ActionTypes} from "../../../redux/redux-store";
import {MyPostsType} from "./MyPostsContainer";


/*type MyPostsType ={
    newPostText: string
    addPost: (p:string)=>void
    updateNewPostText: (p:string)=>void
    posts:Array<postType>
    dispatch: (action:ActionTypes)=>void
}*/



const MyPosts = (props:MyPostsType) => {

    let postsElement =
        props.posts.map( (p:any) => <Post id={p.id} key ={p.id}  content={p.content} likescount={p.likescount}/> )


  let onAddPost = () =>{
     //props.addPost(props.newPostText)
      props.addPost()
  }

    let onPostChangeHandler =(e:ChangeEvent<HTMLTextAreaElement>) => {
        let text = e.currentTarget.value
        props.updateNewPostText(text);
    }


    return (
        <div className={classes.postsBlock}>
            <h2>My posts</h2>
            <div><textarea onChange={onPostChangeHandler}  value={props.newPostText}/></div>
            <div>
                <button onClick={onAddPost}>Add post</button>
                <button>Remove</button>
            </div>
            <div className={classes.posts}>new post</div>
            {postsElement}
        </div>

    )
}
export default MyPosts;