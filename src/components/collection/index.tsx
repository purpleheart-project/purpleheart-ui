import {Tabs, Avatar, List, Button, Menu, MenuProps, Col, Row, Tree, Divider, Space, Select} from "antd";
import type { DataNode, DirectoryTreeProps } from 'antd/lib/tree';
const { TabPane } = Tabs;
import React, { useState } from "react";

import Input from "antd/es/input/Input";
import {
  ContainerOutlined,
  DesktopOutlined,
  ExportOutlined,
  PieChartOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";

const { Option } = Select;


const { DirectoryTree } = Tree;

const treeData: DataNode[] = [
  {
    title: 'parent 0',
    key: '0-0',
    children: [
      { title: 'leaf 0-0', key: '0-0-0', isLeaf: true },
      { title: 'leaf 0-1', key: '0-0-1', isLeaf: true },
    ],
  },
  {
    title: 'parent 1',
    key: '0-1',
    children: [
      { title: 'leaf 1-0', key: '0-1-0', isLeaf: true },
      { title: 'leaf 1-1', key: '0-1-1', isLeaf: true },
    ],
  },
];

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
  const onSelect: DirectoryTreeProps['onSelect'] = (keys, info) => {
    console.log('Trigger Select', keys, info);
  };

  const onExpand: DirectoryTreeProps['onExpand'] = (keys, info) => {
    console.log('Trigger Expand', keys, info);
  };
  return <div className={'collection'}>

      <div></div>
      <div className={'right'}> <Input placeholder={'搜索'}/>
        <Tabs defaultActiveKey="2" onChange={()=>{}}>
          <TabPane tab="我的集合" key="2">
            <Select defaultValue="lucy" style={{ width: '100%' }} onChange={()=>{}}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="disabled" disabled>
                Disabled
              </Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
            <Divider style={{margin:'12px 0'}}/>
            {/*<Tag>asfasfas</Tag>*/}
            <Space style={{display:'flex',justifyContent:'space-between'}}>
              <a>+新增</a>
              <Space>
                <a>
                  <QuestionCircleOutlined style={{textAlign:'right'}} />
                </a>
                <a>
                  <ExportOutlined style={{textAlign:'right'}}/>
                </a>


              </Space>

            </Space>
            <Divider style={{margin:'12px 0'}}/>
            <Tree
                showLine={true}
                onSelect={onSelect}
                onExpand={onExpand}
                treeData={treeData}
            />
          </TabPane>
          <TabPane tab="团队集合" key="1">团队集合</TabPane>
        </Tabs></div>

  </div>;
};

export default Collection;
