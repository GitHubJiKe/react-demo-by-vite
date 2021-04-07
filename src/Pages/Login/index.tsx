import { Button, Input, Form } from "antd";
import React from "react";
import { useHistory } from "react-router";
import Store from "../../Store";

const FormItem = Form.Item;

import "./style.scss";

export default function Login() {
  const history = useHistory();
  return (
    <Form
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
        <h3 className="title">Login</h3>
        <FormItem
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input type="text" placeholder="Please input your username!" />
        </FormItem>
        <FormItem
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder="Please input your password!" />
        </FormItem>
        <Button type="primary" className="login-btn" htmlType="submit">
          Login
        </Button>
      </div>
    </Form>
  );
}
