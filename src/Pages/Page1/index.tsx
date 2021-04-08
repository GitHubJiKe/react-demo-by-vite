import { Space } from "antd";
import React from "react";
import { LinkButton } from "../../components";
import Store from "../../Store";

export default function Page1() {
  return (
    <Space>
      <LinkButton to={Store.routePathMap.page2}>{__("前往第二页")}</LinkButton>
      <LinkButton to={Store.routePathMap.home}>{__("回到首页")}</LinkButton>
      <LinkButton to={Store.routePathMap.page3}>{__("前往第三页")}</LinkButton>
    </Space>
  );
}
