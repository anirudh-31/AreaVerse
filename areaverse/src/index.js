import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import './index.css';
import Navbar from "./components/nav/Navbar";
// import AuthPage from "./pages/Auth/AuthPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Navbar />
  </React.StrictMode>
);
