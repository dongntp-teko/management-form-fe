import React from 'react';
import { Button } from 'antd/lib/index';

const pageSizes = ['10', '15', '25', '50', '100'];

const wirdPagination = {
  current: 1,
  pageSize: 10,
  showTotal: (total, range) => (
    <Button type="dashed">
      <span style={{ fontSize: 'medium', color: '#333' }}>
        {`《 ${range[0]} - ${range[1]} 》•• ${total} bản ghi`}
      </span>
    </Button>
  ),
  showSizeChanger: true,
  pageSizeOptions: ['5', '10', '20', '50'],
  total: 0,
};

export default {
  pageSizes,
  wirdPagination,
};
