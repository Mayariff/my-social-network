import axios, {AxiosResponse} from "axios";
import {MeResponseType, ResultCodesEnum} from "../redux/Auth-reduser";
import {UsersPropsType} from "../components/Users/UsersContainer";
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
        return instance.get('profile/'+userId);
    },
}

export const AuthAPI ={
    me(){
        return instance.get<MeResponseType>(`auth/me`)
    }
}