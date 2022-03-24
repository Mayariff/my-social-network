import React, {ChangeEvent, useEffect, useState} from "react";
import s from './ProfileInfo.module.css'
import Preloader from "../../common/Preloader/Preloader";
import Ava from "../../../assets/image/user.jpg";
import {profileType} from "../../../redux/Profile-reducer";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import {ProfileFormWithReduxForm} from "../ProfileForm";


export type FormDataType = {
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
        mainLink?: string
    }
}
export type ProfileFormvaluesType = keyof FormDataType


type propsType = {
    profile: profileType
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (photo: any) => void
    saveProfile: (formData: FormDataType) => void | any
}

const ProfileInfo = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile}: propsType) => {
    const [editMode, setEditMode] = useState<boolean>(false)

    useEffect(() => {
    }, [])

    if (!profile.userId) {
        return <Preloader/>
    }


    const onPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            savePhoto(e.target.files[0])
        }
    }
    const onSubmit = (formData: FormDataType) => {
        saveProfile(formData)
        //.then(()=>{ setEditMode(false)})
        setEditMode(false)
    }


    return (
        <div className={s.descriptionBlock}>
            <div className={s.photoCard}>
                <img src={profile.photos.large ? profile.photos.large : Ava} alt={"large Avatar"}
                     className={s.mainPhoto}/>
                {isOwner && <label className={s.btnChangeAvatar}>Upload<input type={'file'} onChange={onPhotoSelected}
                                                                              className={s.input}/></label>}
                <ProfileStatusWithHooks status={status} updateStatus={updateStatus} isOwner={isOwner}/>
            </div>
            <div className={s.infoAboutProfile}>
                {editMode ?
                    <ProfileFormWithReduxForm profile={profile} onSubmit={onSubmit} initialValues={profile}/> :
                    <ProfileData profile={profile} isOwner={isOwner}
                                 goToEditMode={() => setEditMode(true)}

                    />}
            </div>
        </div>

    )
}
type ProfileDataType = {
    profile: profileType
    isOwner?: boolean,
    goToEditMode?: () => void
}


const ProfileData = ({profile, isOwner, goToEditMode}: ProfileDataType) => {
    //показывать контакты
    const contactsExist = Object.values(profile.contacts).find(el => el !== '' || null)


    return <div className={s.AboutMe}>
        {isOwner && <div>
            <button onClick={goToEditMode} className={s.EditButton}>Edit</button>
        </div>}
        <div className={s.row}><span className={s.fieldName}>Full Name: </span>{profile.fullName}</div>
        <div className={s.row}><span
            className={s.fieldName}>Looking for are job:  </span> {profile.lookingForAJob ? 'yes' : 'no'}</div>
        {profile.lookingForAJob &&
            <div className={s.row}><span className={s.fieldName}>My skills :</span> {profile.lookingForAJobDescription}
            </div>}
        <div className={s.row}><span className={s.fieldName}>About me :</span> {profile.aboutMe}</div>

        {contactsExist &&
            <div>
                <div className={`${s.fieldName} ${s.Contact}`}> Contacts:</div>
                {Object.keys(profile.contacts).map(key => {
                        // @ts-ignore
                        return <Contact key={key} title={key} value={profile.contacts[key]}/>
                    }
                )}
            </div>}

    </div>
}


type ContactType = {
    title: string,
    value: string
}

const Contact = ({title, value}: ContactType) => {
    const re = /[-a-zA-Z0-9@:%_\+.~#?&\/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&\/=]*)?/gi

    const linkValue= value && value.replace(/(^\w+:|^)\/\/?(www.)?/, '')
    const shortLink  = (linkValue && linkValue.length < 35 )? linkValue :  linkValue?.slice(0, 28)+'...'

     const contactInfo = re.test(value) ? <a target={'_blank'} href={value}>{shortLink}</a> : value

    return <>
        {value && <div className={`${s.contacts} ${s.row}`}>
            <div className={s.fieldContactName}>{title}:</div>
            <div className={s.contactInfo}>{contactInfo}</div>
        </div>}
    </>


}


export default ProfileInfo;