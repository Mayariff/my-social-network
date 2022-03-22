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
            avatar: 'https://icdn.lenta.ru/images/2021/09/06/08/20210906081937502/pwa_vertical_1280_075974ea8cfc4851491e650402e234bc.jpg'
        },
        {
            id: 2,
            name: "Sasha",
            avatar: 'http://thepeoplesmovies.files.wordpress.com/2009/10/avatar1.jpg'
        },
        {
            id: 3,
            name: "Misha",
            avatar: 'https://icdn.lenta.ru/images/2021/07/14/10/20210714103850893/square_1280_b6f4df11717226fd7ed4b00b544185c1.jpg'
        },
    ] as Array<friendType>
}


export const navbarReducer =(state: InitialStateType = initialState , action:ActionTypes):InitialStateType =>{
    return state;
}