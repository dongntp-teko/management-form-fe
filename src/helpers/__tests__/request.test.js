// Created by thanhpd on 3/29/2019
// @flow
import { userServices } from 'services';
import { notificationHelper } from 'helpers';
import requestHelper from '../request';

jest.mock('services/shared/users');
jest.mock('helpers/notification');

describe('test normalize param', () => {
  it('when contains value = all then removed', () => {
    const normalizeParams = requestHelper.normalizeParams({
      name: 'thanh',
      type: 'all',
    });
    expect(normalizeParams).toEqual({ name: 'thanh' });
  });

  it('when contains value = empty string then removed', () => {
    const normalizeParams = requestHelper.normalizeParams({
      name: 'thanh',
      type: '',
    });
    expect(normalizeParams).toEqual({ name: 'thanh' });
  });

  it('when normal case then keep original', () => {
    const input = { name: 'thanh', type: 'sponsor' };
    const normalizeParams = requestHelper.normalizeParams(input);
    expect(normalizeParams).toEqual(input);
  });
});

describe('test handleRequestError', () => {
  afterEach(() => {
    notificationHelper.error.mockClear();
  });

  it('when 401 error then call userServices logout', () => {
    requestHelper.handleRequestError({response: {status: 401}});
    expect(userServices.logout).toHaveBeenCalled();
  });
  it('when 403 error then call userServices denyAccess', () => {
    requestHelper.handleRequestError({response: {status: 403}});
    expect(userServices.denyAccess).toHaveBeenCalled();
  });

  it('when general error then call notify error', () => {
    const message = 'message';
    const code = 'code';
    requestHelper.handleRequestError({response: {status: 400, data: {code, message}}});
    expect(notificationHelper.error).toHaveBeenCalled();
    expect(notificationHelper.error.mock.calls.length).toBe(1);
    expect(notificationHelper.error.mock.calls[0][0]).toBe(code);
    expect(notificationHelper.error.mock.calls[0][1]).toBe(message);
  });
});

describe('test handleRequestSuccess', () => {
  afterEach(() => {
    notificationHelper.error.mockClear();
  });
  it('when code not success then notify error', () => {
    const notSuccessCode = 'not-success';
    const message = 'message';

    expect(() => {
      requestHelper.handleRequestSuccess({'code': notSuccessCode, message});
    }).toThrow();
    expect(notificationHelper.error).toHaveBeenCalled();
    expect(notificationHelper.error.mock.calls.length).toBe(1);
    expect(notificationHelper.error.mock.calls[0][0]).toBe(notSuccessCode);
    expect(notificationHelper.error.mock.calls[0][1]).toBe(message);

  })
});
