import { CheckOutlined } from '@ant-design/icons';
import { Button, Modal, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Resizable } from 'react-resizable';
import UpdateTransaction from './api/UpdateTransaction';
// import DeleteManageUser from './api/DeleteManageUser';

const initColumns: any[] = [
  {
    title: 'ชื่อธนาคาร',
    dataIndex: 'bankName',
    key: 'bankName',
    width: 100,
    sorter: (a: any, b: any) => {
      a = a.bankName || '';
      b = b.bankName || '';
      return a.localeCompare(b);
    },
  },
  {
    title: 'ชื่อบัญชีธนาคาร',
    dataIndex: 'bankAccountName',
    key: 'bankAccountName',
   
    width: 100,
    sorter: (a: any, b: any) => {
      a = a.bankAccountName || '';
      b = b.bankAccountName || '';
      return a.localeCompare(b);
    },
  },
  {
    title: 'เลขบัญชี',
    dataIndex: 'bankNumber',
    key: 'bankNumber',
    width: 100,
    sorter: (a: any, b: any) => {
      a = a.bankNumber || '';
      b = b.bankNumber || '';
      return a.localeCompare(b);
    },
  },
  {
    title: 'ยอดธุรกรรม',
    dataIndex: 'amount',
    key: 'amount',
    width: 100,
    sorter: (a: any, b: any) => {
      a = a.amount || '';
      b = b.amount || '';
      return a.localeCompare(b);
    },
  },
  {
    title: 'ประเภทธุรกรรม',
    dataIndex: 'type',
    key: 'type',
    width: 100,
    sorter: (a: any, b: any) => {
      a = a.type || '';
      b = b.type || '';
      return a.localeCompare(b);
    },
  },
  {
    title: 'สถานะ',
    dataIndex: 'status',
    key: 'status',
    width: 100,
    fixed: 'right',
    sorter: (a: any, b: any) => {
      a = a.status || '';
      b = b.status || '';
      return a.localeCompare(b);
    },
  },
];

function ResizableTitle(props: any) {
  const { onResize, width, ...restProps } = props;

  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable
      width={width}
      height={0}
      handle={
        <span
          className="react-resizable-handle"
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
      }
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <th {...restProps} />
    </Resizable>
  );
}

function ManageTrasactionTable(props: {
  data: any[];
  isEditable: boolean;
  onUpdateTrasaction: Function;
}) {
  const [columns, setColumns] = useState(initColumns);
  const { data, isEditable, onUpdateTrasaction } = props;

  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);
  const [selectedDeleteData, setSelectedDeleteData] = useState<any[]>([]);
  const [perPage, setPerPage] = useState<number>(50);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [progress, setProgress] = useState(0); // eslint-disable-line
  const confirm = Modal.confirm;
  const history = useHistory();

  data.map((res: any, index: number) => (res.key = index));
  const handleResize = (index: any) => (e: any, { size }: any) => {
    const nextColumns = [...columns];
    nextColumns[index] = {
      ...nextColumns[index],
      width: size.width,
    };
    setColumns(nextColumns);
  };

  useEffect(() => {
    setCurrentPage(1);
    setSelectedRowKeys([]);
    setSelectedDeleteData([]);
  }, [data]); // eslint-disable-line

  const onShowSizeChange = (currentPage: number, recordPerPage: number) => {
    setCurrentPage(currentPage);
    setPerPage(recordPerPage);
  };

  const onChangePage = (page?: number) => {
    setCurrentPage(page ? page : 1);
  };

  const onConfirmDelete = () => {
    confirm({
      title: 'คุณต้องการยืนยันธุรกรรมหรือไม่?',
      onOk() {
        return new Promise((resolve, reject) => {
          setProgress(20);
          UpdateTransaction(selectedDeleteData)
            .then(resolve)
            .catch((err: any) => reject(err));
        })
          .then(() => {
            setProgress(100);
            notifySuccess();
            onUpdateTrasaction();
            setSelectedDeleteData([]);
            setSelectedRowKeys([]);
          })
          .catch((err) => {
            setProgress(100);
            notifyError(err.data.errorMessage);
          });
      },
    });
  };

  const notifySuccess = (message?: string) =>
    toast.success(message || 'Successful');
  const notifyError = (message?: string) =>
    toast.error(message || 'Unsuccessful');

  return (
    <div className="margin-top" style={{ margin: 30, height: '100%' }}>
      {isEditable && (
        <div className="button-delete">
          <Button
            type="primary"
            icon={<CheckOutlined />}
        
            onClick={onConfirmDelete}
            disabled={data.length === 0 || selectedDeleteData.length === 0}
          >
            ยืนยันธุรกรรม
          </Button>
        </div>
      )}
        <Table
          key={1}
          dataSource={data}
          rowSelection={{
            selectedRowKeys,
            onChange: (selectedRows: any, data: any) => {
              const listSeleted: any[] = [];
              data.forEach((dwNewList: any) => {
                listSeleted.push(dwNewList.id);
              });
              setSelectedDeleteData(listSeleted);
              setSelectedRowKeys(selectedRows);
            },
          }}
          components={{
            header: {
              cell: ResizableTitle,
            },
          }}
          pagination={{
            showTotal: (total, range) => {
              return `${range[0]}-${range[1]} of ${total} items`;
            },
            pageSize: perPage,
            current: currentPage,
            pageSizeOptions: ['10', '20', '50', '100'],
            showSizeChanger: true,
            total: data.length,
            onShowSizeChange: onShowSizeChange,
            onChange: onChangePage,
          }}
          columns={columns.map((col: any, index: number) => ({
            ...col,
            onHeaderCell: (column: any) => ({
              width: column.width,
              onResize: handleResize(index),
            }),
          }))}
          size="small"
          bordered
          scroll={{ x: 1300 }}
          onRow={(r) => ({
            onClick: () => {
              history.push(`/manage-user-detail`, { id: r.id });
            },
          })}
        />
    </div>
  );
}

export default ManageTrasactionTable;
