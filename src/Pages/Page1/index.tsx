import { Space } from "antd";
import React from "react";
import { LinkButton } from "../../components";
import Store from "../../Store";

export default function Page1() {
  return (
    <Space>
      <LinkButton to={Store.routePathMap.page2}>Go to Page2</LinkButton>
      <LinkButton to={Store.routePathMap.home}>Go to Home</LinkButton>
    </Space>
  );
}
