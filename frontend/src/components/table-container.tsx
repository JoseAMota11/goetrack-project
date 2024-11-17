import { Button, Table, TableProps, Tooltip } from 'antd';
import { People } from '../types/people';
import { useEffect } from 'react';
import useFetch from '../hooks/fetch';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { deletePeopleById } from '../services/people.service';
import useMessage from '../hooks/message';

function TableContainer() {
  const { data, loading, getData } = useFetch();
  const { messageApi } = useMessage();

  useEffect(() => {
    getData();
  }, []);

  const columns: TableProps<People>['columns'] = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Apellido',
      dataIndex: 'surname',
      key: 'surname',
    },
    {
      title: 'Fecha de Nacimiento',
      dataIndex: 'dateOfBirth',
      key: 'dateOfBirth',
    },
    {
      title: 'Nacionalidad',
      dataIndex: 'nationality',
      key: 'nationality',
    },
    {
      title: 'Edad',
      dataIndex: 'age',
      key: 'age',
    },
    {
      dataIndex: 'actions',
      key: 'actions',
      render: (_, record) => (
        <div className="flex justify-center gap-4">
          <Tooltip title="Editar">
            <Button
              icon={<EditOutlined />}
              onClick={() => console.log(record.id)}
            />
          </Tooltip>
          <Tooltip title="Eliminar" color="#ff4d4f">
            <Button
              icon={<DeleteOutlined />}
              danger
              onClick={async () => {
                const [data, error] = await deletePeopleById(record.id);

                if (data) {
                  messageApi.info(data.message);

                  getData();
                } else {
                  messageApi.error(error?.error);
                }
              }}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <Table
      rowClassName={(record) =>
        record.nationality === 'dominican' && record.age >= 18
          ? 'bg-green-200/40'
          : 'bg-red-200/40'
      }
      rowHoverable={false}
      columns={columns}
      dataSource={data}
      loading={loading}
      size="small"
      rowKey={(record) => record.id}
      pagination={false}
    />
  );
}

export default TableContainer;
