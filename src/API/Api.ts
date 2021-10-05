import axios from "axios";
import {MeResponseType, ResultCodesEnum} from "../redux/Auth-reduser";
import {userType} from "../redux/User-reducer";


const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {
        "API-KEY": `4b54f94c-27d6-4b20-ab86-b5bac951f8ff` },
});
export type UserResponseType= {
    items: Array<userType>
    totalCount: number
    error: string
    resultCode: ResultCodesEnum
}

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get<UserResponseType>(`users?page= ${currentPage}&count= ${pageSize}`)
            .then(response => {
                return response.data
            })
    },
    follow(userID: number){
        return  instance.post(`follow/${userID}`)
    },
    unfollow(userID: number){
        return instance.delete(`follow/${userID}`)
    },
    getProfile(userId: string){
        return ProfileAPI.getProfile(userId)
    },
}

export const ProfileAPI = {
    getProfile(userId: string) {
        return instance.get('profile/' + userId);
    },
    getStatus(userId: string){
        return instance.get('profile/status/' + userId);
    },
    updateStatus(status: string){
        return instance.put('profile/status/'+ {status:status});
    }
}

export const AuthAPI ={
    me(){
        return instance.get<MeResponseType>(`auth/me`)
    }
}