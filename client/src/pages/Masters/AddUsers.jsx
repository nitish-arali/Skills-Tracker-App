import { Button, Col, Form, Input, Row, Select, Tooltip } from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useEffect, useState } from "react";
import { InfoCircleOutlined } from "@ant-design/icons";
import { urlAddUser, urlGetAllDepartments } from "../../endpoints";
import axios from "axios";

function AddUsers() {
  const [form] = useForm();
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    axios
      .get(urlGetAllDepartments)
      .then((response) => {
        console.log("Data:", response.data);
        setDepartments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  function handleSubmit(values) {
    // console.log(values);
    axios
      .post(urlAddUser, values)
      .then((response) => {
        console.log("department Response", response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    form.resetFields();
  }
  return (
    <>
      <Form
        style={{ margin: "0 1rem" }}
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        requiredMark={false}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Department"
              name="department"
              rules={[
                { required: true, message: "Please select a department!" },
              ]}
            >
              <Select
                options={departments?.map((dept) => ({
                  label: dept.Department,
                  value: dept.Department,
                }))}
                placeholder="Select Department"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="User Name"
              name="userName"
              rules={[{ required: true, message: "Please input User Name" }]}
            >
              <Input style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          {/* <Col span={8}>
            <Form.Item
              label={
                <>
                  <div style={{}}>
                    User ID
                    <Tooltip title="Enter Your Employee ID">
                      <InfoCircleOutlined style={{ marginLeft: "0.5rem" }} />
                    </Tooltip>
                  </div>
                </>
              }
              name="userId"
              rules={[{ required: true, message: "Please input User ID" }]}
            >
              <Input style={{ width: "100%" }} />
            </Form.Item>
          </Col> */}
        </Row>
        <Row gutter={16} justify={"end"}>
          <Col>
            <Button htmlType="submit" type="primary">
              Save
            </Button>
          </Col>
          <Col>
            <Button danger>Reset</Button>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default AddUsers;
