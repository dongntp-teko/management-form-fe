import React from 'react'
import Create from '../Create/Create';
import Update from '../Update/Update';
import Delete from '../Delete/Delete';

const ShowModal = (props) => {
  return (
    <div>
      {props.action === 'create' && (
      <Create visible={props.visible} closeModal={props.closeModal} />
    )}
      {props.action === 'update' && (
      <Update visible={props.visible} closeModal={props.closeModal} appId={props.appId} />
    )}
      {props.action === 'delete' && (
      <Delete visible={props.visible} closeModal={props.closeModal} appId={props.appId} />
    )}
    </div>
  )
}

export default ShowModal