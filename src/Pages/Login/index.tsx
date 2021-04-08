import { Button, Input, Form } from "antd";
import React from "react";
import { useHistory } from "react-router";
import Store from "../../Store";

const FormItem = Form.Item;

import "./style.scss";

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

export default function Login() {
  const history = useHistory();
  return (
    <Form
      {...layout}
      name="login"
      onFinish={(values) => {
        Store.login(values).then((success) => {
          if (success) {
            history.push(Store.routePathMap.home);
          }
        });
      }}
    >
      <div className="login-page">
        <h3 className="title">{__("登录")}</h3>
        <FormItem
          label={__("用户名")}
          labelAlign="left"
          name="username"
          rules={[{ required: true, message: __("请输入用户名") }]}
        >
          <Input type="text" placeholder={__("请输入用户名")} />
        </FormItem>
        <FormItem
          label={__("密码")}
          labelAlign="left"
          name="password"
          rules={[{ required: true, message: __("请输入密码") }]}
        >
          <Input.Password placeholder={__("请输入密码")} />
        </FormItem>
        <Button type="primary" className="login-btn" htmlType="submit">
          {__("登录")}
        </Button>
      </div>
    </Form>
  );
}
