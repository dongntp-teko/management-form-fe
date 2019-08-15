import React, { useState, useEffect } from 'reactn';
import { Formik } from 'formik';
import { Modal } from 'antd';
import * as Yup from 'yup';
import axios from 'axios';
import Form1 from '../Form/Form1';

const UpdateSchema = Yup.object().shape({
  group_id: Yup.string().required('ID group is required!'),
  app_name: Yup.string().required('Name is required!')
  .max(51, "Name have max 50 characters"),
  contact_email: Yup.string().email('Invalid email')
  .max(51, "Email have max 50 characters"),
  main_uri: Yup.string().required('URL is required'),
});
const Update = (props: Object) => {
  const [site, setSite] = useState({});
  const id = props.appId

  useEffect(() => {
    axios
      .post('/application/search', { app_id: id })
      .then(res => {
        console.log(res.data);
        setSite(res.data.data[0]);
      })
      .catch(err => {
        console.log(err);
      });
  }, [id]);

  return (
    <Modal footer={null} visible={props.visible} onCancel={props.closeModal}>
      <h3>Update {site.app_name}</h3>
      <Formik
        enableReinitialize
        initialValues={site}
        validationSchema={UpdateSchema}
        onSubmit={(values) => {
          const body = {
            app_id: values.app_id,
            group_id: values.group_id,
            app_name: values.app_name,
            contact_email: values.contact_email,
            main_uri: values.main_uri,
            app_type: values.app_type,
            ecommerce: values.ecommerce ? 1 : 0,
            timezone: values.timezone,
            site_search: values.site_search ? 1 : 0,
            keep_url_fragment: values.keep_url_fragment ? 1 : 0,
            activeness: 1,
          };

          console.log(body)
          axios
            .post('/application/update', body)
            .then(res => {
              console.log(res.data);
              props.closeModal()  
            })
            .catch(err => {
              console.log(err);
            });
        }}
      
        render={props => props.values.group_id && <Form1 {...props} />}
      />
    </Modal>
  );
};

export default Update;
