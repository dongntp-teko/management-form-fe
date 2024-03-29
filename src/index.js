import 'react-app-polyfill/ie9'; // For IE 9-11 support
import 'react-app-polyfill/ie11'; // For IE 11 support
import './polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { LocaleProvider } from 'antd';
import { I18nextProvider } from 'react-i18next';
import { languages } from 'localization';
import { localizationHelper } from 'helpers';
import i18n from './i18n';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <I18nextProvider i18n={i18n}>
    <LocaleProvider locale={languages[localizationHelper.getCurrentLanguage()].antLocale}>
      <App />
    </LocaleProvider>
  </I18nextProvider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
