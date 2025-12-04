import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function useAuth() {
  const { isAuth, login, logout } = useContext(AuthContext);

  return { isAuth, login, logout };
}
