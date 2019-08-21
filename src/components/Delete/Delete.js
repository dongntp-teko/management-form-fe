import React, { useGlobal} from 'reactn'
import axios from 'axios';
import { Modal } from 'antd'
import {getToken} from '../../services/action'
import { authConstants } from '../../constant'


const Delete = (props) => {
    const id = props.appId
    const auth = useGlobal(authConstants.KEY_CURRENT_USER)
    console.log(props)

    const handleOk = () => {
        axios.delete("/application/delete", { 
          data: {app_id: id}, 
          headers:  {
            'Authorization': `Bearer ${getToken(auth)}`,
          },
        }
        )
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

