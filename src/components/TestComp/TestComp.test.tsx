import React from "react";
import TestComp, { Foo } from "./TestComp";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import sinon from "sinon";

const data = [1, 2, 3, 4];
const onClick = sinon.spy();

describe("render a TestComp and click to change count", () => {
  const comp = shallow(<TestComp data={data} onClick={onClick} />);
  comp.simulate("click"); // 模拟点击事件
  comp.simulate("click");
  comp.simulate("click");

  it("renders an `.count`", () => {
    //   查找组件内的某个子节点存在与否
    expect(comp.find(".count")).toHaveLength(1);
  });

  it("count value equals 3", () => {
    //   以及判断子节点的内容是什么
    expect(comp.find(".count").text()).toEqual("3");
  });

  it(`TestComp should has ${data.length} Foo Child`, () => {
    // 组件应该有多少个某个子组件
    expect(comp.find(Foo)).toHaveLength(data.length);
  });

  it("onClick func has been called 3 times", () => {
    //   某事件被调用了多少次
    expect(onClick).toHaveProperty("callCount", 3);
  });
});

test("TestComp should be these:", () => {
  const renderComp = renderer.create(
    <TestComp data={data} onClick={onClick} />
  );

  const json = renderComp.toJSON();

  expect(json).toMatchSnapshot();
});
