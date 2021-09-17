import { Button, Card, Col, Form, Input, Modal, notification, Row  } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { ContextItems } from '../context/ContextItems';
import { useForm } from 'antd/lib/form/Form';
import { formLeftLayout, formRightLayout, inputGroupLayout } from './NewsLayout';
import { LocationParam, News } from './news.model';
import { DropDrown } from '../models/DropDrown.model';
import Axios from 'axios';
import AddNews from './api/AddNews';
import { useHistory, useLocation } from 'react-router-dom';
import GetNews from './api/GetNews';
import UpdateNews from './api/UpdateNews';
import TextArea from 'antd/lib/input/TextArea';

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
        if (locationState?.id) {
            GetNews(locationState.id)
                .then((res: any) => {
                    populateData(res?.data);
                })
                .catch((err) => {
                    openNotificationError('failed')
                });
        }
    }, [locationState]); // eslint-disable-line

    const populateData = (data: News) => {
        form.setFieldsValue({
            name: data.name,
            detail: data.detail,
        });
    };

    const prepareData = (data: any) => {
        const userInfo: News = {
            name: data.name,
            detail: data.detail,
        };
        return userInfo;
    };

    const onSave = (data: any) => {
        if (!locationState?.id) {
            confirm({
                title: 'Do you want to new this news?',
                onOk() {
                    return new Promise((resolve, reject) => {
                        AddNews(prepareData(data))
                            .then(resolve)
                            .catch((err) => reject(err));
                    })
                        .then(() => {
                            openNotificationSuccess();
                            history.push('news');
                        })
                        .catch((err) => {
                            openNotificationError('failed');
                        });
                },
                onCancel() { },
            });
        } else {
            confirm({
                title: 'Do you want to update this news?',
                onOk() {
                    return new Promise((resolve, reject) => {
                        UpdateNews(locationState?.id, prepareData(data))
                            .then(resolve)
                            .catch((err) => reject(err));
                    })
                        .then(() => {
                            openNotificationSuccess();
                            history.push('news');
                        })
                        .catch((err) => {
                            openNotificationError('failed');
                        });
                },
                onCancel() { },
            });
        }
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
                    <Card title={!locationState?.id ? "New News" : "Edit News"} bordered={false} style={{ margin: 30, height: '100%' }}>
                        <Row>
                            <Col {...formLeftLayout}>
                                <Form.Item
                                    {...inputGroupLayout}
                                    label='name'
                                    name='name'
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your name!',
                                        },
                                    ]}>
                                    <Input id='name' />
                                </Form.Item>
                            </Col>
                            <Col {...formRightLayout}>
                                <Form.Item
                                    {...inputGroupLayout}
                                    label='detail'
                                    name='detail'
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your detail!',
                                        },
                                    ]}>
                                    <TextArea rows={1} />
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