import {addPostAC, deletePost, InitialStateType, postType, profileReducer, profileType} from "./Profile-reducer";

let posts:Array<postType>;
let profile: profileType;
let status: string;
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
test('post should be delited', ()=>{

    let action = deletePost(1)

    let newState = profileReducer(stateforTest,action)

    expect(newState.posts.length).toBe(2);
})
