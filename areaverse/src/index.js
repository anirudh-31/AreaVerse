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
import { ThemeProvider } from "./features/Context/ThemeContext";
import CommunityPostForm from "./pages/CommunityPostForm/CommunityPostForm";
import ViewReport from "./pages/Report/ViewReport";
import ReviewReport from "./pages/ReviewReports/ReviewReport";
import User from "./pages/User/User";
import Logout from "./pages/Logout/Logout";

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
          { path: "/home"            , element: <Home />             },
          { path: "/me"              , element: <MyProfile />        },
          { path: "/create-report"   , element: <CommunityPostForm />},
          { path: "/report/:reportId", element: <ViewReport/>        },
          { path: "/review-reports"  , element: <ReviewReport/>      },
          { path: "/user/:id"        , element: <User/>              },
        ]
      }
    ]
  },
  { 
    path: "/logout", 
    element: <Logout/>            
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
