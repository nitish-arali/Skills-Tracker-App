import {
  Button,
  Card,
  Col,
  Divider,
  Flex,
  Form,
  Input,
  InputNumber,
  message,
  Popconfirm,
  Row,
  Select,
  Table,
} from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import {
  urlAddSkill,
  urlAddSkills,
  urlGetAllDepartments,
  urlGetAllSkills,
  urlgetAllUsers,
  urlGetSkillsForUser,
  urlGetUsersByDepartment,
  urlModifyUserSkills,
} from "../../endpoints";

function AddUserSkills() {
  const [form] = useForm();
  const [departments, setDepartments] = useState([]);
  const [users, setUsers] = useState([]);
  const [skills, setSkills] = useState([]);
  const [userSkills, setUserSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const [editableSkills, setEditableSkills] = useState([]);
  const [submitButton, setSubmitButton] = useState("Submit");
  const [newUserSkills, setNewUserSkills] = useState([]);

  useEffect(() => {
    getDepartments();
    getUsers();
    getAllSkills();
  }, []);

  function getDepartments() {
    axios
      .get(urlGetAllDepartments)
      .then((response) => {
        setDepartments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }

  const SkillLevels = [
    {
      value: 1,
      label: "Level 1",
    },
    {
      value: 2,
      label: "Level 2",
    },
    {
      value: 3,
      label: "Level 3",
    },
  ];

  function getUsers() {
    axios
      .get(urlgetAllUsers)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }
  function getAllSkills() {
    axios
      .get(urlGetAllSkills)
      .then((response) => {
        setSkills(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }

  function handleDepartmentChange(value) {
    axios
      .get(`${urlGetUsersByDepartment}/${value}`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });

    form.setFieldsValue({ User: null });
  }

  function handleUserChange(value) {
    axios
      .get(`${urlGetSkillsForUser}/${value}`)
      .then((response) => {
        if (response.data.userSkills.length > 0) {
          form.setFieldsValue({ Department: response.data.Department });
          setSubmitButton("Update");

          const dataSource = response.data.userSkills.map((skill) => ({
            key: skill.skillId,
            skill: skill.skill,
            currentLevel: skill.skillLevel[0]?.currentLevel,
            updatedLevel: skill.skillLevel[0]?.updatedLevel,
          }));

          setUserSkills(dataSource);
        }
      })
      .catch((e) => {
        console.error(e);
      });
  }

  function handleSubmit(values) {
    if (submitButton === "Submit") {
      if (newUserSkills.length <= 0) {
        message.error("Please add skills");
        return;
      }

      const selectedUser = users.find((user) => user._id === values.User);

      if (!selectedUser) {
        message.error("User not found");
        return;
      }

      const updatedUserSkills = newUserSkills.map((skill) => {
        const skillLevel = skill.skillLevel;

        const newSkillLevel = [
          {
            currentLevel: skillLevel,
            updatedLevel: skillLevel,
          },
        ];

        return {
          ...skill,
          skillId: skill.key,
          skillLevel: newSkillLevel,
          key: undefined,
        };
      });

      const postData = {
        Department: values?.Department,
        UserId: values?.User,
        UserName: selectedUser.userName,
        userSkills: updatedUserSkills,
      };

      axios
        .post(urlAddSkills, postData)
        .then((response) => {
          message.success(response.data.message);
          form.resetFields();
          setNewUserSkills([]);
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
        });
    } else {
      if (userSkills.length <= 0) {
        message.error("Please add skills");
        return;
      }

      console.log("Updated Button: ", userSkills);

      const updatedExistingUserSkills = userSkills.map((skill) => {
        const editableSkill = editableSkills.find(
          (item) => item.key === skill.key
        );

        let currentLevel = skill.updatedLevel;

        let updatedLevel = skill.updatedLevel;

        if (editableSkill && editableSkill.updatedLevel !== undefined) {
          updatedLevel = editableSkill.updatedLevel;

          currentLevel = skill.updatedLevel;
        }

        const newSkillLevel = [
          {
            currentLevel: currentLevel,
            updatedLevel: updatedLevel,
          },
        ];

        return {
          ...skill,
          skillId: skill.key,
          skillLevel: newSkillLevel,
          key: undefined,
        };
      });

      const updatedNewUserSkills = newUserSkills.map((skill) => {
        const skillLevel = skill.skillLevel;

        const newSkillLevel = [
          {
            currentLevel: skillLevel,
            updatedLevel: skillLevel,
          },
        ];

        return {
          ...skill,
          skillId: skill.key,
          skillLevel: newSkillLevel,
          key: undefined,
        };
      });

      const combinedSkills =
        updatedExistingUserSkills.concat(updatedNewUserSkills);

      const postData = {
        UserId: values?.User,
        userSkills: combinedSkills,
      };

      axios
        .put(urlModifyUserSkills, postData)
        .then((response) => {
          message.success(response.data.message);
          form.resetFields();
          setUserSkills([]);
          setNewUserSkills([]);
          setSubmitButton("Submit");
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
        });
    }
  }

  function handleReset() {
    form.resetFields();
  }

  function handleNewSkillDelete(key) {
    const updatedSkills = newUserSkills?.filter((skill) => skill.key !== key);
    setNewUserSkills(updatedSkills);
  }
  function handleExistingSkillDelete(key) {
    const updatedSkills = userSkills?.filter((skill) => skill.key !== key);
    setUserSkills(updatedSkills);
  }

  const newSkillColumns = [
    {
      title: "Skill",
      dataIndex: "skill",
      key: "1",
      width: 250,
    },
    {
      title: "Level",
      dataIndex: "skillLevel",
      key: "2",
      width: 70,
    },
    {
      title: "Action",
      key: "3",
      render: (_, record) => (
        <Popconfirm
          title="Sure to delete?"
          onConfirm={() => handleNewSkillDelete(record.key)}
        >
          <Button size="small" danger>
            <DeleteOutlined style={{ fontSize: "1rem" }} />
          </Button>
        </Popconfirm>
      ),
    },
  ];

  const modifySkillColumns = [
    {
      title: "Skill",
      dataIndex: "skill",
      key: "1",
      width: 250,
    },
    {
      title: "Current Level",
      dataIndex: "updatedLevel",
      key: "2",
      width: 70,
    },
    {
      title: "Update Level",
      key: "4",
      width: 120,
      render: (text, record) => {
        return (
          <Select
            style={{ width: "100%" }}
            options={SkillLevels?.map((level) => ({
              label: level.label,
              value: level.value,
            }))}
            onChange={(e) => handleLevelChange(e, record.key)}
          />
        );
      },
    },
    {
      title: "Action",
      key: "3",
      render: (_, record) => (
        <Flex gap={10}>
          <Button
            size="small"
            color="primary"
            variant="outlined"
            onClick={() => handleEditExistingClick(record)}
          >
            <EditOutlined />
          </Button>
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleExistingSkillDelete(record.key)}
          >
            <Button size="small" danger>
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        </Flex>
      ),
    },
  ];

  function handleEditExistingClick(record) {
    console.log("key ", record);
  }

  function handleLevelChange(e, key) {
    console.log(e);

    const updatedEditableSkills = [...userSkills];
    // const updatedEditableSkills = [...editableSkills];
    const index = updatedEditableSkills.findIndex((item) => item.key === key);

    if (index >= 0) {
      updatedEditableSkills[index].updatedLevel = e;
      setEditableSkills(updatedEditableSkills);
      console.log("updated skill: ", updatedEditableSkills);
    }
  }

  function handleAdd() {
    form.validateFields();
    const obj = form.getFieldsValue();

    const selectedSkill = skills.find((skill) => skill.Skill === obj?.Skills);

    if (selectedSkill) {
      const skillObj = {
        key: selectedSkill._id,
        skill: obj?.Skills,
        skillLevel: obj?.SkillLevel,
      };
      setNewUserSkills((prev) => [...prev, skillObj]);
    } else {
      message.error("Selected skill not found in skills list.");
    }

    form.resetFields(["Skills", "SkillLevel"]);
  }

  function handleNewSkillChange(e) {
    setNewSkill(e.target.value);
  }

  function handleAddNewSkill() {
    const value = { Skill: newSkill };
    axios
      .post(urlAddSkill, value)
      .then(() => {
        message.success("New skill added successfully");
        getAllSkills();
        form.setFieldsValue({ Skills: newSkill });
        setNewSkill("");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "2rem",
          margin: "1rem",
        }}
      >
        <Card
          style={{
            width: "35rem",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            height: "22rem",
          }}
        >
          <Form
            form={form}
            onFinish={handleSubmit}
            layout="vertical"
            requiredMark={false}
          >
            <Row gutter={16} justify="center">
              <Col span={24}>
                <Form.Item
                  label="Department"
                  name="Department"
                  rules={[
                    { required: true, message: "Please select a department!" },
                  ]}
                >
                  <Select
                    placeholder="Select Department"
                    options={departments?.map((dept) => ({
                      label: dept.Department,
                      value: dept.Department,
                    }))}
                    onChange={handleDepartmentChange}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16} justify="center">
              <Col span={24}>
                <Form.Item
                  label="User"
                  name="User"
                  rules={[{ required: true, message: "Please select a user!" }]}
                >
                  <Select
                    placeholder="Select User"
                    options={users?.map((user) => ({
                      label: user.userName,
                      value: user._id,
                    }))}
                    style={{ width: "100%" }}
                    onChange={handleUserChange}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={13}>
                <Form.Item label="Skills" name="Skills">
                  <Select
                    showSearch
                    allowClear
                    dropdownRender={(menu) => (
                      <>
                        {menu}
                        <Divider style={{ margin: "8px 0" }} />
                        <Row style={{ padding: "0 8px 4px" }} justify={"end"}>
                          <Col span={24}>
                            <Input
                              size="small"
                              style={{ width: "100%" }}
                              placeholder="New Skill"
                              value={newSkill}
                              onChange={handleNewSkillChange}
                              onKeyDown={(e) => e.stopPropagation()}
                            />
                          </Col>
                          <Col style={{ marginTop: "0.5rem" }}>
                            <Button
                              size="small"
                              color="primary"
                              // type="link"
                              variant="outlined"
                              icon={<PlusOutlined />}
                              onClick={handleAddNewSkill}
                            >
                              Add Skill
                            </Button>
                          </Col>
                        </Row>
                      </>
                    )}
                    placeholder="Select Skills"
                    options={skills?.map((skill) => ({
                      label: skill.Skill,
                      value: skill.Skill,
                    }))}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
              <Col span={7}>
                <Form.Item label="Skill Level" name="SkillLevel">
                  <Select
                    placeholder="Select Level"
                    options={SkillLevels?.map((level) => ({
                      label: level.label,
                      value: level.value,
                    }))}
                    style={{ width: "100%" }}
                    onChange={handleUserChange}
                  />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item label=" ">
                  <Button
                    style={{
                      backgroundColor: "#5cb85c",
                      color: "#fff",
                      width: "100%",
                    }}
                    onClick={handleAdd}
                  >
                    Add
                  </Button>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16} justify="center">
              <Col>
                <Button type="primary" htmlType="submit">
                  {submitButton}
                </Button>
              </Col>
              <Col>
                <Button danger onClick={handleReset}>
                  Reset
                </Button>
              </Col>
            </Row>
          </Form>
        </Card>
        <Flex vertical gap={10}>
          {newUserSkills.length > 0 && (
            <Table
              title={() => "New Skills"}
              size="small"
              bordered
              dataSource={newUserSkills}
              columns={newSkillColumns}
            />
          )}
          {submitButton == "Update" && (
            <Table
              title={() => "Existing Skills"}
              size="small"
              bordered
              dataSource={userSkills}
              columns={modifySkillColumns}
            />
          )}
        </Flex>
      </div>
    </>
  );
}

export default AddUserSkills;
