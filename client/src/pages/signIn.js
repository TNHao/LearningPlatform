import React from 'react'
import axios from 'axios'
import { Link } from "react-router-dom";
import {
    Layout,
    Menu,
    Button,
    Row,
    Col,
    Typography,
    Form,
    Input,
    Switch,
} from 'antd'



function onChange(checked) {
    console.log(`switch to ${checked}`)
}
const { Title } = Typography
const { Header, Footer, Content } = Layout

export default function SignIn() {
    const onFinish = (values) => {
        console.log("Success:", values);
        axios.post('http://localhost:5000/login', {
            email: values.email,
            password: values.password
        }).then((res) => {
            console.log(res);
        }).catch((error) => {
            console.error(error);
        })
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <Layout className="layout-default layout-signin">
            <Content className="signin header-solid signin-bg">
                <Row gutter={[20, 0]} justify="space-around" >
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
                                        message: 'Please input your email!',
                                    },
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
                                        message: 'Please input your password!',
                                    },
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
                                    style={{ width: '100%' }}
                                >
                                    SIGN IN
                                </Button>
                            </Form.Item>
                            <p className="font-semibold text-muted">
                                Dont have an account?{' '}
                                <Link to="/sign-up" className="text-dark font-bold">
                                    Sign Up
                                </Link>
                            </p>
                        </Form>
                    </Col>
                </Row>

            </Content>

        </Layout>
    )
}
