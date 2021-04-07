import { Button } from "antd";
import { observer } from "mobx-react";
import React from "react";
import { useHistory } from "react-router";
import Routes from "../Routes";
import Store from "../Store";

export interface VisitData {
  age: number;
  permissions: string[];
}

function Router() {
  const history = useHistory();
  return (
    <div>
      <div
        style={{
          position: "absolute",
          top: 10,
          right: 10,
        }}
      >
        {Store.isLogined && (
          <Button
            onClick={() => {
              Store.logout().then((success) => {
                success && history.push(Store.routePathMap.login);
              });
            }}
          >
            Logout
          </Button>
        )}
      </div>
      <Routes routes={Store.routes} visitData={Store.visitData} />
    </div>
  );
}

export default observer(Router);
