import { FileFilled, PlusOutlined } from '@ant-design/icons';
import { Card, Col, Form, Input, Menu, Row } from "antd";
import { useForm } from 'antd/lib/form/Form';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { formLeftLayout, formRightLayout, inputGroupLayout } from './ManageTrasactionLayout';
import ManageTrasactionTable from './ManageTrasactionTable';

import './manageTrasaction.css';
import Search from './api/Search';
import { Criteria } from './manage-trasaction.model';

const ManageTrasaction: React.FC = () => {
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

    const onUpdateTrasaction = () => {
        search();
    };

    const onNewUser = () => history.push('/news-detail');
    return (
        <>
            <div className='container-fluid'>
                <Form form={form} layout='horizontal' name='detail'>
                    <Card title="ค้นหา" bordered={false} style={{ margin: 30, height: '100%' }}>
                        <Row>
                            <Col {...formLeftLayout}>
                                <Form.Item
                                    {...inputGroupLayout}
                                    label='ชื่อบัญชีธนาคาร'
                                    name='bankAccountName'>
                                    <Input id='bankAccountName' onBlur={search} />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>
                </Form>
                <ManageTrasactionTable
                    data={dataTable}
                    isEditable={isEditable}
                    onUpdateTrasaction={onUpdateTrasaction}
                ></ManageTrasactionTable>
            </div>
        </>
    );
}
export default ManageTrasaction;