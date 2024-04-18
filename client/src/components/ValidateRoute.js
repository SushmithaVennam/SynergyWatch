import Cookies from "js-cookie";
import { Navigate, Route } from "react-router-dom";
// import Login from "./Login";

const ProtectedRoute = (props) => {
  const jwtToken = Cookies.get("jwt_token");
  if (jwtToken === undefined) {
    return <Navigate to="/login" />;
  }
  return <Route {...props} />;
};
//   import { Fragment } from "react";
// import { Navigate } from "react-router-dom";
// function ProtectedRoute({ element: Component, ...rest }) {
//   const jwtToken = Cookies.get("cookie");
//   if (jwtToken === undefined) {
//     console.log("jwt token failed");
//     return <Navigate to="/login" />;
//   }
//   console.log("jwt token success");
//   return <Fragment>{<Component {...rest} />}</Fragment>;
// }

export default ProtectedRoute;
