import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./My_posts/MyPostsContainer";
import {profileType} from "../../redux/Profile-reducer";

type propsType= {
    profile: profileType
    status: string
    updateStatus:(status: string)=>void
}

const Profile =(props:propsType) =>{

    return(
        <div >
            <ProfileInfo  profile={props.profile} status={props.status} updateStatus={props.updateStatus}/>
            <MyPostsContainer />
        </div>
    )
}
export default Profile;