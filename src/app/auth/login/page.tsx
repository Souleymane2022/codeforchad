"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Code2, Eye, EyeOff, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    if (res?.error) {
      setError("Email ou mot de passe incorrect");
      setLoading(false);
    } else {
      router.push("/community");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 font-bold text-xl mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#003082] via-[#FECB00] to-[#C8102E] flex items-center justify-center">
              <Code2 size={20} className="text-white" />
            </div>
            <span className="text-white">Code<span className="text-[#FECB00]">For</span>Chad</span>
          </Link>
          <h1 className="text-2xl font-bold text-white">Content de vous revoir</h1>
          <p className="text-gray-400 mt-1 text-sm">Connectez-vous à votre compte</p>
        </div>

        <div className="bg-white/3 border border-white/10 rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-300 mb-1.5">Email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#FECB00]/50 focus:bg-white/8 transition-colors"
                placeholder="vous@example.com"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-1.5">Mot de passe</label>
              <div className="relative">
                <input
                  type={show ? "text" : "password"}
                  required
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pr-12 text-white placeholder-gray-600 focus:outline-none focus:border-[#FECB00]/50 focus:bg-white/8 transition-colors"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                >
                  {show ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#FECB00] text-[#0a0f1e] font-semibold rounded-xl hover:bg-[#FECB00]/90 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading && <Loader2 size={18} className="animate-spin" />}
              Se connecter
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            Pas encore de compte ?{" "}
            <Link href="/auth/register" className="text-[#FECB00] hover:underline">
              Rejoindre Code For Chad
            </Link>
          </div>
        </div>

        <div className="mt-4 text-center text-xs text-gray-600">
          Compte admin de démo : admin@codeforchad.net / admin123
        </div>
      </div>
    </div>
  );
}
