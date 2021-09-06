import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import authSelectors from "Redux/auth/auth-selectors";

export default function PrivateRoute({ children, ...props }) {
  const isLoggedIn = useSelector((state) => authSelectors.getIsLoggedIn(state));

  return (
    <Route {...props}>{isLoggedIn ? children : <Redirect to="/login" />}</Route>
  );
}
