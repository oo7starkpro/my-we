import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAuth } from "@/context/AuthContext";

export function LoginModal() {
  const { loginOpen, closeLogin, returnTo } = useAuth();

  const handleGoogleLogin = () => {
    const url = new URL("http://localhost:3000/auth/google");

    if (returnTo) url.searchParams.append("returnTo", returnTo);

    window.location.href = url.toString();
  };

  return (
    <Dialog open={loginOpen} onOpenChange={closeLogin}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">
            Sign in to continue
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-sm text-muted-foreground text-center">
            Use your Google account to sign in securely.
          </p>

          <button
            onClick={handleGoogleLogin}
            className="w-full py-2 rounded-md border bg-white hover:bg-gray-50 flex items-center justify-center gap-2"
          >
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="Google"
              className="w-5 h-5"
            />
            Continue with Google
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
