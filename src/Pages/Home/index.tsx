import React from "react";
import { LinkButton } from "../../components";
import { LinkButtonItem } from "../../components/LinkButton";
import Store from "../../Store";

export default function PageHome() {
  const buttons: LinkButtonItem[] = [
    { path: Store.routePathMap.page1, label: "Go to Page1", type: "primary" },
    { path: Store.routePathMap.page2, label: "Go to Page2" },
  ];
  return <LinkButton.Group items={buttons} />;
}
