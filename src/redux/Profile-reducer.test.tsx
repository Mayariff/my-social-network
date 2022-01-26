import {
    addPost,
    deletePost,
    InitialStateType,
    profileReducer,
    profileType,
    setStatus,
    setUserProfile
} from "./Profile-reducer";


let stateforTest : InitialStateType;

beforeEach(()=>{
    stateforTest= {
        posts: [
            {id: 1, content: 'Hi? how are you?', likescount: 3},
            {id: 2, content: 'It\'s my first  post', likescount: 11},
            {id: 3, content: 'lalala', likescount: 0},
        ],
        profile: {} as profileType,
        status: "Hi, world"
    }
})
afterEach(()=>{
    stateforTest= {
        posts: [
            {id: 1, content: 'Hi? how are you?', likescount: 3},
            {id: 2, content: 'It\'s my first  post', likescount: 11},
            {id: 3, content: 'lalala', likescount: 0},
        ],
        profile: {} as profileType,
        status: "Hi, world"
    }
})

test('Testing ADD_POST: post should be added ', ()=>{
    let NewPostName ='POST NAME FOR NEW POST'
    let action = addPost(NewPostName)
    let newState = profileReducer(stateforTest, action)

    expect(newState.posts.length).toBe(4)
    expect(newState.posts[3].content).toBe(NewPostName)
    expect(newState.posts[3]).toEqual({
        id: 15,
        content: 'POST NAME FOR NEW POST',
        likescount: 0
    })
})
test('Testing SET_USER_PROFILE: profile should be seated in state', ()=>{
    let NewProfile: profileType = {
        aboutMe: 'I am test',
        contacts: {
            facebook: 'facebook',
            website: 'website',
            vk: 'vk',
            twitter: 'twitter',
            instagram: undefined,
            youtube: undefined,
            github: undefined,
            mainLink: undefined,},
        lookingForAJob: false,
        lookingForAJobDescription: undefined,
        fullName: 'TEST',
        userId: 999,
        photos: {
            small: undefined,
            large: undefined,}
    }
    let action = setUserProfile(NewProfile)
    let newState = profileReducer(stateforTest, action)

    expect(newState.profile).toBeDefined()
    expect(newState.profile).not.toEqual({})
    expect(newState.profile.aboutMe).toBe('I am test')
})
test('Testing SET_STATUS: status should be changed',()=>{
    let NewStatus = 'NEW STATUS FOR TEST'
    let action = setStatus(NewStatus)
    let newState = profileReducer(stateforTest, action)

    expect(newState.status).not.toEqual("Hi, world")
    expect(newState.status).toEqual(NewStatus)
})
test('Testing DELETE_POST:post should be delited', ()=>{
    let action = deletePost(1)

    let newState = profileReducer(stateforTest,action)

    expect(newState.posts.length).toBe(2);
    expect(newState.posts[2]).toBeUndefined()
    expect(newState.posts).not.toContain({id: 1, content: 'Hi? how are you?', likescount: 3})
})
