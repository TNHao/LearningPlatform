import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Layout, Dropdown, Avatar, Card } from "antd";
import { MoreOutlined } from "@ant-design/icons";

import logo from "../../assets/logo.png";

const { Header, Content, Footer } = Layout;

export default function Group() {
  const { id } = useParams();

  const [groupName, setGroupName] = useState("");
  const [members, setMembers] = useState([]);

  const getGroupInfo = () => {
    axios
      .get(`http://localhost:5000/groups/${id}`, {
        headers: {
          Authorization: localStorage.getItem("accessToken")
        }
      })
      .then((response) => {
        console.log(response.data);
        // const userId = localStorage.getItem("userId");
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

  useEffect(() => {
    getGroupInfo();
  }, []);

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
