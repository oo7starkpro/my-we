import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function AuthSuccess() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { setToken, returnTo } = useAuth();

  useEffect(() => {
    const token = params.get("token");

    if (token) {
      setToken(token);
      navigate(returnTo ?? "/", { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  }, []);

  return <p>Signing you in…</p>;
}
