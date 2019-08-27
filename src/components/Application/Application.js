// Created by thanhpd on 6/17/2019
// @flow
import React, { useEffect, useState } from 'reactn';
import { Table, Divider, Icon, Card, Button, Input } from 'antd';
import { applicationService } from 'services/application';
import ShowModal from '../ShowModal/ShowModal';

export default (props: Object) => {
  const [apps, setApps] = useState([{}]);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [stt, setStt] = useState({
    action: '',
    appId: '',
  });
  const getDataFromServer = value => {
    setLoading(true);
    // console.log('searchApplication')
    applicationService
      .searchApplication({ app_name: value })
      .then(response => {
        console.log(response);
        const { data } = response.data;
        setApps(data);
      })
      .catch(error => {
        console.log(error);
      })
      .then(() => {
        setLoading(false);
      });
  };

  const searchName = async value => {
    getDataFromServer(value);
  };

  useEffect(() => {
    getDataFromServer('');
    // getData()
  }, []);

  const openModal = (value, id) => {
    setVisible(true);
    setStt({ action: value, appId: id });
  };

  const closeModal = () => {
    setVisible(false);
    setStt({ action: '', appId: '' });
    if (props.history) props.history.push('/app');
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'app_id',
    },
    {
      title: 'Group',
      dataIndex: 'group_name',
    },
    {
      title: 'Name',
      dataIndex: 'app_name',
    },
    {
      title: 'Main Uri',
      dataIndex: 'main_uri',
    },
    {
      title: 'Timezone',
      dataIndex: 'timezone',
    },
    {
      title: 'Type',
      dataIndex: 'app_type',
    },
    {
      title: 'ecommerce',
      dataIndex: 'ecommerce',
      render: text =>
        !text ? (
          <Icon type="close" className="color-red" />
        ) : (
          <Icon type="check" className="color-green" />
        ),
    },
    {
      title: 'Site search',
      dataIndex: 'site_search',
      render: text =>
        !text ? (
          <Icon type="close" className="color-red" />
        ) : (
          <Icon type="check" className="color-green" />
        ),
    },
    {
      title: 'Keep Url Fragment',
      dataIndex: 'keep_url_fragment',
      render: text =>
        !text ? (
          <Icon type="close" className="color-red" />
        ) : (
          <Icon type="check" className="color-green" />
        ),
    },
    {
      title: '',
      render: (text, record) => {
        return (
          <div>
            <Button
              type="link"
              id="open-modal-update"
              onClick={() => openModal('update', record.app_id)}
            >
              Update
            </Button>
            <Divider type="vertical" />
            <Button
              type="link"
              id="open-modal-delete"
              onClick={() => openModal('delete', record.app_id)}
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <div>
        <h1>Dashboard</h1>
        <div className="mb10 flex-space-between">
          <Input.Search
            id="input-search"
            placeholder="Search name"
            onSearch={value => searchName(value)}
            style={{ width: 200 }}
          />
          <Button
            id="open-modal-create"
            type="primary"
            onClick={() => openModal('create')}
          >
            <Icon type="plus" /> Create new app
          </Button>
        </div>

        <ShowModal
          visible={visible}
          closeModal={closeModal}
          appId={stt.appId}
          action={stt.action}
        />
      </div>
      <Card>
        <Table
          id="table_app"
          rowKey="app_id"
          dataSource={apps.filter(app => app.activeness)}
          columns={columns}
          loading={loading}
          pagination={false}
        />
      </Card>
    </div>
  );
};
