// Created by thanhpd on 5/17/2019
// @flow

import viVN from 'antd/lib/locale-provider/vi_VN';
import enUS from 'antd/lib/locale-provider/en_US';
import vi from './vi';
import en from './en';

const languages = {
  vi: { translations: vi.translations,  antLocale: viVN},
  en: { translations: en.translations, antLocale: enUS},
};

const regions = {
  vi: {
    name: vi.name,
    icon: vi.icon,
  },
  en: {
    name: en.name,
    icon: en.icon,
  },
};
export { default as ppmLocalizations } from './ppm';

export { languages, regions };
