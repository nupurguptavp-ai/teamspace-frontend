"use client";

import { useState } from "react";
import axios from "axios";
import { Mail, Lock } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        { email, password }
      );

      localStorage.setItem("token", res.data.access_token);
      window.location.href = "/chat";
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Login failed");
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="w-[400px] p-8 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-xl">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="mx-auto mb-3 w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-purple-600">
            <Lock className="text-white"></Lock>
          </div>
          <h2 className="text-white text-2xl font-semibold">Welcome Back</h2>
          <p className="text-gray-400 text-sm">
            Sign in to your Teamspace account
          </p>
        </div>
        {/* Email */}
        <div className="relative mb-4">
          <Mail className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
          <input
            className="w-full pl-10 pr-3 py-2 rounded-lg bg-slate-800 text-white outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {/* Password */}
        <div className="relative mb-2">
          <Lock className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
          <input
            type="password"
            className="w-full pl-10 pr-3 py-2 rounded-lg bg-slate-800 text-white outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {/* Login Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full py-2 rounded-lg text-white font-medium 
          bg-gradient-to-r from-blue-500 to-purple-600 
          hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        {/* Signup */}
        <p className="text-center text-gray-400 text-sm mt-6">
          Don’t have an account?{" "}
          <span
            className="text-blue-400 cursor-pointer hover:underline"
            onClick={() => router.push("/signup")}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}
