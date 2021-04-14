import React, { useState } from "react";
import { Spin, Button } from "antd";
import { observer } from "mobx-react";
import Router from "./Router";
import Store from "./Store";
import CustomAlert from "./components/CustomAlert";

import "./style.scss";

function App() {
  const [count, setCount] = useState(0);
  return (
    <Spin spinning={Store.globalLoading} wrapperClassName="global-spin">
      <Router />
      <Button
        onClick={() => {
          setCount((c) => c + 1);

          CustomAlert.open({
            message: count,
            type: "success",
            multiple: true,
            description: "adasdasdasdasdasdasdasd",
          });
        }}
      >
        show Alert
      </Button>
    </Spin>
  );
}

export default observer(App);
