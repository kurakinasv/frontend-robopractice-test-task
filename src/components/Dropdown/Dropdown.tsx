import { FC, useRef } from 'react';

import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, InputRef, Space } from 'antd';
import { FilterConfirmProps } from 'antd/lib/table/interface';

export type DropdownProps = {
  setSelectedKeys: (selectedKeys: React.Key[]) => void;
  selectedKeys: React.Key[];
  confirm: (param?: FilterConfirmProps) => void;
  clearFilters?: () => void;
};

const Dropdown: FC<DropdownProps> = ({
  setSelectedKeys,
  selectedKeys,
  confirm,
  clearFilters,
}) => {
  const searchInput = useRef<InputRef>(null);

  const resetHandler = () => {
    if (clearFilters) clearFilters();
    confirm();
  };

  return (
    <div style={{ padding: 8 }}>
      <Input
        ref={searchInput}
        placeholder={`Search name`}
        value={selectedKeys[0]}
        onChange={(e) =>
          setSelectedKeys(e.target.value ? [e.target.value] : [])
        }
        onPressEnter={() => confirm()}
        style={{ marginBottom: 8, display: 'block' }}
      />
      <Space>
        <Button
          type="primary"
          onClick={() => confirm()}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90 }}
        >
          Search
        </Button>
        <Button onClick={resetHandler} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </Space>
    </div>
  );
};

export default Dropdown;
