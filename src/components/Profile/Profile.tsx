import React from "react";
import MyPosts from "./My_posts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {profilePageType} from "../../redux/store";
import MyPostsContainer from "./My_posts/MyPostsContainer";

/*type profileType={
    state: profilePageType
    //addPost: (p:string)=>void
   //updateNewPostText: (p:string)=>void
    posts: Array<postType>
    dispatch: (action:ActionTypes)=>void
}*/

const Profile =(props: any) =>{

    return(
        <div >
            <ProfileInfo />
            <MyPostsContainer />
        </div>
    )
}
export default Profile;