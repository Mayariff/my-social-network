import {addPostAC} from "./Profile-reducer";
import {AddMessageAC, dialogReducer} from "./Dialog-reducer";
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


type ActionTypes = ReturnType<typeof addPostAC> | /*ReturnType<typeof UpdateNewPostTextAC> |*/
    ReturnType<typeof AddMessageAC>  /*ReturnType<typeof UpdateNewMessageTextAC>*/

export type storeType = {
    _state: stateType
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
                {id: 1, content: "hi1"},
                {id: 2, content: "hi2"},
                {id: 3, content: "hi3"},
            ],
            newMessageText: ""
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


    dispatch(action) {
        this._state.dialogPage = dialogReducer(this._state.dialogPage, action);
        this._state.navbarBlock = navbarReducer(this._state.navbarBlock, action);
    }
}
        store._callSubscriber();


