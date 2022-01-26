import {addPost, postType} from "../../../redux/Profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";

import {AppStateType} from "../../../redux/redux-store";
import {Dispatch} from "redux";

type mapStateToPropsType ={
    posts: Array<postType>
    /*newPostText: string*/
}
type mapDispatchToPropsType ={
   /* updateNewPostText: (text: string)=> void*/
    addPost: (newPostBody:string)=>void
}

export type MyPostsType = mapStateToPropsType & mapDispatchToPropsType

const mapStateToProps =(state:AppStateType):mapStateToPropsType => {
    return {
        posts: state.profilePage.posts,
       /* newPostText: state.profilePage.newPostText*/
    }
}


const mapDispatchToProps =(dispatch:Dispatch):mapDispatchToPropsType=>{
    return{
      /*  updateNewPostText: (text: string)=> {
            let action = UpdateNewPostTextAC(text);
            dispatch(action)
        },*/
        addPost: (newPostBody:string)=>{
           dispatch(addPost(newPostBody));
        }
    }
}

const MyPostsContainer =connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;