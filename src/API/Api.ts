import * as axios from "axios";

//@ts-ignore
const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {
        "API-KEY": `4b54f94c-27d6-4b20-ab86-b5bac951f8ff` },
});

//@ts-ignore
export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page= ${currentPage}&count= ${pageSize}`)
            //@ts-ignore
            .then(response => {
                return response.data
            })
    }
}