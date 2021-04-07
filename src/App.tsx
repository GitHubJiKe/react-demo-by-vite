import { Spin } from "antd";
import { Observer } from "mobx-react";
import React from "react";
import Router from "./Router";
import Store from "./Store";

import "./style.scss";

export default function App() {
  return (
    <Observer>
      {() => {
        return (
          <Spin spinning={Store.globalLoading} wrapperClassName="global-spin">
            <Router />
          </Spin>
        );
      }}
    </Observer>
  );
}
