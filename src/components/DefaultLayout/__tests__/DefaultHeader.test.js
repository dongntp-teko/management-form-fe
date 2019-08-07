import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from 'react-testing-library';
import 'react-testing-library/cleanup-after-each';
import { setGlobal } from 'reactn';
import { languageConstants, localStorageConstants } from 'constant';
import i18n from 'i18n';
import DefaultHeader from '../DefaultHeader';

i18n.changeLanguage(languageConstants.VIETNAM);

const props = {
  onLogout: () => {},
};

setGlobal({
  [localStorageConstants.NOTIFICATION_KEY]: [
    {
      id: 1,
      title: 'hello',
      message: 'hello',
      createdAt: new Date().toISOString(),
      type: 'success',
    },
  ],
});

describe('test DefaultHeader component', () => {
  it('should render correctly', () => {
    const { getByTestId, container } = render(<DefaultHeader language="vi" />);
    fireEvent.click(getByTestId('seen-all'));
    fireEvent.click(getByTestId('view-all'));
    expect(container.firstChild).toMatchSnapshot();
  });
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <MemoryRouter>
      <DefaultHeader language="vi" />
    </MemoryRouter>,
    div,
  );
  ReactDOM.unmountComponentAtNode(div);
});

it('test click logout', () => {
  const wrapper = mount(
    <MemoryRouter>
      <DefaultHeader language="vi" {...props} />
    </MemoryRouter>,
  );
  wrapper.find('button#log-out-btn').simulate('click');
});
