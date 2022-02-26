import React, {ChangeEvent, useState} from "react";
import s from './ProfileInfo.module.css'
import Preloader from "../../common/Preloader";
import Ava from "../../../assets/image/user.jpg";
import {profileType} from "../../../redux/Profile-reducer";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import {ProfileFormWithReduxForm} from "../ProfileForm";


export type FormDataType={
    fullName: string
    lookingForAJobDescription: string
    lookingForaJob: boolean
    aboutMe: string
    contacts: {
        facebook: string
        website: string
        vk: string
        twitter: string
        instagram?: string
        youtube?: string
        github?: string
        mainLink?: string}
}
export type ProfileFormvaluesType = keyof FormDataType


type propsType = {
    profile: profileType
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (photo: any) => void
    saveProfile:(formData: FormDataType)=>void|any
}

const ProfileInfo = ({profile, status, updateStatus, isOwner, savePhoto,saveProfile}: propsType) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    if (!profile.userId) {
        return <Preloader/>
    }


    const onPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            savePhoto(e.target.files[0])
        }
    }
    const  onSubmit= (formData: FormDataType)=>{
       saveProfile(formData)
           //.then(()=>{ setEditMode(false)})
        setEditMode(false)
    }

    return (
        <div>
            <div className={s.descriptionBlock}>
                <img src={profile.photos.large ? profile.photos.large : Ava} alt={"large Avatar"}
                     className={s.mainPhoto}/>
                {isOwner && <input type={'file'} onChange={onPhotoSelected}/>}
                <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
                {editMode? <ProfileFormWithReduxForm  profile={profile}  onSubmit={onSubmit} initialValues={profile}/>:
                <ProfileData  profile={profile} isOwner={isOwner}
                              goToEditMode={()=>setEditMode(true)}

                 />}
            </div>
</div>

)
}
type ProfileDataType ={
    profile: profileType
    isOwner?: boolean,
    goToEditMode?:()=>void
}

const ProfileData = ({profile, isOwner, goToEditMode}:ProfileDataType ) => {
    return <div>
        {isOwner&& <div>
            <button onClick={goToEditMode}>edit</button>
        </div>}
        <div>Full Name: {profile.fullName}</div>
        <div>Looking for are job: {profile.lookingForAJob ? 'yes' : 'no'}</div>
        {profile.lookingForAJob &&
        <div>My skills : {profile.lookingForAJobDescription}</div>}
        <div>About me : {profile.aboutMe}</div>
        <div> Contacts: {Object.keys(profile.contacts).map(key => {
                // @ts-ignore
                return <Contact key={key} title={key} value={profile.contacts[key]}/>
            }
        )}
        </div>
    </div>
}


type ContactType = {
    title: string,
    value: string
}

const Contact = ({title, value}: ContactType) => {
    return <div> {title}: {value}</div>
}


export default ProfileInfo;