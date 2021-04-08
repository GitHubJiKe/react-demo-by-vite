import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { MobXProviderContext } from "mobx-react";
import Store from "./Store";
import { __, printf, sprintf } from "./utils/i18n";
import "antd/dist/antd.css";

(function () {
  // 挂载全局函数
  window.__ = __;
  window.printf = printf;
  window.sprintf = sprintf;
})();

ReactDOM.render(
  <React.StrictMode>
    <MobXProviderContext.Provider value={Store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MobXProviderContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
