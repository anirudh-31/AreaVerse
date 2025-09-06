import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import './index.css';
import Auth from "./pages/Auth/Auth";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Home from "./pages/Home/Home";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import PublicRoute from "./components/PublicRoute/PublicRoute";
import ProtectedLayout from "./components/ProtectedLayout/ProtectedLayout";
import MyProfile from "./pages/MyProfile/MyProfile";
import VerifyEmail from "./pages/VerifyEmail/VerifyEmail";
import PasswordResetRequest from "./pages/PasswordResetRequest/PasswordResetRequest";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
        <PublicRoute redirect="/home">
          <Landing />
        </PublicRoute>
      ),
  },
  {
    path   : "/verify-email",
    element: <VerifyEmail />
  },
  {
    path: "/account",
    element: (<Auth />)
  },
  {
    path: "/request-passoword-reset",
    element: <PasswordResetRequest />
  },
  {
    path: "/reset-password",
    element: <ResetPassword />
  },
  {
    element: <ProtectedRoute redirect="/"/>,
    children: [
      {
        element: <ProtectedLayout />,
        children: [
          {path: "/home", element: <Home />},
          {path: "/me"  , element: <MyProfile />}
        ]
      }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
