import { Tabs, Avatar, List, Button, Menu, MenuProps, Col, Row } from "antd";

const { TabPane } = Tabs;
import React, { useState } from "react";
import Input from "antd/es/input/Input";
import {
  ContainerOutlined,
  DesktopOutlined,
  PieChartOutlined,
} from "@ant-design/icons";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group",
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("normal", "normal", <PieChartOutlined />),
  getItem("compare", "compare", <DesktopOutlined />),
  getItem("", "replay", <ContainerOutlined />),
  getItem("", "setting", <ContainerOutlined />),
];

const Collection = () => {
  return <div className={'collection'}>

      <div>
        <Menu
          inlineCollapsed={true}
          activeKey="normal"
        mode="vertical"
        items={items}
      /></div>
      <div className={'right'}> <Input placeholder={'搜索'}/>
        <Tabs defaultActiveKey="2" onChange={()=>{}}>
          <TabPane tab="我的集合" key="2">我的集合</TabPane>
          <TabPane tab="团队集合" key="1">团队集合</TabPane>
        </Tabs></div>

  </div>;
};

export default Collection;
