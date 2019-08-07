import React from 'reactn';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';
import {  Button, Modal } from 'antd';
import uuid from 'uuid/v4';
import Form1 from '../Form/Form1';

const CreateSchema = Yup.object().shape({
  app_name: Yup.string().required('Name is required!'),
  contact_email: Yup.string().email('Invalid email'),
  main_uri: Yup.string().required('URL is required'),
});

const Create = (props) => {


  return (
    <Modal footer={null} visible={props.visible} onCancel={props.closeModal}>
      <h3>Created</h3>
      <Formik
        initialValues={{
          app_name: '',
          contact_email: '',
          main_uri: '',
          app_type: '',
          ecommerce: false,
          timezone: '',
          site_search: false,
          keep_url_fragment: false,
        }}
        validationSchema={CreateSchema}
        onSubmit={(values) => {
          const site = {
            app_id: uuid(),
            group_id: values.group_id,
            app_name: values.app_name,
            contact_email: values.contact_email,
            main_uri: values.main_uri,
            app_type: values.app_type,
            ecommerce: values.ecommerce | 0,
            timezone: values.timezone,
            site_search: values.site_search | 0,
            keep_url_fragment: values.keep_url_fragment | 0,
            activeness: 1,
          };
          axios
            .post('/application/create', site)
            .then(res => {
              console.log(res)
              // props.history.push('/');
              props.closeModal()
            })
            .catch(err => {
              console.log(err);
            });
        }}
        render={props => <Form1 {...props} />}
      />
    </Modal>
  );
};

export default Create;
