import {ActionTypes} from "./redux-store";
import { usersAPI} from "../API/Api";
import {Dispatch} from "redux";
import {AxiosResponse} from "axios";
import {ResultCodesEnum} from "./Auth-reduser";
const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = "SET_USER_PROFILE";


export type postType = {
    id: number
    content: string
    likescount: number
}
export type profileType = {
    aboutMe: string
    contacts: {
        facebook: string
        website: string
        vk: string
        twitter: string
        instagram?: string
        youtube?: string
        github?: string
        mainLink?: string}
    lookingForAJob: boolean
    lookingForAJobDescription?: string
    fullName: string
        userId: number
    photos: {
        small?: string
        large?: string }
}
export type InitialStateType = typeof initialState


let initialState = {
    posts: [
        {id: 1, content: 'Hi? how are you?', likescount: 3},
        {id: 2, content: 'It\'s my first  post', likescount: 11},
        {id: 3, content: 'lalala', likescount: 0},
    ] as Array<postType>,
    newPostText: "",
    profile:{} as profileType,
}


export const profileReducer = (state: InitialStateType = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case ADD_POST:
            let newPost: postType = {
                id: 5,
                content: state.newPostText,
                likescount: 0
            };
            return {
                    ...state,
                    posts: [...state.posts, newPost],
                    newPostText: ""
            }
        case UPDATE_NEW_POST_TEXT:
                return {...state,
                        newPostText: action.newPostText};
        case SET_USER_PROFILE:
            return {...state, profile: action.profile}
        default:
            return state;
        }
    };
    export const addPostAC = () => ({type: ADD_POST}) as const
    export const UpdateNewPostTextAC = (text: string) => ({type: UPDATE_NEW_POST_TEXT, newPostText: text}) as const
   export const setUserProfile =(profile: profileType)=> ({type: SET_USER_PROFILE, profile }) as const

export type getProfileResponseType={

    resultCode: ResultCodesEnum
    data: profileType

}



export const getUserProfile =(userId: string)=>(dispatch: Dispatch<ActionTypes>)=>{
        return usersAPI.getProfile(userId)
            .then((response:AxiosResponse<any>) => {
           dispatch(setUserProfile(response.data));
        })
}