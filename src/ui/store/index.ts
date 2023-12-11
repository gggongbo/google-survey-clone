import {asyncStorage} from '@lib/react-native-async-storage';
import {useDispatch} from '@lib/react-redux';
import {persistStore, persistReducer} from '@lib/redux-persist';
import {combineReducers, configureStore} from '@lib/reduxjs/toolkit';
import component, {ComponentSliceState} from '@ui/slices/component';
import device, {DeviceSliceState} from '@ui/slices/device';
import preview, {PreviewSliceState} from '@ui/slices/preview';
import survey, {SurveySliceState} from '@ui/slices/survey';

export type ReduxStore = {
  survey: SurveySliceState;
  preview: PreviewSliceState;
  component: ComponentSliceState;
  device: DeviceSliceState;
};

const rootPersistConfig = {
  key: 'root',
  storage: asyncStorage,
  blacklist: ['survey', 'preview', 'component', 'device'],
};

const appReducer = combineReducers({
  survey,
  preview,
  component,
  device,
});

const rootReducer = (state: any, action: any) => appReducer(state, action);

const store = configureStore({
  reducer: persistReducer(rootPersistConfig, rootReducer),
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export type ReduxDispatch = typeof store.dispatch;
export const useReduxDispatch: () => ReduxDispatch = useDispatch;
export default store;
