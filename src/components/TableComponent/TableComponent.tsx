import { FC, useRef } from 'react';

import { SearchOutlined } from '@ant-design/icons';
import { InputRef } from 'antd';
import Table, { ColumnsType, ColumnType } from 'antd/lib/table';

import { DataType } from '../../types/types';
import timeColumnsSorter from '../../utils/timeColumnsSorter';
import Dropdown from '../Dropdown';

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
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
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
      width: '30%',
      ...getUserColumnSearchProps(),
    },
    ...daysColumns,
    {
      title: 'Monthly',
      dataIndex: 'monthly',
      key: 'monthly',
      sorter: (a, b) => timeColumnsSorter(a.monthly, b.monthly),
    },
  ];

  return <Table columns={columns} dataSource={usersData} />;
};

export default TableComponent;
