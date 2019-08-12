import React from 'reactn'
import axios from 'axios';
import { Modal } from 'antd'


const Delete = (props) => {
    const id = props.appId
    console.log(props)

    const handleOk = () => {
        axios.delete("/application/delete", {data: {app_id: id}})
        .then(res => {
            console.log(res)
            props.closeModal()
        })
        .then (err => console.log(err))
    }
    return (
      <Modal visible={props.visible} onCancel={props.closeModal} onOk={handleOk} okText="Yes" cancelText="No">
        Are you sure delete? 
      </Modal>
    )
  }


export default Delete;

