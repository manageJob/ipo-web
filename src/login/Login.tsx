import { Button, Card, Col, Form, Input, Row, Spin } from "antd"
import { useForm } from "antd/lib/form/Form";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './login.css';
import { useState } from "react";
import { BrowserRouter as Router, useHistory } from 'react-router-dom';
import Layout from "../components/layout/Layout";
import ContextProvider from "../context/ContextItems";
import Breadcrumbs from "../components/breadcrumb/Breadcrumbs";
import { ToastContainer } from 'react-toastify';
import Routes from "../routes/Routes";
import Authenticate from "./api/Authenticate";

const Login: React.FC = () => {
    const [form] = useForm()
    const history = useHistory()
    const [isLogin, setIsLogin] = useState<boolean>(false);

    const prepareData = () => {
        const param: any = form.getFieldsValue()
        return param;
    }

    const validateToken = (accessToken: string) => {
        var dataToken = {
            'access_token': accessToken
        }
        localStorage.setItem(`ipoToken`, JSON.stringify(dataToken));
        setIsLogin(true);
    }

    const save = () => {
        Authenticate(prepareData())
            .then((res: any) => {
                validateToken(res?.data);
            })
            .catch((err) => {

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
                    <Layout>
                        <ContextProvider>
                            <Breadcrumbs />
                            <ToastContainer />
                            <Routes />
                        </ContextProvider>
                    </Layout>
                </Router>
            }
        </>
    );
}
export default Login
