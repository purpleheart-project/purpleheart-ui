import {Badge, Tabs, TabsProps} from "antd";

import Collection from "../components/collection";
import React, { useRef, useState } from "react";
import DraggableLayout from "../layouts/DraggableLayout";
import { useMount } from "ahooks";
const { TabPane } = Tabs;
import HttpRequest from '../components/http/Request'
import {useHttpStore} from "../store/http";
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

  const httpPanes = useHttpStore((state)=>state.httpPanes)
  const httpActiveKey = useHttpStore((state)=>state.httpActiveKey)
  const setHttpActiveKey = useHttpStore((state)=>state.setHttpActiveKey)
  const setHttpPanes = useHttpStore((state)=>state.setHttpPanes)


  const add = () => {
    const newActiveKey = `${Math.random()}`;
    const newPanes = [...httpPanes];
    newPanes.push({
      title: 'New Tab',
      content: 'Content of new Tab',
      key: newActiveKey,
      form:{
        url:'123'
      },
      team:-1,
      isE:false
    });
    setHttpPanes(newPanes);
    setHttpActiveKey(newActiveKey);
  };

  const remove = (targetKey: string) => {
    let lastIndex = -1;
    httpPanes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = httpPanes.filter(pane => pane.key !== targetKey);
    setHttpPanes(newPanes);
    setHttpActiveKey('1');
  };

  const onEdit = (targetKey: string, action: 'add' | 'remove') => {
    if (action === 'add') {
      add();
    } else {
      remove(targetKey);
    }
  };

  const renderTabBar: TabsProps['renderTabBar'] = (tabBarProps, DefaultTabBar) => (
    <DefaultTabBar {...tabBarProps}>
      {node => {
        const {panes, activeKey} = tabBarProps
        // console.log(panes)
        // console.log(httpPanes.find(item=>item.key===node.key).isE)
        const isE = httpPanes.find(item=>item.key===node.key).isE

        // console.log(node.key, {activeKey})
        return (
          <div>
            {node}
            <div style={{display:isE?'inline-block':'none'}} className={'badge-is-edit'}>
              <Badge status="warning" />
            </div>
          </div>
        )
      }}
    </DefaultTabBar>
  );


  // const test = useRef(null);
  return (
    <DraggableLayout dir={'horizontal'}>


        {/*<http workAreas={workAreas}/>*/}

        <Tabs type="editable-card" renderTabBar={renderTabBar} onChange={(newActiveKey)=>{
          setHttpActiveKey(newActiveKey);
        }} activeKey={httpActiveKey} onEdit={onEdit}>

          {httpPanes.map(pane => (
            <TabPane tab={pane.title} key={pane.key} closable={pane.closable} style={{height:'500px'}}>
              <DraggableLayout dir={'vertical'}>
              <HttpRequest pane={pane}></HttpRequest>

              {/*下面是res*/}
              <Tabs  className={'res'} defaultActiveKey="1" tabBarStyle={{padding:'0 12px',borderBottom:'1px solid white'}} style={{border:'none'}} onChange={()=>{}}>
                <TabPane tab="Tab 1" key="1">
                  1
                </TabPane>
                <TabPane tab="Tab 2" key="2">
                  Content of Tab Pane 2
                </TabPane>
                <TabPane tab="Tab 3" key="3">
                  Content of Tab Pane 3
                </TabPane>
              </Tabs>
              </DraggableLayout>
            </TabPane>
          ))}

        </Tabs>





      <div style={{height:'100%'}}>
        <Tabs defaultActiveKey="1" style={{height:'100%'}} onChange={()=>{}} tabPosition={'left'}>
          <TabPane   style={{paddingLeft:'0px'}} tab="集合" key="1">
            <Collection />
          </TabPane>
          <TabPane tab="历史记录" key="2">
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
