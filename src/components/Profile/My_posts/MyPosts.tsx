import React from "react";
import s from './My_posts.module.css'
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

    return (<div className={s.postContainer}>
            <h2>Posts</h2>
        <AddMessageFormReduxForm onSubmit={AddNewPost}/>
            {postsElement}
        </div>)
})

type  FormPostType={
    newPostBody:string
}

const AddPostForm=(props:InjectedFormProps<FormPostType>)=>{
    return(
    <form onSubmit={props.handleSubmit} className={s.widthTextAria}>
        <Field component={TextArea} name={'newPostBody'} placeholder={'Enter new post'}
               validate={[RequiredField,maxLength]}/>

        <button className={s.addPostBtn}>Add post</button>
   </form>)
}
export const AddMessageFormReduxForm = reduxForm<FormPostType>({
    form: 'ProfilePosts'
})(AddPostForm)

export default MyPosts;