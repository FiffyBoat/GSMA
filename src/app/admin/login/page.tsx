"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Loader2, Lock, Mail, ShieldCheck } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }

      router.push("/admin/dashboard");
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#111827] flex items-center justify-center p-4">
      <div className="w-full max-w-[980px] overflow-hidden rounded-[8px] border border-white/10 bg-white shadow-2xl">
        <div className="grid min-h-[560px] grid-cols-1 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="hidden bg-[#8B0000] p-8 text-white lg:flex lg:flex-col lg:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#ffcc00]">
                Ga South Municipal Assembly
              </p>
              <h1 className="mt-4 text-3xl font-bold leading-tight">
                Website Administration
              </h1>
              <p className="mt-4 text-sm leading-6 text-white/80">
                Manage public notices, events, projects, gallery albums,
                departments, leadership records, and municipal service content.
              </p>
            </div>
            <div className="rounded-[8px] border border-white/15 bg-white/10 p-4">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-[#ffcc00]" />
                <p className="text-sm font-semibold">Secure access only</p>
              </div>
              <p className="mt-2 text-xs leading-5 text-white/75">
                Sign in with an authorized admin account to continue.
              </p>
            </div>
          </div>

          <div className="p-6 sm:p-8 lg:p-10">
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-[#8B0000] rounded-[8px] flex items-center justify-center mx-auto mb-4">
              <Lock className="w-7 h-7 text-white" />
            </div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8B0000]">
              Admin Portal
            </p>
            <h2 className="mt-2 text-2xl font-bold text-gray-900">
              Sign in to continue
            </h2>
            <p className="text-gray-500 mt-2">
              GSMA Content Management System
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-[8px] text-sm">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@gsma.gov.gh"
                  className="pl-10 h-12 rounded-[8px]"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="pl-10 h-12 rounded-[8px]"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 rounded-[8px] bg-[#8B0000] hover:bg-[#6B0000] text-white font-semibold"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-100 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#8B0000] transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to main website
            </Link>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
