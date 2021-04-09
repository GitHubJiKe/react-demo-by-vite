import { Button, Result } from "antd";
import React from "react";

interface ErrorBoxProps {
  error: Error;
  btnText?: string;
  onClick?: () => void;
}

export default function ErrorBox({
  error,
  btnText = __("重试"),
  onClick,
}: ErrorBoxProps) {
  const extra =
    btnText || onClick
      ? [
          <Button
            key="error-btn"
            type="primary"
            onClick={() => {
              onClick && onClick();
            }}
          >
            {btnText}
          </Button>,
        ]
      : null;
  return (
    <Result
      title="Error"
      subTitle={error.message}
      status="error"
      extra={extra}
    />
  );
}
