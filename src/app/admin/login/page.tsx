"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "../../../services/authService";
import { Lock } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await authService.signIn(email, password);
      router.push("/admin/dashboard");
    } catch (err: any) {
      setError(err.message || "Failed to sign in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface px-4">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <Lock className="w-8 h-8 text-primary" />
          </div>
          <h1
            className="font-display font-bold text-on-surface mb-2"
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
              letterSpacing: "-0.02em",
            }}
          >
            Admin Access
          </h1>
          <p className="text-on-surface-variant text-sm">
            Sign in to manage blog posts
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-surface-container-lowest rounded-2xl p-8 shadow-xl">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 text-sm font-semibold">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs tracking-label uppercase font-semibold text-on-surface mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="w-full px-4 py-3 bg-surface-container rounded-lg
                         text-on-surface placeholder:text-on-surface-variant
                         focus:outline-none focus:ring-2 focus:ring-primary/20
                         transition-all"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-xs tracking-label uppercase font-semibold text-on-surface mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-surface-container rounded-lg
                         text-on-surface placeholder:text-on-surface-variant
                         focus:outline-none focus:ring-2 focus:ring-primary/20
                         transition-all"
                required
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white font-bold text-sm tracking-label uppercase
                       px-8 py-4 rounded-lg hover:opacity-90 transition-opacity
                       shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="text-sm text-on-surface-variant hover:text-primary transition-colors"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
