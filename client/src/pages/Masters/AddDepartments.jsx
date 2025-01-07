import { Button, Col, Form, Input, Row, Select, Tooltip } from "antd";
import { useForm } from "antd/es/form/Form";
import React from "react";
import { urlAddDepartment, urlGetAllDepartments } from "../../endpoints";
import axios from "axios";

function AddDepartments() {
  const [form] = useForm();
  function handleSubmit(values) {
    // console.log(values);
    axios
      .post(urlAddDepartment, values)
      .then((response) => {
        console.log("department Response", response.data);
      })
      .catch((error) => {
        console.error(error);
      });
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
          <Col span={8}>
            <Form.Item
              label="Department"
              name="department"
              rules={[
                { required: true, message: "Please enter a department!" },
              ]}
            >
              <Input style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col>
            <Form.Item label=" ">
              <Button htmlType="submit" type="primary">
                Save
              </Button>
            </Form.Item>
          </Col>
          <Col>
            <Form.Item label=" ">
              <Button danger>Reset</Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default AddDepartments;
