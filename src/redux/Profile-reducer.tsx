import {ActionTypes} from "./redux-store";
import {ProfileAPI, usersAPI} from "../API/Api";
import {Dispatch} from "redux";
import {ResultCodesEnum} from "./Auth-reduser";

const ADD_POST = 'ADD-POST'
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS ";
const DELETE_POST= "DELETE-POST"

export type postType = {
    id: number
    content: string
    likescount: number
}
export type profileType = {
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
        URL?: string| null
        large?: string }
}
export type InitialStateType = typeof initialState
let initialState = {
    posts: [
        {id: 1, content: 'Hi? how are you?', likescount: 3},
        {id: 2, content: 'It\'s my first  post', likescount: 11},
        {id: 3, content: 'lalala', likescount: 0},
    ] as Array<postType>,
    /*newPostText: "",*/
    profile:{} as profileType,
    status:""
}


export const profileReducer = (state: InitialStateType = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case ADD_POST:
            let newPost: postType = {
                id: 15,
                content: action.newPostBody,
                likescount: 0
            };
            return {
                    ...state,
                    posts: [...state.posts, newPost],
                    /*newPostText: ""*/
            }
        /*case UPDATE_NEW_POST_TEXT:
                return {...state,
                        newPostText: action.newPostText};*/
        case SET_USER_PROFILE:
            return {...state, profile: action.profile}
        case SET_STATUS:
            return {...state, status: action.status}
        case DELETE_POST:
            let copy ={...state}
            let FilteredPosts= copy.posts.filter((p)=> p.id !== action.id ? p: '')
            return   {...copy, posts: FilteredPosts}
        default:
            return state;
        }
    };
    export const addPost = (newPostBody: string) => ({type: ADD_POST, newPostBody}) as const
  /*  export const UpdateNewPostTextAC = (text: string) => ({type: UPDATE_NEW_POST_TEXT, newPostText: text}) as const*/
   export const setUserProfile =(profile: profileType)=> ({type: SET_USER_PROFILE, profile }) as const
export const setStatus = (status: string)=> ({type: SET_STATUS, status}) as const
export const deletePost = (id: number)=> ({type: DELETE_POST, id}) as const

export type getProfileResponseType={

    resultCode: ResultCodesEnum
    data: profileType

}

export const getUserProfile =(userId: number)=>async (dispatch: Dispatch<ActionTypes>)=>{
        let response = await  usersAPI.getProfile(userId)
           dispatch(setUserProfile(response.data));
}
export const getStatus =(userId: number)=> async (dispatch: Dispatch<ActionTypes>)=>{
    let response = await  ProfileAPI.getStatus(userId)
            dispatch(setStatus(response.data));
}
export const updateStatus =(status: string)=>async (dispatch: Dispatch<ActionTypes>)=>{
    let response= await ProfileAPI.updateStatus(status)
            if(response.data.resultCode===0){
            dispatch(setStatus(status));}
}