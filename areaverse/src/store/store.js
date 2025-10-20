import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import userReducer from '../features/user/userSlice';
import postReducer from '../features/post/postSlice'
import feedReducer from '../features/feed/feedSlice'
import configReducer from '../features/config/configSlice';
import { injectStore } from "../api/axios";

const store = configureStore({
  reducer: {
    auth  : authReducer,
    user  : userReducer,
    post  : postReducer,
    feed  : feedReducer,
    config: configReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }),
});

injectStore(store);

export {
  store
};