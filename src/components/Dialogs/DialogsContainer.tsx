import React  from "react";
import {
    AddMessageAC,
    InitialStateType,
    UpdateNewMessageTextAC
} from "../../redux/Dialog-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {Dispatch} from "redux";


/*type PageDialogsType = {
    state: dialogPageType
    //addMessage: (text: string) => void
    //updateNewMessageText: (text: string) => void
    messages: Array<messagesType>
    //dispatch: (action: ActionTypes) => void
    newMessageText: string
}*/

type MapStatePropsType={
    dialogPage: InitialStateType
}
type mapDispatchToPropsType={
    updateNewMessageText: (text:string)=> void
    addMessage: ()=> void
    }


export type dialogPageType = MapStatePropsType & mapDispatchToPropsType

const mapStateToProps =(state:AppStateType):MapStatePropsType => {
    return {
        dialogPage: state.dialogPage
    }
}


const mapDispatchToProps =(dispatch:Dispatch): mapDispatchToPropsType=>{
    return{
        updateNewMessageText: (text:string)=> {
            dispatch(UpdateNewMessageTextAC(text));
        },
        addMessage: ()=>{
            dispatch(AddMessageAC());
        }
    }
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;