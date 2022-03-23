import React from "react";
import s from "./Message.module.css";
import {messagesType} from "../../../redux/Dialog-reducer";


const Massage = (props: messagesType) => {

    return (
        <div>
            <div className={s.massage}>{props.content}</div>
        </div>
    )
}

export default Massage;