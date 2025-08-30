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
    path: "/account",
    element: (<Auth />)
  },
  {
    element: <ProtectedRoute redirect="/"/>,
    children: [
      {
        element: <ProtectedLayout />,
        children: [
          {path: "/home", element: <Home />}
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
