import React, { useState } from "react";
import { Spin, Button } from "antd";
import { observer } from "mobx-react";
import Router from "./Router";
import Store from "./Store";
import CustomAlert from "./components/CustomAlert";
import { useSpring, animated } from "react-spring";

import "./style.scss";

function InnerText() {
  const props = useSpring({ number: 1, from: { number: 0 } });
  return <animated.span>{props.number}</animated.span>;
}

function App() {
  const [count, setCount] = useState(0);
  return (
    <Spin spinning={Store.globalLoading} wrapperClassName="global-spin">
      <InnerText />
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
