import { DeleteOutlined } from '@ant-design/icons';
import { Button, Modal, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Resizable } from 'react-resizable';

const initColumns: any[] = [
  {
    title: 'ธุรกรรม',
    dataIndex: 'transaction',
    key: 'transaction',
    width: 300,
    sorter: (a: any, b: any) => {
      a = a.transaction || '';
      b = b.transaction || '';
      return a.localeCompare(b);
    },
  },
  {
    title: 'จำนวน',
    dataIndex: 'amount',
    key: 'amount',
    width: 300,
    sorter: (a: any, b: any) => {
      a = a.amount || '';
      b = b.amount || '';
      return a.localeCompare(b);
    },
  },
  {
    title: 'สถานะ',
    dataIndex: 'status',
    key: 'status',
    width: 300,
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

function DepositWithdrawTable(props: {
  data: any[];
  isEditable: boolean;
}) {
  const [columns, setColumns] = useState(initColumns);
  const { data, isEditable } = props;

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

  const notifySuccess = (message?: string) =>
    toast.success(message || 'Successful');
  const notifyError = (message?: string) =>
    toast.error(message || 'Unsuccessful');

  return (
    <div className="margin-top" style={{ margin: 30, height: '100%' }}>
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

export default DepositWithdrawTable;
