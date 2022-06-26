import React, { useState } from "react";
import { useMount } from "ahooks";
import DraggableLayout from "./DraggableLayout";
import Header from "../components/Header";
import {Divider, Menu, MenuProps} from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import {
  ApiOutlined,
  ContainerOutlined,
  DesktopOutlined,
  PieChartOutlined, SettingOutlined,
} from "@ant-design/icons";
import Collection from "../components/collection";
import AppHeader from "../components/app/Header";
type MenuItem = Required<MenuProps>["items"][number];
import { createFromIconfontCN } from '@ant-design/icons';
import Link2 from './../assets/icons/link-2.svg'
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
  getItem("常规", "rest", <ApiOutlined />),
  getItem("设置", "setting", <SettingOutlined />),
];

const MainBox = () => {
  const to = useNavigate();
  const onClick: MenuProps["onClick"] = (e) => to(`/${e.key}`);
  const [mainBodyHeight,setMainBodyHeight] = useState(0)
  useMount(()=>{
    // @ts-ignore
    const s = document.querySelector('.app-header').offsetHeight
    // 加上padding
    setMainBodyHeight(s+1)
  })
  return <div className={'main-box'}>
    <AppHeader />
    <Divider style={{margin:'0'}}/>
    <div className={'main-body'} style={{height:`calc(100vh - ${mainBodyHeight}px)`}}>
      <Menu
        activeKey="normal"
        mode="vertical"
        items={items}
        onClick={onClick}
      />
      <div className={'page-view'}>
        <Outlet/>
      </div>
    </div>
  </div>;
};

export default MainBox;
