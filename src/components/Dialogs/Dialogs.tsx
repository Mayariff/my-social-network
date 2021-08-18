import React, {ChangeEvent} from "react";
import s from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Massage from "./Message/Message";
import { dialogsType, messagesType} from "../../redux/Dialog-reducer";
import {dialogPageType} from "./DialogsContainer";


/*type PageDialogsType = {
    //state: dialogPageType
    //addMessage: (text: string) => void
    //updateNewMessageText: (text: string) => void
    messages: Array<messagesType>
    dispatch: (action: ActionTypes) => void
    newMessageText: string
}*/


const Dialogs = (props:dialogPageType) => {

    let state= props.dialogPage;

    let dialogElements =
        state.dialogs.map((d: dialogsType) => <DialogItem id={d.id} key={d.id}  name={d.name}
                                                                avatar={d.avatar}/>);
    let massagesElements =
        state.messages.map((m: messagesType) => <Massage  id={m.id} key={m.id}  content={m.content}/>);


    let sendMessage = () => {
        props.addMessage()
    }
    let onMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let text = e.currentTarget.value;
        props.updateNewMessageText(text);
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
            <div className={s.styleSendMessage}>
                <textarea
                    onChange={onMessageChange}
                    value={props.dialogPage.newMessageText}
                    placeholder={"Enter your message"}/>
                <br/>
                <button className={s.button}
                        onClick={sendMessage}>
                    Send Message
                </button>
            </div>
        </>
    )
}

export default Dialogs;