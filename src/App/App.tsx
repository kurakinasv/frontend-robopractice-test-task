import { FC, useState } from 'react';
import { useEffect } from 'react';

import '../styles/index.css';
import { Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';

import UsersStore from '../store/UsersStore';
import { DataType } from '../types/types';

const App: FC = () => {
  const [usersData, setUsersData] = useState<DataType[]>([]);
  const [columnsData, setColumnsData] = useState<ColumnsType<DataType>>([]);

  const usersStore = new UsersStore();

  useEffect(() => {
    usersStore
      .getUsers()
      .then((res) => setUsersData(usersStore.data))
      .then((res) => setColumnsData(usersStore.getColumns()));
  }, []);

  return <Table columns={columnsData} dataSource={usersData} />;
};

export default App;
