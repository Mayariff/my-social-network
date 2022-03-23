import React from "react";
import s from './Post.module.css'
import {postType} from "../../../../redux/Profile-reducer";
import {useSelector} from "react-redux";
import {AppStateType} from "../../../../redux/redux-store";
import userImg from '../../../../assets/image/user.png'
import likeImg from '../../../../assets/image/heart_favourite_love_like_icon_159300.png'


const Post = (props: postType) => {
    const avatar = useSelector<AppStateType, string | undefined>(state => state.profilePage.profile.photos?.large)
    const imgAvatar = avatar ? avatar : userImg
    const likeCount = props.likesCount ? props.likesCount : 0

    return (
        <div className={s.post}>
            <div>
                <img src={imgAvatar} alt="avatar1" className={s.avatarImg}/>
            </div>

            <div className={s.postText}>

                {props.content}

                <div className={s.like}>
                    <img src={likeImg} alt={'likes'} className={s.likeImg}/>
                    <span> Likes: {likeCount} </span>{props.likesCount}
                </div>
            </div>

        </div>)
}
export default Post;