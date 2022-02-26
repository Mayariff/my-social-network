import React from "react";
import {createField, Input, TextArea} from "../common/formControls/formControls";
import {InjectedFormProps, reduxForm} from "redux-form";
import {FormDataType, ProfileFormvaluesType} from "./ProfileInfo/ProfileInfo";
import {profileType} from "../../redux/Profile-reducer";
import s from "../common/formControls/FormControle.module.css";

type ProfileDataType = {
    onSubmit: (formData: FormDataType) => void;
    profile: profileType
}
const ProfileForm: React.FC<InjectedFormProps<FormDataType, ProfileDataType> & ProfileDataType> =
    ({handleSubmit, profile,error})=> {

        return <form onSubmit={handleSubmit}>
        <div>
            <button>save</button>
        </div>
            {error && <div className={s.formSMRError}>
                {error}
            </div>}
        <div>Full Name:
            {createField("Full Name", "fullName", [], Input)}</div>
        <div>Looking for are job:
            {createField( '','lookingForaJob', [], Input, {text: 'lookingForaJob', type: "checkbox"})}</div>
        <div>My skills :
            {createField("Skills", "lookingForAJobDescription", [], TextArea)}
        </div>
            <div>My skills :
                {createField("About me", "aboutMe", [], TextArea)}
            </div>
            <div> Contacts:
                {Object.keys(profile.contacts).map(key => {
                    return <div key={key}>
                        {key} : {createField(key, `contacts.${key}` as ProfileFormvaluesType, [], Input)}
                    </div>
                })}
            </div>
    </form>
}

export  const ProfileFormWithReduxForm = reduxForm<FormDataType, ProfileDataType>({form: 'edit-profile'})(ProfileForm)




