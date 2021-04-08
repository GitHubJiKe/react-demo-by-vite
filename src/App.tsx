import { Spin } from "antd";
import { observer } from "mobx-react";
import React from "react";
import Router from "./Router";
import Store from "./Store";

import "./style.scss";

function App() {
  return (
    <Spin spinning={Store.globalLoading} wrapperClassName="global-spin">
      <Router />
    </Spin>
  );
}

export default observer(App);
