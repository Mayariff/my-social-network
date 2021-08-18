import React from "react";
import {addPostAC, postType, UpdateNewPostTextAC} from "../../../redux/Profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";

import {AppStateType} from "../../../redux/redux-store";
import {Dispatch} from "redux";

type mapStateToPropsType ={
    posts: Array<postType>
    newPostText: string
}
type mapDispatchToPropsType ={
    updateNewPostText: (text: string)=> void
    addPost: ()=>void
}

export type MyPostsType = mapStateToPropsType & mapDispatchToPropsType

const mapStateToProps =(state:AppStateType):mapStateToPropsType => {
    return {
        posts: state.profilePage.profilePage.posts,
        newPostText: state.profilePage.profilePage.newPostText
    }
}


const mapDispatchToProps =(dispatch:Dispatch):mapDispatchToPropsType=>{
    return{
        updateNewPostText: (text: string)=> {
            let action = UpdateNewPostTextAC(text);
            dispatch(action)
        },
        addPost: ()=>{
           dispatch(addPostAC());
        }
    }
}

const MyPostsContainer =connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;