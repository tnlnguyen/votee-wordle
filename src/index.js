import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';
import store, { persistor } from 'Store/Store';
import { PersistGate } from 'redux-persist/integration/react';

import LanguageProvider from 'Base/LanguageProvider/LanguageProvider';
import { translationMessages } from 'i18n';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <LanguageProvider messages={translationMessages} language={'en'}>
          <App />
        </LanguageProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
