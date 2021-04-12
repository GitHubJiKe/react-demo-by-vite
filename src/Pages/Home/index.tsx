import { Button } from "antd";
import React, { useState } from "react";
import { ErrorBox, LinkButton, withPermissions } from "../../components";
import { LinkButtonItem } from "../../components/LinkButton";
import withPreload from "../../components/withPreload";
import useFetch from "../../hooks/useFetch";
import Store from "../../Store";
import API from "../../utils/API";

interface IData {
  name: string;
  age: number;
  id: number;
}

interface IHomeDataList {
  name: string;
}
interface IPageHomeProps {
  data: IHomeDataList;
}

function PageHome({ data: homeData }: IPageHomeProps) {
  const [count, setCount] = useState(0);
  const buttons: LinkButtonItem[] = [
    {
      path: Store.routePathMap.page1,
      label: __("前往第一页"),
      type: "primary",
    },
    { path: Store.routePathMap.page2, label: __("前往第二页") },
  ];

  const { data, error, fetchData } = useFetch<IData[]>(
    {
      method: "get",
      url: API.home.list(111, "xxx"),
      params: { age: 26 },
      useCache: true,
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
      {data?.map((d) => (
        <div key={d.id}>
          name:{d.name} ;age:{d.age}
        </div>
      ))}
      <Colorful text={homeData.name} />
    </>
  );
}

function ColorfulText({ text }: { text: string }) {
  return (
    <div>
      {sprintf(
        __("我是一段奇怪的带有色彩的文案：%s，怎么样？"),
        <span style={{ color: "red" }}>{text}</span>
      )}
    </div>
  );
}

const Colorful = withPermissions(ColorfulText, ["page2"]);

export default withPreload<IHomeDataList, IPageHomeProps>(
  {
    loader: () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ name: "home page data" });
        }, 2000);
      });
    },
  },
  PageHome
);
