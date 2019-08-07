// Created by thanhpd on 3/28/2019
// @flow

import { dateTimeHelper } from 'helpers';
import moment from 'moment-timezone';

moment.tz.setDefault('Asia/Ho_Chi_Minh');

describe('test formatDateTime', () => {
  it('with correct value at +7 timezone', () => {
    const value = dateTimeHelper.formatDateTime('2019-03-28T17:00:00+07');
    expect(value).toEqual('28/03/2019 17:00:00');
  });
  it('with correct value at utc', () => {
    const value = dateTimeHelper.formatDateTime('2019-03-28T17:00:00Z');
    expect(value).toEqual('29/03/2019 00:00:00');
  });
});

describe('test formatTimeWithoutSecond', () => {
  it('with correct value at +7 timezone', () => {
    const value = dateTimeHelper.formatTimeWithoutSecond('2019-03-28T17:00:00+07');
    expect(value).toEqual('17:00');
  });
});

describe('test toDateTimeFormat', () => {
  it('dont return error', () => {
    dateTimeHelper.toDateTimeFormat('dasdasdasd');
  });
});

describe('test getMinutesInDay', () => {
  it('normal case', () => {
    const value = dateTimeHelper.getMinutesInDay(moment('2019-03-28T00:00:00+07'));
    expect(value).toEqual(0);
  });
});

describe('test isExcludeRange', () => {
  it('startMinute <= endMinute', () => {
    const value = dateTimeHelper.isExcludeRange(moment('2019-03-28T00:00:00+07'),
    moment('2019-03-28T00:00:00+07'), {start: '', end: ''});
    expect(value).toEqual(false);
  });

  it('startMinute > endMinute', () => {
    const value = dateTimeHelper.isExcludeRange(moment('2019-03-28T00:12:00+07'),
    moment('2019-03-28T00:00:00+07'), {start: '', end: ''});
    expect(value).toEqual(false);
  });
});
