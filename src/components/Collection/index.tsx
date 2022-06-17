import { Tabs, Avatar, List } from "antd";

const { TabPane } = Tabs;
import { Tree } from "antd";
import type { DataNode, DirectoryTreeProps } from "antd/lib/tree";
import React, { useState } from "react";
import { useMount } from "ahooks";
import { FileSystemService } from "../../api/FileSystemService";

const data = [
  {
    title: "Ant Design Title 1",
  },
  {
    title: "Ant Design Title 2",
  },
  {
    title: "Ant Design Title 3",
  },
  {
    title: "Ant Design Title 4",
  },
];

const onChange = (key: string) => {
  console.log(key);
};

const { DirectoryTree } = Tree;

const Collection = () => {
  const onSelect: DirectoryTreeProps["onSelect"] = (keys, info) => {
    console.log("Trigger Select", keys, info);
  };

  const onExpand: DirectoryTreeProps["onExpand"] = (keys, info) => {
    console.log("Trigger Expand", keys, info);
  };

  const [treeData, setTreeData] = useState([]);
  useMount(() => {
    FileSystemService.queryWorkspaceById({}).then((res) => {
      function dg(nodes, nodeList = []) {
        Object.keys(nodes).forEach(
          (value, index, array) => {
            nodeList.push({
              title: nodes[value].nodeName,
              key: nodes[value].nodeName,
              children: [],
            },);
            if (
              nodes[value].children && Object.keys(
                nodes[value].children,
              ).length > 0
            ) {
              dg(nodes[value].children, nodeList[index].children);
            }
          },
        );

        return nodeList;
      }
      setTreeData(dg(res.body.fsTree.roots));
    },);
  },);

  return <div>
        <Tabs defaultActiveKey="2" onChange={onChange} tabPosition={'left'}>
            <TabPane tab="集合" key="2">
                <DirectoryTree
                    multiple
                    defaultExpandAll
                    onSelect={onSelect}
                    onExpand={onExpand}
                    treeData={treeData}
                />
            </TabPane>
            <TabPane tab="环境" key="3">
                <List
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                title={<a href="https://ant.design">{item.title}</a>}
                            />
                        </List.Item>
                    )}
                />
            </TabPane>
        </Tabs>
    </div>;
};

export default Collection;
