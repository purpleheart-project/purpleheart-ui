import {Divider, Dropdown, Input, Menu, Select, Tabs} from "antd";
import React, { useRef, useState } from "react";
import AnimateAutoHeight from "../AnimateAutoHeight";
import {CodeOutlined, CopyOutlined, DeleteOutlined, DownOutlined, LinkOutlined, SaveOutlined} from "@ant-design/icons";
import CodeMirror from "@uiw/react-codemirror";
import {json} from "@codemirror/lang-json";
import {javascript} from "@codemirror/lang-javascript";
import {useImmer} from "use-immer";
import {v4 as uuidv4} from "uuid";
import DraggableLayout from "../../layouts/DraggableLayout";

const { TabPane } = Tabs;

const initialPanes = [
  { title: "Tab 1", content: "Content of Tab 1", key: "1" },
  { title: "Tab 2", content: "Content of Tab 2", key: "2" },
  {
    title: "Tab 3",
    content: "Content of Tab 3",
    key: "3",
    closable: false,
  },
];

const RequestTypeOptions = [
  { label: "GET", value: "GET" },
  { label: "POST", value: "POST" },
  { label: "PUT", value: "PUT" },
  { label: "DELETE", value: "DELETE" },
  { label: "PATCH", value: "PATCH" },
];

type ParamsType = {
  id: string;
  key: string;
  value: string | number;
  disabled: boolean;
};
const HttpCopy: React.FC<any> = ({}: any) => {
  const [activeKey, setActiveKey] = useState(initialPanes[0].key);
  const [panes, setPanes] = useState(initialPanes);
  const newTabIndex = useRef(0);

  const [requestType, setRequestType] = useState("GET");
  const [requestSavedName, setRequestSavedName] = useState("Untitled request");

  const [url, setUrl] = useState("");
  const [params, setParams] = useImmer<ParamsType[]>([
    { id: uuidv4(), key: "", value: "", disabled: false },
  ],);

  const onChange = (newActiveKey: string) => {
    setActiveKey(newActiveKey);
  };

  const add = () => {
    const newActiveKey = `newTab${newTabIndex.current++}`;
    const newPanes = [...panes];
    newPanes.push({
      title: "New Tab",
      content: "Content of new Tab",
      key: newActiveKey,
    },);
    setPanes(newPanes);
    setActiveKey(newActiveKey);
  };

  const remove = (targetKey: string) => {
    let newActiveKey = activeKey;
    let lastIndex = -1;
    panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    },);
    const newPanes = panes.filter((pane) => pane.key !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    setPanes(newPanes);
    setActiveKey(newActiveKey);
  };

  const onEdit = (targetKey: string, action: "add" | "remove") => {
    if (action === "add") {
      add();
    } else {
      remove(targetKey);
    }
  };

  return (
    <div style={{padding:'10px'}} className={'http'}>
      <Tabs type="editable-card" onChange={onChange} activeKey={activeKey} onEdit={onEdit}>
        {panes.map(pane => (
          <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>



            <DraggableLayout options={{
              leftClassName:'test0',
              rightClassName:"test1"
            }}>
              <div className={'test0 left'}>
                <AnimateAutoHeight>
                  <div className={'top'}>
                    <Select
                      value={requestType}
                      options={RequestTypeOptions}
                      onChange={setRequestType}
                    />
                    <Input value={url} onChange={(e) => setUrl(e.target.value)} />
                    <Dropdown.Button
                      type="primary"
                      icon={<DownOutlined />}
                      onClick={()=>{}}
                      overlay={
                        <Menu
                          items={[
                            {
                              key: "1",
                              label: "导入URL",
                              icon: <LinkOutlined />,
                            },
                            {
                              key: "2",
                              label: "显示代码",
                              icon: <CodeOutlined />,
                            },
                            {
                              key: "3",
                              label: "全部清除",
                              icon: <DeleteOutlined />,
                            },
                          ]}
                        />
                      }
                    >
                      发送
                    </Dropdown.Button>

                    <Dropdown.Button
                      icon={<DownOutlined />}
                      overlay={
                        <Menu
                          items={[
                            {
                              key: "0",
                              label: (
                                <Input
                                  value={requestSavedName}
                                  onClick={(e) => e.stopPropagation()}
                                  onChange={(e) => setRequestSavedName(e.target.value)}
                                />
                              ),
                            },
                            {
                              key: "1",
                              label: "复制链接",
                              icon: <CopyOutlined />,
                            },
                            {
                              key: "2",
                              label: "View my links",
                              icon: <LinkOutlined />,
                            },
                            {
                              key: "3",
                              label: "另存为",
                              icon: <SaveOutlined />,
                            },
                          ]}
                        />
                      }
                    >
                      保存
                    </Dropdown.Button>
                  </div>
                </AnimateAutoHeight>
                <Divider />
              </div>

              <div className={'test1 right'}>safasf</div>
            </DraggableLayout>

          </TabPane>
        ))}
      </Tabs>
    </div>
  );
};

export default HttpCopy;
