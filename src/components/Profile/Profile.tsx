import React from "react";
import ProfileInfo, {FormDataType} from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./My_posts/MyPostsContainer";
import {profileType} from "../../redux/Profile-reducer";

type propsType= {
    profile: profileType
    status: string
    updateStatus:(status: string)=>void
    isOwner: boolean
    savePhoto:( photo:any)=>void
    saveProfile:(formData: FormDataType)=>void
}

const Profile =(props:propsType) =>{

    return(
        <div >
            <ProfileInfo  profile={props.profile}
                          status={props.status}
                          updateStatus={props.updateStatus}
                          isOwner={ props.isOwner}
                           savePhoto={props.savePhoto}
                          saveProfile={props.saveProfile}
            />
            <MyPostsContainer />
        </div>
    )
}
export default Profile;