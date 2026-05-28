"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Rocket, Loader2, X } from "lucide-react";

const SUGGESTED_TAGS = [
  "web", "mobile", "react", "nextjs", "python", "nodejs", "java",
  "flutter", "react-native", "data", "ia", "fintech", "education",
  "agriculture", "sante", "api", "fullstack", "backend", "frontend",
];

export default function NewProjectPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    description: "",
    github: "",
    demo: "",
    tags: [] as string[],
  });
  const [tagInput, setTagInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") router.push("/auth/login");
  }, [status, router]);

  const addTag = (tag: string) => {
    const t = tag.trim().toLowerCase();
    if (t && !form.tags.includes(t) && form.tags.length < 8) {
      setForm({ ...form, tags: [...form.tags, t] });
    }
    setTagInput("");
  };

  const removeTag = (tag: string) => {
    setForm({ ...form, tags: form.tags.filter((t) => t !== tag) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.description || form.tags.length === 0) {
      setError("Titre, description et au moins un tag sont requis");
      return;
    }

    setLoading(true);
    setError("");

    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push("/projects");
    } else {
      const data = await res.json();
      setError(data.error || "Erreur");
      setLoading(false);
    }
  };

  if (status === "loading" || !session) return null;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
      <Link href="/projects" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-6 transition-colors">
        <ArrowLeft size={16} /> Retour aux projets
      </Link>

      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#003082] to-[#FECB00]/40 flex items-center justify-center">
          <Rocket size={20} className="text-white" />
        </div>
        <h1 className="text-2xl font-bold text-white">Soumettre un projet</h1>
      </div>

      <div className="bg-white/3 border border-white/8 rounded-2xl p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-gray-300 mb-1.5">Nom du projet *</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#FECB00]/50 transition-colors"
              placeholder="Ex: ChadPay, EduChad..."
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1.5">Description *</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={5}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#FECB00]/50 transition-colors resize-none"
              placeholder="Décrivez votre projet : quel problème résout-il ? Pour qui ? Comment fonctionne-t-il ?"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-300 mb-1.5">GitHub (optionnel)</label>
              <input
                type="url"
                value={form.github}
                onChange={(e) => setForm({ ...form, github: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#FECB00]/50 transition-colors"
                placeholder="https://github.com/..."
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1.5">Démo (optionnel)</label>
              <input
                type="url"
                value={form.demo}
                onChange={(e) => setForm({ ...form, demo: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#FECB00]/50 transition-colors"
                placeholder="https://..."
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1.5">Tags * (technologies utilisées)</label>

            {/* Selected tags */}
            {form.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {form.tags.map((tag) => (
                  <span key={tag} className="flex items-center gap-1 text-xs bg-[#003082]/30 text-blue-300 border border-[#003082]/50 px-2 py-1 rounded-full">
                    {tag}
                    <button type="button" onClick={() => removeTag(tag)} className="hover:text-red-400">
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* Tag input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === ",") {
                    e.preventDefault();
                    addTag(tagInput);
                  }
                }}
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#FECB00]/50 transition-colors text-sm"
                placeholder="Ajouter un tag (Entrée pour valider)"
              />
              <button
                type="button"
                onClick={() => addTag(tagInput)}
                className="px-4 py-2.5 bg-white/10 text-gray-300 rounded-xl hover:bg-white/15 text-sm transition-colors"
              >
                +
              </button>
            </div>

            {/* Suggestions */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {SUGGESTED_TAGS.filter((t) => !form.tags.includes(t)).slice(0, 12).map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => addTag(tag)}
                  className="text-xs px-2.5 py-1 bg-white/5 border border-white/10 text-gray-500 rounded-full hover:text-white hover:bg-white/10 transition-colors"
                >
                  + {tag}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
              {error}
            </div>
          )}

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-6 py-3 bg-[#FECB00] text-[#0a0f1e] font-semibold rounded-xl hover:bg-[#FECB00]/90 transition-colors disabled:opacity-60"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <Rocket size={16} />}
              Publier le projet
            </button>
            <Link href="/projects" className="px-6 py-3 text-sm text-gray-400 hover:text-white transition-colors">
              Annuler
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
