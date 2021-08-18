import React from 'react';
import {UsersPropsType} from "./UsersContainer";
import s from "./Users.module.css"


const Users = (props: UsersPropsType) => {
  if(props.usersPage.users.length === 0){
    props.setUsers(
       [ {
            id: 1,
            photoURL: "http://thepeoplesmovies.files.wordpress.com/2009/10/avatar1.jpg",
            followed: false,
            fullname: 'Dimian',
            status: "i like cheese",
            location: {
                city: "minsk",
                country: "Bellarus",
            },
        },
        {
            id: 777,
            photoURL: "http://thepeoplesmovies.files.wordpress.com/2009/10/avatar1.jpg",
            followed: true,
            fullname: 'Sveta',
            status: "i am boss",
            location: {
                city: "Kiev",
                country: "Ukraine",
            },
        },
        {
            id: 123,
            photoURL: "http://thepeoplesmovies.files.wordpress.com/2009/10/avatar1.jpg",
            followed: false,
            fullname: 'Ignat',
            status: "loving DDD",
            location: {
                city: "London",
                country: "UK",
            },
        }]
    )}

    return (
        <div>
            {
                props.usersPage.users.map(u => <div key={u.id}>
                    <span>
                        <div>
                            <img src={u.photoURL} className={s.photo}/>
                        </div>
                        <div>
                            {u.followed?
                                <button onClick={()=>{
                                    props.unfollow(u.id)}}>UnFollow</button>:
                                <button onClick={()=>{
                                    props.follow(u.id)}}>Follow</button> }
                        </div>
                    </span>
                    <span>
                        <span>
                            <div>{u.fullname}</div>
                            <div>{u.status}</div>
                        </span>
                        <span>
                            <div>{u.location.country}</div>
                            <div>{u.location.city}</div>
                        </span>
                    </span>
                </div>)
            }
        </div>
    )
};

export default Users;