import { observable, action, makeObservable } from "mobx";
import { VisitData } from "../Router";
import {
  Page1,
  Page2,
  Page404,
  PageNoPermission,
  PageHome,
  PageLogin,
} from "../Pages";
import { IRouteProps } from "../Routes";
import { Loading } from "../components";

export const routePathMap = {
  "404": "/404",
  no_permission: "/no-permission",
  page1: "/page1",
  page2: "/page2",
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
];

const VISIT_DATA = "VISIT_DATA";
const LOGINED = "LOGINED";

class AppStore {
  @observable visitData?: VisitData;
  @observable routes: IRouteProps[] = routes;
  routePathMap = routePathMap;
  @observable isLogined: boolean = false;
  @observable globalLoading: boolean = false;

  constructor() {
    makeObservable(this);
    const dataStr = sessionStorage.getItem(VISIT_DATA);
    const loginStr = sessionStorage.getItem(LOGINED);
    if (dataStr) {
      this.visitData = JSON.parse(dataStr);
    }

    if (loginStr) {
      this.isLogined = loginStr === "true";
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
    return new Promise((resolve) => {
      console.log(data);
      setTimeout(() => {
        this.isLogined = true;
        this.visitData = { age: 25, permissions: ["page2"] };
        sessionStorage.setItem(VISIT_DATA, JSON.stringify(this.visitData));
        sessionStorage.setItem(LOGINED, "true");
        Loading.global(false);
        resolve(true);
      }, 2000);
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
}

const Store = new AppStore();

// @ts-ignore
window.store = Store;

export default Store;
