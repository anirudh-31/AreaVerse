import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import authMiddleware from "../middleware/authMiddleware";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authMiddleware),
  
});