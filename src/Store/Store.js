import { configureStore, getDefaultMiddleware, combineReducers } from '@reduxjs/toolkit';
import storage from "redux-persist/lib/storage";
import { encryptTransform } from 'redux-persist-transform-encrypt'
import {
  persistReducer,
  persistStore,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';

import { authReducer } from 'Store/Features/Auth/AuthSlice';
import { productReducer } from 'Store/Features/Product/ProductSlice';


const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  transforms: [
    encryptTransform({
      secretKey: 'WA29HXHSvL',
      onError: function (error) {
        // Handle the error.
      },
    }),
  ],
  whitelist: ['app'],
};

const rootReducer = combineReducers({
  authReducer,
  productReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export const persistor = persistStore(store);

export default store;
