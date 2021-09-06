import Container from "Components/Container";
import NavBar from "Components/NavBar";
import ComponentLoader from "Components/ComponentLoader";

import PublicRoute from "Components/PublicRoute";
import PrivateRoute from "Components/PrivateRoute";

import { lazy, Suspense } from "react";
import { useHistory } from "react-router";
import { useEffect } from "react";
import { Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import authSelectors from "Redux/auth/auth-selectors";

const UserPage = lazy(() =>
  import("../UserPage" /* webpackChunkName: "user-page" */)
);
const LoginPage = lazy(() =>
  import("../LoginPage" /* webpackChunkName: "login-page" */)
);
const SignUpPage = lazy(() =>
  import("../SignUpPage" /* webpackChunkName: "signup-page" */)
);

export default function App() {
  const isLoggedIn = useSelector((state) => authSelectors.getIsLoggedIn(state));
  const history = useHistory();

  useEffect(() => {
    isLoggedIn ? history.push("/contacts") : history.push("/login");
  }, [history, isLoggedIn]);

  return (
    <Container>
      <NavBar isLoggedIn={isLoggedIn} />
      <Switch>
        <Suspense fallback={<ComponentLoader />}>
          <PublicRoute exact path="/login">
            <LoginPage />
          </PublicRoute>
          <PublicRoute exact path="/register">
            <SignUpPage />
          </PublicRoute>
          <PrivateRoute exact path="/contacts">
            <UserPage />
          </PrivateRoute>
        </Suspense>
      </Switch>
    </Container>
  );
}
