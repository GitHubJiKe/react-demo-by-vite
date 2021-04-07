import { Button } from "antd";
import React, { ReactNode } from "react";
import { useHistory } from "react-router";
import Store from "../Store";

import "./style.scss";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const history = useHistory();
  return (
    <div className="layout-root">
      {Store.isLogined && (
        <Button
          style={{ position: "absolute", top: 10, right: 10 }}
          onClick={() => {
            Store.logout().then(() => {
              history.push(Store.routePathMap.login);
            });
          }}
        >
          Logout
        </Button>
      )}
      {children}
    </div>
  );
}
