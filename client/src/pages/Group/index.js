import React from "react";
import { Layout, Dropdown, Avatar, Card } from "antd";
import { MoreOutlined } from "@ant-design/icons";

import logo from "../../assets/logo.png";

const { Header, Content, Footer } = Layout;

export default function Group() {
  const members = [
    {
      id: 0,
      name: "name",
      role: "owner"
    },
    {
      id: 1,
      name: "name2",
      role: "co-owner"
    }
  ];

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
