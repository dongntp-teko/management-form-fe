import React from 'react';
import { mount } from 'enzyme';
import TestRenderer from 'react-test-renderer';
import { mountToJson } from 'enzyme-to-json';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { Input, Button } from 'antd';
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

      // searchApplication.mockClear();

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

    test("open modal create", async done => {
      
      const container = mount(<Application />);
      
      container.find('#open-modal-create').find(Button).simulate('click');

      await next(0);

      container.update()

      expect(container.find('ShowModal').prop('action')).toEqual('create')
      expect(container.find('ShowModal').prop('visible')).toEqual(true)

      done();
    })

    test("close modal", async done => {
      
      const container = mount(<Application />);

      container.find('#open-modal-create').find(Button).simulate('click');

      container.find('ShowModal').prop('closeModal')()

      await next(0);

      container.update()

      expect(container.find('ShowModal').prop('visible')).toEqual(false)

      done();
    })

    test("open update modal", async done => {
      mock.onPost('/application/search').replyOnce(200, {
        data: [
          { activeness: 1, app_id: 1 },
          { activeness: 0, app_id: 2 },
          { activeness: 1, app_id: 3 },
        ],
      });
      
      const container = mount(<Application />);

      const input = container.find('#input-search').find(Input.Search);

      input.prop('onSearch')('');

      await next(0);

      container.update()

      const td = container
      .find('table')
      .find('tbody')
      .find('tr')
      .first()
      .find('td')

      td.find('#open-modal-update').find(Button).simulate('click')

      await next(0);

      container.update()

      expect(container.find('ShowModal').prop('action')).toEqual('update');
      expect(container.find('ShowModal').prop('visible')).toEqual(true)

      done()
      
    })

    test('open modal delete', async done => {
      mock.onPost('/application/search').replyOnce(200, {
        data: [
          { activeness: 1, app_id: 1 },
          { activeness: 0, app_id: 2 },
          { activeness: 1, app_id: 3 },
        ],
      });
      
      const container = mount(<Application />);

      const input = container.find('#input-search').find(Input.Search);

      input.prop('onSearch')('');

      await next(0);

      container.update()

      const td = container
      .find('table')
      .find('tbody')
      .find('tr')
      .first()
      .find('td')

      td.find('#open-modal-delete').find(Button).simulate('click')

      await next(0);

      container.update()

      expect(container.find('ShowModal').prop('action')).toEqual('delete')
      expect(container.find('ShowModal').prop('visible')).toEqual(true)

      done()
      
    })

    test('icon', async done => {
      mock.onPost('/application/search').replyOnce(200, {
        data: [
          { activeness: 1, app_id: 1, ecommerce: 1, site_search: 0, keep_url_fragment: 1 },
          { activeness: 1, app_id: 3, ecommerce: 0, site_search: 1, keep_url_fragment: 0 },
        ],
      });
      
      const container = mount(<Application />);

      const input = container.find('#input-search').find(Input.Search);

      input.prop('onSearch')('');

      await next(0);

      container.update()

      const td1 = container
      .find('table')
      .find('tbody')
      .find('tr')
      .first()
      .find('td')

      const td2 = container
      .find('table')
      .find('tbody')
      .find('tr')
      .at(1)
      .find('td')

      expect(td1.find("Icon").first().prop('type')).toEqual('check')
      expect(td1.find("Icon").at(1).prop('type')).toEqual('close')
      expect(td1.find("Icon").at(2).prop('type')).toEqual('check')
      expect(td2.find("Icon").first().prop('type')).toEqual('close')
      expect(td2.find("Icon").at(1).prop('type')).toEqual('check')
      expect(td2.find("Icon").at(2).prop('type')).toEqual('close')

      done()
    })

    
   
  });

 
});
