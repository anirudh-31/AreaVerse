import { refreshToken, logoutUser } from "../features/auth/authSlice";
import api from "../api/axios";

let isRefreshing = false;

const authMiddleware = (store) => (next) => async (action) => {
    if (action.type.endsWith("/rejected") && action.error?.message?.includes("403")) {
    if (!isRefreshing) {
      isRefreshing = true;
      try {
        const newToken = await store.dispatch(refreshToken()).unwrap();
        api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
      } catch (err) {
        store.dispatch(logoutUser());
      } finally {
        isRefreshing = false;
      }
    }
  }

  return next(action);
};

export default authMiddleware