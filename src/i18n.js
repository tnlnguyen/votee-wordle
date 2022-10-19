'use strict';

import enTranslationMessages from './Locales/en.json';
import viTranslationMessages from './Locales/vi.json';

const DEFAULT_LOCALE = 'en';
const appLocales = ['vi', 'en'];

const formatTranslationMessages = (locale, messages) => {
  const defaultFormattedMessages =
    locale !== DEFAULT_LOCALE
      ? formatTranslationMessages(DEFAULT_LOCALE, viTranslationMessages)
      : {};
  return Object.keys(messages).reduce((formattedMessages, key) => {
    let message = messages[key];
    if (!message && locale !== DEFAULT_LOCALE) {
      message = defaultFormattedMessages[key];
    }
    return Object.assign(formattedMessages, { [key]: message });
  }, {});
};

const createFromResourceLanguage = (data) => {
  return {
    vi: formatTranslationMessages('vi', data.vi),
    en: formatTranslationMessages('en', data.en),
  };
};

const translationMessages = {
  vi: formatTranslationMessages('vi', viTranslationMessages),
  en: formatTranslationMessages('en', enTranslationMessages),
};

export { translationMessages, formatTranslationMessages, appLocales, createFromResourceLanguage };
