import React from "react";
import { Result, Button } from "antd";
import { ComponentRouteProps } from "../../Routes";

export default function PageNoPermission(props: ComponentRouteProps) {
  return (
    <Result
      status="403"
      title={__("暂无权限")}
      subTitle={__("对不起，您暂无权限访问此页面")}
      extra={
        <Button type="primary" onClick={() => props.history.goBack()}>
          {__("返回")}
        </Button>
      }
    />
  );
}
