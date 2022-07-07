import { FC, useState } from 'react';
import { useEffect } from 'react';

import { Spin } from 'antd';
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
  const [isLoading, setIsLoading] = useState(true);

  const usersStore = new UsersStore();

  useEffect(() => {
    usersStore
      .getUsers()
      .then(() => setUsersData(usersStore.tableData))
      .then(() => setDaysColumnsData(usersStore.getDaysColumns()))
      .then(() => setIsLoading(false));
  }, []);

  return (
    <div className={s.container}>
      {isLoading ? (
        <div className={s.spin_container}>
          <Spin size="large" />
        </div>
      ) : (
        <TableComponent daysColumns={daysColumnsData} usersData={usersData} />
      )}
    </div>
  );
};

export default App;
