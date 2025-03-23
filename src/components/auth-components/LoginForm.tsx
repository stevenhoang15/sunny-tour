import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Alert, Row, Col } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { AppDispatch } from '@/store/store';
import { useSelector } from '@/store/hooks';
import { setIsLoading, setShowMessage } from '@/store/general/GeneralSlice';
import { authService } from '@/services/auth/auth.service';
import { LoginType } from '@/interface/auth/User';
import { setLogin } from '@/store/auth/AuthSlice';
import { useDispatch } from 'react-redux';
import Link from 'next/link';

const generateCaptcha = (): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let captcha = '';
  for (let i = 0; i < 6; i++) {
    captcha += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return captcha;
};

const LoginForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const route = useRouter();
  const [form] = Form.useForm();
  const loading = useSelector((state) => state.general.isLoading);
  const showMessage = useSelector((state) => state.general.showMessage);
  const [message, setMessage] = useState<string>('');
  const [captcha, setCaptcha] = useState<string>(generateCaptcha());
  const [userCaptcha, setUserCaptcha] = useState<string>('');

  const hideAuthMessage = () => {
    dispatch(setShowMessage(false));
  };

  const refreshCaptcha = () => {
    setCaptcha(generateCaptcha());
  };

  const onLogin = async (loginForm: LoginType) => {
    if (userCaptcha !== captcha) {
      setMessage('Mã CAPTCHA không đúng');
      dispatch(setShowMessage(true));
      refreshCaptcha(); // Refresh CAPTCHA khi nhập sai
      return;
    }

    dispatch(setIsLoading(true));
    try {
      const data = await authService.login(loginForm);
      if (data != null && data.status) {
        dispatch(setLogin(data));
        route.push('/dashboard');
      } else {
        setMessage(data.message || 'Tài khoản hoặc mật khẩu không đúng');
        dispatch(setShowMessage(true));
      }
      dispatch(setIsLoading(false));
    } catch (err) {
      setMessage('Tài khoản hoặc mật khẩu không đúng');
      dispatch(setIsLoading(false));
    }
  };

  useEffect(() => {
    if (showMessage) {
      const timer = setTimeout(() => hideAuthMessage(), 3000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [showMessage]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, marginBottom: 0 }}
        animate={{
          opacity: showMessage ? 1 : 0,
          marginBottom: showMessage ? 20 : 0,
        }}
      >
        <Alert type="error" showIcon message={message} />
      </motion.div>
      <Form<LoginType>
        layout="vertical"
        name="login-form"
        form={form}
        onFinish={onLogin}
      >
        <Form.Item
          name="username"
          label="Tài khoản"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập tài khoản đăng nhập',
            },
          ]}
        >
          <Input prefix={<MailOutlined className="text-primary" />} />
        </Form.Item>
        <Form.Item
          name="password"
          label="Mật khẩu"
          rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
        >
          <Input.Password prefix={<LockOutlined className="text-primary" />} />
        </Form.Item>
        <Form.Item label="Mã CAPTCHA">
          <Row gutter={8} align="middle">
            <Col>
              <div
                style={{
                  padding: '8px',
                  backgroundColor: '#f0f0f0',
                  borderRadius: '4px',
                  fontWeight: 'bold',
                  fontSize: '18px',
                  userSelect: 'none',
                }}
              >
                {captcha}
              </div>
            </Col>
            <Col>
              <Button type="link" onClick={refreshCaptcha}>
                Làm mới
              </Button>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item
          name="captcha"
          label="Nhập mã CAPTCHA"
          rules={[{ required: true, message: 'Vui lòng nhập mã CAPTCHA' }]}
        >
          <Input
            value={userCaptcha}
            onChange={(e) => setUserCaptcha(e.target.value)}
            className='text-primary'
          />
        </Form.Item>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={loading}>
                Sign in
              </Button>
            </Form.Item>
          </Col>
          
        </Row>
      </Form>
    </>
  );
};

export default LoginForm;