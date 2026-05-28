"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Send, Loader2 } from "lucide-react";

interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  color: string;
}

export default function NewPostPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [form, setForm] = useState({ title: "", content: "", categoryId: "" });
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/categories").then((r) => r.json()).then(setCategories);
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.content || !form.categoryId) {
      setError("Tous les champs sont requis");
      return;
    }

    setLoading(true);
    setError("");

    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      const post = await res.json();
      router.push(`/community/${post.id}`);
    } else {
      const data = await res.json();
      setError(data.error || "Erreur lors de la publication");
      setLoading(false);
    }
  };

  if (status === "loading") return null;
  if (!session) return null;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
      <Link href="/community" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-6 transition-colors">
        <ArrowLeft size={16} /> Retour à la communauté
      </Link>

      <h1 className="text-2xl font-bold text-white mb-8">Nouvelle discussion</h1>

      <div className="bg-white/3 border border-white/8 rounded-2xl p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-gray-300 mb-1.5">Catégorie</label>
            <select
              value={form.categoryId}
              onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FECB00]/50 transition-colors"
            >
              <option value="" className="bg-[#1e2535]">Choisir une catégorie...</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id} className="bg-[#1e2535]">
                  {cat.icon} {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1.5">Titre</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#FECB00]/50 transition-colors"
              placeholder="Un titre clair et descriptif..."
              maxLength={150}
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1.5">Contenu</label>
            <textarea
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              rows={10}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#FECB00]/50 transition-colors resize-y"
              placeholder="Décrivez votre sujet en détail. Plus vous donnez de contexte, plus vous aurez de réponses utiles..."
            />
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
              {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
              Publier la discussion
            </button>
            <Link href="/community" className="px-6 py-3 text-sm text-gray-400 hover:text-white transition-colors">
              Annuler
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
