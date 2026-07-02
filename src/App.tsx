import { useEffect } from "react";
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { I18nProvider } from "@/i18n";
import { useAuthStore, hydrateAuth } from "@/store/authStore";
import Auth from "@/pages/Auth";
import Home from "@/pages/Home";
import Game from "@/pages/Game";
import GameOver from "@/pages/GameOver";
import Collection from "@/pages/Collection";
import Shop from "@/pages/Shop";
import Leaderboard from "@/pages/Leaderboard";
import Settings from "@/pages/Settings";

function AuthGuard({ children }: { children: React.ReactNode }) {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }
  return <>{children}</>;
}

function AuthRedirect() {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const isRegistered = useAuthStore((s) => s.isRegistered);

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return <Auth key={isRegistered ? "login" : "register"} />;
}

export default function App() {
  useEffect(() => {
    hydrateAuth();
  }, []);

  return (
    <I18nProvider>
      <Router>
        <div className="w-full h-full overflow-hidden">
          <Routes>
            <Route path="/auth" element={<AuthRedirect />} />
            <Route path="/" element={<AuthGuard><Home /></AuthGuard>} />
            <Route path="/game" element={<AuthGuard><Game /></AuthGuard>} />
            <Route path="/gameover" element={<AuthGuard><GameOver /></AuthGuard>} />
            <Route path="/collection" element={<AuthGuard><Collection /></AuthGuard>} />
            <Route path="/shop" element={<AuthGuard><Shop /></AuthGuard>} />
            <Route path="/leaderboard" element={<AuthGuard><Leaderboard /></AuthGuard>} />
            <Route path="/settings" element={<AuthGuard><Settings /></AuthGuard>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </I18nProvider>
  );
}