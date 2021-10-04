import {
    AddMessageAC,
    InitialStateType,
    UpdateNewMessageTextAC
} from "../../redux/Dialog-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {compose, Dispatch} from "redux";
import React from "react";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";




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
        dialogPage: state.dialogPage,
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

export default compose<React.ComponentType>(connect(mapStateToProps, mapDispatchToProps), withAuthRedirect)(Dialogs);