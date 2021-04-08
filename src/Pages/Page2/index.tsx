import { Space } from "antd";
import React from "react";
import { LinkButton } from "../../components";
import Store from "../../Store";

export default function Page2() {
  return (
    <Space>
      <LinkButton to={Store.routePathMap.page1}>{__("前往第一页")}</LinkButton>
      <LinkButton to={Store.routePathMap.home}>{__("回到首页")}</LinkButton>
    </Space>
  );
}
