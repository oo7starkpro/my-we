import { useAuth } from "@/context/AuthContext";

export function useRequireAuth() {
  const { token, openLogin } = useAuth();

  return (action: () => void, returnPath: string) => {
    if (!token) {
      openLogin(returnPath);
      return;
    }

    action();
  };
}
