import { Button } from "antd";
import React, { useState } from "react";
import { ErrorBox, LinkButton, withPermissions } from "../../components";
import { LinkButtonItem } from "../../components/LinkButton";
import useFetch from "../../hooks/useFetch";
import Store from "../../Store";
import API from "../../utils/API";

interface IData {
  text: string;
}

export default function PageHome() {
  const [count, setCount] = useState(0);
  const buttons: LinkButtonItem[] = [
    {
      path: Store.routePathMap.page1,
      label: __("前往第一页"),
      type: "primary",
    },
    { path: Store.routePathMap.page2, label: __("前往第二页") },
  ];

  const { data, error, fetchData } = useFetch<IData>(
    {
      method: "get",
      url: API.home.list(111, "xxx"),
      params: { age: 26 },
    },
    [count]
  );

  if (error) {
    return <ErrorBox error={error} onClick={fetchData} />;
  }

  return (
    <>
      <LinkButton.Group items={buttons} />
      <Button onClick={fetchData}>fetch Data manual</Button>
      <Button
        onClick={() => {
          setCount((c) => c + 1);
        }}
      >
        changeCount to fetch Data
      </Button>
      {data?.text}
      <Colorful />
    </>
  );
}

function ColorfulText() {
  return (
    <div>
      {sprintf(
        __("我是一段奇怪的带有色彩的文案：%s，怎么样？"),
        <span style={{ color: "red" }}>{__("彩色的文案内容")}</span>
      )}
    </div>
  );
}

const Colorful = withPermissions(ColorfulText, ["page2"]);
