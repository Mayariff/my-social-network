import {ActionTypes} from "./redux-store";

const ADD_MESSAGE = "dialogReducer/ADD-MESSAGE";
const ADD_DIALOG_ITEM = "dialogReducer/ADD_DIALOG_ITEM";

/*const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';*/

/*export type dialogPageType = {
    dialogs: Array<dialogsType>
    messages: Array<messagesType>
    newMessageText: string
}*/
export type dialogsType = {
    id: number
    name: string
    avatar: string
}
export type messagesType = {
    id: number
    content: string
}


let initialState = {
    dialogs: [
        {
            id: 1,
            name: 'Dima',
            avatar: "http://thepeoplesmovies.files.wordpress.com/2009/10/avatar1.jpg"
        },
        {
            id: 2,
            name: 'Lena',
            avatar: "http://thepeoplesmovies.files.wordpress.com/2009/10/avatar1.jpg"
        },
        {
            id: 3,
            name: 'Max',
            avatar: "http://thepeoplesmovies.files.wordpress.com/2009/10/avatar1.jpg"
        },
    ] as Array<dialogsType>,
    messages: [
        {id: 1, content: "hi1"},
        {id: 2, content: "hi2"},
        {id: 3, content: "hi3"},
    ] as Array<messagesType>,
    newMessageText: "",
}
export type InitialStateType = typeof initialState


export const dialogReducer = (state: InitialStateType = initialState, action: ActionTypes): InitialStateType => {

    switch (action.type) {
        /*case UPDATE_NEW_MESSAGE_TEXT:
            return {...state,
                newMessageText: action.newMessageText};*/

        case ADD_MESSAGE:
            let newMessage = action.newMessageBody
            return {
                ...state,
                messages: [...state.messages, {id: 100, content: newMessage}]
            }

        case ADD_DIALOG_ITEM:
            return {
                ...state,
                dialogs: [...state.dialogs, {id: action.id, name: action.name, avatar: action.avatar}]
            }

        default:
            return state;
    }
}

export const AddMessageAC = (newMessageBody: string) => ({type: ADD_MESSAGE, newMessageBody}) as const
export const AddDialogItemAC = (id: number,
                                name: string,
                                avatar: string) => ({type: ADD_DIALOG_ITEM, id, name, avatar}) as const
/*
export const UpdateNewMessageTextAC = (text: string) => (
    {type: UPDATE_NEW_MESSAGE_TEXT, newMessageText: text}) as const*/
