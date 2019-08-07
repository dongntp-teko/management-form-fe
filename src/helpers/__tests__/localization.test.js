// Created by thanhpd on 5/21/2019
// @flow

import localizationHelper from '../localization';

describe('test getLocalize', () => {
  it('with success key and en language', () => {
    const localize = localizationHelper.localize('success', 'en');
    expect(localize).toEqual('success');
  });

  it('with non exist key', () => {
    const nonExistKey = 'non_exist_key';
    const localize = localizationHelper.localize(nonExistKey, 'en');
    expect(localize).toEqual(nonExistKey);
  });

});
