"use client";
import React from "react";
import LoginForm from "@/components/auth-components/LoginForm";
import { Card, Row, Col, Image } from "antd";
import Link from "next/link";

const backgroundStyle = {
    backgroundImage: "url(/images/login-bg.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh"
};

const Login: React.FC = () => {
    return (
        <div style={backgroundStyle}>
             <div className="container d-flex flex-column justify-content-center min-h-screen relative z-10">
                {/* Logo Section */}
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

                <Row justify="center" align="middle">
                    <Col xs={24} sm={12} md={12} lg={12}>
                        <Card 
                            className="shadow-xl rounded-2xl border-0"
                            style={{ 
                                background: 'rgba(255, 255, 255, 0.98)',
                                backdropFilter: 'blur(10px)',
                            }}
                        >
                            <div className="text-center mb-6">
                                <h2 className="text-2xl font-semibold mb-2" style={{ color: '#333' }}>
                                    Welcome Back!
                                </h2>
                                <p className="text-gray-500 text-sm">
                                    Sign in to access your account
                                </p>
                            </div>

                            <LoginForm />

                            <div className="mt-4 text-center text-sm">
                                <span className="text-gray-500">Don't have an account? </span>
                                <Link 
                                    href="/auth/register" 
                                    className="text-blue-500 hover:text-blue-700 font-medium"
                                >
                                    Sign up
                                </Link>
                            </div>
                        </Card>
                    </Col>
                </Row>

                {/* Footer Links */}
                <div className="text-center mt-6">
                    <Link href="/" className="text-white hover:text-gray-200 mx-3 text-sm">
                        Home
                    </Link>
                    <span className="text-white opacity-50">•</span>
                    <Link href="/tours" className="text-white hover:text-gray-200 mx-3 text-sm">
                        Tours
                    </Link>
                    <span className="text-white opacity-50">•</span>
                    <Link href="/contact" className="text-white hover:text-gray-200 mx-3 text-sm">
                        Contact
                    </Link>
                </div>
            </div>

            {/* Background Overlay */}
            {/* <div 
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.4))',
                    zIndex: 1
                }}
            /> */}
        </div>
    );
};

export default Login;
