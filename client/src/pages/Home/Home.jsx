/* import React from "react";

function Home() {
  return <div>HomePage</div>;
}

export default Home; */

import React from "react";
import { Card, Row, Col, Button } from "antd";
import { PlusOutlined, EditOutlined, EyeOutlined, SettingOutlined } from "@ant-design/icons";

const Home = () => {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      {/* Welcome Banner */}
      <div
        style={{
          padding: "2rem",
          background: "darkblue",
          color: "white",
          borderRadius: "8px",
          marginBottom: "2rem",
        }}
      >
        <h1>Welcome to Skillset Tracker</h1>
        <p>Manage, modify, and track skills with ease!</p>
      </div>

      {/* Quick Navigation */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}>
          <Card
            hoverable
            title="Add New Skills"
            bordered={false}
            actions={[
              <Button type="primary" icon={<PlusOutlined />} onClick={() => console.log("Navigate to Add Skills")} />,
            ]}
          >
            <p>Add new skills to the system effortlessly.</p>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card
            hoverable
            title="Modify Skills"
            bordered={false}
            actions={[
              <Button type="primary" icon={<EditOutlined />} onClick={() => console.log("Navigate to Modify Skills")} />,
            ]}
          >
            <p>Update or edit existing skills in your database.</p>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card
            hoverable
            title="Skill Overview"
            bordered={false}
            actions={[
              <Button type="primary" icon={<EyeOutlined />} onClick={() => console.log("Navigate to Skill Overview")} />,
            ]}
          >
            <p>View detailed statistics and insights about skills.</p>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card
            hoverable
            title="Masters"
            bordered={false}
            actions={[
              <Button type="primary" icon={<SettingOutlined />} onClick={() => console.log("Navigate to Masters")} />,
            ]}
          >
            <p>Manage master data for consistent tracking.</p>
          </Card>
        </Col>
      </Row>

      {/* Highlights Section */}
      <div style={{ marginTop: "2rem", textAlign: "left" }}>
        <h2>Highlights</h2>
        <p>🎉 Track recent activities, trending skills, and more!</p>
        <ul>
          <li>Skill "JavaScript" was added recently by User A.</li>
          <li>100+ skills tracked this month.</li>
          <li>20+ users actively engaged in skill updates.</li>
        </ul>
      </div>
    </div>
  );
};

export default Home;

