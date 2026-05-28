"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Code2, Eye, EyeOff, Loader2, CheckCircle } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }
    if (form.password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères");
      return;
    }

    setLoading(true);
    setError("");

    const res = await fetch("/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Une erreur est survenue");
      setLoading(false);
    } else {
      router.push("/auth/login?registered=1");
    }
  };

  const perks = [
    "Accès au forum communautaire",
    "Partagez vos projets",
    "Participez aux hackathons",
    "Réseau de développeurs tchadiens",
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left */}
        <div className="hidden md:block">
          <Link href="/" className="inline-flex items-center gap-2.5 font-bold text-xl mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#003082] via-[#FECB00] to-[#C8102E] flex items-center justify-center">
              <Code2 size={20} className="text-white" />
            </div>
            <span className="text-white">Code<span className="text-[#FECB00]">For</span>Chad</span>
          </Link>

          <h2 className="text-3xl font-bold text-white mb-4">
            Rejoignez la communauté tech tchadienne
          </h2>
          <p className="text-gray-400 mb-8 leading-relaxed">
            Des centaines de développeurs, designers et passionnés du numérique vous attendent.
            Ensemble, construisons le futur numérique du Tchad.
          </p>

          <ul className="space-y-3">
            {perks.map((p) => (
              <li key={p} className="flex items-center gap-3 text-gray-300">
                <CheckCircle size={18} className="text-[#FECB00] flex-shrink-0" />
                {p}
              </li>
            ))}
          </ul>

          <div className="mt-10 p-4 bg-white/5 border border-white/10 rounded-xl">
            <p className="text-sm text-gray-400 italic">
              &quot;Code For Chad nous permet de nous connecter, de partager nos expériences et
              de construire ensemble des solutions pour notre pays.&quot;
            </p>
            <div className="mt-3 text-sm font-medium text-white">— Équipe Code For Chad</div>
          </div>
        </div>

        {/* Right */}
        <div>
          <div className="md:hidden text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2.5 font-bold text-xl">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#003082] via-[#FECB00] to-[#C8102E] flex items-center justify-center">
                <Code2 size={20} className="text-white" />
              </div>
              <span className="text-white">Code<span className="text-[#FECB00]">For</span>Chad</span>
            </Link>
          </div>

          <div className="bg-white/3 border border-white/10 rounded-2xl p-8">
            <h1 className="text-xl font-bold text-white mb-6">Créer un compte</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-300 mb-1.5">Nom complet</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#FECB00]/50 transition-colors"
                  placeholder="Votre nom"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-1.5">Email</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#FECB00]/50 transition-colors"
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
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pr-12 text-white placeholder-gray-600 focus:outline-none focus:border-[#FECB00]/50 transition-colors"
                    placeholder="Min. 6 caractères"
                  />
                  <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
                    {show ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-1.5">Confirmer le mot de passe</label>
                <input
                  type={show ? "text" : "password"}
                  required
                  value={form.confirm}
                  onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#FECB00]/50 transition-colors"
                  placeholder="Répétez votre mot de passe"
                />
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
                Créer mon compte
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-500">
              Déjà membre ?{" "}
              <Link href="/auth/login" className="text-[#FECB00] hover:underline">
                Se connecter
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
