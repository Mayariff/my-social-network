import {appReducer, initializeAC, InitialStateType} from "./App-reduser";


test('Testing INITIALIZE_SUCCESS: status initialized to be changed' , ()=>{
    let testState:InitialStateType  ={
        initialized: false
    }
    let action = initializeAC();
    let newState = appReducer(testState, action)

    expect(newState.initialized).toBe(true)
})
