import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import counterReducer from './counter/counterSlice'
import CustomizerReducer from './customizer/CustomizerSlice'
import authReducer from './auth/AuthSlice'
import generalReducer from './general/GeneralSlice'
import menuReducer from './menu/MenuSlice'

const persistConfig = {
  key: 'root',
  storage,
}

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    customizer: persistReducer<any>(persistConfig, CustomizerReducer),
    auth: authReducer,
    general: generalReducer,
    menu: menuReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false, immutableCheck: false }),
})

const rootReducer = combineReducers({
  counter: counterReducer,
  customizer: CustomizerReducer,
  auth: authReducer,
  general: generalReducer,
  menu: menuReducer,
})

export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppState = ReturnType<typeof rootReducer>
