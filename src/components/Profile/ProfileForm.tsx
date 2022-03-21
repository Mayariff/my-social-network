import React from "react";
import {createField, Input, TextArea} from "../common/formControls/formControls";
import {InjectedFormProps, reduxForm} from "redux-form";
import {FormDataType, ProfileFormvaluesType} from "./ProfileInfo/ProfileInfo";
import {profileType} from "../../redux/Profile-reducer";
import s from "../common/formControls/FormControle.module.css";
import style from './ProfileInfo/ProfileInfo.module.css'

type ProfileDataType = {
    onSubmit: (formData: FormDataType) => void;
    profile: profileType
}
const ProfileForm: React.FC<InjectedFormProps<FormDataType, ProfileDataType> & ProfileDataType> =
    ({handleSubmit, profile,error})=> {


        return <form onSubmit={handleSubmit} className={style.AboutMe}>
        <div>
            <button className={`${style.EditButton} ${style.Blue}`} >Save</button>
        </div>
            {error && <div className={s.formSMRError}>
                {error}
            </div>}
        <div className={style.row}>
            <span className={style.fieldName}>Full Name: </span>
            {createField("Full Name", "fullName", [], Input)}</div>
        <div className={`${style.row} ${style.checkbox}`}>
            <span className={style.fieldName}>Looking for are job</span>:
            {createField( '','lookingForaJob', [], Input, {text: 'lookingForaJob', type: "checkbox"})}</div>
        <div className={style.row}>
            <span className={style.fieldName}>My skills:</span>
            {createField("My Skills", "lookingForAJobDescription", [], Input)}
        </div>
            <div className={style.row}>
                <span className={style.fieldName}>About me:</span>
                {createField("About me", "aboutMe", [], Input)}
            </div>
            <div>
                <div className={`${style.fieldName}  ${s.Contact}`}>Contacts:</div>
                {Object.keys(profile.contacts).map(key => {
                    return <div key={key} className={`${style.contacts} ${style.row}`} >
                        <span className={style.fieldContactName}>{key}:</span> {createField(key, `contacts.${key}` as ProfileFormvaluesType, [], Input)}
                    </div>
                })}
            </div>
    </form>
}

export  const ProfileFormWithReduxForm = reduxForm<FormDataType, ProfileDataType>({form: 'edit-profile'})(ProfileForm)




