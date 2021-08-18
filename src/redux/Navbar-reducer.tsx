import {ActionTypes} from "./redux-store";

export type friendType = {
    id: number
    name: string
    avatar: string
}
export type InitialStateType =typeof initialState

let initialState ={
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
    ] as Array<friendType>
}


export const navbarReducer =(state: InitialStateType = initialState , action:ActionTypes):InitialStateType =>{
    return state;
}