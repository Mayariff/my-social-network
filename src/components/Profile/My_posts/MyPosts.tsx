import React from "react";
import classes from './My_posts.module.css'
import Post from "./Post/Post";
import {MyPostsType} from "./MyPostsContainer";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {MaxLenghtCreator, RequiredField} from "../../../utilits/valid";
import {TextArea} from "../../common/formControls/formControls";


/*type MyPostsType ={
    newPostText: string
    addPost: (p:string)=>void
    updateNewPostText: (p:string)=>void
    posts:Array<postType>
    dispatch: (action:ActionTypes)=>void
}*/

let maxLength = MaxLenghtCreator(30);

const  MyPosts= React.memo((props: MyPostsType) =>{

    let postsElement =
        props.posts.map((p: any) =>
            <Post id={p.id} key={p.id} content={p.content} likesCount={p.likescount}/>).reverse()

   let AddNewPost = (values: FormPostType) => {
        props.addPost(values.newPostBody)
    }

    return (<div className={classes.postsBlock}>
            <h2>My posts</h2>
        <AddMessageFormReduxForm onSubmit={AddNewPost}/>
            <div className={classes.posts}>new post</div>
            {postsElement}
        </div>)
})

type  FormPostType={
    newPostBody:string
}

const AddPostForm=(props:InjectedFormProps<FormPostType>)=>{
    return(
    <form onSubmit={props.handleSubmit}>
        <Field component={TextArea} name={'newPostBody'} placeholder={'Enter your message'}
               validate={[RequiredField,maxLength]}/>
    <div>
        <button>Add post</button>
        <button>Remove</button>
    </div>
   </form>)
}
export const AddMessageFormReduxForm = reduxForm<FormPostType>({
    form: 'ProfilePosts'
})(AddPostForm)

export default MyPosts;