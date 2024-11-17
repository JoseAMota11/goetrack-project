import { Table, TableProps } from 'antd';
import { People } from '../types/people';
import { useEffect } from 'react';
import useFetch from '../hooks/fetch';

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
];

function TableContainer() {
  const { data, loading, getData } = useFetch();

  useEffect(() => {
    getData();
  }, []);

  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={loading}
      rowKey={(record) => record.id}
    />
  );
}

export default TableContainer;
