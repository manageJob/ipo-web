import { Button, Card, Col, Form, Input, Modal, notification, Row } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { ContextItems } from '../context/ContextItems';
import { useForm } from 'antd/lib/form/Form';
import { formLeftLayout, formModelLayout, formRightLayout, inputGroupLayout, inputGroupModel } from './ManageUserLayout';
import { User } from './manage-user.model';

const ManageUserDetail: React.FC = () => {
    const { setBreadcrumbItems } = useContext(ContextItems);
    const [isDisabledModel, setIsDisabledModel] = useState(true);
    const [userId, setUserId] = useState<any | null>(null);
    const confirm = Modal.confirm;
    const [form] = useForm();


    useEffect(() => {
        // setBreadcrumbItems(breadcrumb)
    }, [])



    const prepareData = (data: any) => {
        const userInfo: User = {
            name: data.name,
            lastname: data.lastname,
            username: data.username,
            telephoneNumber: data.telephoneNumber,
            bankName: data.bankName,
            bankNumber: data.bankNumber,
            role: data.role
        };
        return userInfo;
    };

    const onSave = (data: any) => {
        confirm({
            title: 'Do you want to new this user?',
            onOk() {
                // return new Promise((resolve, reject) => {
                //     UpdateUser(userId, prepareData(data))
                //         .then(resolve)
                //         .catch((err) => reject(err));
                // })
                //     .then(() => {
                //         openNotificationSuccess();
                //     })
                //     .catch((err) => {
                //         openNotificationError('failed');
                //     });
            },
            onCancel() { },
        });
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
                    <Card title="New User" bordered={false} style={{ margin: 30, height: '100%' }}>
                        <Row>
                            <Col {...formLeftLayout}>
                                <Form.Item
                                    {...inputGroupLayout}
                                    label='name'
                                    name='name'>
                                    <Input id='name' />
                                </Form.Item>
                            </Col>
                            <Col {...formRightLayout}>
                                <Form.Item
                                    {...inputGroupLayout}
                                    label='lastname'
                                    name='lastname'>
                                    <Input id='lastname' />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col {...formLeftLayout}>
                                <Form.Item
                                    {...inputGroupLayout}
                                    label='username'
                                    name='username'>
                                    <Input id='username' />
                                </Form.Item>
                            </Col>
                            <Col {...formRightLayout}>
                                <Form.Item
                                    {...inputGroupLayout}
                                    label='telephone number'
                                    name='telephoneNumber'>
                                    <Input id='telephoneNumber' />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col {...formLeftLayout}>
                                <Form.Item
                                    {...inputGroupLayout}
                                    label='bank name'
                                    name='bankName'>
                                    <Input id='bankName' />
                                </Form.Item>
                            </Col>
                            <Col {...formRightLayout}>
                                <Form.Item
                                    {...inputGroupLayout}
                                    label='bank number'
                                    name='bankNumber'>
                                    <Input id='bankNumber' />
                                </Form.Item>
                            </Col>
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