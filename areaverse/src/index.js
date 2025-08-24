import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import './index.css';
import Navbar from "./components/nav/Navbar";
import Footer from "./components/Footer/Footer";
import Auth from "./pages/Auth/Auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />
  },
  {
    path: "/account",
    element: <Auth />
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Navbar />
    <RouterProvider router={router} />    
    <Footer />
    
  </React.StrictMode>
);
