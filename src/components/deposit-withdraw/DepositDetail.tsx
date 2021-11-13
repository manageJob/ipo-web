import { AutoComplete, Button, Card, Col, DatePicker, Form, Input, Modal, notification, Popconfirm, Row, Select } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'antd/lib/form/Form';
import Axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom';
import { formLeftLayout, formRightLayout, inputGroupLayout } from './DepositWithdrawLayout';
import { DropDrown } from '../../models/DropDrown.model';
import { ContextItems } from '../../context/ContextItems';
import { User } from '../../manage-user/manage-user.model';
import { default as dayjs, default as format } from 'dayjs';
import GetAccount from './api/GetAccount';
import getBankDetail from './api/GetManageUser';


const DepositDetail: React.FC = () => {
    const { setBreadcrumbItems } = useContext(ContextItems);
    const [isDisabledModel, setIsDisabledModel] = useState(true);
    const [userId, setUserId] = useState<any | null>(null);
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
                                //  initialValue={format()}
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
                                    name="timeDeposit"
                                    //  initialValue={format()}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'โปรดระบุเวลาฝาก!',
                                        },
                                    ]}>
                                    <DatePicker
                                        id="timeDeposit"
                                        // onChange={onChangeEffectiveDateFrom}
                                        format="YYYY-MM-DD HH:mm"
                                        name="timeDeposit"
                                        showTime
                                    />
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

export default DepositDetail;