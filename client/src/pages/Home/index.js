import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Layout,
  Dropdown,
  Avatar,
  Tooltip,
  Button,
  Card,
  Modal,
  Input
} from "antd";
import { PlusOutlined } from "@ant-design/icons";

import logo from "../../assets/logo.png";

const { Header, Content, Footer } = Layout;

export default function Home() {
  const [groupName, setGroupName] = useState("");
  const [groups, setGroups] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getAllGroup = () => {
    axios
      .get("http://localhost:5000/groups", {
        headers: {
          Authorization: localStorage.getItem("accessToken")
        }
      })
      .then((response) => {
        const userId = localStorage.getItem("userId");
        setGroups(
          response.data.data.map((group) => {
            const yourRole = group.members.find(
              (member) => member.detail === userId
            );
            return {
              id: group._id,
              name: group.name,
              yourRole: yourRole.role,
              link: `/group/${group._id}`
            };
          })
        );
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllGroup();
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    axios
      .post(
        "http://localhost:5000/groups",
        {
          name: groupName
        },
        {
          headers: {
            Authorization: localStorage.getItem("accessToken")
          }
        }
      )
      .then((response) => {
        if (response.data.success) {
          getAllGroup();
          setIsModalOpen(false);
        }
        console.log(response.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCancel = () => {
    setGroupName("");
    setIsModalOpen(false);
  };

  return (
    <Layout>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          background: "#fff",
          width: "100%"
        }}
      >
        <a
          style={{
            float: "left"
          }}
          href="/home"
        >
          <img src={logo} width={50} />
        </a>
        <div
          style={{
            float: "right",
            alignmentBaseline: "baseline"
          }}
        >
          <Tooltip title="create">
            <Button
              icon={<PlusOutlined />}
              size="large"
              style={{ marginRight: 20 }}
              onClick={showModal}
            />
          </Tooltip>
          <Dropdown
            menu={{
              items: [
                {
                  label: <a href="/profile">Profile</a>,
                  key: "0"
                },
                {
                  type: "divider"
                },
                {
                  label: <a href="/sign-in">Logout</a>,
                  key: "2"
                }
              ]
            }}
            trigger={["click"]}
            placement="bottomRight"
            style={{
              marginLeft: 10
            }}
          >
            <Avatar size="large" />
          </Dropdown>
        </div>
      </Header>
      <Content
        style={{
          padding: 50
        }}
      >
        <div
          style={{
            padding: 24,
            minHeight: 380
          }}
        >
          <div>
            {groups.length != 0
              ? groups.map(function mapGroup(group) {
                  return (
                    <Card
                      key={group.id}
                      title={<a href={group.link}>{group.name} Group</a>}
                      style={{
                        marginInline: 200,
                        marginBlock: 20
                      }}
                    >
                      Your role: {group.yourRole}
                    </Card>
                  );
                })
              : null}
          </div>
          <Modal
            title="Create Group"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <div>Group Name</div>
            <Input
              placeholder="Name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
          </Modal>
        </div>
      </Content>
      {/* <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Ant Design ©2018 Created by Ant UED
      </Footer> */}
    </Layout>
  );
}
