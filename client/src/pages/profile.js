import { useState, React, useEffect } from "react";
import axios from "axios";
import {
  Row,
  Col,
  Card,
  Button,
  List,
  Descriptions,
  Avatar,
  Radio,
  Switch,
  Upload,
  message
} from "antd";

import {
  VerticalAlignTopOutlined,
  LogoutOutlined,
  PlusOutlined,
  SettingOutlined
} from "@ant-design/icons";

import { useNavigate } from "react-router-dom";
import BgProfile from "../assets/images/bg-profile.jpg";
import profilavatar from "../assets/images/face-1.jpg";
import convesionImg from "../assets/images/face-3.jpg";
import convesionImg2 from "../assets/images/face-4.jpg";
import convesionImg3 from "../assets/images/face-5.jpeg";
import convesionImg4 from "../assets/images/face-6.jpeg";
import convesionImg5 from "../assets/images/face-2.jpg";

import getJson from "../utils/api/getJson";
import { API_DOMAIN } from "../constants/urls";

function Profile() {
  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const email = localStorage.getItem("user");
    axios
      .get(
        `${API_DOMAIN}/users`,
        {
          headers: {
            Authorization: localStorage.getItem("accessToken")
          }
        },
        { withCredentials: true }
      )
      .then((response) => {
        console.log(response.data);
        setUserInfo(response.data.user);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const pencil = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M13.5858 3.58579C14.3668 2.80474 15.6332 2.80474 16.4142 3.58579C17.1953 4.36683 17.1953 5.63316 16.4142 6.41421L15.6213 7.20711L12.7929 4.37868L13.5858 3.58579Z"
        className="fill-gray-7"
      />
      <path
        d="M11.3787 5.79289L3 14.1716V17H5.82842L14.2071 8.62132L11.3787 5.79289Z"
        className="fill-gray-7"
      />
    </svg>
  ];
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const data = [
    {
      title: "Group A",
      avatar: convesionImg,
      description: "Môn ABC"
    },
    {
      title: "Group B",
      avatar: convesionImg2,
      description: "Môn DEF"
    },
    {
      title: "Group C",
      avatar: convesionImg3,
      description: "Môn XYZ"
    }
  ];
  const defaultAvatar =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROdEaZteLTepbACoy3MjSfAsulnfciHnp4nw&usqp=CAU";

  return (
    <>
      <div
        className="profile-nav-bg"
        style={{ backgroundImage: `url(${BgProfile})` }}
      />

      <Card
        className="card-profile-head"
        bodyStyle={{ display: "none" }}
        title={
          <Row justify="space-between" align="middle" gutter={[24, 0]}>
            <Col span={24} md={12} className="col-info">
              <Avatar.Group>
                <Avatar
                  size={74}
                  shape="square"
                  src={userInfo.avatarURL ? userInfo.avatarURL : defaultAvatar}
                />

                <div className="avatar-info">
                  <h4 className="font-semibold m-0">{userInfo.name}</h4>
                  <p>Role</p>
                </div>
              </Avatar.Group>
            </Col>
            <Col
              span={24}
              md={12}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end"
              }}
            >
              <Radio.Group defaultValue="a">
                <Button value="a">
                  <PlusOutlined />
                </Button>
                <Button value="b">
                  <SettingOutlined />
                </Button>
                <Button onClick={logout}>
                  <LogoutOutlined />
                </Button>
              </Radio.Group>
            </Col>
          </Row>
        }
      />

      <Row gutter={[24, 0]}>
        <Col span={24} md={4} className="mb-24 ">
          <Card
            bordered={false}
            title={<h6 className="font-semibold m-0">Profile Information</h6>}
            className="header-solid h-full card-profile-information"
            extra={<Button type="link">{pencil}</Button>}
            bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
          >
            <hr className="my-25" />
            <Descriptions>
              <Descriptions.Item label="Full Name" span={3}>
                {userInfo.name}
              </Descriptions.Item>

              <Descriptions.Item label="Email" span={3}>
                {userInfo.email}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>

        <Col span={24} md={16} className="mb-24">
          <Card
            bordered={false}
            title={<h6 className="font-semibold m-0">Groups</h6>}
            className="header-solid h-full"
            bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
          >
            <List
              itemLayout="horizontal"
              dataSource={data}
              split={false}
              className="conversations-list"
              renderItem={(item) => (
                <List.Item actions={[<Button type="link">Tham gia</Button>]}>
                  <List.Item.Meta
                    avatar={
                      <Avatar shape="square" size={48} src={item.avatar} />
                    }
                    title={item.title}
                    description={item.description}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Profile;
