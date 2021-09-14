import { AutoComplete, Button, Card, Col, Form, Input, Modal, notification, Popconfirm, Row, Select } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { ContextItems } from '../context/ContextItems';
import { useForm } from 'antd/lib/form/Form';
import { formLeftLayout, formModelLayout, formRightLayout, inputGroupLayout, inputGroupModel } from './ManageUserLayout';
import { LocationParam, User } from './manage-user.model';
import { DropDrown } from '../models/DropDrown.model';
import Axios from 'axios';
import GetRole from './api/GetRole';
import AddManageUser from './api/AddManageUser';
import { useHistory, useLocation } from 'react-router-dom';
import GetManageUser from './api/GetManageUser';
import ResetUserPassword from './api/ResetUserPassword';
import UpdateManageUser from './api/UpdateManageUser';

const ManageUserDetail: React.FC = () => {
    const { setBreadcrumbItems } = useContext(ContextItems);
    const [isDisabledModel, setIsDisabledModel] = useState(true);
    const [userId, setUserId] = useState<any | null>(null);
    const locationState = useLocation().state as LocationParam;
    const [role, setRole] = useState<DropDrown[]>([]);
    const confirm = Modal.confirm;
    const [form] = useForm();
    const history = useHistory();


    useEffect(() => {
        // setBreadcrumbItems(breadcrumb)
        Axios.all([GetRole()])
            .then(
                Axios.spread((...res) => {
                    setRole(res[0]?.data ? res[0].data : []);
                })
            )
            .catch((errors) => {
                openNotificationError('failed')
            });
    }, [])

    useEffect(() => {
        if (locationState?.id) {
            GetManageUser(locationState.id)
                .then((res: any) => {
                    populateData(res?.data);
                })
                .catch((err) => {
                    openNotificationError('failed')
                });
        }
    }, [locationState]); // eslint-disable-line

    const populateData = (data: User) => {
        form.setFieldsValue({
            username: data.username,
            role: data.roleId,
        });
    };

    const prepareData = (data: any) => {
        const userInfo: User = {
            username: data.username,
            roleId: data.role
        };
        return userInfo;
    };

    const onSave = (data: any) => {
        if (!locationState?.id) {
            confirm({
                title: 'Do you want to new this user?',
                onOk() {
                    return new Promise((resolve, reject) => {
                        AddManageUser(prepareData(data))
                            .then(resolve)
                            .catch((err) => reject(err));
                    })
                        .then(() => {
                            openNotificationSuccess();
                            history.push('manage-user');
                        })
                        .catch((err) => {
                            openNotificationError('failed');
                        });
                },
                onCancel() { },
            });
        } else {
            confirm({
                title: 'Do you want to update this user?',
                onOk() {
                    return new Promise((resolve, reject) => {
                        UpdateManageUser(locationState?.id, prepareData(data))
                            .then(resolve)
                            .catch((err) => reject(err));
                    })
                        .then(() => {
                            openNotificationSuccess();
                            history.push('manage-user');
                        })
                        .catch((err) => {
                            openNotificationError('failed');
                        });
                },
                onCancel() { },
            });
        }
    }

    const resetPassword = () => {
        if (locationState?.id) {
            return new Promise((resolve, reject) => {
                ResetUserPassword(locationState?.id)
                    .then(resolve)
                    .catch((err) => reject(err));
            })
                .then(() => {
                    openNotificationSuccess();
                    history.push('manage-user');
                })
                .catch((err) => {
                    openNotificationError('failed');
                });
        }
    }
    const onShowModelChangePassword = () => {
        setIsDisabledModel(false);
    }


    const openNotificationSuccess = () => {
        notification['success']({
            message: 'Success',
            description:
                'Successfully.',
        });
    };

    const openNotificationError = (des: String) => {
        notification['error']({
            message: 'Error',
            description: des,
        });
    };

    return (
        <>
            <div className='container-fluid'>
                <Form form={form} layout='horizontal' name='detail' onFinish={onSave}>
                    <Card title={!locationState?.id ? "New User" : "Edit User"} bordered={false} style={{ margin: 30, height: '100%' }}>
                        <Row>
                            <Col {...formLeftLayout}>
                                <Form.Item
                                    {...inputGroupLayout}
                                    label='username'
                                    name='username'
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your username!',
                                        },
                                    ]}>
                                    <Input id='username' />
                                </Form.Item>
                            </Col>
                            <Col {...formRightLayout}>
                                <Form.Item
                                    {...inputGroupLayout}
                                    label='role'
                                    name='role'
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please select your role!',
                                        },
                                    ]}>
                                    <Select id="role" allowClear >
                                        {role.map((item, index) => {
                                            return (
                                                <Select.Option key={index} value={item.value}>
                                                    {item.label}
                                                </Select.Option>
                                            );
                                        })}
                                    </Select>
                                </Form.Item>
                            </Col>
                            {locationState?.id && (
                            <Col {...formLeftLayout}>
                                <Form.Item
                                    {...inputGroupLayout}
                                    label='password'
                                    name='password'>
                                    <Popconfirm
                                        title="Are you sure to reset password?"
                                        onConfirm={resetPassword}
                                        okText="Yes"
                                        cancelText="No">
                                        <a>reset password</a>
                                    </Popconfirm>
                                </Form.Item>
                            </Col>
                            )}
                        </Row>

                        <div className="bottom-action">
                            <Button id="save" type="primary" htmlType="submit">
                                save
                            </Button>
                        </div>
                    </Card>

                </Form>
            </div>
        </>

    );
}

export default ManageUserDetail;