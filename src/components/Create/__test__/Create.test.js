import React from 'react';
import { mount } from 'enzyme';
// import TestRenderer from 'react-test-renderer';
import { mountToJson } from 'enzyme-to-json';
// import MockAdapter from 'axios-mock-adapter';
// import { requestServices } from 'services';
// import { Modal, Input, Button } from 'antd';
import Application from 'components/Application/Application';
import Create from '../Create';

// const next = sec => new Promise(resolve => setTimeout(resolve, sec));
// const mock = new MockAdapter(requestServices.apiClient);

describe('Create', () => {
  describe('snapshots', () => {
    it('with enzyme', async () => {
      const closeModal = mount(<Application />)
        .find('ShowModal')
        .prop('closeModal');

      const props = { visible: true, closeModal };
      const container = mount(<Create {...props} />);
      expect(mountToJson(container)).toMatchSnapshot();
    });
  });
});
