import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Layout,
  Dropdown,
  Avatar,
  Card,
  Tooltip,
  Button,
  Modal,
  Input
} from "antd";
import { PlusOutlined, MoreOutlined, CopyOutlined } from "@ant-design/icons";

import logo from "../../assets/logo.png";

const { Header, Content, Footer } = Layout;

export default function Group() {
  const { id } = useParams();

  const [groupName, setGroupName] = useState("");
  const [members, setMembers] = useState([]);
  const [inviteUrl, setInviteUrl] = useState("");
  const [email, setEmail] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getGroupInfo = () => {
    axios
      .get(`http://localhost:5000/groups/${id}`, {
        headers: {
          Authorization: localStorage.getItem("accessToken")
        }
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.success) {
          const data = { ...response.data.data };
          setGroupName(data.name);
          setMembers(
            data.members.map((member) => {
              const user = data.users.find(
                (user) => user.detail === member.detail
              );
              console.log(user);
              return {
                id: member.detail,
                name: user.name,
                role: member.role
              };
            })
          );
        } else {
          console.log(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getInviteLink = () => {
    axios
      .get(`http://localhost:5000/groups/${id}/invitation-url`, {
        headers: {
          Authorization: localStorage.getItem("accessToken")
        }
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.success) {
          const data = { ...response.data.data };
          setInviteUrl(data.inviteUrl);
        } else {
          console.log(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getGroupInfo();
    getInviteLink();
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const invite = () => {
    console.log("invite");
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
        <div
          style={{
            float: "left"
          }}
        >
          <a href="/home">
            <img src={logo} width={50} />
          </a>
          <h3 style={{ display: "inline", marginInline: 25 }}>
            {groupName} Group
          </h3>
        </div>
        <div
          style={{
            float: "right",
            alignmentBaseline: "baseline"
          }}
        >
          <Tooltip title="invite">
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
          padding: "0 50px"
        }}
      >
        <div
          style={{
            padding: 24,
            minHeight: 380
          }}
        >
          <div>
            {members.length > 0
              ? members.map(function mapGroup(member) {
                  return (
                    <Card
                      title={<div>{member.name}</div>}
                      extra={
                        <Dropdown
                          menu={{
                            items: [
                              {
                                label: (
                                  <a
                                    onClick={() => {
                                      console.log("object");
                                    }}
                                  >
                                    Remove
                                  </a>
                                ),
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
                            float: "right"
                          }}
                        >
                          <MoreOutlined />
                        </Dropdown>
                      }
                      style={{
                        marginInline: 200,
                        marginBlock: 20
                      }}
                    >
                      {member.role}
                    </Card>
                  );
                })
              : null}
          </div>
          <Modal
            title="Invitation"
            open={isModalOpen}
            onCancel={handleCancel}
            footer={[]}
          >
            <div>Invite Link</div>
            <Input.Group
              style={{
                marginBlock: 10
              }}
              compact
            >
              <Input value={inviteUrl} />
              {/* <Tooltip title="copy git url">
                <Button icon={<CopyOutlined />} />
              </Tooltip> */}
            </Input.Group>
            <div>Invite by Email</div>
            <Input
              style={{
                marginBlock: 10
              }}
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button type="primary" onClick={invite()}>
              Invite
            </Button>
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
