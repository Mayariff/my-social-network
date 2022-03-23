import React, {ChangeEventHandler, useEffect, useState} from "react";
import s from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Massage from "./Message/Message";
import {dialogsType, messagesType} from "../../redux/Dialog-reducer";
import {dialogPageType} from "./DialogsContainer";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {TextArea} from "../common/formControls/formControls";
import {MaxLengthCreator, RequiredField} from "../../utilits/valid";
import anonim from '../../assets/image/anonim.png'
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {getUserProfile, profileType} from "../../redux/Profile-reducer";


const Dialogs = (props: dialogPageType) => {
    const dispatch = useDispatch()
    const id = useSelector<AppStateType, number>(state => state.auth.userId as number)

    const user = useSelector<AppStateType, profileType>(state => state.profilePage.profile)

    useEffect(() => {
        dispatch(getUserProfile(id))
    }, [])


    let state = props.dialogPage;

    const photo = user.photos?.small ? user.photos.small : anonim
    const name = user ? user.fullName : 'anonim'

    let dialogElements =
        state.dialogs.map((d: dialogsType) => <DialogItem id={d.id} key={d.id} name={d.name}
                                                          avatar={d.avatar}/>);
    let massagesElements =
        state.messages.map((m: messagesType) => <Massage id={m.id} key={m.id} content={m.content}/>);

    const addNewMessage = (values: FormMassageType) => {
        props.addMessage(values.newMessageBody)
        props.addDialogItem(id, name, photo)
    }


    return (
        <div className={s.container}>
            <h1>Dialogs</h1>
            <div className={s.dialogs}>
                <div>
                    {dialogElements}
                </div>
                <div className={s.massages}>
                    {massagesElements}
                </div>
            </div>
            <div className={s.AddMessageField}>
                <AddMessageFormReduxForm onSubmit={addNewMessage}/>
            </div>
        </div>
    )
}

type FormMassageType = {
    newMessageBody: string
}
const maxLength = MaxLengthCreator(50);

const AddMessageForm = (props: InjectedFormProps<FormMassageType>) => {

    const [count, setCount] = useState<number>(0)

    const onchangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
        setCount(e.currentTarget.value.length)
    }

    const btnStyle = count > 50 || count === 0 ? `${s.button} ${s.disabled}` : s.button
    return (
        <form onSubmit={props.handleSubmit}>
            <Field component={TextArea}
                   name={'newMessageBody'}
                   placeholder={'Enter your message'}
                   validate={[RequiredField, maxLength]} onChange={onchangeHandler}/>
            <br/>
            <div className={s.postLength}>{count}/50</div>
            <button className={btnStyle} disabled={count > 50}>Send</button>
        </form>
    )
}

export const AddMessageFormReduxForm = reduxForm<FormMassageType>({
    form: 'message'
})(AddMessageForm)

export default Dialogs;