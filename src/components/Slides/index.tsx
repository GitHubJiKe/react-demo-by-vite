import React, { useState } from "react";
import { useTransition, animated } from "react-spring";

import "./style.scss";

const Page = ({
  style,
  children,
}: {
  style: any;
  children: React.ReactNode;
}) => <animated.div style={style}>{children}</animated.div>;

export default function Slides() {
  const [index, set] = useState(0);
  const onClick = () => set((state) => (state + 1) % 3);

  const transition = useTransition(index, {
    from: { opacity: 0, transform: "translate3d(100%,0,0)" },
    enter: { opacity: 1, transform: "translate3d(0%,0,0)" },
    leave: { opacity: 0, transform: "translate3d(-50%,0,0)" },
  });

  const getBgColor = (item: number) => {
    if (item === 0) {
      return "blue";
    }

    if (item === 1) {
      return "red";
    }

    if (item === 2) {
      return "yellow";
    }
  };

  return (
    <div onClick={onClick} className="slides-root">
      {transition((style, item) => {
        return (
          <Page
            style={{ ...style, backgroundColor: getBgColor(item) }}
            key={item}
          >
            {item}
          </Page>
        );
      })}
    </div>
  );
}
