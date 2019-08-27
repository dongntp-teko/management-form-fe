// @flow
import React from 'reactn';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Modal } from 'antd';
import uuid from 'uuid/v4';
import { requestServices } from 'services';
import Form1 from '../Form/Form1';

const CreateSchema = Yup.object().shape({
  app_name: Yup.string()
    .required('Name is required!')
    .max(51, 'Name have max 50 characters'),
  contact_email: Yup.string()
    .email('Invalid email')
    .max(51, 'Email have max 50 characters'),
  main_uri: Yup.string().required('URL is required'),
  group_id: Yup.number().required('Group is required'),
});

const Create = (props: Object) => {
  const { visible, closeModal } = props;

  return (
    <Modal footer={null} visible={visible} onCancel={closeModal}>
      <h3>Created</h3>
      <Formik
        initialValues={{
          app_name: '',
          contact_email: '',
          ecommerce: false,
          timezone: 'UTC+7',
          site_search: false,
          keep_url_fragment: false,
        }}
        validationSchema={CreateSchema}
        onSubmit={values => {
          const site = {
            app_id: uuid(),
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
          console.log(site);
          requestServices.apiClient
            .post('/application/create', site)
            .then(res => {
              console.log(res);
              // props.history.push('/');
              props.closeModal();
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
