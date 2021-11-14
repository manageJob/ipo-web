import { Button, Card, Col, DatePicker, Form, Input, Modal, notification, Row, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { useForm } from 'antd/lib/form/Form';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import { formLeftLayout, formRightLayout, inputGroupLayout } from './DepositWithdrawLayout';
import { DropDrown } from '../../models/DropDrown.model';
import { default as dayjs, default as format } from 'dayjs';
import GetAccount from './api/GetAccount';
import getBankDetail from './api/GetManageUser';
import { Transaction } from './deposit-withdraw.model';
import AddTransaction from './api/AddTransaction';

const DepositDetail: React.FC = () => {
    const [account, setAccount] = useState<DropDrown[]>([]);
    const confirm = Modal.confirm;
    const [form] = useForm();
    const history = useHistory();
    const [bankDetail, setBankDetail] = useState<any>(null);


    useEffect(() => {
        Axios.all([GetAccount()])
            .then(
                Axios.spread((...res) => {
                    setAccount(res[0]?.data ? res[0].data : []);
                })
            )
            .catch((errors) => {
                openNotificationError('failed')
            });
    }, [])

    const prepareData = (data: any) => {
        const transaction: Transaction = {
            accountId: data.toBank,
            amount: data.depositAmount,
            type: "Deposit",
            transactionTime: data.transactionTime
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

    const accountDetail = () => {
      getBank(form.getFieldValue('toBank'));
      
    };

    const getBank = (idAccount: string) => {
        if (idAccount !== undefined) {
            getBankDetail(idAccount)
            .then((res: any) => {
               setBankDetail(res?.data?.bankName + ' เลขบัญชี: ' + res?.data?.bankNumber);
            })
            .catch((err) => {
                openNotificationError('failed')
            });
        } 
    }

    const clearDateil = () => {
       setBankDetail(null);
      };

    return (
        <>
            <div className='container-fluid'>
                <Form form={form} layout='horizontal' name='detail' onFinish={onSave}>
                    <Card title={"ฝาก"} bordered={false} style={{ margin: 30, height: '100%' }}>
                        <Row>
                            <Col {...formLeftLayout}>
                                <Form.Item
                                    {...inputGroupLayout}
                                    label='ฝากไปยัง'
                                    name='toBank'
                                    rules={[
                                        {
                                            required: true,
                                            message: 'โปรดระบุบัญชีธนาคาร!',
                                        },
                                    ]}>
                                    <Select id="toBank" allowClear  onSelect={accountDetail} onClear={clearDateil}>
                                        {account.map((item, index) => {
                                            return (
                                                <Select.Option key={index} value={item.value} >
                                                    {item.label}
                                                </Select.Option>
                                            );
                                        })}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col {...formRightLayout}>
                                <Form.Item
                                    {...inputGroupLayout}
                                    label='ธนาคาร'
                                    name="accountDetail"
                                    hidden={bankDetail === null}
                                >
                                     {bankDetail}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col {...formLeftLayout}>
                                <Form.Item
                                    {...inputGroupLayout}
                                    label='จำนวนเงินฝาก'
                                    name='depositAmount'
                                    rules={[
                                        {
                                            required: true,
                                            message: 'โปรดระบุจำนวนเงินฝาก!',
                                        },
                                    ]}
                                >
                                    <Input id='depositAmount' />
                                </Form.Item>
                            </Col>
                            <Col {...formRightLayout}>
                                <Form.Item
                                    {...inputGroupLayout}
                                    label='เวลาฝาก'
                                    name="transactionTime"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'โปรดระบุเวลาฝาก!',
                                        },
                                    ]}>
                                    <DatePicker
                                        id="transactionTime"
                                        format="YYYY-MM-DD HH:mm"
                                        name="transactionTime"
                                        showTime
                                    />
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

export default DepositDetail;