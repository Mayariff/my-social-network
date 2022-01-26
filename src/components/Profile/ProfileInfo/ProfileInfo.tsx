import React from "react";
import classes from './ProfileInfo.module.css'
import Preloader from "../../common/Preloader";
import Ava from "../../../assets/image/user.jpg";
import {profileType} from "../../../redux/Profile-reducer";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

type propsType = {
    profile: profileType
    status: string
    updateStatus: (status: string) => void
}

const ProfileInfo = ({profile, status, updateStatus}: propsType) => {

    if (!profile.userId) {
        return <Preloader/>
    }
    return (
        <div>
            <div className={classes.descriptionBlock}>
                <img src={profile.photos.large ? profile.photos.large : Ava} alt={"large Avatar"}/>
                <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
            </div>
        </div>

    );
}
export default ProfileInfo;