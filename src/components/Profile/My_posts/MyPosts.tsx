import React, {ChangeEventHandler, useState} from "react";
import s from './My_posts.module.css'
import Post from "./Post/Post";
import {MyPostsType} from "./MyPostsContainer";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {MaxLenghtCreator, RequiredField} from "../../../utilits/valid";
import {TextArea} from "../../common/formControls/formControls";



let maxLength = MaxLenghtCreator(30);

const  MyPosts= React.memo((props: MyPostsType) =>{


   const postsElement= props.posts.map((p: any) =>
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
    const[count, setCount] =useState<number>(0)

    const onchangeHandler:ChangeEventHandler<HTMLInputElement>  = (e) => {
        setCount (e.currentTarget.value.length)
    }
    const btnStyle =  count >30? `${s.addPostBtn} ${s.disabled}`: s.addPostBtn

    return(
    <form onSubmit={props.handleSubmit} className={s.widthTextAria}>
        <Field component={TextArea} name={'newPostBody'} placeholder={'Enter new post'}
               validate={[RequiredField,maxLength]} onChange={onchangeHandler} />
    <div className={s.postLength}>{count}/30</div>
        <button className={btnStyle} disabled={count >30}>Add post</button>
   </form>)
}
export const AddMessageFormReduxForm = reduxForm<FormPostType>({
    form: 'ProfilePosts'
})(AddPostForm)

export default MyPosts;