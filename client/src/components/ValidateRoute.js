import Cookies from "js-cookie";
import { Navigate, Route } from "react-router-dom";

const ProtectedRoute = (props) => {
  const jwtToken = Cookies.get("jwt_token");
  if (jwtToken === undefined) {
    return <Navigate to="/login" />;
  }
  return <Route {...props} />;
};

export default ProtectedRoute;
