import { Alert, Button, Card, Form, Input, notification, Row, Spin } from "antd"
import { useForm } from "antd/lib/form/Form";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './login.css';
import { useState } from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import Layout from "../components/layout/Layout";
import ContextProvider from "../context/ContextItems";
import { ToastContainer } from 'react-toastify';
import Routes from "../routes/Routes";
import Authenticate from "./api/Authenticate";

const Login: React.FC = () => {
    const [form] = useForm()
    const [isLogin, setIsLogin] = useState<boolean>(false);

    const prepareData = () => {
        const param: any = form.getFieldsValue()
        return param;
    }

    const validateToken = (accessToken: any) => {
        var dataToken = {
            'access_token': accessToken.token
        }
        localStorage.setItem(`ipoToken`, JSON.stringify(dataToken));
        localStorage.setItem(`userId`, accessToken.userId);
        setIsLogin(true);
    }

    const save = () => {
        Authenticate(prepareData())
            .then((res: any) => {
                validateToken(res?.data);
            })
            .catch((err) => {
                openNotificationWithError();
            });
    };

    const openNotificationWithError = () => {
        notification['error']({
            message: 'Error',
            description:
                'Username or password is incorrect.',
        });
    };


    return (
        <>
            {!isLogin &&
                <Row justify="center" align="middle" style={{ minHeight: '100vh' }} className="bg">
                    <Card className="box">
                        <Form form={form}>
                            <Form.Item name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Username!',
                                    },
                                ]}
                            >
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                            </Form.Item>
                            <Form.Item name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Password!',
                                    },
                                ]}
                            >
                                <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" className="login-form-button" htmlType="submit" onClick={save}>
                                    Log in
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Row>
            }
            {isLogin &&
                <Router>
                    <ContextProvider>
                        <Layout>
                            <Routes />
                        </Layout>
                    </ContextProvider>
                </Router>
            }
        </>
    );
}
export default Login
