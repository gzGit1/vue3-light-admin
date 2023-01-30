import router from './router';
import type { RouteLocationNormalized } from "vue-router";
import { useUserStore } from "@/stores/modules/user";
import { getToken, removeToken } from '@/utils/auth';
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

const whiteList = ['/', '/register'] // no redirect whitelist

NProgress.configure({ showSpinner: false }) // NProgres s Configuration

router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
    NProgress.start()
    const { userInfo, setUserInfo, getRouterInfo } = useUserStore();
    let token = getToken();
    // 已经登录有token
    if (token) {
        // 获取用户信息,
        let username = userInfo.userName;
        if (!username) {
            try {
                await setUserInfo();
                let permissionRouter = await getRouterInfo();
                if (permissionRouter && permissionRouter.length > 0) {
                    permissionRouter.forEach(val => {
                        router.addRoute(val);
                    });
                    router.replace(to.path)
                }
            } catch (error) {
                NProgress.done()
                removeToken();
                return { name: 'login' }
            }
        } 
    } else {
        // 如果没有登录
        // 1.如果访问的地址是白名单直接进去
        // 2.如果不是白名单跳出
        if (whiteList.indexOf(to.path) == -1) {
            return { name: 'login' }
        }
    }
})

router.afterEach(() => {
    // finish progress bar
      NProgress.done()
})
