import { ReactNode } from "react";
import { useAuth } from "@/context/AuthContext";

export default function RequireAuth({ children }: { children: ReactNode }) {
  const { token } = useAuth();

  if (!token) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold mb-3">Login Required</h2>
        <p className="mb-4">You need to sign in with Google to continue.</p>

        <a
          className="px-4 py-2 rounded bg-blue-600 text-white"
          href="http://localhost:3000/auth/google"
        >
          Continue with Google
        </a>
      </div>
    );
  }

  return <>{children}</>;
}
