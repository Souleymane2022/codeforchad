"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Send, Loader2 } from "lucide-react";

export default function ReplyForm({ postId }: { postId: string }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);
    setError("");

    const res = await fetch(`/api/posts/${postId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });

    if (res.ok) {
      setContent("");
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error || "Erreur lors de l'envoi");
    }

    setLoading(false);
  };

  if (!session) {
    return (
      <div className="bg-white/3 border border-white/8 rounded-xl p-6 text-center">
        <p className="text-gray-400 mb-4">Connectez-vous pour répondre à cette discussion</p>
        <Link href="/auth/login" className="px-6 py-2.5 bg-[#FECB00] text-[#0a0f1e] font-semibold text-sm rounded-lg hover:bg-[#FECB00]/90 transition-colors">
          Se connecter
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white/3 border border-white/8 rounded-2xl p-6">
      <h3 className="text-sm font-semibold text-gray-300 mb-4">Votre réponse</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#FECB00]/50 transition-colors resize-none text-sm"
          placeholder="Écrivez votre réponse..."
        />
        {error && (
          <p className="text-red-400 text-sm mt-2">{error}</p>
        )}
        <div className="flex justify-end mt-3">
          <button
            type="submit"
            disabled={loading || !content.trim()}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#FECB00] text-[#0a0f1e] font-semibold text-sm rounded-xl hover:bg-[#FECB00]/90 transition-colors disabled:opacity-50"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
            Répondre
          </button>
        </div>
      </form>
    </div>
  );
}
