import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import authMiddleware from "../middleware/authMiddleware";
import userReducer from '../features/user/userSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authMiddleware),
  
});