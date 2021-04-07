import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

import "antd/dist/antd.css";
import { MobXProviderContext } from "mobx-react";
import Store from "./Store";

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
