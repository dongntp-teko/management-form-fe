import { storiesOf } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import Region from './Region';

storiesOf('Region', module).add('simple', () => (
  <BrowserRouter>
    <Region />
  </BrowserRouter>
));
