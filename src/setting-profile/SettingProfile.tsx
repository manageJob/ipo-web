import { Button, Card, Col, Form, Input, Modal, notification, Row } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { ContextItems } from '../context/ContextItems';
import { Breadcrumb } from '../models/breadcrumb.model';
import { useForm } from 'antd/lib/form/Form'
import { formLeftLayout, formModelLayout, formRightLayout, inputGroupLayout, inputGroupModel } from './SettingProfileLayout';
import GetUserById from './api/GetUserById';
import { NewPasswordSet, Setting } from './seting-profile.model';
import UpdatePassword from './api/UpdatePassword';
import UpdateUser from './api/UpdateUser';

const breadcrumb: Breadcrumb[] = [
    {
        name: 'Main',
        path: '/main',
        icon: 'HomeTwoTone',
    },
    {
        name: 'Settlement Price Config',
    },
]

const SettingProfile: React.FC = () => {
    const { setBreadcrumbItems } = useContext(ContextItems);
    const [isDisabledModel, setIsDisabledModel] = useState(true);
    const [userId, setUserId] = useState<any | null>(null);
    const confirm = Modal.confirm;
    const [form] = useForm();


    useEffect(() => {
        getUser();
        // setBreadcrumbItems(breadcrumb)
    }, [])

    const getUser = () => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            GetUserById(userId).then((res: any) => {
                populateData(res?.data);
            })
                .catch((err) => {

                });
        }
    }

    const populateData = (data: Setting) => {
        setUserId(data?.id);
        form.setFieldsValue({
            name: data.name,
            lastname: data.lastname,
            username: data.username,
            telephoneNumber: data.telephoneNumber,
            bankName: data.bankName,
            bankAccountName: data.bankAccountName,
            bankNumber: data.bankNumber
        });
    };

    const prepareData = (data: any) => {
        const userInfo: Setting = {
            name: data.name,
            lastname: data.lastname,
            username: data.username,
            telephoneNumber: data.telephoneNumber,
            bankName: data.bankName,
            bankAccountName: data.bankAccountName,
            bankNumber: data.bankNumber
        };
        return userInfo;
    };

    const onSave = (data: any) => {
        confirm({
            title: 'Do you want to update this user?',
            onOk() {
                return new Promise((resolve, reject) => {
                    UpdateUser(userId, prepareData(data))
                        .then(resolve)
                        .catch((err) => reject(err));
                })
                    .then(() => {
                        openNotificationSuccess();
                    })
                    .catch((err) => {
                        openNotificationError('failed');
                    });
            },
            onCancel() { },
        });
    }

    const onShowModelChangePassword = () => {
        setIsDisabledModel(false);
    }

    const onChangePassword = () => {
        const data: Setting = form.getFieldsValue();
        if (data.newPassword !== data.confirmPassword) {
            openNotificationError('Passwords do not match.');
            return;
        }
        const newPassword = { newPassword: form.getFieldValue('newPassword') };
        return new Promise((resolve, reject) => {
            UpdatePassword(userId, newPassword)
                .then(resolve)
                .catch((err) => reject(err));
        })
            .then(() => {
                openNotificationSuccess();
                setIsDisabledModel(true);
            })
            .catch((err) => {
                openNotificationError('failed');
            });

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
            {/* <Menu mode='horizontal' triggerSubMenuAction='click'>
                <Menu.SubMenu
                    key='SubMenu'
                    title={
                        <div className='flex items-center'>
                            <FileFilled />
                            <span>Setting</span>
                        </div>
                    }>
                    <Menu.Item
                        //   onClick={() => onNew()}
                        key='setting:1'
                        style={{
                            color: '#333',
                        }}
                        className='flex items-center'
                        icon={<PlusOutlined />}>
                        New
                    </Menu.Item>
                </Menu.SubMenu>
            </Menu> */}
            <div className='container-fluid'>
                <Form form={form} layout='horizontal' name='detail' onFinish={onSave}>
                    <Modal title="เปลี่ยนรหัสผ่าน" visible={!isDisabledModel} onCancel={() => setIsDisabledModel(true)} footer={[
                        <Button key="submit" type="primary" onClick={onChangePassword}>
                            เปลี่ยนรหัสผ่าน
                        </Button>,
                    ]}>
                        <Row>
                            <Col  {...formModelLayout}>
                                <Form.Item
                                    {...inputGroupModel}
                                    label='รหัสผ่านใหม่'
                                    name='newPassword'>
                                    <Input.Password id='newPassword' />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col  {...formModelLayout}>
                                <Form.Item
                                    {...inputGroupModel}
                                    label='ยืนยันรหัสผ่านใหม่'
                                    name='confirmPassword'>
                                    <Input.Password id='confirmPassword' />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Modal>
                    <Card title="Setting" bordered={false} style={{ margin: 30, height: '100%' }}>
                        <Row>
                            <Col {...formLeftLayout}>
                                <Form.Item
                                    {...inputGroupLayout}
                                    label='ชื่อ'
                                    name='name'>
                                    <Input id='name' />
                                </Form.Item>
                            </Col>
                            <Col {...formRightLayout}>
                                <Form.Item
                                    {...inputGroupLayout}
                                    label='นามสกุล'
                                    name='lastname'>
                                    <Input id='lastname' />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col {...formLeftLayout}>
                                <Form.Item
                                    {...inputGroupLayout}
                                    label='ชื่อผู้ใช้งาน'
                                    name='username'>
                                    <Input id='username' />
                                </Form.Item>
                            </Col>
                            <Col {...formRightLayout} >
                                <Form.Item
                                    {...inputGroupLayout}
                                    label='รหัสผ่าน'
                                    name='password'>
                                    <a onClick={() => onShowModelChangePassword()}>เปลี่ยนรหัสผ่าน</a>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col {...formLeftLayout}>
                                <Form.Item
                                    {...inputGroupLayout}
                                    label='เบอร์โทรศัพท์'
                                    name='telephoneNumber'>
                                    <Input id='telephoneNumber' />
                                </Form.Item>
                            </Col>
                            <Col {...formRightLayout}>
                                <Form.Item
                                    {...inputGroupLayout}
                                    label='ชื่อธนาคาร'
                                    name='bankName'>
                                    <Input id='bankName' />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col {...formLeftLayout}>
                                <Form.Item
                                    {...inputGroupLayout}
                                    label='ชื่อบัญชีธนาคาร'
                                    name='bankAccountName'>
                                    <Input id='bankAccountName' />
                                </Form.Item>
                            </Col>
                            <Col {...formRightLayout}>
                                <Form.Item
                                    {...inputGroupLayout}
                                    label='เลขบัญชี'
                                    name='bankNumber'>
                                    <Input id='bankNumber' />
                                </Form.Item>
                            </Col>
                        </Row>
                        <div className="bottom-action">
                            <Button id="save" type="primary" htmlType="submit">
                                บันทึก
                            </Button>
                        </div>
                    </Card>

                </Form>
            </div>
        </>

    );
}

export default SettingProfile;