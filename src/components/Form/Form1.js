import React, { useEffect, useState } from 'reactn';
import { Select } from 'antd';
import axios from 'axios';
import CheckBox from './CheckBox';

const Form1 = props => {
  const { Option } = Select;

  const [apps, setApps] = useState([]);

  console.log(props.values);

  useEffect(() => {
    axios
      .get('/app_group/get')
      .then(res => {
        console.log(res.data);
        setApps(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  return (
    <form onSubmit={props.handleSubmit}>
      <div className="form-row">
        <div className="col-sm-6 form-group">
          <Select
            placeholder="ID Group"
            defaultValue={props.values.group_id}
            onChange={props.handleChange('group_id')}
            onBlur={props.handleBlur}
          >
            {apps.map(app => (
              <Option value={app.group_id}> {app.group_id}</Option>
            ))}
          </Select>
          {props.errors.group_id && props.touched.group_id && (
            <div className="err">* {props.errors.group_id}</div>
          )}

          {/* <input 
                                className="form-control"
                                type="text"
                                name="group_id"
                                value={props.values.group_id}
                                placeholder="ID"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                            /> */}
        </div>
      </div>

      <div className="form-group">
        <input
          className="form-control"
          type="text"
          name="app_name"
          value={props.values.app_name}
          placeholder="Name"
          onChange={props.handleChange}
          onBlur={props.handleBlur}
        />
        {props.errors.app_name && props.touched.app_name && (
          <div className="err">* {props.errors.app_name}</div>
        )}
      </div>
      <div className="form-group">
        <input
          className="form-control"
          type="text"
          name="contact_email"
          value={props.values.contact_email}
          placeholder="Email"
          onChange={props.handleChange}
          onBlur={props.handleBlur}
        />
        {props.errors.contact_email && props.touched.contact_email && (
          <div className="err">* {props.errors.contact_email}</div>
        )}
      </div>

      <div className="form-group">
        <input
          className="form-control"
          type="text"
          name="main_uri"
          value={props.values.main_uri}
          placeholder="Main Uri"
          onChange={props.handleChange}
          onBlur={props.handleBlur}
        />
        {props.errors.main_uri && props.touched.main_uri && (
          <div className="err">* {props.errors.main_uri}</div>
        )}
      </div>
      <div className="form-group">
        <input
          className="form-control"
          type="text"
          name="timezone"
          value={props.values.timezone}
          placeholder="Timezone (Ex: UTC+7)"
          onChange={props.handleChange}
          onBlur={props.handleBlur}
        />
        {props.errors.timezone && props.touched.timezone && (
          <div className="err">* {props.errors.timezone}</div>
        )}
      </div>
      <div className="form-group">
        <input
          className="form-control"
          type="text"
          name="app_type"
          value={props.values.app_type}
          placeholder="App Type (Ex: Website)"
          onChange={props.handleChange}
          onBlur={props.handleBlur}
        />
      </div>

      <div className="form-row form-group">
        <CheckBox
          value1={{
            checked: props.values.ecommerce,
            name: 'ecommerce',
            label: 'Ecommerce',
            handleChange: props.handleChange,
          }}
        />
        <CheckBox
          value1={{
            checked: props.values.site_search,
            name: 'site_search',
            label: 'Site Search',
            handleChange: props.handleChange,
          }}
        />
        <CheckBox
          value1={{
            checked: props.values.keep_url_fragment,
            name: 'keep_url_fragment',
            label: 'Keep url fragment',
            handleChange: props.handleChange,
          }}
        />
      </div>
      <div className="form-row">
        <div className="form-group flex-end">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form1;
