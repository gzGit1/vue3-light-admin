import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { postDataInfo } from '@/api/http';
import { setToken } from '@/utils/auth'
export const useUserStore = defineStore('userInfo', () => {
    const userInfo = reactive<any>({});
    const tokeInfo = reactive<any>({});
    function setTokenInfo(val) {
        Object.assign(tokeInfo, val);
    }
    async function setUserInfo() {
        let res = await postDataInfo('/user/userForPost');
        if (res.status == 200 && res.data) {
            Object.assign(userInfo, res.data);
        }
    }
    async function userLogin(username:string, password:string) {
        let res = await postDataInfo(
            "/oauth/token",
            {
                username: username,
                password: password,
                grant_type: "password",
            },
            true
        );
        if (res.status == 200 && res.data) {
            const { access_token } = res.data;
            setTokenInfo(res.data);
            setUserInfo();
            setToken(access_token);
            return res.data;
        }
    }
    async function getRouterInfo(){
        return [];
    }
    return {
        userInfo,
        tokeInfo,
        setUserInfo,
        setTokenInfo,
        userLogin,
        getRouterInfo
    }
});

