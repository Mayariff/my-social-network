
const SET_USER_DATA= 'SET_USER_DATA'


export type InitialStateType = typeof initialState

let initialState = {
    id: 2,
    email: 'blabla@bla.bla',
    login: 'samurai',
}


export const authReducer = (state: InitialStateType = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
            return { ...state,
                     ...action.data
            }
        default:
            return state
    }
};

export type ActionTypes =
    ReturnType<typeof setAuthUserData>


export const setAuthUserData = ( id: number, email: string, login: string) => {
    return {
        type: SET_USER_DATA,
        data: {id, email, login}
    } as const
}


