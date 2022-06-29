import {
  Tabs,
  Avatar,
  List,
  Button,
  Menu,
  MenuProps,
  Col,
  Row,
  Tree,
  Divider,
  Space,
  Select,
} from "antd";
import type { DataNode, DirectoryTreeProps } from "antd/lib/tree";
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
import { useHttpStore } from "../../store/http";
import { useMount } from "ahooks";
import { CollectionService } from "../../services/CollectionService";
const { Option } = Select;

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
  const httpPanes = useHttpStore((state) => state.httpPanes);
  const setHttpPanes = useHttpStore((state) => state.setHttpPanes);
  const setHttpActiveKey = useHttpStore((state) => state.setHttpActiveKey);
  const onSelect: DirectoryTreeProps["onSelect"] = (keys, info) => {
    const newActiveKey = keys[0];
    // console.log({ newActiveKey });
    if (newActiveKey) {
      //只有一个未编辑过的和有团队的
      const s = httpPanes.find((i) => {
        return i.team !== -1 && !i.isE;
      },);
      if (s) {
        let newPanes = JSON.parse(JSON.stringify(httpPanes));
        const i = newPanes.findIndex((item) => item.team !== -1 && !item.isE);
        newPanes[i] =
          {
            title: "New Tab",
            content: "Content of new Tab",
            key: newActiveKey,
            form: {
              url: "123",
            },
            team: 0,
            isE: false,
          };
        setHttpPanes(newPanes);
        setHttpActiveKey(newActiveKey);
      } else {
        const chazhao = httpPanes.find((i) => i.key === newActiveKey);

        if (chazhao) {
          setHttpActiveKey(newActiveKey);
        } else {
          console.log(httpPanes, "httpPanes");
          const newPanes = [...httpPanes];
          newPanes.push({
            title: "New Tab",
            content: "Content of new Tab",
            key: newActiveKey,
            form: {
              url: "123",
            },
            team: 0,
          },);
          setHttpPanes(newPanes);
          setHttpActiveKey(newActiveKey);
        }
      }
    }
  };

  const onExpand: DirectoryTreeProps["onExpand"] = (keys, info) => {};

  const [treeData, setTreeData] = useState([]);

  useMount(() => {
    CollectionService.directorytree({}).then((res) => {
      function bianli(arr) {
        return arr.map((item) => {
          if (item.children && item.children.length > 0) {
            return {
              key: String(item.id),
              title: item.name + item.id,
              isLeaf: item.type !== 3,
              ...item,
              children: bianli(item.children),
            };
          } else {
            return {
              key: String(item.id),
              title: item.name + item.id,
              isLeaf: item.type !== 3,
              ...item,
            };
          }
        },);
      }
      setTreeData(bianli(res));
    },);
  },);
  return <div className={'collection'}>
      <div className={'right'}>
        <div style={{padding:'12px'}}>
          <Input placeholder={'搜索'} />
        </div>

        <Tabs defaultActiveKey="2" onChange={()=>{}} tabBarStyle={{padding:'0 12px'}}>
          <TabPane tab="我的集合" key="2">
            <div style={{padding:'0 12px'}}>
              <Select defaultValue="lucy" style={{ width: '100%' }} onChange={()=>{}}>
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="disabled" disabled>
                  Disabled
                </Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>
            </div>

            <Divider style={{margin:'12px 0'}}/>
            <Space style={{display:'flex',justifyContent:'space-between',padding:'0 12px'}}>
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
                style={{padding:'0 12px'}}
                showLine={true}
                onSelect={onSelect}
                onExpand={onExpand}
                treeData={treeData}
            />
          </TabPane >
          <TabPane tab="团队集合" key="1">团队集合</TabPane>
        </Tabs></div>

  </div>;
};

export default Collection;
