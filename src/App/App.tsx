import { FC, useState } from 'react';
import { useEffect } from 'react';

import { ColumnsType } from 'antd/lib/table';

import TableComponent from '../components/TableComponent';
import UsersStore from '../store/UsersStore';
import { DataType } from '../types/types';
import s from './App.module.scss';

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

  return (
    <div className={s.container}>
      <TableComponent daysColumns={daysColumnsData} usersData={usersData} />
    </div>
  );
};

export default App;
