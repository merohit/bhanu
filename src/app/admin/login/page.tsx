"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const auth = localStorage.getItem("subhband_admin_auth");
    if (auth === "true") {
      router.push("/admin");
    }
    setLoading(false);
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123") {
      localStorage.setItem("subhband_admin_auth", "true");
      router.push("/admin");
    } else {
      setError("Invalid password. Default: admin123");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="w-5 h-5 border-2 border-gold/30 border-t-gold rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold/3 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        <div className="glass rounded-2xl p-8 glow-gold">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center mb-4">
              <span className="text-2xl text-dark-900 font-bold">S</span>
            </div>
            <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
            <p className="text-white/40 text-sm mt-1">Enter your password to access admin panel</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-white/60 text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                className="w-full px-4 py-3 rounded-xl bg-dark-700 border border-white/10 text-white placeholder-white/20 focus:border-gold/50 focus:ring-1 focus:ring-gold/20 outline-none transition-all"
                placeholder="Enter admin password"
                autoFocus
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-2.5 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-gold to-gold-dark text-dark-900 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-gold/20 transition-all"
            >
              Login
            </button>
          </form>

          <p className="text-center text-white/20 text-xs mt-6">
            Default password: admin123
          </p>
        </div>
      </div>
    </div>
  );
}
