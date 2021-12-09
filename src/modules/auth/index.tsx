import React, { useEffect } from "react";
import { useQuery } from "hooks";
import { useDispatch } from "react-redux";
import { checkUser } from "store/slices/auth/actions";

export const Auth = () => {
  const dispatch = useDispatch();
  const query = useQuery();
  const token = query.get("token");

  useEffect(() => {
    if (token) {
      localStorage.setItem("codeum_jwt_token", token);
      dispatch(checkUser());
    }
  }, [token]);

  return (
    <div>
      <h1>Auth</h1>
    </div>
  );
};
