import { FC, useEffect, useRef, useState } from 'react';

import { SearchOutlined } from '@ant-design/icons';
import { Empty, InputRef } from 'antd';
import Table, { ColumnsType, ColumnType } from 'antd/lib/table';
import { ResizeCallbackData } from 'react-resizable';

import { DataType } from '../../types/types';
import monthlyColumnSorter from '../../utils/monthlyColumnSorter';
import Dropdown from '../Dropdown';
import ResizableTitle from '../ResizableTitle';
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

  const [columns, setColumns] = useState<ColumnsType<DataType>>([]);

  useEffect(() => {
    setColumns([
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
        sorter: (a, b) => monthlyColumnSorter(a.monthly, b.monthly),
        fixed: 'right',
        width: 130,
        ellipsis: true,
      },
    ]);
  }, []);

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

  const handleResize =
    (index: number) =>
    (_: React.SyntheticEvent<Element>, { size }: ResizeCallbackData) => {
      const newColumns = [...columns];
      newColumns[index] = {
        ...newColumns[index],
        width: size.width,
      };
      setColumns(newColumns);
    };

  const mergeColumns: ColumnsType<DataType> = columns.map((col, index) => ({
    ...col,
    onHeaderCell: (column) => ({
      width: (column as ColumnType<DataType>).width,
      onResize: handleResize(index),
    }),
  }));

  return (
    <Table
      components={{
        header: {
          cell: ResizableTitle,
        },
      }}
      columns={mergeColumns}
      dataSource={usersData}
      scroll={{ x: 1300 }}
      className={s.table}
      locale={{
        emptyText: (
          <Empty
            description={<div className={s.empty}>Nothing here :c</div>}
            image={Empty.PRESENTED_IMAGE_DEFAULT}
          />
        ),
      }}
    />
  );
};

export default TableComponent;
