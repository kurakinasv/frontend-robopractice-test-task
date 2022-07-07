import { ColumnsType } from 'antd/lib/table';

import { DataType } from '../types/types';
import errorLog from '../utils/errorLog';
import getTimeStringFromMinutes from '../utils/getTimeStringFromMinutes';
import timeColumnsSorter from '../utils/timeColumnsSorter';

type DaysType = {
  Date: string;
  End: string;
  Start: string;
};

type ResponseDataType = {
  id: number;
  Fullname: string;
  Days: DaysType[];
};

class UsersStore {
  private readonly BASE_URL = 'http://localhost:8080';

  private _tableData: DataType[] = [];
  private _responseData: ResponseDataType[] = [];

  getUsers = async () => {
    try {
      const response = await fetch(`${this.BASE_URL}/api/users`);
      const data = await response.json();

      this._responseData = data;

      this._tableData = data.map((item: ResponseDataType) => {
        return {
          key: item.id,
          name: item.Fullname,
          ...this.getEachDayTime(item),
          monthly: this.computeMonthlyTime(item),
        };
      });
    } catch (e: any) {
      errorLog('error', e);
    }
  };

  get tableData() {
    return this._tableData;
  }

  get responseData() {
    return this._responseData;
  }

  computeMonthlyTime = (user: ResponseDataType) => {
    const daysTimeObj = this.getEachDayTime(user);

    const monthlyMins = Object.values(daysTimeObj).reduce((sum, curr) => {
      if (curr === '0') {
        return sum;
      } else {
        const [hours, mins] = curr.split(':');
        const totalMins = +hours * 60 + +mins;
        return sum + totalMins;
      }
    }, 0);

    return getTimeStringFromMinutes(monthlyMins);
  };

  getSpentTime = (start: string, end: string) => {
    const [startH, startM] = start.split('-');
    const [endH, endM] = end.split('-');

    const diff = +endH * 60 + +endM - (+startH * 60 + +startM);

    return getTimeStringFromMinutes(diff);
  };

  // getting spent time for each day of month for given user
  getEachDayTime = (user: ResponseDataType) => {
    const daysMap = new Map<string, string>();

    // to keep valid index of day in case of null time days
    let currentNotNullDay = 1;

    for (let day = 1; day <= 31; day++) {
      const currentDay = user.Days[currentNotNullDay - 1];

      if (this.isDayTimeNotNull(currentDay, day)) {
        const spentTime = this.getSpentTime(
          user.Days[currentNotNullDay - 1].Start,
          user.Days[currentNotNullDay - 1].End
        );

        daysMap.set(`time${day}`, spentTime);

        currentNotNullDay++;
      } else {
        daysMap.set(`time${day}`, '0');
      }
    }

    return Object.fromEntries(daysMap);
  };

  isDayTimeNotNull = (currentDay: DaysType, day: number) => {
    const dayString = currentDay ? currentDay.Date.split('-')[2] : '';
    return Number(dayString) === day;
  };

  getDaysColumns = () => {
    // getting the first date of the first user to get current month and year
    const date = new Date(this.responseData[0].Days[0].Date);
    const month = date.getMonth() - 1;
    const year = date.getFullYear();

    // number of days in current month === columns amount
    const daysInMonth = new Date(year, month, 0).getDate();

    const daysColumns: ColumnsType<DataType> = [];

    for (let day = 1; day <= daysInMonth; day++) {
      daysColumns.push({
        title: day,
        dataIndex: `time${day}`,
        key: day,
        sorter: (a, b) => timeColumnsSorter(a[`time${day}`], b[`time${day}`]),
        width: 70,
        ellipsis: true,
      });
    }

    return daysColumns;
  };
}

export default UsersStore;
