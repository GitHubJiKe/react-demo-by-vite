import React from "react";
import { LinkButton } from "../../components";
import { LinkButtonItem } from "../../components/LinkButton";
import Store from "../../Store";

export default function PageHome() {
  const buttons: LinkButtonItem[] = [
    {
      path: Store.routePathMap.page1,
      label: __("前往第一页"),
      type: "primary",
    },
    { path: Store.routePathMap.page2, label: __("前往第二页") },
  ];
  return (
    <>
      <LinkButton.Group items={buttons} />
      <div>
        {sprintf(
          __("我是一段奇怪的带有色彩的文案：%s，怎么样？"),
          <span style={{ color: "red" }}>{__("彩色的文案内容")}</span>
        )}
      </div>
    </>
  );
}
