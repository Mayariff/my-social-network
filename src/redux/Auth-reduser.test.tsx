import {authReducer, InitialStateType, setAuthUserData} from "./Auth-reduser";
import {addPost, profileReducer} from "./Profile-reducer";


let stateforTest :InitialStateType;

beforeEach(()=>{
    stateforTest= {
        userId: null,
        email: null,
        login: null,
        isAuth: false
    }
})
afterEach(()=>{
    stateforTest= {
        userId: null,
        email: null,
        login: null,
        isAuth: false
    }
})

test('Testing SET_USER_DATA: User should be got  for login', ()=>{
    let NewPostName ='POST NAME FOR NEW POST'
    let action = setAuthUserData(999, 'g@mail.ru', 'Test', false)
    let newState = authReducer(stateforTest, action)

    expect(newState.isAuth).toBe(false)
    expect(newState).toEqual({
        userId: 999,
        email: 'g@mail.ru',
        login: 'Test',
        isAuth: false
    })
})