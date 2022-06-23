import { Col, Row } from "antd";

import Collection from "../components/Collection";
import Http from "../components/Http/HttpCopy";
import React, { useState } from "react";
import DraggableLayout from "../layouts/DraggableLayout";

const Rest = () => {
  const [workAreas, setWorkAreas] = useState([]);
  return (
    <div>
      <DraggableLayout  options={{
        leftClassName:'left1',
        rightClassName:"right1"
      }}>
        <div className={'left left1'}>
          <Http workAreas={workAreas}/>
        </div>
        <div className={'left right1'}>
          <Collection />
        </div>
      </DraggableLayout>
    </div>
  );
};

export default Rest;
