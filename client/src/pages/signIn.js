import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
    Layout,
    Menu,
    Button,
    Row,
    Col,
    Typography,
    Form,
    Input,
    Switch
} from "antd";
import logoGoogle from "../assets/images/Google__G__Logo.svg.png";
import { API_DOMAIN } from "../constants/urls";
import getJson from "../utils/api/getJson";

function onChange(checked) {
    console.log(`switch to ${checked}`);
}
const { Title } = Typography;
const { Header, Footer, Content } = Layout;

export default function SignIn() {
    const navigate = useNavigate();
    const onFinish = (values) => {
        axios
            .post("http://localhost:5000/login", {
                email: values.email,
                password: values.password
            })
            .then((res) => {
                const data = { ...res.data.data };
                localStorage.setItem("accessToken", data.accessToken);
                localStorage.setItem("userId", data.user.id);
                localStorage.setItem("userName", data.user.name);
                localStorage.setItem("userEmail", data.user.email);
                navigate('/home');
            })
            .catch((error) => {
                console.error(error);
            });
    };
    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };
    return (
        <Layout className="layout-default layout-signin">
            <Content className="signin header-solid signin-bg">
                <Row gutter={[20, 0]} justify="space-around">
                    <Col
                        xs={{ span: 24, offset: 0 }}
                        lg={{ span: 6, offset: 2 }}
                        md={{ span: 12 }}
                    >
                        <Title className="mb-15">Sign In</Title>
                        <Title className="font-regular text-muted" level={5}>
                            Enter your email and password to sign in
                        </Title>
                        <Form
                            name="basic"
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            layout="vertical"
                            className="row-col"
                        >
                            <Form.Item
                                className="username"
                                label="Email"
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your email!"
                                    }
                                ]}
                            >
                                <Input placeholder="Email" />
                            </Form.Item>

                            <Form.Item
                                className="username"
                                label="Password"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your password!"
                                    }
                                ]}
                            >
                                <Input.Password placeholder="Password" />
                            </Form.Item>

                            <Form.Item
                                name="remember"
                                className="aligin-center"
                                valuePropName="checked"
                            >
                                <Switch defaultChecked onChange={onChange} />
                                Remember me
                            </Form.Item>

                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    style={{ width: "100%" }}
                                >
                                    SIGN IN
                                </Button>
                            </Form.Item>
                            <p className="font-semibold text-muted">
                                Dont have an account?{" "}
                                <Link to="/sign-up" className="text-dark font-bold">
                                    Sign Up
                                </Link>
                            </p>
                        </Form>
                        <p className="text-center my-25 font-semibold text-muted">
                            Or Login with
                        </p>
                        <div className="sign-up-gateways">
                            <Button type="false" className=" ant-btn" onClick={{}}>
                                <img src={logoGoogle} alt="logo 3" />
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
}
