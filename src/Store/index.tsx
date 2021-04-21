import { observable, action, makeObservable } from "mobx";
import { VisitData } from "../Router";
import {
  Page1,
  Page2,
  Page404,
  PageNoPermission,
  PageHome,
  PageLogin,
  Page3,
} from "../Pages";
import { IRouteProps } from "../Routes";
import { Loading } from "../components";
import http from "../utils/http";
import API from "../utils/API";
import { LoginRes } from "./config";

export const routePathMap = {
  "404": "/404",
  no_permission: "/no-permission",
  page1: "/page1",
  page2: "/page2",
  page3: "/page3",
  home: "/home",
  login: "/login",
};

const routes: IRouteProps[] = [
  {
    component: Page404,
    path: routePathMap["404"],
    key: "404",
  },
  {
    component: PageNoPermission,
    path: routePathMap.no_permission,
    key: "no_permission",
  },
  {
    component: Page1,
    path: routePathMap.page1,
    key: "page1",
  },
  {
    component: PageHome,
    path: routePathMap.home,
    key: "home",
  },
  {
    component: PageLogin,
    path: routePathMap.login,
    key: "login",
    exact: true,
  },
  {
    component: Page2,
    path: routePathMap.page2,
    key: "page2",
    visitable: (data: VisitData) =>
      data.age > 28 && data.permissions.includes("page2"),
    redirect: (data: VisitData) =>
      data.permissions.includes("page2") ? "/404" : "/no-permission",
  },
  {
    component: Page3,
    path: routePathMap.page3,
    key: "page3",
    visitable: (data: VisitData) => data.permissions.includes("page3"),
    redirect: routePathMap.no_permission,
  },
];

const VISIT_DATA = "VISIT_DATA";
const LOGINED = "LOGINED";
const LOCALE = "LOCALE";

class AppStore {
  @observable visitData?: VisitData;
  @observable routes: IRouteProps[] = routes;
  routePathMap = routePathMap;
  @observable isLogined: boolean = false;
  @observable globalLoading: boolean = false;
  @observable locale: Locale = "en";
  @observable token: string = "";

  constructor() {
    makeObservable(this);
    const dataStr = sessionStorage.getItem(VISIT_DATA);
    const loginStr = sessionStorage.getItem(LOGINED);
    const localeStr = sessionStorage.getItem(LOCALE);
    if (dataStr) {
      this.visitData = JSON.parse(dataStr);
    }

    if (loginStr) {
      this.isLogined = loginStr === "true";
    }

    if (localeStr) {
      this.locale = localeStr as Locale;
    }

    this.routes.forEach((route) => {
      if (!route.visitable && route.key !== "login") {
        route.visitable = () => this.isLogined;
      }
    });
  }

  @action
  initApp() {
    // 网络请求 获取信息 修改路由配置等操作

    return new Promise((resolve) => {
      resolve(this.isLogined);
    });
  }

  @action
  login(data: any) {
    Loading.global(true);
    return new Promise((resolve, reject) => {
      http
        .post<LoginRes>(API.login.login(), data)
        .then((res) => {
          const { data } = res;
          this.isLogined = data.data.scuuess;
          this.visitData = data.data.visitData || { age: 0, permissions: [] };
          sessionStorage.setItem(VISIT_DATA, JSON.stringify(this.visitData));
          sessionStorage.setItem(LOGINED, `${data.data.scuuess}`);
          Loading.global(false);
          resolve(data.data.scuuess);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  @action
  logout() {
    return new Promise((resolve) => {
      this.isLogined = false;
      sessionStorage.clear();

      resolve(true);
    });
  }

  @action
  changeLocale(locale: Locale) {
    this.locale = locale;

    sessionStorage.setItem(LOCALE, locale);
  }

  @action setToken(token: string) {
    this.token = token;
  }

  @action loading(loading: boolean) {
    this.globalLoading = loading;
  }
}

const Store = new AppStore();

// @ts-ignore
window.store = Store;

export default Store;
