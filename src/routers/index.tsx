import React from "react";
import MainBox from "../layouts/MainBox";
import Rest from "../pages/Rest";
import Setting from "../pages/Setting";

export default [
  {
    path: "/",
    element: <MainBox />,
    children: [
      { path: "/", element: <Rest /> },
      { path: "/setting", element: <Setting /> },
      { path: "/rest", element: <Rest /> },
    ],
  },
];
