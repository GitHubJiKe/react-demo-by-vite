import React, { useState } from "react";
import { Button, Col, DatePicker, Input, message, Row, Space } from "antd";
import { ErrorBox, LinkButton, withPermissions } from "../../components";
import { LinkButtonItem } from "../../components/LinkButton";
import withPreload from "../../components/withPreload";
import useFetch from "../../hooks/useFetch";
import Store from "../../Store";
import API from "../../utils/API";
import { FormItem, Form, withForm, $Formutil } from "react-antd-formutil";
import dayjs, { Dayjs } from "dayjs";
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

  //   const { data, error, fetchData } = useFetch<IData[]>(
  //     {
  //       url: API.home.list(111, "xxx"),
  //       params: { age: 26 },
  //       useCache: true,
  //       immediatelyFetch: false,
  //     },
  //     [count]
  //   );

  //   if (error) {
  //     return <ErrorBox error={error} onClick={fetchData} />;
  //   }

  return (
    <>
      <TestForm />
      <TestForm2 />
      <LinkButton.Group items={buttons} />
      {/* <Button onClick={fetchData}>fetch Data manual</Button> */}
      <Button
        onClick={() => {
          setCount((c) => c + 1);
        }}
      >
        changeCount to fetch Data
      </Button>
      {/* {data?.map((d) => (
        <div key={d.id}>
          name:{d.name} ;age:{d.age}
        </div>
      ))} */}
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

interface IFormData {
  name: string;
  birthday: string;
}

function TestForm() {
  return (
    <Form<IFormData>>
      {($formutil) => {
        return (
          <>
            <Row gutter={24}>
              <Col span={16}>
                <FormItem
                  name="name"
                  label="姓名"
                  required
                  validMessage={{
                    required: "姓名不得为空",
                  }}
                >
                  <Input allowClear placeholder="请输入姓名" />
                </FormItem>
              </Col>
              <Col span={16}>
                <FormItem
                  name="birthday"
                  label="生日"
                  required
                  validMessage={{
                    required: "生日不得为空",
                  }}
                  $parser={(value) => (value ? value.format("YYYY-MM-DD") : "")}
                  $formatter={(value) => value && dayjs(value)}
                >
                  <DatePicker
                    format="YYYY-MM-DD"
                    style={{ width: "100%" }}
                    placeholder="请选择生日"
                  />
                </FormItem>
              </Col>
            </Row>
            <Space>
              <Button
                onClick={() => {
                  $formutil.$reset();
                }}
              >
                取消
              </Button>
              <Button
                type="primary"
                onClick={() => {
                  if ($formutil.$invalid) {
                    return $formutil.$batchDirty($formutil.$getFirstError());
                  }
                  console.log($formutil.$params.name);
                  console.log($formutil.$params.birthday);
                }}
              >
                提交
              </Button>
            </Space>
          </>
        );
      }}
    </Form>
  );
}

interface ITestFormData {
  $formutil: $Formutil<IFormData>;
}

const TestForm2 = withForm(({ $formutil }: ITestFormData) => {
  return (
    <>
      <Row gutter={24}>
        <Col span={16}>
          <FormItem
            name="name"
            label="姓名"
            required
            validMessage={{
              required: "姓名不得为空",
            }}
          >
            <Input allowClear placeholder="请输入姓名" />
          </FormItem>
        </Col>
        <Col span={16}>
          <FormItem
            name="birthday"
            label="生日"
            required
            validMessage={{
              required: "生日不得为空",
            }}
            $parser={(value) => (value ? value.format("YYYY-MM-DD") : "")}
            $formatter={(value) => value && dayjs(value)}
          >
            <DatePicker
              format="YYYY-MM-DD"
              style={{ width: "100%" }}
              placeholder="请选择生日"
            />
          </FormItem>
        </Col>
      </Row>
      <Space>
        <Button
          onClick={() => {
            $formutil.$reset();
          }}
        >
          取消
        </Button>
        <Button
          type="primary"
          onClick={() => {
            if ($formutil.$invalid) {
              return $formutil.$batchDirty($formutil.$getFirstError());
            }
            console.log($formutil.$params.name);
            console.log($formutil.$params.birthday);
          }}
        >
          提交
        </Button>
      </Space>
    </>
  );
});
