import { Button, Table, TableProps, Tooltip } from 'antd';
import { People } from '../types/people';
import { useEffect, useState } from 'react';
import useFetch from '../hooks/fetch';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { deletePeopleById } from '../services/people.service';
import useMessage from '../hooks/message';
import { useOpenEditModal } from '../hooks/modal';
import useRecordId from '../hooks/id';

function TableContainer() {
  const { data, loading, getData } = useFetch();
  const { messageApi } = useMessage();
  const { setOpen } = useOpenEditModal();
  const { setRecordId } = useRecordId();
  const [dataFiltered, setDataFiltered] = useState(data);
  const [tableFilters, setTableFilters] = useState<
    'canVote' | 'cantVote' | 'default'
  >('default');

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
              onClick={() => {
                setRecordId(record.id);
                setOpen(true);
              }}
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

  useEffect(() => {
    if (tableFilters === 'canVote') {
      setDataFiltered(() =>
        data?.filter(
          ({ nationality, age }) => nationality === 'dominican' && age >= 18
        )
      );
    } else if (tableFilters === 'cantVote') {
      setDataFiltered(() =>
        data?.filter(
          ({ nationality, age }) => nationality !== 'dominican' || age < 18
        )
      );
    } else {
      setDataFiltered(data);
    }
  }, [tableFilters, data]);

  return (
    <>
      <div className="mb-2 flex justify-end gap-2 *:w-[150px]">
        <Button type="dashed" onClick={() => setTableFilters('canVote')}>
          Mostrar votantes
        </Button>
        <Button type="dashed" onClick={() => setTableFilters('cantVote')}>
          Mostrar no votantes
        </Button>
        <Button
          type="dashed"
          onClick={() => setTableFilters('default')}
          disabled={tableFilters === 'default'}
        >
          Restablecer
        </Button>
      </div>
      <Table
        rowClassName={(record) =>
          record.nationality === 'dominican' && record.age >= 18
            ? 'bg-green-200/30 hover:bg-green-200/50 transition-colors'
            : 'bg-red-200/30 hover:hover:bg-red-200/50 transition-colors'
        }
        rowHoverable={false}
        columns={columns}
        dataSource={dataFiltered}
        loading={loading}
        size="small"
        rowKey={(record) => record.id}
        pagination={false}
      />
    </>
  );
}

export default TableContainer;
