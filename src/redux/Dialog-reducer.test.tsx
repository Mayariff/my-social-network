import {AddMessageAC, dialogReducer, dialogsType, InitialStateType, messagesType} from "./Dialog-reducer";

let stateforTest: InitialStateType;

beforeEach(()=>{
    stateforTest= {
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
        ] as Array<dialogsType>,
        messages: [
            {id: 1, content: "hi1"},
            {id: 2, content: "hi2"},
            {id: 3, content: "hi3"},
        ] as Array<messagesType>,
        newMessageText: "",
    }
})
afterEach(()=>{
    stateforTest= {
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
        ] as Array<dialogsType>,
        messages: [
            {id: 1, content: "hi1"},
            {id: 2, content: "hi2"},
            {id: 3, content: "hi3"},
        ] as Array<messagesType>,
        newMessageText: "",
    }
})

test('Testing ADD_MESSAGE: message should be added', ()=>{
    let newMessage= 'Hi, I am test'
    let action = AddMessageAC(newMessage)
    let newState = dialogReducer(stateforTest, action)

    expect (newState.messages.length).toBe(4)
    expect(newState.messages[3].content).toBe(newMessage)
    expect (newState.messages[3]).toEqual({id: 100, content: newMessage})
})