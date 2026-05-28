import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { ArrowLeft, Eye, MessageSquare } from "lucide-react";
import ReplyForm from "./ReplyForm";

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      author: { select: { id: true, name: true, role: true, bio: true, image: true } },
      category: true,
      replies: {
        include: { author: { select: { id: true, name: true, role: true } } },
        orderBy: { createdAt: "asc" },
      },
    },
  });

  if (!post) notFound();

  await prisma.post.update({ where: { id }, data: { views: { increment: 1 } } });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      {/* Back */}
      <Link href="/community" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-6 transition-colors">
        <ArrowLeft size={16} /> Retour aux discussions
      </Link>

      {/* Post */}
      <div className="bg-white/3 border border-white/8 rounded-2xl p-6 mb-6">
        {/* Category + meta */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span
            className="text-xs px-2 py-0.5 rounded-full"
            style={{ background: `${post.category.color}20`, color: post.category.color }}
          >
            {post.category.icon} {post.category.name}
          </span>
          {post.pinned && <span className="text-xs text-[#FECB00] bg-[#FECB00]/10 px-2 py-0.5 rounded-full">📌 Épinglé</span>}
        </div>

        <h1 className="text-2xl font-bold text-white mb-6">{post.title}</h1>

        {/* Author */}
        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/8">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#003082] to-[#FECB00] flex items-center justify-center font-bold text-white">
            {post.author.name[0].toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-white">{post.author.name}</span>
              {post.author.role === "admin" && <span className="text-xs text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full">Admin</span>}
            </div>
            <div className="text-xs text-gray-500 flex items-center gap-3">
              <span>{format(new Date(post.createdAt), "d MMMM yyyy 'à' HH:mm", { locale: fr })}</span>
              <span className="flex items-center gap-1"><Eye size={11} /> {post.views} vues</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">{post.content}</div>
      </div>

      {/* Replies */}
      <div className="mb-6">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-white mb-4">
          <MessageSquare size={18} className="text-[#FECB00]" />
          {post.replies.length} réponse{post.replies.length !== 1 ? "s" : ""}
        </h2>

        <div className="space-y-4">
          {post.replies.map((reply, i) => (
            <div key={reply.id} className="flex gap-4">
              <div className="flex flex-col items-center gap-1">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#003082]/60 to-[#FECB00]/30 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                  {reply.author.name[0].toUpperCase()}
                </div>
                {i < post.replies.length - 1 && <div className="w-px flex-1 bg-white/5 min-h-4" />}
              </div>
              <div className="flex-1 bg-white/3 border border-white/8 rounded-xl p-4 mb-0">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm font-medium text-white">{reply.author.name}</span>
                  {reply.author.role === "admin" && <span className="text-xs text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full">Admin</span>}
                  <span className="text-xs text-gray-600">
                    {format(new Date(reply.createdAt), "d MMM yyyy 'à' HH:mm", { locale: fr })}
                  </span>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">{reply.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reply form */}
      <ReplyForm postId={post.id} />
    </div>
  );
}
