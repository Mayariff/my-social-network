import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./My_posts/MyPostsContainer";
import {MapStatePropsType} from "./ProfileContainer";



const Profile =(props:MapStatePropsType) =>{

    return(
        <div >
            <ProfileInfo  profile={props.profile}/>
            <MyPostsContainer />
        </div>
    )
}
export default Profile;