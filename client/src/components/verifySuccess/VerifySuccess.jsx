import { Button, Result } from 'antd';
import React from 'react';

export default function VerifySuccess() {
    return (
        <Result
            status="success"
            title="Successfully Verify Account!"
            subTitle="Thank you, username. Hope you have a great time with us."
            extra={[
                <Button type="primary" key="console" href="/group">
                    Go Home
                </Button>,
            ]}
        />
    );
}
