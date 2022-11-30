import React, { useState } from "react";
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    console.log(groupName);
    // call api create group
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setGroupName("");
    setIsModalOpen(false);
  };

  const groups = [
    {
      name: "A"
    },
    {
      name: "B"
    },
    {
      name: "C"
    },
    {
      name: "D"
    },
    {
      name: "E"
    },
    {
      name: "F"
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
            {groups.length > 0
              ? groups.map(function mapGroup(group) {
                  return (
                    <Card
                      title={<a href="/group">{group.name}</a>}
                      style={{
                        marginInline: 200,
                        marginBlock: 20
                      }}
                    >
                      {group.name}
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
