import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Rocket, ExternalLink, Globe, Heart, Plus } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export const dynamic = "force-dynamic";

async function getProjects() {
  return prisma.project.findMany({
    include: {
      author: { select: { id: true, name: true } },
      _count: { select: { likes: true } },
    },
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
  });
}

const techColors: Record<string, string> = {
  react: "bg-blue-500/10 text-blue-400",
  nextjs: "bg-gray-500/10 text-gray-300",
  python: "bg-yellow-500/10 text-yellow-400",
  nodejs: "bg-green-500/10 text-green-400",
  mobile: "bg-purple-500/10 text-purple-400",
  data: "bg-orange-500/10 text-orange-400",
};

export default async function ProjectsPage() {
  const projects = await getProjects();
  const allTags = [...new Set(projects.flatMap((p) => p.tags.split(",").map((t) => t.trim())))];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Rocket size={24} className="text-[#FECB00]" />
            Projets
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Découvrez les créations des développeurs de la communauté Code For Chad
          </p>
        </div>
        <Link href="/projects/new" className="flex items-center gap-2 px-5 py-2.5 bg-[#FECB00] text-[#0a0f1e] font-semibold text-sm rounded-xl hover:bg-[#FECB00]/90 transition-colors">
          <Plus size={16} />
          Soumettre un projet
        </Link>
      </div>

      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {allTags.slice(0, 15).map((tag) => (
            <span key={tag} className={`text-xs px-3 py-1 rounded-full border ${techColors[tag] || "bg-white/5 border-white/10 text-gray-400"}`}>
              {tag}
            </span>
          ))}
        </div>
      )}

      {projects.length === 0 ? (
        <div className="text-center py-20">
          <Rocket size={48} className="text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 mb-4">Aucun projet encore — soyez le premier à partager !</p>
          <Link href="/projects/new" className="text-[#FECB00] hover:underline text-sm">
            Soumettre votre projet →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="group bg-white/3 border border-white/8 rounded-2xl overflow-hidden hover:bg-white/5 hover:border-white/15 transition-all">
              <div className="p-6 pb-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#003082] to-[#FECB00]/40 flex items-center justify-center">
                    <Rocket size={20} className="text-white" />
                  </div>
                  {project.featured && (
                    <span className="text-xs text-[#FECB00] bg-[#FECB00]/10 px-2 py-0.5 rounded-full">★ Vedette</span>
                  )}
                </div>
                <h3 className="font-semibold text-white text-lg mb-2 group-hover:text-[#FECB00] transition-colors">{project.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed line-clamp-3">{project.description}</p>
              </div>

              <div className="px-6 pb-4">
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.split(",").map((tag) => (
                    <span key={tag} className={`text-xs px-2 py-0.5 rounded-full ${techColors[tag.trim()] || "bg-white/5 text-gray-500"}`}>
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              </div>

              <div className="px-6 py-4 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#003082] to-[#FECB00] flex items-center justify-center text-xs font-bold text-white">
                    {project.author.name[0]}
                  </div>
                  <span className="text-xs text-gray-400">{project.author.name}</span>
                  <span className="text-xs text-gray-600">·</span>
                  <span className="text-xs text-gray-600">{format(new Date(project.createdAt), "MMM yyyy", { locale: fr })}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-xs text-gray-500"><Heart size={12} className="text-red-400" />{project._count.likes}</span>
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" onClick={(e) => e.stopPropagation()}>
                      <ExternalLink size={14} />
                    </a>
                  )}
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" onClick={(e) => e.stopPropagation()}>
                      <Globe size={14} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
