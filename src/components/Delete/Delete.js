import React from 'reactn';
import { Modal } from 'antd';
import { requestServices } from 'services';

const Delete = props => {
  const id = props.appId;
  console.log(props);

  const handleOk = () => {
    requestServices.apiClient
      .delete('/application/delete', {
        data: { app_id: id },
      })
      .then(res => {
        console.log(res);
        props.closeModal();
      })
      .then(err => console.log(err));
  };
  return (
    <Modal
      visible={props.visible}
      onCancel={props.closeModal}
      onOk={handleOk}
      okText="Yes"
      cancelText="No"
    >
      Are you sure delete?
    </Modal>
  );
};

export default Delete;
