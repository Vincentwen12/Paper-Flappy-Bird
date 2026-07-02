import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { useI18n, LANG_LABELS } from "@/i18n";
import type { Lang } from "@/i18n";
import { PaperTitle } from "@/components/PaperTitle";
import { GhostButton } from "@/components/GhostButton";
import { PreviewBird } from "@/components/PreviewBird";
import { findSkin } from "@/data/skins";
import { useProfileStore } from "@/store/profileStore";
import { Eye, EyeOff, Globe } from "lucide-react";

export default function Auth() {
  const navigate = useNavigate();
  const { t, lang } = useI18n();
  const auth = useAuthStore();
  const profile = useProfileStore((s) => s.profile);
  const setSetting = useProfileStore((s) => s.setSetting);
  const skin = findSkin(profile.equippedSkin || "classic");

  const hasAccount = auth.isRegistered;
  const [isLogin, setIsLogin] = useState(hasAccount);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [phase, setPhase] = useState(0);

  // If already logged in, redirect to home
  useEffect(() => {
    if (auth.isLoggedIn) {
      navigate("/", { replace: true });
    }
  }, [auth.isLoggedIn, navigate]);

  // Bird preview animation
  useEffect(() => {
    const id = setInterval(() => setPhase((p) => (p + 0.02) % 1), 16);
    return () => clearInterval(id);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const result = isLogin
        ? await auth.login(username, password)
        : await auth.register(username, password);
      if (result.ok) {
        navigate("/", { replace: true });
      } else {
        const errorMap: Record<string, string> = {
          username_length: t.auth.errorUsernameLength,
          password_length: t.auth.errorPasswordLength,
          already_registered: t.auth.errorAlreadyRegistered,
          wrong_credentials: t.auth.errorWrongCredentials,
          no_account: t.auth.errorNoAccount,
        };
        setError(errorMap[result.error!] || result.error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-enter w-full h-full flex flex-col items-center justify-center px-8 py-10">
      <div className="flex flex-col items-center gap-8 max-w-sm w-full">
        {/* Language switcher */}
        <div className="flex gap-1 flex-wrap justify-center">
          {(Object.keys(LANG_LABELS) as Lang[]).map((l) => (
            <button
              key={l}
              onClick={() => setSetting("language", l)}
              className={`px-2 py-1 text-[10px] font-sans tracking-wider rounded-sm border transition ${
                lang === l
                  ? "border-ink-400 text-ink-400 bg-paper-50"
                  : "border-transparent text-ink-50 hover:border-paper-300"
              }`}
            >
              {LANG_LABELS[l]}
            </button>
          ))}
        </div>

        {/* Bird preview */}
        <div className="relative">
          <div className="absolute -inset-10 bg-sakura-200/20 rounded-full blur-3xl" />
          <PreviewBird skin={skin} size={140} phase={phase} className="relative drop-shadow-[0_4px_12px_rgba(0,0,0,0.06)]" />
        </div>

        {/* Title */}
        <div className="flex flex-col items-center gap-2">
          <PaperTitle subtitle={t.auth.subtitle} align="center">
            {t.auth.title}
          </PaperTitle>
          <div className="font-serif text-ink-200 text-sm tracking-widest">
            {isLogin ? t.auth.loginTitle : t.auth.registerTitle}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-ink-50 text-[10px] font-sans tracking-[0.3em] uppercase">
              {t.auth.username}
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={t.auth.usernamePlaceholder}
              maxLength={20}
              className="w-full px-4 py-3 bg-paper-50 border border-paper-300 rounded-sm text-ink-400 font-serif text-sm tracking-wider placeholder:text-ink-50/50 focus:outline-none focus:border-ink-200 transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-ink-50 text-[10px] font-sans tracking-[0.3em] uppercase">
              {t.auth.password}
            </label>
            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t.auth.passwordPlaceholder}
                maxLength={32}
                className="w-full px-4 py-3 pr-12 bg-paper-50 border border-paper-300 rounded-sm text-ink-400 font-serif text-sm tracking-wider placeholder:text-ink-50/50 focus:outline-none focus:border-ink-200 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-50 hover:text-ink-200 transition-colors"
                tabIndex={-1}
              >
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="text-sakura-600 text-xs font-sans tracking-wider text-center py-1">
              {error}
            </div>
          )}

          <GhostButton
            type="submit"
            size="lg"
            variant="primary"
            disabled={loading}
            className="w-full mt-2"
          >
            {loading ? "..." : isLogin ? t.auth.loginBtn : t.auth.registerBtn}
          </GhostButton>
        </form>

        {/* Switch mode */}
        <button
          onClick={() => {
            setIsLogin(!isLogin);
            setError(null);
          }}
          className="text-ink-50 text-xs font-sans tracking-wider hover:text-ink-200 transition-colors"
        >
          {isLogin ? t.auth.switchToRegister : t.auth.switchToLogin}
        </button>

        <div className="text-ink-50/50 text-[10px] font-sans tracking-[0.4em] mt-4">
          Paper Flap · v1.0
        </div>
      </div>
    </div>
  );
}