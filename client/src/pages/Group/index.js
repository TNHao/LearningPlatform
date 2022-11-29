import React from 'react';
import { Breadcrumb, Layout, Menu } from 'antd';

const { Header, Content, Footer } = Layout;

export default function Group() {
    return (
        <Layout>
            <Header
                style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                    width: '100%',
                }}
            >
                {/* <div className="logo" /> */}
                {/* <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={new Array(3).fill(null).map((_, index) => ({
            key: String(index + 1),
            label: `nav ${index + 1}`,
          }))}
        /> */}
            </Header>
            <Content
                style={{
                    padding: '0 50px',
                    marginTop: 64,
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
