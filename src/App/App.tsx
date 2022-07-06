import { FC, useState } from 'react';
import { useEffect } from 'react';

import '../styles/index.css';
import { ColumnsType } from 'antd/lib/table';

import TableComponent from '../components/TableComponent';
import UsersStore from '../store/UsersStore';
import { DataType } from '../types/types';

const App: FC = () => {
  const [usersData, setUsersData] = useState<DataType[]>([]);
  const [daysColumnsData, setDaysColumnsData] = useState<ColumnsType<DataType>>(
    []
  );

  const usersStore = new UsersStore();

  useEffect(() => {
    usersStore
      .getUsers()
      .then(() => setUsersData(usersStore.tableData))
      .then(() => setDaysColumnsData(usersStore.getDaysColumns()));
  }, []);

  return <TableComponent daysColumns={daysColumnsData} usersData={usersData} />;
};

export default App;
