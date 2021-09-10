import { FileFilled, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Col, Form, Input, Menu, Row } from "antd";
import { useForm } from 'antd/lib/form/Form';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Search from './api/Search';
import { Criteria } from './manage-user.model';
import { formLeftLayout, formRightLayout, inputGroupLayout } from './ManageUserLayout';
import ManageUserTable from './ManageUserTable';
import './manage-user.css';

const ManageUser: React.FC = () => {
    const [form] = useForm();
    const history = useHistory();
    const [dataTable, setDataTable] = useState<any[]>([]);
    const [isEditable] = useState(true);
    const onSave = (data: any) => {
    }

    useEffect(() => {
        search();
    }, [])

    const search = () => {
        Search(prepareData())
        .then((res: any) => {
          setDataTable(res?.data ? res?.data : []);
        })
        .catch(() => {
        });
    };

    const prepareData = (): Criteria => {
        const param: Criteria = form.getFieldsValue();
        Object.keys(param).forEach((key: any) => {
          const keySpecific: keyof Criteria = key;
          if (!param[keySpecific]) {
            delete param[keySpecific];
          }
        });
        return param;
      };

    const onDeleted = () => {
    };

    const onNewUser = () => history.push('/manage-user-detail');
    return (
        <>
            <Menu mode='horizontal' triggerSubMenuAction='click'>
                <Menu.SubMenu
                    key='SubMenu'
                    title={
                        <div className='flex items-center'>
                            <FileFilled />
                            <span>Manage User</span>
                        </div>
                    }>
                    <Menu.Item
                        onClick={() => onNewUser()}
                        key='setting:1'
                        style={{
                            color: '#333',
                        }}
                        className='flex items-center'
                        icon={<PlusOutlined />}>
                        New
                    </Menu.Item>
                </Menu.SubMenu>
            </Menu>
            <div className='container-fluid'>
                <Form form={form} layout='horizontal' name='detail'>
                    <Card title="Search" bordered={false} style={{ margin: 30, height: '100%' }}>
                        <Row>
                            <Col {...formLeftLayout}>
                                <Form.Item
                                    {...inputGroupLayout}
                                    label='name'
                                    name='name'>
                                    <Input id='name' onBlur={search} />
                                </Form.Item>
                            </Col>
                            <Col {...formRightLayout}>
                                <Form.Item
                                    {...inputGroupLayout}
                                    label='lastname'
                                    name='lastname'
                                    >
                                    <Input id='lastname' onBlur={search} />
                                </Form.Item>
                            </Col>
                        </Row>


                    </Card>

                </Form>
                <ManageUserTable
                    data={dataTable}
                    isEditable={isEditable}
                    onDeleted={onDeleted}
                ></ManageUserTable>
            </div>
        </>
    );
}
export default ManageUser;