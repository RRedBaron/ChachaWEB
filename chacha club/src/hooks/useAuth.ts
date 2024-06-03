// Внутри useAuth.js

import { useEffect } from "react";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "./useAppSelector";
import { fetchUser } from "../redux/slices/userSlice"; // Подставь правильный путь к файлу с экшенами
import { RootState } from "../redux/store/store";
import { getCookie } from "../utils/cookie";

const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, loading, error } = useAppSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    const token = getCookie("token");

    if (token) {
      dispatch(fetchUser());
    }
  }, [dispatch]);

  return { user, loading, error };
};

export default useAuth;
