import React from 'react';
import { mount } from 'enzyme';
import TestRenderer from 'react-test-renderer';
import Application from '../Application';

describe('ThemeList', () => {
  it('should match snapshot', async done => {
    const container = TestRenderer.create(<Application />);
    expect(container.toJSON()).toMatchSnapshot();
    done();
  });

  describe('test', () => {
    test('data table should match reponse', async done => {
      console.log(123);
      const container = mount(<Application />);
      // await new Promise(resolve => setTimeout(resolve, 0));
      container.update();
      const table = container
        .find('table')
        .find('thead')
        .find('tr')
        .find('th');

      // const tr = table.findByType('tbody').findByType('tr')
      console.log(table);

      expect(table.length).toBe(10);

      console.log(table.map(item => item.text()));
      done();
    });
  });

  // describe('Functional', () => {
  //   describe('could handle form fields', () => {
  //     let findById;
  //     categoryServices.getMethods = jest.fn(() =>
  //       Promise.resolve({ data: [{ id: 4 }] }),
  //     );

  //     // beforeEach(async () => {
  //     //   axiosMocker.onGet({ data: { content: [{ id: 1 }], totalRecord: 1 } });

  //     //   const container = TestRenderer.create(
  //     //     <MemoryRouter>
  //     //       <ThemeList />
  //     //     </MemoryRouter>,
  //     //   );
  //     //   await axiosResponse();

  //     //   findById = id => container.root.findByProps({ id });
  //     // });

  //     it('onChange Agent', done => {
  //       const globalState = {
  //         paymentAgents: [{ id: 1 }, { id: 2 }],
  //         paymentChannels: [{ id: 2, agentId: 1 }],
  //         paymentServices: [{ id: 3 }],
  //       };
  //       setGlobal({ ...globalState });

  //       findById('channelId').props.onChange(2);
  //       expect(findById('agentId').props.value).toEqual(undefined);

  //       findById('agentId').props.onChange(1);
  //       expect(findById('channelId').props.value).toEqual(2);
  //       findById('agentId').props.onChange(2);
  //       expect(findById('channelId').props.value).toEqual(undefined);

  //       done();
  //     });

  //     it('could change active record', async done => {
  //       const updateTheme = jest.spyOn(themeServices, 'updateTheme');
  //       axiosMocker.onPut({ data: {} });

  //       const confirmActiveRecord = findById('confirm-active-record-1');
  //       confirmActiveRecord.props.onConfirm();
  //       await axiosResponse();

  //       expect(updateTheme).toBeCalledWith({
  //         benchId: 1,
  //         isActive: true,
  //       });
  //       done();
  //     });
  //   });

  //   describe('could handle table change', () => {
  //     let findByClass;
  //     categoryServices.getMethods = jest.fn(() =>
  //       Promise.resolve({ data: [{ id: 4 }] }),
  //     );

  //     beforeEach(async () => {
  //       axiosMocker.onGet({ data: { content: [], totalRecord: 12 } });

  //       const container = TestRenderer.create(
  //         <MemoryRouter>
  //           <ThemeList />
  //         </MemoryRouter>,
  //       );
  //       await axiosResponse();

  //       findByClass = className => container.root.findByProps({ className });
  //     });

  //     it('onChange Table', async done => {
  //       const searchTheme = jest.spyOn(themeServices, 'searchTheme');

  //       axiosMocker.onGet({ data: { content: [], totalRecord: 12 } });

  //       findByClass(' ant-pagination-next').props.onClick();
  //       await axiosResponse();

  //       expect(searchTheme).toBeCalledWith({ page: 1, size: 10 });
  //       done();
  //     });
  // });
  // });
});
