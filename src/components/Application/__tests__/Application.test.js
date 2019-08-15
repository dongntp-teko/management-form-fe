import React from 'react';
import { mount } from 'enzyme';
import TestRenderer from 'react-test-renderer';
import { mountToJson } from 'enzyme-to-json';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { Input } from 'antd';
import { applicationService } from 'services/application';
import Application from '../Application';

const next = sec => new Promise(resolve => setTimeout(resolve, sec));
const mock = new MockAdapter(axios);

describe('ThemeList', () => {
  describe('snapshots', () => {
    beforeEach(async () => {
      mock.onPost('/application/search').replyOnce(200, {
        data: [],
      });
    });
    it('should match snapshot', async done => {
      const container = TestRenderer.create(<Application />);
      expect(container.toJSON()).toMatchSnapshot();
      done();
    });

    it('snapshots enzyme', () => {
      const tree = mount(<Application />);
      expect(mountToJson(tree)).toMatchSnapshot();
    });
  });

  describe('test', () => {
    beforeEach(async () => {
      mock.onPost('/application/search').replyOnce(200, {
        data: [],
      });
    });
    test('header', async done => {
      const container = mount(<Application />);
      const target = container
        .find('table')
        .find('thead')
        .find('tr')
        .find('th');

      expect(target.map(item => item.text())).toEqual([
        'ID',
        'Group',
        'Name',
        'Main Uri',
        'Timezone',
        'Type',
        'ecommerce',
        'Site search',
        'Keep Url Fragment',
        '',
      ]);

      done();
    });

    test('body', async done => {
      mock.onPost('/application/search').replyOnce(200, {
        data: [
          { activeness: 1, app_id: 1 },
          { activeness: 0, app_id: 2 },
          { activeness: 1, app_id: 3 },
        ],
      });

      const container = mount(<Application />);

      const button = container.find('#input-search').find(Input.Search);

      button.prop('onSearch')('');
      await next(0);
      container.update();

      expect(
        container
          .find('table')
          .find('tbody')
          .find('tr'),
      ).toHaveLength(2);

      done();
    });

    test('search input server', async done => {
      mock.onPost('/application/search').replyOnce(200, {
        data: [
          { activeness: 1, app_id: 1 },
          { activeness: 0, app_id: 2 },
          { activeness: 1, app_id: 3 },
        ],
      });
      const searchApplication = jest.spyOn(
        applicationService,
        'searchApplication',
      );
      
      const container = mount(<Application />);

      searchApplication.mockClear();

      const input = container.find('#input-search').find(Input.Search);

      input.prop('onSearch')('123456');
      // await next(0);
      // container.update();

      expect(searchApplication).toBeCalledWith({
        app_name: '123456',
      });

      // expect(searchApplication).toBeCalledTimes(1);

      done();
    });
  });
});
