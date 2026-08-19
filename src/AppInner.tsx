import { Routes, Route } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

import Index from "./pages/Index";
import Shops from "./pages/Shops";
import HowItWorks from "./pages/HowItWorks";
import NotFound from "./pages/NotFound";
import AuthSuccess from "./pages/AuthSuccess";
import { LoginModal } from "@/components/auth/LoginModal";

export default function AppInner() {
  const { showLogin, closeLogin } = useAuth();

  return (
    <>
      <LoginModal open={showLogin} onClose={closeLogin} />

      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/shops" element={<Shops />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/auth-success" element={<AuthSuccess />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
