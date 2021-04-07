import React from "react";
import { Result, Button } from "antd";
import { ComponentRouteProps } from "../../Routes";

export default function Page404(props: ComponentRouteProps) {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={() => props.history.goBack()}>
          Go Back
        </Button>
      }
    />
  );
}
