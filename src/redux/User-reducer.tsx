const FOLLOW = 'FOLLOW'
const UN_FOLLOW = 'UN-FOLLOW';
const SET_USERS = "SET_USERS";

export type userType = {
    id: number
    photoURL: string
    followed: boolean
    fullname: string
    status: string
    location: {
        city: string
        country: string
    }
}
export type InitialStateType = typeof initialState

let initialState ={
    users:[] as Array<userType>
}
/*let initialState = {
    users: [
        {
            id: 1,
            photoURL: "http://thepeoplesmovies.files.wordpress.com/2009/10/avatar1.jpg",
            followed: false,
            fullname: 'Dimian',
            status: "i like cheese",
            location: {
                city: "minsk",
                country: "Bellarus",
            },
        },
        {
            id: 777,
            photoURL: "http://thepeoplesmovies.files.wordpress.com/2009/10/avatar1.jpg",
            followed: true,
            fullname: 'Sveta',
            status: "i am boss",
            location: {
                city: "Kiev",
                country: "Ukraine",
            },
        },
        {
            id: 123,
            photoURL: "http://thepeoplesmovies.files.wordpress.com/2009/10/avatar1.jpg",
            followed: false,
            fullname: 'Ignat',
            status: "loving DDD",
            location: {
                city: "London",
                country: "UK",
            },
        }
    ] as Array<userType>
}*/


export const userReducer = (state: InitialStateType = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userID) {
                        return {...u, followed: true}
                    }
                    return u
                })
            }
        case UN_FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userID) {
                        return {...u, followed: false}
                    }
                    return u
                })
            }
        case SET_USERS:
            return {
                ...state,
                users: [...state.users,
                    ...action.users]
            }
        default:
            return state
    }
};

export type ActionTypes = ReturnType<typeof followAC> | ReturnType<typeof unFollowAC> | ReturnType<typeof setUsersAC>

export const followAC = (userID: number) => ({type: FOLLOW, userID}) as const
export const unFollowAC = (userID: number) => ({type: UN_FOLLOW, userID}) as const
export const setUsersAC = (users: Array<userType>) => ({type: SET_USERS, users}) as const
