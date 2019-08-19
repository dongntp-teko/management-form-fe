import React from 'react';
import { mount } from 'enzyme';
import TestRenderer from 'react-test-renderer';
import { mountToJson } from 'enzyme-to-json';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { applicationService } from 'services/application';
import Create from '../Create';

const next = sec => new Promise(resolve => setTimeout(resolve, sec));
const mock = new MockAdapter(axios);

describe('')