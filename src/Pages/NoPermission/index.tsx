import React from "react";
import { Result, Button } from "antd";
import { ComponentRouteProps } from "../../Routes";

export default function PageNoPermission(props: ComponentRouteProps) {
  return (
    <Result
      status="403"
      title="No Permission"
      subTitle="Sorry, you have no permission to access this page."
      extra={
        <Button type="primary" onClick={() => props.history.goBack()}>
          Go Back
        </Button>
      }
    />
  );
}
