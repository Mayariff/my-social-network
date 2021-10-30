import React from "react";
import s from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Massage from "./Message/Message";
import { dialogsType, messagesType} from "../../redux/Dialog-reducer";
import {dialogPageType} from "./DialogsContainer";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {TextArea} from "../common/formControls/formControls";
import {MaxLenghtCreator, RequiredField} from "../../utilits/valid";




const Dialogs = (props:dialogPageType) => {

    let state= props.dialogPage;

    let dialogElements =
        state.dialogs.map((d: dialogsType) => <DialogItem id={d.id} key={d.id}  name={d.name}
                                                                avatar={d.avatar}/>);
    let massagesElements =
        state.messages.map((m: messagesType) => <Massage  id={m.id} key={m.id}  content={m.content}/>);

    const  addNewMessage=(values: FormMassageType)=>{
        props.addMessage(values.newMessageBody)
        console.log(values.newMessageBody)
    }


    return (
        <>
            <div className={s.dialogs}>
                <div className={s.dialogsItems}>
                    {dialogElements}
                </div>
                <div className={s.massages}>
                    {massagesElements}
                </div>
            </div>
            <AddMessageFormReduxForm onSubmit={addNewMessage}
            />
        </>
    )
}

type FormMassageType ={
    newMessageBody: string
}
const maxLength = MaxLenghtCreator(50);

const AddMessageForm = (props: InjectedFormProps<FormMassageType>) =>{
    return (
        <form className={s.styleSendMessage} onSubmit={props.handleSubmit}>
            <Field component={TextArea}
                   name={'newMessageBody'}
                   placeholder={'Enter your message'}
            validate={[RequiredField,maxLength]}/>
            <br/>
            <button className={s.button}>Send Message</button>
        </form>
    )
}

export const AddMessageFormReduxForm = reduxForm<FormMassageType>({
    form: 'message'
})(AddMessageForm )

export default Dialogs;