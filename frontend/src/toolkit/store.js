import { configureStore } from '@reduxjs/toolkit';
import appSliceReducer from './appSlice.js';

const store = configureStore({
  reducer:{
    app: appSliceReducer
  }
})

export default store;