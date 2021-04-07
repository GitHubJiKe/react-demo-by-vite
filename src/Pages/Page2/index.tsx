import { Space } from "antd";
import React from "react";
import { LinkButton } from "../../components";
import Store from "../../Store";

export default function Page2() {
  return (
    <Space>
      <LinkButton to={Store.routePathMap.page1}>Go to Page1</LinkButton>
      <LinkButton to={Store.routePathMap.home}>Go to Home</LinkButton>
    </Space>
  );
}
