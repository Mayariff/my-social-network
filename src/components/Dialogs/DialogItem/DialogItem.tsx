import React from "react";
import s from "./DialogItem.module.css";
import {NavLink} from "react-router-dom";
import {dialogsType} from "../../../redux/Dialog-reducer";


const DialogItem = (props: dialogsType) => {
    let path = '/dialogs/' + props.id;
    return (
        <div className={s.dialog + ' ' + s.active}>
            <img src={props.avatar} alt='avatar'/>
            <NavLink to={path} className={s.name}>{props.name}</NavLink>
        </div>
    )
}
export default DialogItem