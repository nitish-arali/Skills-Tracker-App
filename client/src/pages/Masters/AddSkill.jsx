import { Button, Col, Form, Input, Row, Select, Tooltip } from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useEffect } from "react";
import { urlAddSkill } from "../../endpoints";
import axios from "axios";

function AddSkill() {
  const [form] = useForm();

  function handleSubmit(values) {
    // console.log(values);
    axios
      .post(urlAddSkill, values)
      .then((response) => {
        console.log("skills Response", response.data);
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
              label="Skill"
              name="Skill"
              rules={[{ required: true, message: "Please enter a Skill!" }]}
            >
              <Input style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col>
            <Form.Item label=" ">
              <Button id="AddSkillButton" htmlType="submit" type="primary">
                Add Skill
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

export default AddSkill;
