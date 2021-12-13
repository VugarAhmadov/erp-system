import React, { useEffect } from "react";
import { useQuery } from "hooks";
import { useDispatch, useSelector } from "react-redux";
import { checkUser } from "modules/auth/store/actions";
import { AppState } from "store";
import { Spinner } from "components/shared";

export const CheckUser = () => {
  const dispatch = useDispatch();
  const query = useQuery();
  const token = query.get("token");
  const loading = useSelector((state: AppState) => state.auth.loading.checkUser);

  useEffect(() => {
    if (token) {
      localStorage.setItem("codeum_jwt_token", token);
      dispatch(checkUser());
    }
  }, [token]);

  return loading ? <Spinner /> : <></>;
};
