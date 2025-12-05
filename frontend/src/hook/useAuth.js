import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function useAuth() {
  const { isAuth, login, user, logout } = useContext(AuthContext);

  return { isAuth, login,user, logout };
}
