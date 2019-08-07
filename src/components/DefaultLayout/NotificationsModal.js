// @flow
import React from 'react';
import { Modal, Table } from 'antd';
import { dateTimeHelper } from 'helpers';
import { defaultConfigs, notificationConstants } from 'constant';
import type { NotificationT } from 'types/notification';

type PropT = {
  visible: boolean,
  onCancel: Function,
  notifications: Array<NotificationT>,
}


const columns = [
  {
    title: 'Tiêu đề',
    dataIndex: 'title',
  },
  {
    title: 'Nội dung',
    dataIndex: 'message',
  },
  {
    title: 'Type',
    dataIndex: 'type',
    filters: Object.values(notificationConstants.types),
    onFilter: (value, record) => record.type.indexOf(value) === 0,
    render: type => <span className={`p-2 badge badge-${type}`}>{type}</span>,
  },
  {
    title: 'Thời gian tạo',
    dataIndex: 'createdAt',
    render: createdAt => dateTimeHelper.formatDateTime(createdAt),
  },
];

export default ({visible, onCancel, notifications}: PropT) => {
  const tableConfigs = {
    ...defaultConfigs.antTable, locale: {
      emptyText: 'Không có thông báo',
    },
  };
  return (
    <Modal
      title={<div className="text-center">Thông báo</div>}
      centered
      closable
      footer={null}
      onCancel={onCancel}
      visible={visible}
      width={1000}
    >
      <Table
        dataSource={notifications}
        columns={columns}
        {...tableConfigs}
        rowKey="id"
      />;
    </Modal>
  );
};
