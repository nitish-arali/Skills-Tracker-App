import React from "react";
import logo from "../assets/NEC-logo.png";
import {} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import bg from "../assets/bg.png";
const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const navigate = useNavigate();
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        theme="light"
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* NEC Logo Section */}
        <div
          style={{
            height: "64px", // Matches the height of the Header (default in Ant Design)
            display: "flex",
            justifyContent: "center", // Centers horizontally
            alignItems: "center", // Centers vertically
            borderBottom: "1px solid #ddd", // Optional: Adds a divider below the logo
          }}
        >
          <img
            src={logo}
            alt="NEC Logo"
            style={{
              height: "80%", // Adjust as needed to fit within the navbar height
              width: "auto",
            }}
          />
        </div>

        {/* Menu Section */}
        <Menu
          theme="light"
          defaultSelectedKeys={["1"]}
          style={{
            flex: 1, // Ensures the menu fills the remaining space
            textAlign: "left", // Aligns menu items to the left
          }}
          items={[
            {
              key: "1",
              label: "Home",
              onClick: () => navigate("/"),
            },
            {
              key: "2",
              label: "Add New Skill",
              onClick: () => navigate("/addNewSkills"),
            },
            {
              key: "4",
              label: "Skill Overview",
              onClick: () => navigate("/skillsOverview"),
            },
            {
              key: "5",
              label: "Masters",
              onClick: () => navigate("/masters"),
            },
          ]}
        />
      </Sider>

      <Layout>
        <Header
          style={{
            padding: 0,
            background: "#fff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "darkblue",
          }}
        >
          <h1 style={{ color: "white" }}>Skillset Tracker</h1>
          {/* <Menu theme="light" mode="horizontal" items={headerItems} /> */}
        </Header>
        <Content
          style={{
            margin: "0rem",
            padding: "2rem",
            minHeight: "280px",
            backgroundImage: `url(${bg})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
