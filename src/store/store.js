import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import propertiesReducer from './slices/propertiesSlice';
import applicationsReducer from './slices/applicationsSlice';
import grievancesReducer from './slices/grievancesSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    properties: propertiesReducer,
    applications: applicationsReducer,
    grievances: grievancesReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
