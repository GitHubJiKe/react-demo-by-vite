import React from "react";
import { render } from "react-dom";
import { Alert, AlertProps } from "antd";
import dayjs from "dayjs";

const AlertRootId = "alert-root";

/**
 * 基于antdAlert 仿antd Notification 组件的消息通知
 */
export default function CustomAlert() {
  return null;
}

interface CustomAlertProps
  extends Pick<
    AlertProps,
    "message" | "showIcon" | "type" | "description" | "afterClose"
  > {
  /** 是否允许叠加展示 默认单个 */
  multiple?: boolean;
}

/**
 * 打开消息通知
 * @param param0
 */

CustomAlert.open = function ({
  message,
  showIcon = true,
  type,
  description,
  afterClose,
  multiple = false,
}: CustomAlertProps) {
  const id = multiple ? `${AlertRootId}-${dayjs().valueOf()}` : AlertRootId;
  let ele = multiple ? null : document.getElementById(id);

  if (!ele) {
    ele = document.createElement("div");
    ele.id = id;
    ele.className = "custom-alert-root";
    document.body.appendChild(ele);
  }

  function onClose() {
    const toRemove = document.getElementById(id);
    toRemove && document.body.removeChild(toRemove);
  }

  render(
    <Alert
      message={message}
      type={type}
      showIcon={showIcon}
      description={description}
      closable
      onClose={onClose}
      afterClose={afterClose}
    />,
    ele
  );
};
