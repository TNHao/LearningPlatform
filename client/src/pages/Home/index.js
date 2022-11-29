import React from 'react';
import { Breadcrumb, Layout, Menu, Dropdown, Avatar, Tooltip, Button } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;

export default function Home() {
    return (
        <Layout>
            <Header
                style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                    background: '#fff',
                    width: '100%',
                }}
            >
                <div
                    style={{
                        float: 'left',
                    }}
                >
                    A
                </div>
                <div
                    style={{
                        float: 'right',
                        alignmentBaseline: 'baseline',
                    }}
                >
                    <Tooltip title="create">
                        <Button icon={<PlusOutlined />} size="large" style={{ marginRight: 20 }} />
                    </Tooltip>
                    <Dropdown
                        menu={{
                            items: [
                                {
                                    label: <a href="/profile">Profile</a>,
                                    key: '0',
                                },
                                {
                                    type: 'divider',
                                },
                                {
                                    label: <a href="/sign-in">Logout</a>,
                                    key: '2',
                                },
                            ],
                        }}
                        trigger={['click']}
                        placement="bottomRight"
                        style={{
                            marginLeft: 10,
                        }}
                    >
                        <Avatar size="large" />
                    </Dropdown>
                </div>
            </Header>
            <Content
                style={{
                    padding: 50,
                }}
            >
                <div
                    style={{
                        padding: 24,
                        minHeight: 380,
                    }}
                >
                    Content
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
