import { ColumnsType } from 'antd/lib/table';

import { DataType } from '../types/types';

type ResponseDataType = {
  id: number;
  Fullname: string;
  Days: Array<{ Date: string; End: string; Start: string }>;
};

class UsersStore {
  private readonly BASE_URL = 'http://localhost:8080';

  private readonly firstColumn: ColumnsType<DataType> = [
    {
      title: 'User',
      dataIndex: 'name',
      key: 'name',
    },
  ];

  private _date = '';
  private _data: DataType[] = [];

  getUsers = async () => {
    try {
      const response = await fetch(`${this.BASE_URL}/api/users`);
      const data = await response.json();

      this._date = data[0].Days[0].Date;

      const dataWithKeys = data.map((item: ResponseDataType) => {
        return {
          key: item.id,
          name: item.Fullname,
          time: '4:20',
        };
      });

      this._data = dataWithKeys;
    } catch (e: any) {
      console.log('error', e);
    }
  };

  get date() {
    return this._date;
  }

  get data() {
    return this._data;
  }

  getDaysColumns = () => {
    const date = new Date(this._date);
    const month = date.getMonth() - 1;
    const year = date.getFullYear();

    const daysAmount = new Date(year, month, 0).getDate();

    const columns: ColumnsType<DataType> = [];

    for (let day = 1; day <= daysAmount; day++) {
      columns.push({
        key: day,
        dataIndex: 'time',
        title: day,
      });
    }

    return columns;
  };

  getColumns = () => {
    return [...this.firstColumn, ...this.getDaysColumns()];
  };
}

export default UsersStore;
