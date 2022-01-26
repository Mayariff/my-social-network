import React from 'react';
import {userType} from "../../redux/User-reducer";
import User from "./User";


type propsType = {
    users: Array<userType>
    onPageChanged: (pageNumber: number) => void
    unfollow: (userID: number) => void
    follow: (userID: number) => void
    followingInProgress : Array<number>

}
const Users = ({unfollow,follow,followingInProgress, users}: propsType) => {

    return (<div>
            {users.map(u => <User key={u.id}
                                           user={u}
                                           unfollow={unfollow}
                                           follow={follow}
                                           followingInProgress={followingInProgress} />)
            }
        </div>
    );
};
export default Users;