import React, { useState } from "react";
import { useMount } from "ahooks";
import DraggableLayout from "./DraggableLayout";
import Header from "../components/Header";
import { Menu, MenuProps } from "antd";
import { Outlet } from "react-router-dom";
import {
  ContainerOutlined,
  DesktopOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import Collection from "../components/Collection";
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
  getItem("常规", "normal", <PieChartOutlined />),
  getItem("设置", "setting", <PieChartOutlined />),
];

const MainBox = () => {
  return <div className={'main-box'}>
    <Header />
    <div className={'main-body'}>
      <Menu
        activeKey="normal"
        mode="vertical"
        items={items}
      />
      <div className={'page-view'}>
        <Outlet/>
      </div>
    </div>
  </div>;
};

export default MainBox;
