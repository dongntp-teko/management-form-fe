import { storiesOf } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import Login from 'components/Login';

storiesOf('Test', module).add('simple', () => (
  <BrowserRouter>
    <Login />
  </BrowserRouter>
));
