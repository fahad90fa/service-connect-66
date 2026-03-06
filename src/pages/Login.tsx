import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, User, ArrowRight, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const Login = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    toast.success(isSignUp ? "🎉 Account created!" : "Welcome back! 👋");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden" style={{ background: "hsl(248 72% 9%)" }}>
      {/* ── Background orbs ── */}
      <div
        className="absolute -top-32 -right-32 w-80 h-80 rounded-full animate-orb pointer-events-none"
        style={{ background: "hsl(265 70% 55% / 0.22)", filter: "blur(60px)" }}
      />
      <div
        className="absolute top-1/3 -left-24 w-64 h-64 rounded-full animate-orb-b pointer-events-none"
        style={{ background: "hsl(36 96% 52% / 0.16)", filter: "blur(48px)" }}
      />
      <div
        className="absolute -bottom-20 right-1/4 w-56 h-56 rounded-full pointer-events-none"
        style={{ background: "hsl(210 85% 52% / 0.12)", filter: "blur(40px)", animation: "orb-drift 13s ease-in-out infinite 2s" }}
      />

      {/* ── Hero section ── */}
      <div className="relative z-10 px-6 pt-20 pb-10 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.6, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 240, damping: 18 }}
          className="w-20 h-20 rounded-2xl flex items-center justify-center mb-5 relative"
          style={{
            background: "linear-gradient(135deg, hsl(36 96% 52%), hsl(28 95% 58%))",
            boxShadow: "0 8px 40px hsl(36 96% 52% / 0.45)",
          }}
        >
          <span className="text-4xl">🔨</span>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-2 rounded-2xl opacity-20"
            style={{ border: "2px dashed hsl(36 96% 72%)" }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="font-display text-3xl font-bold" style={{ color: "hsl(0 0% 100%)" }}>
            Service<span className="text-gradient-gold">Hub</span>
          </h1>
          <p className="text-sm mt-1.5" style={{ color: "hsl(0 0% 100% / 0.45)" }}>
            On-demand services at your fingertips
          </p>
        </motion.div>

        {/* Floating feature pills */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="flex items-center gap-2 mt-5 flex-wrap justify-center"
        >
          {["✓ Verified Pros", "✓ 30-day Guarantee", "✓ 200+ Services"].map((f, i) => (
            <motion.span
              key={f}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.38 + i * 0.07, type: "spring", stiffness: 260 }}
              className="px-2.5 py-1 rounded-full text-[10px] font-semibold"
              style={{
                background: "hsl(0 0% 100% / 0.08)",
                border: "1px solid hsl(0 0% 100% / 0.12)",
                color: "hsl(0 0% 100% / 0.60)",
              }}
            >
              {f}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* ── Form card ── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.28, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex-1 px-5 pb-10"
      >
        <div
          className="rounded-[1.75rem] p-6"
          style={{
            background: "hsl(0 0% 100%)",
            boxShadow: "0 24px 80px -16px hsl(248 72% 9% / 0.60)",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={isSignUp ? "up" : "in"}
              initial={{ opacity: 0, x: isSignUp ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isSignUp ? -20 : 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-center mb-5"
            >
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <Sparkles className="w-4 h-4" style={{ color: "hsl(248 62% 42%)" }} />
                <h2 className="font-display font-bold text-xl text-foreground">
                  {isSignUp ? "Create Account" : "Welcome Back"}
                </h2>
              </div>
              <p className="text-xs text-muted-foreground">
                {isSignUp ? "Join thousands of satisfied customers" : "Sign in to continue your journey"}
              </p>
            </motion.div>
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-3">
            <AnimatePresence>
              {isSignUp && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div
                    className="flex items-center gap-3 rounded-xl px-4 py-3.5 transition-all duration-300"
                    style={{
                      background: "hsl(var(--muted))",
                      border: "1.5px solid transparent",
                    }}
                    onFocus={(e) => {
                      (e.currentTarget as HTMLDivElement).style.borderColor = "hsl(248 62% 42% / 0.4)";
                      (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 0 3px hsl(248 62% 42% / 0.08)";
                    }}
                    onBlur={(e) => {
                      (e.currentTarget as HTMLDivElement).style.borderColor = "transparent";
                      (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                    }}
                  >
                    <User className="w-4 h-4 text-muted-foreground shrink-0" />
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-transparent text-sm w-full outline-none placeholder:text-muted-foreground"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {[
              { type: "email", placeholder: "Email address", value: email, onChange: setEmail, icon: Mail },
            ].map(({ type, placeholder, value, onChange, icon: Icon }) => (
              <div
                key={placeholder}
                className="flex items-center gap-3 rounded-xl px-4 py-3.5 transition-all duration-300"
                style={{ background: "hsl(var(--muted))", border: "1.5px solid transparent" }}
                onFocus={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "hsl(248 62% 42% / 0.4)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 0 3px hsl(248 62% 42% / 0.08)";
                }}
                onBlur={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "transparent";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                }}
              >
                <Icon className="w-4 h-4 text-muted-foreground shrink-0" />
                <input
                  type={type}
                  placeholder={placeholder}
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  className="bg-transparent text-sm w-full outline-none placeholder:text-muted-foreground"
                />
              </div>
            ))}

            <div
              className="flex items-center gap-3 rounded-xl px-4 py-3.5 transition-all duration-300"
              style={{ background: "hsl(var(--muted))", border: "1.5px solid transparent" }}
              onFocus={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "hsl(248 62% 42% / 0.4)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 0 3px hsl(248 62% 42% / 0.08)";
              }}
              onBlur={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "transparent";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
              }}
            >
              <Lock className="w-4 h-4 text-muted-foreground shrink-0" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-transparent text-sm w-full outline-none placeholder:text-muted-foreground"
              />
              <motion.button
                type="button"
                whileTap={{ scale: 0.82 }}
                onClick={() => setShowPassword(!showPassword)}
                className="shrink-0"
              >
                {showPassword
                  ? <EyeOff className="w-4 h-4 text-muted-foreground" />
                  : <Eye className="w-4 h-4 text-muted-foreground" />
                }
              </motion.button>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.012 }}
              whileTap={{ scale: 0.975 }}
              disabled={loading}
              className="w-full h-12 rounded-xl font-display font-bold text-sm flex items-center justify-center gap-2 mt-2 relative overflow-hidden"
              style={{
                background: loading
                  ? "hsl(248 62% 32% / 0.6)"
                  : "linear-gradient(135deg, hsl(248 62% 32%), hsl(265 68% 42%))",
                color: "hsl(0 0% 100%)",
                boxShadow: loading ? "none" : "0 4px 24px hsl(248 62% 32% / 0.40)",
              }}
            >
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                />
              ) : (
                <>
                  {isSignUp ? "Create Account" : "Sign In"}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
              <div className="absolute inset-0 shimmer opacity-50" />
            </motion.button>
          </form>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px" style={{ background: "hsl(var(--border))" }} />
            <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">or</span>
            <div className="flex-1 h-px" style={{ background: "hsl(var(--border))" }} />
          </div>

          <motion.button
            whileHover={{ scale: 1.012 }}
            whileTap={{ scale: 0.975 }}
            className="w-full flex items-center justify-center gap-3 rounded-xl py-3 text-sm font-medium transition-all duration-200 relative overflow-hidden"
            style={{
              background: "hsl(var(--muted))",
              border: "1px solid hsl(var(--border))",
              color: "hsl(var(--foreground))",
            }}
          >
            <span
              className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-black"
              style={{ background: "linear-gradient(135deg, #4285F4, #34A853, #FBBC05, #EA4335)" }}
            >
              <span style={{ background: "white", borderRadius: "50%", padding: "1px 3px", fontSize: "8px" }}>G</span>
            </span>
            Continue with Google
          </motion.button>

          <p className="text-xs text-center text-muted-foreground mt-5">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <motion.button
              whileTap={{ scale: 0.93 }}
              onClick={() => setIsSignUp(!isSignUp)}
              className="font-bold"
              style={{ color: "hsl(248 62% 42%)" }}
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </motion.button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
