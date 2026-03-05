import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { motion } from "framer-motion";

const Login = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(isSignUp ? "Account created!" : "Welcome back!");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Hero */}
      <div className="gradient-hero px-6 pt-16 pb-12 rounded-b-[2rem] text-center">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-3xl font-bold text-primary-foreground">ServiceHub</h1>
          <p className="text-primary-foreground/60 text-sm mt-2">On-demand services at your fingertips</p>
        </motion.div>
      </div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="flex-1 px-6 -mt-6"
      >
        <div className="bg-card rounded-2xl border border-border/60 p-6 shadow-lg">
          <h2 className="font-display font-bold text-xl text-center">
            {isSignUp ? "Create Account" : "Welcome Back"}
          </h2>
          <p className="text-xs text-muted-foreground text-center mt-1">
            {isSignUp ? "Sign up to get started" : "Sign in to continue"}
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-3.5">
            {isSignUp && (
              <div className="flex items-center gap-3 bg-muted rounded-xl px-4 py-3">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-transparent text-sm w-full outline-none placeholder:text-muted-foreground"
                />
              </div>
            )}
            <div className="flex items-center gap-3 bg-muted rounded-xl px-4 py-3">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent text-sm w-full outline-none placeholder:text-muted-foreground"
              />
            </div>
            <div className="flex items-center gap-3 bg-muted rounded-xl px-4 py-3">
              <Lock className="w-4 h-4 text-muted-foreground" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-transparent text-sm w-full outline-none placeholder:text-muted-foreground"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff className="w-4 h-4 text-muted-foreground" /> : <Eye className="w-4 h-4 text-muted-foreground" />}
              </button>
            </div>

            <Button type="submit" className="w-full gradient-accent text-secondary-foreground font-display font-bold h-12 rounded-xl hover:opacity-90">
              {isSignUp ? "Create Account" : "Sign In"}
            </Button>
          </form>

          <p className="text-xs text-center text-muted-foreground mt-4">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button onClick={() => setIsSignUp(!isSignUp)} className="text-secondary font-semibold">
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
