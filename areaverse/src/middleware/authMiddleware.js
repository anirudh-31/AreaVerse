import { refreshToken, logoutUser } from "../features/auth/authSlice";
import api from "../api/axios";

let isRefreshing = false;

const authMiddleware = (store) => (next) => async (action) => {
  // Intercept rejected async thunks
  if (action.type.endsWith("/rejected") && action.error) {
    
    // Check if it's a 403/401 error
    const status = action.error?.status || action.payload?.status;
    if (status === 403 || status === 401) {
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const token = await store.dispatch(refreshToken()).unwrap();
          // Update axios default header
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

          // ✅ Optionally: retry the failed action
          if (action.meta.arg) {
            return store.dispatch(action.meta.arg); 
          }
        } catch (err) {
          store.dispatch(logoutUser());
        } finally {
          isRefreshing = false;
        }
      }
    }
  }

  return next(action);

};


export default authMiddleware