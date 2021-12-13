import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, RouteProps } from "react-router-dom";
import { AppState } from "store";
import { checkUser } from "modules/auth/store/actions";
import { Spinner } from "components/shared";

interface IProtectedRoute extends RouteProps {}

export const ProtectedRoute: FC<IProtectedRoute> = ({ element, ...rest }) => {
  const token = localStorage.getItem("codeum_jwt_token");
  const dispatch = useDispatch();
  const authState = useSelector((state: AppState) => state.auth);

  useEffect(() => {
    if (!authState.isLoggedIn) {
      if (token) {
        dispatch(checkUser());
      }
    }
  }, [token]);

  if (authState.loading) {
    return <Route {...rest} element={<Spinner />} />;
  }

  return (
    <div>
      <h1>test</h1>
    </div>
    // <Route {...rest} render={} element={(props) => (authState.isLoggedIn ? <element {...props} /> : <Navigate to="/login" />)} />
  );
};
