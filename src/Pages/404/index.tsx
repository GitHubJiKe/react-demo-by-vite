import React from "react";
import { Result, Button } from "antd";
import { ComponentRouteProps } from "../../Routes";

export default function Page404(props: ComponentRouteProps) {
  return (
    <Result
      status="404"
      title="404"
      subTitle={__("对不起，您访问的页面不存在")}
      extra={
        <Button type="primary" onClick={() => props.history.goBack()}>
          {__("返回")}
        </Button>
      }
    />
  );
}
