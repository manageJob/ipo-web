import { AutoComplete, Button, Card, Col, Form, Input, Modal, notification, Popconfirm, Row, Select } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'antd/lib/form/Form';
import Axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom';
import { default as dayjs, default as format } from 'dayjs';
import { formLeftLayout, formRightLayout, inputGroupLayout } from './DepositWithdrawLayout';
import { DropDrown } from '../../models/DropDrown.model';
import { ContextItems } from '../../context/ContextItems';
import { User } from '../../manage-user/manage-user.model';
import AddTransaction from './api/AddTransaction';
import { Transaction } from './deposit-withdraw.model';


const WithdrawDetail: React.FC = () => {
    const { setBreadcrumbItems } = useContext(ContextItems);
    const [isDisabledModel, setIsDisabledModel] = useState(true);
    const [userId, setUserId] = useState<any | null>(null);
    const [role, setRole] = useState<DropDrown[]>([]);
    const confirm = Modal.confirm;
    const [form] = useForm();
    const history = useHistory();

    const prepareData = (data: any) => {
        const accountId = localStorage.getItem('accountId');
        const transaction: Transaction = {
            accountId: accountId,
            amount: data.withdrawAmount,
            type: "Withdraw",
            transactionTime: dayjs(new Date())
        };
        return transaction;

    };

    const onSave = (data: any) => {
        confirm({
            title: 'คุณต้องการบันทึกหรือไม่?',
            onOk() {
                return new Promise((resolve, reject) => {
                    AddTransaction(prepareData(data))
                        .then(resolve)
                        .catch((err) => reject(err));
                })
                    .then(() => {
                        openNotificationSuccess();
                        history.push('deposit-withdraw');
                    })
                    .catch((err) => {
                        openNotificationError('failed');
                    });
            },
            onCancel() { },
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
            <div className='container-fluid'>
                <Form form={form} layout='horizontal' name='detail' onFinish={onSave}>
                    <Card title={"ถอน"} bordered={false} style={{ margin: 30, height: '100%' }}>
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