import {ActionTypes} from "./redux-store";

const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';


export type postType = {
    id: number
    content: string
    likescount: number
}
export type InitialStateType = typeof initialState


let initialState = {
    profilePage: {
        posts: [
            {id: 1, content: 'Hi? how are you?', likescount: 3},
            {id: 2, content: 'It\'s my first  post', likescount: 11},
            {id: 3, content: 'lalala', likescount: 0},
        ] as Array<postType>,
        newPostText: "",
    }
}


export const profileReducer = (state: InitialStateType = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case ADD_POST:
            let newPost: postType = {
                id: 5,
                content: state.profilePage.newPostText,
                likescount: 0
            };
            /*            let stateCopy ={...state}
                        stateCopy.profilePage ={...state.profilePage}
                        stateCopy.profilePage.posts =[...state.profilePage.posts]
                        //state.posts.push(newPost);
                        stateCopy.profilePage.posts.push(newPost);
                        //state.newPostText = "";
                        stateCopy.profilePage.newPostText  = "";
                        //return stateCopy;*/
            return {
                ...state,
                profilePage: {
                    ...state.profilePage,
                    posts: [...state.profilePage.posts, newPost],
                    newPostText: ""
                }
            }
        case
            UPDATE_NEW_POST_TEXT:
                /*//state.newPostText = action.newPostText;
                let stateCopy = {...state}
                stateCopy.profilePage = {...state.profilePage}
                stateCopy.profilePage.newstateCopyPostText = action.newPostText;*/
                return {...state,
                    profilePage:{...state.profilePage,
                        newPostText: action.newPostText}};
        default:
            return state;
        }
    };
    export const addPostAC = () => ({type: ADD_POST}) as const
    export const UpdateNewPostTextAC = (text: string) => ({type: UPDATE_NEW_POST_TEXT, newPostText: text}) as const