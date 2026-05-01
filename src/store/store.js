import { configureStore } from '@reduxjs/toolkit';
import propertiesReducer from './propertiesSlice';
import themeReducer from './themeSlice';

export const store = configureStore({
  reducer: {
    properties: propertiesReducer,
    theme: themeReducer,
  },
});
