import React, { Suspense } from "react";
import { Spin } from "antd";
import { observer } from "mobx-react";
import Router from "./Router";
import Store from "./Store";
import { ErrorBoundary } from "./components";

import "./style.scss";

function App() {
  return (
    <ErrorBoundary>
      <Suspense
        fallback={<Spin spinning={true} wrapperClassName="global-spin" />}
      >
        <Spin spinning={Store.globalLoading} wrapperClassName="global-spin">
          <Router />
        </Spin>
      </Suspense>
    </ErrorBoundary>
  );
}

export default observer(App);
