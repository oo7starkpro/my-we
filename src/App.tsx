import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";

import { SmoothScroll } from "@/components/SmoothScroll";
import { BackgroundScene } from "@/components/webgl/BackgroundScene";

import Index from "./pages/Index";
import Shops from "./pages/Shops";
import HowItWorks from "./pages/HowItWorks";
import NotFound from "./pages/NotFound";
import AuthSuccess from "./pages/AuthSuccess";

import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import Wishlist from "./pages/Wishlist";
import Coins from "./pages/Coins";
import Coupons from "./pages/Coupons";
import GiftCards from "./pages/GiftCards";
import Notifications from "./pages/Notifications";

import RequireAuth from "@/components/RequireAuth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CartProvider>
      <TooltipProvider>
        <AuthProvider>
          <BrowserRouter>
            <SmoothScroll>
              <BackgroundScene />
              <div className="relative z-10 w-full min-h-screen">
                <Toaster />
                <Sonner />

                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/shops" element={<Shops />} />
                  <Route path="/how-it-works" element={<HowItWorks />} />

                  {/* Google OAuth redirect */}
                  <Route path="/auth-success" element={<AuthSuccess />} />

                  {/* PROTECTED ROUTES */}
                  <Route
                    path="/profile"
                    element={
                      <RequireAuth>
                        <Profile />
                      </RequireAuth>
                    }
                  />

                  <Route
                    path="/orders"
                    element={
                      <RequireAuth>
                        <Orders />
                      </RequireAuth>
                    }
                  />

                  <Route
                    path="/wishlist"
                    element={
                      <RequireAuth>
                        <Wishlist />
                      </RequireAuth>
                    }
                  />

                  <Route
                    path="/gu-coins"
                    element={
                      <RequireAuth>
                        <Coins />
                      </RequireAuth>
                    }
                  />

                  <Route
                    path="/coupons"
                    element={
                      <RequireAuth>
                        <Coupons />
                      </RequireAuth>
                    }
                  />

                  <Route
                    path="/gift-cards"
                    element={
                      <RequireAuth>
                        <GiftCards />
                      </RequireAuth>
                    }
                  />

                  <Route
                    path="/notifications"
                    element={
                      <RequireAuth>
                        <Notifications />
                      </RequireAuth>
                    }
                  />

                  {/* Catch-all */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </SmoothScroll>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </CartProvider>
  </QueryClientProvider>
);

export default App;
