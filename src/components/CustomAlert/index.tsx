import React from "react";
import { render } from "react-dom";
import { Alert, AlertProps } from "antd";
import dayjs from "dayjs";

import "./style.scss";

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
  /** 是否允许叠加展示 */
  multiple?: boolean;
  /** 默认3000毫秒自动关闭 如果autoClose开启的话 */
  duration?: number;
  /** 自动关闭 */
  autoClose?: boolean;
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
  multiple = true,
  duration = 3000,
  autoClose = false,
}: CustomAlertProps) {
  const id = multiple ? `${AlertRootId}-${dayjs().valueOf()}` : AlertRootId;
  let ele = multiple ? null : document.getElementById(id);
  let timer: any;
  if (!multiple && timer) {
    return;
  }

  if (!ele) {
    ele = document.createElement("div");
    ele.id = id;
    ele.className = "custom-alert-root";
    document.body.appendChild(ele);
  }

  if (autoClose) {
    timer = setTimeout(onClose, duration);
  }

  function onClose() {
    const toRemove = document.getElementById(id);
    toRemove && document.body.removeChild(toRemove);
    clearTimeout(timer);
    timer = null;
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
