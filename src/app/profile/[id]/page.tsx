import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ExternalLink, Globe, Calendar, MessageSquare, Rocket, ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export const dynamic = "force-dynamic";

export default async function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      posts: {
        take: 5,
        orderBy: { createdAt: "desc" },
        include: { category: true, _count: { select: { replies: true } } },
      },
      projects: {
        take: 6,
        orderBy: { createdAt: "desc" },
        include: { _count: { select: { likes: true } } },
      },
      _count: {
        select: { posts: true, projects: true, replies: true },
      },
    },
  });

  if (!user) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <Link href="/community" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-8 transition-colors">
        <ArrowLeft size={16} /> Retour
      </Link>

      <div className="bg-white/3 border border-white/8 rounded-2xl p-8 mb-6">
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#003082] via-[#FECB00]/60 to-[#C8102E]/30 flex items-center justify-center text-3xl font-bold text-white flex-shrink-0">
            {user.name[0].toUpperCase()}
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold text-white">{user.name}</h1>
              {user.role === "admin" && (
                <span className="text-xs text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded-full">Admin</span>
              )}
            </div>
            {user.bio && <p className="text-gray-400 mb-4 leading-relaxed">{user.bio}</p>}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <Calendar size={14} />
                Membre depuis {format(new Date(user.createdAt), "MMMM yyyy", { locale: fr })}
              </span>
              {user.github && (
                <a href={`https://github.com/${user.github}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-white transition-colors">
                  <ExternalLink size={14} /> {user.github}
                </a>
              )}
              {user.twitter && (
                <a href={`https://twitter.com/${user.twitter}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-white transition-colors">
                  <ExternalLink size={14} /> @{user.twitter}
                </a>
              )}
              {user.website && (
                <a href={user.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-white transition-colors">
                  <Globe size={14} /> Site web
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/8">
          {[
            { label: "Discussions", value: user._count.posts, icon: MessageSquare },
            { label: "Projets", value: user._count.projects, icon: Rocket },
            { label: "Réponses", value: user._count.replies, icon: MessageSquare },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-xl font-bold text-white">{s.value}</div>
              <div className="text-xs text-gray-500">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {user.posts.length > 0 && (
          <div>
            <h2 className="font-semibold text-white mb-4 flex items-center gap-2">
              <MessageSquare size={16} className="text-[#FECB00]" />
              Dernières discussions
            </h2>
            <div className="space-y-2">
              {user.posts.map((post) => (
                <Link key={post.id} href={`/community/${post.id}`} className="block bg-white/3 border border-white/8 rounded-xl p-3 hover:bg-white/5 hover:border-white/15 transition-all">
                  <p className="text-sm text-white hover:text-[#FECB00] transition-colors line-clamp-1">{post.title}</p>
                  <div className="flex items-center gap-2 mt-1 text-xs text-gray-600">
                    <span>{post.category.icon} {post.category.name}</span>
                    <span>·</span>
                    <span>{post._count.replies} réponses</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {user.projects.length > 0 && (
          <div>
            <h2 className="font-semibold text-white mb-4 flex items-center gap-2">
              <Rocket size={16} className="text-[#FECB00]" />
              Projets
            </h2>
            <div className="space-y-2">
              {user.projects.map((project) => (
                <div key={project.id} className="bg-white/3 border border-white/8 rounded-xl p-3">
                  <p className="text-sm font-medium text-white">{project.title}</p>
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {project.tags.split(",").slice(0, 3).map((tag) => (
                      <span key={tag} className="text-xs bg-white/5 text-gray-500 px-1.5 py-0.5 rounded">{tag.trim()}</span>
                    ))}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">❤️ {project._count.likes} likes</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
