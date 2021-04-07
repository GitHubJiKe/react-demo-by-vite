import { Button, ButtonProps, Space } from "antd";
import React from "react";
import { Link } from "react-router-dom";

interface LinkButtonProps extends ButtonProps {
  children: React.ReactNode;
  to: string;
}

export default function LinkButton({
  children,
  to,
  ...restProps
}: LinkButtonProps) {
  return (
    <Button {...restProps}>
      <Link to={to}>{children}</Link>
    </Button>
  );
}

export interface LinkButtonItem extends ButtonProps {
  label: React.ReactNode;
  path: string;
}

function Group({ items }: { items: LinkButtonItem[] }) {
  return (
    <Space>
      {items.map(({ path, label, ...rest }, idx) => (
        <LinkButton key={idx} to={path} {...rest}>
          {label}
        </LinkButton>
      ))}
    </Space>
  );
}

LinkButton.Group = Group;
