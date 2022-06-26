import { Tabs } from "antd";

import Collection from "../components/collection";
import React, { useRef, useState } from "react";
import DraggableLayout from "../layouts/DraggableLayout";
import { useMount } from "ahooks";
const { TabPane } = Tabs;
import HttpRequest from '../components/http/Request'
const Rest = () => {
  const [workAreas, setWorkAreas] = useState<any>([]);

  useMount(() => {
    setWorkAreas([
      {
        endpoint: "123",
        closable: true,
        title: "1",
        key: "1",
      },
      {
        endpoint: "321",
        closable: true,
        title: "2",
        key: "2",
      },
    ],);
  },);

  // const test = useRef(null);
  return (
    <DraggableLayout dir={'horizontal'}>

      <DraggableLayout dir={'vertical'}>
        {/*<http workAreas={workAreas}/>*/}
        <HttpRequest workAreas={workAreas}></HttpRequest>
        <Tabs defaultActiveKey="1" onChange={()=>{}}>
          <TabPane tab="Tab 1" key="1">
            Content of Tab Pane 1
          </TabPane>
          <TabPane tab="Tab 2" key="2">
            Content of Tab Pane 2
          </TabPane>
          <TabPane tab="Tab 3" key="3">
            Content of Tab Pane 3
          </TabPane>
        </Tabs>
      </DraggableLayout>

      <div>
        <Tabs defaultActiveKey="1" onChange={()=>{}} tabPosition={'left'}>
          <TabPane tab="Tab 1" key="1">
            <Collection />
          </TabPane>
          <TabPane tab="Tab 2" key="2">
            Content of Tab Pane 2
          </TabPane>
          <TabPane tab="Tab 3" key="3">
            Content of Tab Pane 3
          </TabPane>
        </Tabs>
      </div>


      </DraggableLayout>
  );
};

export default Rest;
