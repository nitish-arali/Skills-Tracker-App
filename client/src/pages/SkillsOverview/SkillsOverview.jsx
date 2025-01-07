import { Card, Col, Flex, Form, Progress, Row, Select, Tag } from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useEffect, useState } from "react";
import ProgressChart from "../../components/ProgressChart";
import { urlgetAllUsers, urlGetSkillsForUser } from "../../endpoints";
import axios from "axios";

function SkillsOverview() {
  const [form] = useForm();
  const [users, setUsers] = useState();
  const [userSkills, setUserSkills] = useState([]);

  useEffect(() => {
    axios
      .get(urlgetAllUsers)
      .then((response) => {
        console.log("Users Data:", response.data);
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  function handleSubmit(values) {
    console.log(values);
  }

  function handleUserClick(values) {
    axios
      .get(`${urlGetSkillsForUser}/${values}`)
      .then((response) => {
        console.log("User Skill ", response.data.userSkills);
        setUserSkills(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(values);
  }

  return (
    <>
      <h3 style={{ textAlign: "center" }}>Skills Overview By User</h3>
      <Card
        style={{
          // width: "minContent",
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        }}
      >
        <Form
          form={form}
          onFinish={handleSubmit}
          // layout="vertical"
          requiredMark={false}
        >
          <Row
            gutter={16}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Col span={8}>
              <Form.Item
                // label="Select User"
                name="User"
                rules={[
                  { required: true, message: "Please select a department!" },
                ]}
              >
                <Select
                  placeholder="Select User"
                  options={users?.map((user) => ({
                    label: user.userName,
                    value: user._id,
                  }))}
                  onChange={handleUserClick}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>

        <ProgressChart Skills={userSkills} />
      </Card>
    </>
  );
}

export default SkillsOverview;
