import axios from "axios";
import {MeResponseType, ResultCodesEnum} from "../redux/Auth-reduser";
import {userType} from "../redux/User-reducer";
import {FormDataType} from "../components/Profile/ProfileInfo/ProfileInfo";



const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {
        "API-KEY": `db794384-dee3-4cf5-8ceb-d18f4dd3b92a` },
});
export type UserResponseType= {
    items: Array<userType>
    totalCount: number
    error: string
    resultCode: ResultCodesEnum
}

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page= ${currentPage}&count= ${pageSize}`)
            .then(response => {
                return response.data
            })
    },
    follow(userID: number){
        return  instance.post<UserResponseType>(`follow/${userID}`)
    },
    unfollow(userID: number){
        return instance.delete(`follow/${userID}`)
    },
    getProfile(userId: number){
        return ProfileAPI.getProfile(userId)
    },
}

export type ProfileResponseType ={
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string}
    photos: {
    small: string
    URL: string |null
    large: string}
}

export const ProfileAPI = {
    getProfile(userId: number) {
        return instance.get<ProfileResponseType>('profile/' + userId);
    },
    getStatus(userId: number){
        return instance.get('profile/status/' + userId);
    },
    updateStatus(status: string){
        return instance.put('profile/status', {status:status});
    },
    savePhoto(photo:any){
        const formData = new FormData()
        formData.append('image',photo)
        return instance.put('profile/photo',formData ,{headers:{'Content-Type': "multipart/form-data"}})
    },
    saveProfile(formData: FormDataType){
        return instance.put('profile', formData)
    }
}
export  type LoginMeResponseType ={
    payload :{
        userID: number
    }
    resultCode: ResultCodesEnum
    messages: Array<string>
}

export const AuthAPI ={
    me(){
        return instance.get<MeResponseType>(`auth/me`).then(res=>res.data);;
    },
    login(email: string, password: string, rememberMe:boolean = false){
        return instance.post<LoginMeResponseType>(`auth/login`,{email, password, rememberMe }).then(res=>res.data);
    },
    logout(){
        return instance.delete<MeResponseType>(`auth/login`)
    }
}