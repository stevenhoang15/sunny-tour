"use client";
import React from "react";
import { Card, Row, Col, Image, Form, Input, Button } from "antd";
import Link from "next/link";

const backgroundStyle = {
    backgroundImage: "url(/images/login-bg.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
    height: "100vh",
};

const generateCaptcha = (): string => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let captcha = '';
    for (let i = 0; i < 6; i++) {
        captcha += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return captcha;
};

const Register: React.FC = () => {
    const [captcha, setCaptcha] = React.useState<string>(generateCaptcha());
    const [form] = Form.useForm();

    const refreshCaptcha = () => {
        setCaptcha(generateCaptcha());
    };

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
        // Xử lý đăng ký tại đây
    };

    return (
        <div className="h-100" style={backgroundStyle}>
            <div className="container d-flex flex-column justify-content-center h-100">
            <div className="text-center mb-4">
                    <Link href="/">
                        <Image
                            className="img-fluid"
                            src="/images/logo_bookingtour.png"
                            alt="BookingTour Logo"
                            preview={false}
                            width={150}
                            style={{ filter: 'brightness(1.2)' }}
                        />
                    </Link>
                </div>
            <Card className="custom-card" style={{padding: "3rem", flex: "center"}}>

                  {/* Logo Section */}
                 

                            <div className="my-4">
                                <Row justify="center">
                                    <p style={{
                                        color: "rgb(76 88 94)",
                                        fontWeight: 'bold',
                                        fontSize: 25,
                                        textTransform: 'uppercase',
                                        marginBottom: 0,
                                    }}>Đăng ký tài khoản</p>
                                </Row>
                                <Row justify="center">
                                    <div style={{
                                        width: "90%",
                                        height: "2px",
                                        backgroundColor: "rgba(76, 88, 94, 0.1)",
                                        marginTop: "10px"
                                    }}></div>
                                </Row>
                                <Form
                                    form={form}
                                    onFinish={onFinish}
                                    layout="vertical"
                                >
                                    <Row gutter={16}>
                                        <Col span={12}>
                                            <Form.Item
                                                name="firstName"
                                                label="Họ"
                                                rules={[{ required: true, message: 'Vui lòng nhập họ' }]}
                                            >
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item
                                                name="lastName"
                                                label="Tên"
                                                rules={[{ required: true, message: 'Vui lòng nhập tên' }]}
                                            >
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={16}>
                                        <Col span={12}>
                                            <Form.Item
                                                name="phone"
                                                label="Số điện thoại"
                                                rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
                                            >
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item
                                                name="email"
                                                label="Email"
                                                rules={[{ required: true, message: 'Vui lòng nhập email' }]}
                                            >
                                                <Input bordered />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={16}>
                                        <Col span={12}>
                                            <Form.Item
                                                name="password"
                                                label="Mật khẩu"
                                                rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
                                            >
                                                <Input.Password />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item
                                                name="confirmPassword"
                                                label="Xác nhận mật khẩu"
                                                rules={[{ required: true, message: 'Vui lòng xác nhận mật khẩu' }]}
                                            >
                                                <Input.Password />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={16}>
                                        <Col span={12}>
                                            <Form.Item label="Mã CAPTCHA">
                                                <div
                                                    style={{
                                                        padding: '8px',
                                                        backgroundColor: '#f0f0f0',
                                                        borderRadius: '4px',
                                                        fontWeight: 'bold',
                                                        fontSize: '18px',
                                                        userSelect: 'none',
                                                        textAlign: 'center',
                                                    }}
                                                >
                                                    {captcha}
                                                </div>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item
                                                name="captcha"
                                                label="Nhập mã CAPTCHA"
                                                rules={[{ required: true, message: 'Vui lòng nhập mã CAPTCHA' }]}
                                            >
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row justify="end">
                                        <Col>
                                            <Button type="link" onClick={refreshCaptcha}>
                                                Làm mới CAPTCHA
                                            </Button>
                                        </Col>
                                    </Row>
                                    <Row justify="center">
                                        <Col span={24}>
                                            <Form.Item>
                                                <Button type="primary" htmlType="submit" block>
                                                    Đăng ký
                                                </Button>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Form>
                            </div>
                        </Card>
            </div>
            
        </div>
    );
};

export default Register;