// Created by thanhpd on 5/24/2019
// @flow

import React from 'react';
import { render } from 'react-testing-library';
import 'react-testing-library/cleanup-after-each';
import NotificationsModal from '../NotificationsModal';


const props = {
  visible: true,
  onCancel: () => {},
  notifications: [
    {
      id: 1,
      title: 'hello',
      message: 'hello',
      type: 'success',
      createdAt: new Date().toISOString(),
      seen: false,
    },
  ],
};

describe('test NotificationsModal component', () => {
  it('should render correctly', () => {
    const {container} = render(<NotificationsModal {...props} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
