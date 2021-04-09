import { Button, Space } from "antd";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Routes from "../Routes";
import Store from "../Store";
import dayjs from "dayjs";

export interface VisitData {
  age: number;
  permissions: string[];
}

function Router() {
  const history = useHistory();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 10,
          right: 10,
        }}
      >
        <Space>
          {Store.isLogined && (
            <Button
              onClick={() => {
                Store.logout().then((success) => {
                  success && history.push(Store.routePathMap.login);
                });
              }}
            >
              {__("退出")}
            </Button>
          )}
          <Button
            onClick={() => {
              Store.changeLocale(Store.locale === "cn" ? "en" : "cn");
            }}
          >
            {Store.locale === "cn" ? "简体中文" : "English"}
          </Button>
        </Space>
      </div>
      <Routes routes={Store.routes} visitData={Store.visitData} />
      <Footer />
    </div>
  );
}

export default observer(Router);

function Footer() {
  const [currentTime, setCurrentTime] = useState<string>(
    dayjs().format("YYYY-MM-DD HH:mm:ss")
  );

  useEffect(() => {
    function run() {
      let timer = setTimeout(() => {
        setCurrentTime(dayjs().format("YYYY-MM-DD HH:mm:ss"));
        clearTimeout(timer);
        // @ts-ignore
        timer = null;
        run();
      }, 1000);
    }

    run();
  }, []);

  return (
    <footer
      style={{
        position: "absolute",
        bottom: 10,
      }}
    >
      {printf(__("当前时间：%s"), currentTime)}
    </footer>
  );
}
