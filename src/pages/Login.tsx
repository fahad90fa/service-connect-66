import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const Login = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(isSignUp ? "🎉 Account created!" : "Welcome back! 👋");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Hero */}
      <div className="gradient-hero px-6 pt-20 pb-14 rounded-b-[2.5rem] text-center relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-secondary/10 blur-3xl" />
          <div className="absolute -bottom-10 left-10 w-40 h-40 rounded-full bg-info/8 blur-3xl" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative z-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-16 h-16 rounded-2xl gradient-accent mx-auto flex items-center justify-center mb-4 shadow-xl shadow-secondary/20"
          >
            <span className="text-3xl">🔨</span>
          </motion.div>
          <h1 className="font-display text-3xl font-bold text-primary-foreground">ServiceHub</h1>
          <p className="text-primary-foreground/50 text-sm mt-2">On-demand services at your fingertips</p>
        </motion.div>
      </div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="flex-1 px-6 -mt-8 relative z-10"
      >
        <div className="bg-card rounded-2xl border border-border/60 p-6 shadow-xl shadow-foreground/5">
          <AnimatePresence mode="wait">
            <motion.div
              key={isSignUp ? "signup" : "signin"}
              initial={{ opacity: 0, x: isSignUp ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isSignUp ? -20 : 20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="font-display font-bold text-xl text-center">
                {isSignUp ? "Create Account" : "Welcome Back"}
              </h2>
              <p className="text-xs text-muted-foreground text-center mt-1">
                {isSignUp ? "Sign up to get started" : "Sign in to continue"}
              </p>
            </motion.div>
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="mt-6 space-y-3">
            <AnimatePresence>
              {isSignUp && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="flex items-center gap-3 bg-muted rounded-xl px-4 py-3.5 focus-within:ring-2 focus-within:ring-secondary/30 transition-all mb-3">
                    <User className="w-4 h-4 text-muted-foreground" />
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
            <div className="flex items-center gap-3 bg-muted rounded-xl px-4 py-3.5 focus-within:ring-2 focus-within:ring-secondary/30 transition-all">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent text-sm w-full outline-none placeholder:text-muted-foreground"
              />
            </div>
            <div className="flex items-center gap-3 bg-muted rounded-xl px-4 py-3.5 focus-within:ring-2 focus-within:ring-secondary/30 transition-all">
              <Lock className="w-4 h-4 text-muted-foreground" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-transparent text-sm w-full outline-none placeholder:text-muted-foreground"
              />
              <motion.button
                type="button"
                whileTap={{ scale: 0.85 }}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="w-4 h-4 text-muted-foreground" /> : <Eye className="w-4 h-4 text-muted-foreground" />}
              </motion.button>
            </div>

            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
              <Button type="submit" className="w-full gradient-accent text-secondary-foreground font-display font-bold h-12 rounded-xl hover:opacity-90 shadow-lg shadow-secondary/20 mt-2">
                {isSignUp ? "Create Account" : "Sign In"}
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </motion.div>
          </form>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-border" />
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider">or</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center gap-2 bg-muted rounded-xl py-3 text-sm font-medium hover:bg-muted/80 transition-colors"
          >
            <span className="text-lg">G</span>
            Continue with Google
          </motion.button>

          <p className="text-xs text-center text-muted-foreground mt-5">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-secondary font-bold"
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
