import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  const storedUser = JSON.parse(localStorage.getItem("user"));

  // If a user exists in either Redux or localStorage, redirect them to the home page
  if (user || storedUser) {
    return <Navigate to="/home" replace />;
  }

  // Otherwise, render the children (the login page)
  return children;
};

export default PublicRoute;