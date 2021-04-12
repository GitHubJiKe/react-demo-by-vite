function genUrlStructure(url: string): URLStructure {
  const pathname = (...args: any[]) => {
    let res = "";
    let idx = 0;
    res = url.replace(/:[^/]+/gi, (match) => {
      const arg = args[idx++];
      return arg ? arg : match;
    });

    return res;
  };

  return pathname;
}

const API = {
  login: {
    login: "/api/login",
    logout: "/api/logout",
  },
  page1: {
    list: "/page1/list",
  },
  page2: {
    list: "/page2/list",
  },
  page3: {
    list: "/page3/list",
  },
  home: {
    /** 首页的数据列表 */
    list: "/home/list/:id/:name",
    data: {
      list: "/home/data/list",
    },
  },
};

interface URLStructure {
  (...args: Array<string | number>): string;
}

type APIObj<T> = {
  [P in keyof T]: T[P] extends object ? APIObj<T[P]> : URLStructure;
};

type APIPicker<T extends { [P: string]: any }> = {
  [P in keyof T]: APIObj<T[P]>;
};

type APIInstance = APIPicker<typeof API>;

(function createAPIInstance() {
  function createUrl(obj: any) {
    Object.keys(obj).forEach((key) => {
      if (typeof obj[key] === "string") {
        obj[key] = genUrlStructure(obj[key]);
        return;
      }

      createUrl(obj[key]);
    });
  }

  createUrl(API);
})();

export default (API as unknown) as APIInstance;
