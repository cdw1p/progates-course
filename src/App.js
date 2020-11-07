import React from "react";
import "./styles.css";
import "antd/dist/antd.css";
import SideMenu from "./pages/main";

export default function App() {
  let url = window.location.pathname;
  url = url.split("/")[1];
  return (
    <div className="App">
      <SideMenu bahasa={url} />
    </div>
  );
}
