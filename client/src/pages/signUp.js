import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {
    Layout,
    Menu,
    Button,
    Typography,
    Card,
    Form,
    Input,
    Checkbox,
    Row,
    Col
} from 'antd'
// import { Link } from 'react-router-dom';
import {
    DribbbleOutlined,
    TwitterOutlined,
    InstagramOutlined,
    GithubOutlined,
} from '@ant-design/icons'

import logo3 from '../assets/images/Google__G__Logo.svg.png'


const { Title } = Typography
const { Header, Footer, Content } = Layout

export default function SignUp() {
    const onFinish = (values) => {
        axios.post('http://localhost:5000/sign-up', {
            name: values.name,
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
        <div className="layout-default ant-layout layout-sign-up">

            <Content className=" sign-up-bg">
                <Row gutter={[24, 0]} justify="space-around" className="">
                    <Col
                        xs={{ span: 24, offset: 0 }}
                        lg={{ span: 6, offset: 2 }}
                        md={{ span: 12 }}
                    >
                        <Title className="mb-15">Sign Up</Title>
                        <Title className='text-center'>
                            <h3>Register With</h3>
                        </Title>
                        <div className='sign-up-gateways'>
                            <Button type="false" className=" ant-btn">
                                <img src={logo3} alt="logo 3" />
                            </Button>
                        </div>


                        <p className="text-center my-25 font-semibold text-muted">
                            Or
                        </p>
                        <Form
                            name="basic"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            className="row-col"
                        >
                            <Form.Item
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your username!',
                                    },
                                ]}
                            >
                                <Input placeholder="Name" />
                            </Form.Item>
                            <Form.Item
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

                            <Form.Item name="remember" valuePropName="checked">
                                <Checkbox>
                                    I agree the{' '}
                                    <a
                                        href="#pablo"
                                        className="font-bold text-dark"
                                    >
                                        Terms and Conditions
                                    </a>
                                </Checkbox>
                            </Form.Item>

                            <Form.Item>
                                <Button
                                    style={{ width: '100%' }}
                                    type="primary"
                                    htmlType="submit"
                                >
                                    SIGN UP
                                </Button>
                            </Form.Item>
                        </Form>
                        <p className="font-semibold text-muted text-center">
                            Already have an account?{' '}
                            <Link to="/sign-in" className="font-bold text-dark">
                                Sign In
                            </Link>
                        </p>
                    </Col>
                </Row>

            </Content>

        </div >
    )
}
