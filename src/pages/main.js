import React from "react";
import { Menu, Layout } from "antd";
import { useMediaQuery } from "react-responsive";
import { GithubOutlined, Html5Outlined } from "@ant-design/icons";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import App from "./content";
import dataMenu from "../components/dataMenu";
import dataMateri from "../components/dataMateri";
const { Sider, Content, Footer } = Layout;

export default function SideMenu(props) {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-device-width: 1224px)",
  });

  const lang = props.bahasa ? props.bahasa : "id";
  return (
    <Layout
      style={
        isDesktopOrLaptop
          ? { minHeight: "100vh" }
          : { display: "flex", flexDirection: "column", minHeight: "100vh" }
      }
    >
      <Router>
        {isDesktopOrLaptop ? (
          <Sider style={{ height: "131vh" }}>
            <div className="logo" />
            <Menu
              theme="dark"
              mode="inline"
              style={
                isDesktopOrLaptop
                  ? {}
                  : {
                      width: "100vw",
                      display: "flex",
                    }
              }
            >
              <Menu.Item key="1" icon={<GithubOutlined />}>
                <a href={`/${lang}/git`}>GIT</a>
              </Menu.Item>
              <Menu.Item key="2" icon={<Html5Outlined />}>
                <a href={`/${lang}/html`}>HTML</a>
              </Menu.Item>
              {lang === "en"
                ? dataMenu.en.map((item, i) => {
                    return (
                      <Menu.Item
                        key={i + 3}
                        icon={
                          <img
                            className="imgIcon"
                            style={{ height: "18px", filter: "invert(70%)" }}
                            src={item.source}
                            alt="imgIcons"
                          />
                        }
                      >
                        <a href={item.linkTo} style={{ marginLeft: "7px" }}>
                          {item.judul}
                        </a>
                      </Menu.Item>
                    );
                  })
                : dataMenu.id.map((item, i) => {
                    return (
                      <Menu.Item
                        key={i + 3}
                        icon={
                          <img
                            className="imgIcon"
                            style={{ height: "18px", filter: "invert(70%)" }}
                            src={item.source}
                            alt="imgIcons"
                          />
                        }
                      >
                        <a href={item.linkTo} style={{ marginLeft: "7px" }}>
                          {item.judul}
                        </a>
                      </Menu.Item>
                    );
                  })}
            </Menu>
          </Sider>
        ) : (
          <Menu
            theme="dark"
            mode="inline"
            style={{
              width: "100vw",
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            <Menu.Item
              style={{ padding: " 0px 5%", width: "25px" }}
              key="1"
              icon={<GithubOutlined />}
            >
              <a href={`/${lang}/git`} />
            </Menu.Item>
            <Menu.Item
              style={{ padding: " 0px 5%", width: "25px" }}
              key="2"
              icon={<Html5Outlined />}
            >
              <a href={`/${lang}/html`} />
            </Menu.Item>
            {lang === "en"
              ? dataMenu.en.map((item, i) => {
                  return (
                    <Menu.Item
                      style={{ padding: " 0px 5%", width: "25px" }}
                      key={i + 3}
                      icon={
                        <img
                          className="imgIcon"
                          style={{ height: "18px", filter: "invert(70%)" }}
                          src={item.source}
                          alt="imgIcons"
                        />
                      }
                    >
                      <a href={item.linkTo} style={{ marginLeft: "7px" }} />
                    </Menu.Item>
                  );
                })
              : dataMenu.id.map((item, i) => {
                  return (
                    <Menu.Item
                      style={{ padding: " 0px 5%", width: "25px" }}
                      key={i + 3}
                      icon={
                        <img
                          className="imgIcon"
                          style={{ height: "18px", filter: "invert(70%)" }}
                          src={item.source}
                          alt="imgIcons"
                        />
                      }
                    >
                      <a href={item.linkTo} style={{ marginLeft: "7px" }} />
                    </Menu.Item>
                  );
                })}
          </Menu>
        )}
        <Layout className="site-layout">
          <Content
            style={
              isDesktopOrLaptop ? { margin: "0 16px" } : { margin: "0 5px" }
            }
          >
            <div
              className="site-layout-background"
              style={
                isDesktopOrLaptop
                  ? { padding: 24, minHeight: 360 }
                  : { padding: 5, minHeight: 360 }
              }
            >
              <Switch>
                {lang === "en"
                  ? dataMateri.en.map((data) => {
                      return (
                        <Route path={data.linkTo}>
                          <App
                            materi={data.materi}
                            max={data.max}
                            lang="en"
                            device={isDesktopOrLaptop ? "big" : "small"}
                          />
                        </Route>
                      );
                    })
                  : dataMateri.id.map((data) => {
                      return (
                        <Route path={data.linkTo}>
                          <App
                            materi={data.materi}
                            max={data.max}
                            lang="id"
                            device={isDesktopOrLaptop ? "big" : "small"}
                          />
                        </Route>
                      );
                    })}
                <Route path="/">
                  <Redirect to={`/id/git`} />
                </Route>
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Hmmm ©2020 Created by TheRevolt
            <br />
            {lang === "en" ? (
              <a href={`/id/${window.location.pathname.split("/")[2]}`}>
                Indonesian Ver
              </a>
            ) : (
              <a href={`/en/${window.location.pathname.split("/")[2]}`}>
                English Ver
              </a>
            )}
          </Footer>
        </Layout>
      </Router>
    </Layout>
  );
}
