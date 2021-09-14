import { DeleteOutlined } from '@ant-design/icons';
import { Button, Modal, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Resizable } from 'react-resizable';
import DeleteManageUser from './api/DeleteManageUser';

const initColumns: any[] = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
    width: 200,
    sorter: (a: any, b: any) => {
      a = a.name || '';
      b = b.name || '';
      return a.localeCompare(b);
    },
  },
  {
    title: 'Lastname',
    dataIndex: 'lastname',
    key: 'lastname',
    fixed: 'left',
    width: 200,
    sorter: (a: any, b: any) => {
      a = a.lastname || '';
      b = b.lastname || '';
      return a.localeCompare(b);
    },
  },
  {
    title: 'Username',
    dataIndex: 'username',
    key: 'username',
    fixed: 'left',
    width: 200,
    sorter: (a: any, b: any) => {
      a = a.username || '';
      b = b.username || '';
      return a.localeCompare(b);
    },
  },
  {
    title: 'Telephone Number',
    dataIndex: 'telephoneNumber',
    key: 'telephoneNumber',
    width: 200,
    sorter: (a: any, b: any) => {
      a = a.telephoneNumber || '';
      b = b.telephoneNumber || '';
      return a.localeCompare(b);
    },
  },
  {
    title: 'Bank Name',
    dataIndex: 'bankName',
    key: 'bankName',
    width: 200,
    sorter: (a: any, b: any) => {
      a = a.bankName || '';
      b = b.bankName || '';
      return a.localeCompare(b);
    },
  },
  {
    title: 'Bank Number',
    dataIndex: 'bankNumber',
    key: 'bankNumber',
    width: 200,
    sorter: (a: any, b: any) => {
      a = a.bankNumber || '';
      b = b.bankNumber || '';
      return a.localeCompare(b);
    },
  },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
    width: 200,
    sorter: (a: any, b: any) => {
      a = a.role || '';
      b = b.role || '';
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

function ManageUserTable(props: {
  data: any[];
  isEditable: boolean;
  onDeleted: Function;
}) {
  const [columns, setColumns] = useState(initColumns);
  const { data, isEditable, onDeleted } = props;

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
      title: 'Do you want to delete this dw new list config?',
      onOk() {
        return new Promise((resolve, reject) => {
          setProgress(20);
          DeleteManageUser(selectedDeleteData)
            .then(resolve)
            .catch((err: any) => reject(err));
        })
          .then(() => {
            setProgress(100);
            notifySuccess();
            onDeleted();
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
            icon={<DeleteOutlined />}
            danger
            onClick={onConfirmDelete}
            disabled={data.length === 0 || selectedDeleteData.length === 0}
          >
            Delete
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

export default ManageUserTable;
