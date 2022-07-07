import { FC, useRef } from 'react';

import { SearchOutlined } from '@ant-design/icons';
import { InputRef } from 'antd';
import Table, { ColumnsType, ColumnType } from 'antd/lib/table';

import { DataType } from '../../types/types';
import timeColumnsSorter from '../../utils/timeColumnsSorter';
import Dropdown from '../Dropdown';
import s from './TableComponent.module.scss';

type TableComponentProps = {
  usersData: DataType[];
  daysColumns: ColumnsType<DataType>;
};

const TableComponent: FC<TableComponentProps> = ({
  usersData,
  daysColumns,
}) => {
  const searchInput = useRef<InputRef>(null);

  const getUserColumnSearchProps = (): ColumnType<DataType> => ({
    filterDropdown: (props) => <Dropdown {...props} />,

    filterIcon: (filtered: boolean) => (
      <SearchOutlined
        style={{ color: filtered ? '#545479' : undefined, fontSize: '18px' }}
      />
    ),

    // determines if the row is displayed when filtered
    onFilter: (value, record) =>
      record['name']
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),

    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  const columns: ColumnsType<DataType> = [
    {
      title: 'User',
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
      width: 180,
      defaultSortOrder: 'ascend',
      sorter: (a, b) => ([a.name, b.name].sort()[0] === a.name ? -1 : 1),
      sortDirections: ['descend'],
      ...getUserColumnSearchProps(),
    },
    ...daysColumns,
    {
      title: 'Monthly',
      dataIndex: 'monthly',
      key: 'monthly',
      sorter: (a, b) => timeColumnsSorter(a.monthly, b.monthly),
      fixed: 'right',
      width: 120,
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={usersData}
      scroll={{ x: 1300 }}
      className={s.table}
    />
  );
};

export default TableComponent;
