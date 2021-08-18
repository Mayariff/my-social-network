import {addPostAC, profileReducer, UpdateNewPostTextAC} from "./Profile-reducer";
import {AddMessageAC, dialogReducer, UpdateNewMessageTextAC} from "./Dialog-reducer";
import {navbarReducer} from "./Navbar-reducer";




type postType = {
    id: number
    content: string
    likescount: number
}
type dialogsType = {
    id: number
    name: string
    avatar: string
}
type messagesType = {
    id: number
    content: string
}
type friendType = {
    id: number
    name: string
    avatar: string
}

export type profilePageType = {
    posts: Array<postType>
    newPostText: string
}
 type dialogPageType = {
    dialogs: Array<dialogsType>
    messages: Array<messagesType>
    newMessageText: string
}
export type navbarBlockType = {
    friends: Array<friendType>
}


export type stateType = {
    profilePage: profilePageType
    dialogPage: dialogPageType
    navbarBlock: navbarBlockType
}

/*export type AddPostActionType = {
    type: 'ADD-POST'
    PostText: string
}*/
/*export type AddPostActionType = ReturnType<typeof addPostAC>

type UpdateNewPostTextType = ReturnType<typeof UpdateNewPostTextAC>
type AddMessageType = ReturnType<typeof AddMessageAC>
type UpdateNewMessageTextType = ReturnType<typeof UpdateNewMessageTextAC>*/

type ActionTypes = ReturnType<typeof addPostAC> | ReturnType<typeof UpdateNewPostTextAC> |
    ReturnType<typeof AddMessageAC> | ReturnType<typeof UpdateNewMessageTextAC>

export type storeType = {
    _state: stateType
    /*addPost: () => void
    updateNewPostText: (newPostText: string) => void
    addMessage: () => void
    updateNewMessageText: (newMessageText: string) => void*/
    _callSubscriber: () => void
    subscribe: (observer: () => void) => void
    getState: () => stateType
    dispatch: (action: ActionTypes) => void
}

export const store: storeType = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, content: 'Hi? how are you?', likescount: 3},
                {id: 2, content: 'It\'s my first  post', likescount: 11},
                {id: 3, content: 'lalala', likescount: 0},
            ],
            newPostText: "",
        },
        dialogPage: {
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
            ],
            messages: [
                {id:1, content: "hi1"},
                {id:2, content: "hi2"},
                {id:3, content: "hi3"},
            ],
            newMessageText: "",
        },
        navbarBlock: {
            friends: [
                {
                    id: 1,
                    name: "Masha",
                    avatar: 'http://thepeoplesmovies.files.wordpress.com/2009/10/avatar1.jpg'
                },
                {
                    id: 2,
                    name: "Sasha",
                    avatar: 'http://thepeoplesmovies.files.wordpress.com/2009/10/avatar1.jpg'
                },
                {
                    id: 3,
                    name: "Misha",
                    avatar: 'http://thepeoplesmovies.files.wordpress.com/2009/10/avatar1.jpg'
                },
            ]
        }
    },
    _callSubscriber() {
        console.log("rerender")
    },
    getState() {
        return this._state
    },
    subscribe(observer: () => void) {
        store._callSubscriber = observer;
    },

  /*  addPost() {

        const newPost: postType = {
            id: 5,
            content: this._state.profilePage.newPostText,
            likescount: 0
        };
        this._state.profilePage.posts.push(newPost);
        this._state.profilePage.newPostText = "";
        store._callSubscriber();
    },*/
   /* updateNewPostText(newPostText: string) {
        this._state.profilePage.newPostText = newPostText;
        store._callSubscriber();
    },
    addMessage() {
        let newMessage: messagesType = {
            id: 123,
            content: this._state.dialogPage.newMessageText
        };
        this._state.dialogPage.messages.push(newMessage);
        this._state.dialogPage.newMessageText= "";
        store._callSubscriber();
    },
    updateNewMessageText(newMessageText: string) {
        this._state.dialogPage.newMessageText = newMessageText;
        store._callSubscriber();
    },*/

    dispatch(action) {
        //this._state.profilePage = profileReducer(this._state.profilePage,action);
        this._state.dialogPage =dialogReducer(this._state.dialogPage, action);
        this._state.navbarBlock =navbarReducer(this._state.navbarBlock, action);

        store._callSubscriber();
     /*   if (action.type === ADD_POST) {
            const newPost: postType = {
                id: 5,
                content: action.PostText,
                likescount: 0
            };
            this._state.profilePage.posts.push(newPost);
            this._state.profilePage.newPostText = "";
            store._callSubscriber();
        }
        else if (action.type === UPDATE_NEW_POST_TEXT) {
            this._state.profilePage.newPostText = action.newPostText;
            store._callSubscriber();
        }
        else if (action.type === ADD_MESSAGE) {
            let newMessage: messagesType = {
                id: 123,
                content: action.MessageText
            };
            this._state.dialogPage.newMessageText = "";
            this._state.dialogPage.messages.push(newMessage)

            store._callSubscriber();
        }
        else if (action.type === UPDATE_NEW_MESSAGE_TEXT ) {
            this._state.dialogPage.newMessageText = action.newMessageText;
            store._callSubscriber();
        }*/
    }
}


/*export const  addPostAC= (newPostText:string)=>({type:ADD_POST, PostText: newPostText} ) as const
export const UpdateNewPostTextAC=(text:string) =>({type: UPDATE_NEW_POST_TEXT, newPostText: text} ) as const
export const  AddMessageAC= (newMessageText:string) =>( {type: ADD_MESSAGE, MessageText: newMessageText} ) as const
export const UpdateNewMessageTextAC=(text:string) =>( {type: UPDATE_NEW_MESSAGE_TEXT,newMessageText:text} ) as const*/


export default store;
//window.store =store;

