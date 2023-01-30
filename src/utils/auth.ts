import Cookies from 'js-cookie';
import type { RouterData } from '@/types/dt';
const modules = import.meta.glob("../views/**/**.vue");
const TokenKey = 'admin_token';

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function loadDynamicRouter(router) {
  const res = [];
  for (let route of router) {
    let component = null;
    for (const componentPath in modules) {
      if (componentPath.includes(route.component)) {
        component = modules[componentPath];
      }
    }
    const data: RouterData = {
      name: route.name,
      path: route.path,
      component: component
    }
    if (route.children && route.children.length > 0) {
      data.redirect = route.children[0].path;
      data.children = loadDynamicRouter(route.children);
    }
    res.push(data)
  }
  return res;
}