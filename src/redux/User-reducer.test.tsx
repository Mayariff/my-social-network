import {followSuccess, InitialStateType, unFollowSuccess, userReducer, userType} from "./User-reducer";


let  stateforTest:InitialStateType
let testUser: userType

beforeEach(()=>{
    testUser = {
        id: 1,
        photos: {
            small: 'no'
        },
        followed: false,
        name: "Test",
        status: "I  test programs"
};
    stateforTest= {
        users: [testUser] as Array<userType>,
        pageSize: 5,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: true,
        followingInProgress: [] as Array<number>
    }
})
afterEach(()=>{
    testUser = {
        id: 1,
        photos: {
            small: 'no'
        },
        followed: false,
        name: "Test",
        status: "I  test programs"
    };
    stateforTest= {
        users: [ testUser] as Array<userType>,
        pageSize: 5,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: true,
        followingInProgress: [] as Array<number>
    }
})

test('Testing FOLLOW: user should be follow to friends ', ()=>{
    let UserID = 1
    let action = followSuccess(UserID)
    let newState = userReducer (stateforTest, action)

    expect(newState.users[0].followed).toBe(true)
})
test('Testing UN_FOLLOW: user should be follow to friends ', ()=>{
    let UserID = 9
    let action = unFollowSuccess(UserID)
    let newState = userReducer (stateforTest, action)

    expect(newState.users[0].followed).not.toBe(true)
})