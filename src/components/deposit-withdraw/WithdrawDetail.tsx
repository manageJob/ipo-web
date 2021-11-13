import { AutoComplete, Button, Card, Col, Form, Input, Modal, notification, Popconfirm, Row, Select } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'antd/lib/form/Form';
import Axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom';
import { formLeftLayout, formRightLayout, inputGroupLayout } from './DepositWithdrawLayout';
import { DropDrown } from '../../models/DropDrown.model';
import { ContextItems } from '../../context/ContextItems';
import { User } from '../../manage-user/manage-user.model';


const WithdrawDetail: React.FC = () => {
    const { setBreadcrumbItems } = useContext(ContextItems);
    const [isDisabledModel, setIsDisabledModel] = useState(true);
    const [userId, setUserId] = useState<any | null>(null);
    const [role, setRole] = useState<DropDrown[]>([]);
    const confirm = Modal.confirm;
    const [form] = useForm();
    const history = useHistory();


    useEffect(() => {
        // Axios.all([GetRole()])
        //     .then(
        //         Axios.spread((...res) => {
        //             setRole(res[0]?.data ? res[0].data : []);
        //         })
        //     )
        //     .catch((errors) => {
        //         openNotificationError('failed')
        //     });
    }, [])

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
            confirm({
                title: 'Do you want to new this user?',
                onOk() {
                    // return new Promise((resolve, reject) => {
                    //     AddManageUser(prepareData(data))
                    //         .then(resolve)
                    //         .catch((err) => reject(err));
                    // })
                    //     .then(() => {
                    //         openNotificationSuccess();
                    //         history.push('manage-user');
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
                    <Card title={ "ถอน" } bordered={false} style={{ margin: 30, height: '100%' }}>
                    <Row>
                            <Col {...formLeftLayout}>
                                <Form.Item
                                    {...inputGroupLayout}
                                    label='จำนวนเงินถอน'
                                    name='withdrawAmount'
                                    rules={[
                                        {
                                            required: true,
                                            message: 'โปรดระบุจำนวนเงินถอน!',
                                        },
                                    ]}
                                >
                                    <Input id='withdrawAmount' />
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

export default WithdrawDetail;