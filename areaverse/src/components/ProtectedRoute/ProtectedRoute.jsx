import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";


const ProtectedRoute = ({ children, redirect }) => {
    
    const {user} = useSelector((state) => state.auth);

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!user && !storedUser) {
        // if not logged in, redirect to the specified page
        return <Navigate to={redirect} replace />;
    }

    return children;
}

export default ProtectedRoute;