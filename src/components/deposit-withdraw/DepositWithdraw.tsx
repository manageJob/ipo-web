import { FileFilled, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Col, Form, Input, Menu, Row } from "antd";
import { useForm } from 'antd/lib/form/Form';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import DepositWithdrawTable from './DepositWithdrawTable';
import './deposit-withdraw.css';
import GetTransaction from './api/GetTransaction';

const DepositWithdraw: React.FC = () => {
    const history = useHistory();
    const [dataTable, setDataTable] = useState<any[]>([]);
    const [isEditable] = useState(true);

    const onNewDeposit = () => history.push('/deposit-detail');

    const onNewWithdraw = () => history.push('/withdraw-detail');

    useEffect(() => {
        getTransaction();
    }, [])

    const getTransaction = () => {
        const userId = localStorage.getItem('userId');
        GetTransaction(userId)
        .then((res: any) => {
          setDataTable(res?.data ? res?.data : []);
        })
        .catch(() => {
        });
    };


    return (
        <>
            <Menu mode='horizontal' triggerSubMenuAction='click'>
                <Menu.SubMenu
                    key='SubMenu'
                    title={
                        <div className='flex items-center'>
                            <FileFilled />
                            <span>ฝาก/ถอน</span>
                        </div>
                    }>
                    <Menu.Item
                        onClick={() => onNewDeposit()}
                        key='setting:1'
                        style={{
                            color: '#333',
                        }}
                        className='flex items-center'
                        icon={<PlusOutlined />}>
                        ฝาก
                    </Menu.Item>
                    <Menu.Item
                        onClick={() => onNewWithdraw()}
                        key='setting:2'
                        style={{
                            color: '#333',
                        }}
                        className='flex items-center'
                        icon={<PlusOutlined />}>
                       ถอน
                    </Menu.Item>
                </Menu.SubMenu>
            </Menu>
            <div className='container-fluid'>
                <DepositWithdrawTable
                    data={dataTable}
                    isEditable={isEditable}
                ></DepositWithdrawTable>
            </div>
        </>
    );
}
export default DepositWithdraw;