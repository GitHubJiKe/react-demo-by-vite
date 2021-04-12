import React from "react";
import { LinkButton } from "../../components";
import Store from "../../Store";

export default function Page3() {
  return (
    <LinkButton.Group
      items={[
        { label: __("前往第三页"), path: Store.routePathMap.page3 },
        { label: __("回到首页"), path: Store.routePathMap.home },
      ]}
    />
  );
}
