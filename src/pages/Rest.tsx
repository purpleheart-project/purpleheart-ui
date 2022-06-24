import { Col, Row } from "antd";

import Collection from "../components/Collection";
import Http from "../components/Http/HttpCopy";
import React, { useRef, useState } from "react";
import DraggableLayout from "../layouts/DraggableLayout";
import {useMount} from "ahooks";

const Rest = () => {
  const [workAreas, setWorkAreas] = useState([]);

  useMount(()=>{

      setWorkAreas([{
          endpoint:'123',
          closable:true,
          title:'1',
          key:'1'
      },
          {
              endpoint:'321',
              closable:true,
              title:'2',
              key:'2'
          }])

  })

  // const test = useRef(null);
  return (
      <DraggableLayout dir={'horizontal'}>
          <Http workAreas={workAreas}/>
          {/*<div>Collection</div>*/}
          <Collection />
      </DraggableLayout>
  );
};

export default Rest;
