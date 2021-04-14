import React, { useState } from "react";

interface TestCompProps {
  data: number[];
  onClick(count: number): void;
}

function TestComp({ data, onClick }: TestCompProps) {
  const [count, setCount] = useState(0);
  return (
    <div
      onClick={() => {
        setCount((c) => c + 1);
        onClick && onClick(count);
      }}
    >
      <div className="count">{count}</div>
      {data.map((v) => (
        <Foo val={v} key={v} />
      ))}
    </div>
  );
}

export function Foo({ val }: { val: number }) {
  return <div>Foo {val}</div>;
}

export default TestComp;
