import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { Users, Rocket, Calendar, MessageSquare, ArrowRight, ExternalLink, Zap, Globe, BookOpen } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export const dynamic = "force-dynamic";

async function getStats() {
  const [users, posts, projects, events] = await Promise.all([
    prisma.user.count(),
    prisma.post.count(),
    prisma.project.count(),
    prisma.event.count(),
  ]);
  return { users, posts, projects, events };
}

async function getLatestPosts() {
  return prisma.post.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: {
      author: { select: { id: true, name: true } },
      category: true,
      _count: { select: { replies: true } },
    },
  });
}

async function getFeaturedProjects() {
  return prisma.project.findMany({
    where: { featured: true },
    take: 3,
    include: {
      author: { select: { id: true, name: true } },
      _count: { select: { likes: true } },
    },
  });
}

async function getUpcomingEvents() {
  return prisma.event.findMany({
    take: 3,
    orderBy: { date: "asc" },
  });
}

const eventTypeColors: Record<string, string> = {
  conference: "bg-chad-blue/10 text-chad-blue",
  workshop: "bg-emerald-500/10 text-emerald-400",
  hackathon: "bg-chad-red/10 text-chad-red",
};

const eventTypeLabels: Record<string, string> = {
  conference: "Conférence",
  workshop: "Workshop",
  hackathon: "Hackathon",
};

export default async function HomePage() {
  const [stats, posts, projects, events] = await Promise.all([
    getStats(),
    getLatestPosts(),
    getFeaturedProjects(),
    getUpcomingEvents(),
  ]);

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative min-h-[92vh] flex items-center">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-chad-blue/10 via-transparent to-[#0a0f1e]" />
          <div className="absolute top-20 -left-40 w-96 h-96 bg-chad-blue/20 rounded-full blur-3xl" />
          <div className="absolute top-40 -right-40 w-96 h-96 bg-chad-gold/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-px bg-gradient-to-r from-transparent via-chad-gold/30 to-transparent" />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-chad-gold/10 border border-chad-gold/20 rounded-full px-4 py-1.5 text-sm text-chad-gold mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-chad-gold animate-pulse" />
            Communauté active · {stats.users > 0 ? `${stats.users} développeurs` : "développeurs tchadiens"} connectés
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-tight mb-6">
            La tech au service
            <br />
            <span className="bg-gradient-to-r from-chad-blue via-chad-gold to-chad-red bg-clip-text text-transparent gradient-animate">
              du Tchad 🇹🇩
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Code For Chad est la communauté des développeurs, programmeurs et passionnés du
            numérique tchadiens. Partagez, apprenez, collaborez et construisez ensemble.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register" className="px-8 py-3.5 bg-chad-gold text-[#0a0f1e] font-semibold rounded-xl hover:bg-chad-gold/90 transition-all hover:scale-105 flex items-center gap-2 justify-center">
              Rejoindre la communauté <ArrowRight size={18} />
            </Link>
            <Link href="/community" className="px-8 py-3.5 bg-white/5 text-white border border-white/10 rounded-xl hover:bg-white/10 transition-all flex items-center gap-2 justify-center">
              Explorer les discussions
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto mt-16">
            {[
              { label: "Membres", value: stats.users || "100+", icon: Users },
              { label: "Discussions", value: stats.posts || "50+", icon: MessageSquare },
              { label: "Projets", value: stats.projects || "20+", icon: Rocket },
              { label: "Événements", value: stats.events || "10+", icon: Calendar },
            ].map((s) => (
              <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                <s.icon size={20} className="text-chad-gold mx-auto mb-1" />
                <div className="text-2xl font-bold text-white">{s.value}</div>
                <div className="text-xs text-gray-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-white mb-3">Tout ce dont vous avez besoin</h2>
          <p className="text-gray-400">Une plateforme complète pour la communauté tech tchadienne</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: MessageSquare, title: "Forum communautaire", desc: "Posez vos questions, partagez vos expériences et obtenez de l'aide de la communauté.", color: "from-chad-blue to-blue-600", href: "/community" },
            { icon: Rocket, title: "Vitrine de projets", desc: "Présentez vos créations, découvrez les projets innovants des développeurs tchadiens.", color: "from-chad-gold to-orange-500", href: "/projects" },
            { icon: Calendar, title: "Événements", desc: "Hackathons, conférences, workshops — participez aux événements tech au Tchad.", color: "from-chad-red to-red-600", href: "/events" },
            { icon: BookOpen, title: "Ressources", desc: "Tutoriels, articles, opportunités — tout pour progresser dans votre carrière tech.", color: "from-emerald-600 to-teal-600", href: "/community?category=ressources" },
          ].map((f) => (
            <Link key={f.title} href={f.href} className="group bg-white/3 border border-white/8 rounded-2xl p-6 hover:bg-white/6 hover:border-white/15 transition-all">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-4`}>
                <f.icon size={20} className="text-white" />
              </div>
              <h3 className="font-semibold text-white mb-2">{f.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{f.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Latest Posts + Events */}
      <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <MessageSquare size={20} className="text-chad-gold" />
                Discussions récentes
              </h2>
              <Link href="/community" className="text-sm text-chad-gold hover:underline flex items-center gap-1">
                Tout voir <ArrowRight size={14} />
              </Link>
            </div>
            <div className="space-y-3">
              {posts.length === 0 ? (
                <div className="bg-white/3 border border-white/8 rounded-xl p-8 text-center text-gray-500">
                  Aucune discussion pour l&apos;instant — soyez le premier !
                </div>
              ) : (
                posts.map((post) => (
                  <Link key={post.id} href={`/community/${post.id}`} className="flex gap-4 bg-white/3 border border-white/8 rounded-xl p-4 hover:bg-white/6 hover:border-white/15 transition-all group">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: `${post.category.color}20`, color: post.category.color }}>
                          {post.category.icon} {post.category.name}
                        </span>
                        {post.pinned && <span className="text-xs text-chad-gold">📌 Épinglé</span>}
                      </div>
                      <h3 className="font-medium text-white group-hover:text-chad-gold transition-colors truncate">{post.title}</h3>
                      <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                        <span>{post.author.name}</span>
                        <span>·</span>
                        <span>{format(new Date(post.createdAt), "d MMM yyyy", { locale: fr })}</span>
                        <span>·</span>
                        <span>{post._count.replies} réponses</span>
                        <span>·</span>
                        <span>{post.views} vues</span>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
            <Link href="/community/new" className="mt-4 flex items-center justify-center gap-2 w-full py-3 border border-dashed border-white/20 rounded-xl text-sm text-gray-400 hover:text-white hover:border-white/40 transition-colors">
              <Zap size={16} />
              Démarrer une nouvelle discussion
            </Link>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Calendar size={20} className="text-chad-red" />
                  Événements
                </h2>
                <Link href="/events" className="text-sm text-chad-gold hover:underline flex items-center gap-1">
                  Tout voir <ArrowRight size={14} />
                </Link>
              </div>
              <div className="space-y-3">
                {events.length === 0 ? (
                  <div className="bg-white/3 border border-white/8 rounded-xl p-6 text-center text-gray-500 text-sm">Bientôt des événements !</div>
                ) : (
                  events.map((evt) => (
                    <div key={evt.id} className="bg-white/3 border border-white/8 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${eventTypeColors[evt.type] || "bg-gray-500/20 text-gray-400"}`}>
                          {eventTypeLabels[evt.type] || evt.type}
                        </span>
                        {evt.featured && <span className="text-xs text-chad-gold">★ Vedette</span>}
                      </div>
                      <h3 className="font-medium text-white text-sm leading-snug mb-2">{evt.title}</h3>
                      <div className="text-xs text-gray-500 space-y-0.5">
                        <div>📅 {format(new Date(evt.date), "d MMMM yyyy", { locale: fr })}</div>
                        <div>📍 {evt.location}</div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="bg-gradient-to-br from-chad-blue/30 to-chad-blue/10 border border-chad-blue/30 rounded-2xl p-6 text-center">
              <Globe size={28} className="text-chad-gold mx-auto mb-3" />
              <h3 className="font-bold text-white mb-2">Rencontre des Esprits Numériques</h3>
              <p className="text-sm text-gray-400 mb-4">L&apos;événement annuel incontournable des développeurs tchadiens.</p>
              <Link href="/events" className="block w-full py-2.5 bg-chad-gold text-[#0a0f1e] font-semibold text-sm rounded-lg hover:bg-chad-gold/90 transition-colors">
                En savoir plus
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      {projects.length > 0 && (
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Rocket size={22} className="text-chad-gold" />
              Projets en vedette
            </h2>
            <Link href="/projects" className="text-sm text-chad-gold hover:underline flex items-center gap-1">
              Tous les projets <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div key={project.id} className="bg-white/3 border border-white/8 rounded-2xl p-6 hover:bg-white/6 hover:border-white/15 transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl overflow-hidden bg-gradient-to-br from-chad-blue to-chad-gold/50 flex items-center justify-center">
                    <Image src="/logo.png" alt="Code for Chad" width={24} height={24} className="object-contain" />
                  </div>
                  <span className="text-xs text-chad-gold bg-chad-gold/10 px-2 py-0.5 rounded-full">★ Vedette</span>
                </div>
                <h3 className="font-semibold text-white mb-2">{project.title}</h3>
                <p className="text-sm text-gray-400 mb-4 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tags.split(",").slice(0, 3).map((tag) => (
                    <span key={tag} className="text-xs bg-white/5 border border-white/10 text-gray-400 px-2 py-0.5 rounded-full">{tag.trim()}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>par {project.author.name}</span>
                  <div className="flex items-center gap-3">
                    <span>❤️ {project._count.likes}</span>
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="hover:text-white"><ExternalLink size={14} /></a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative bg-gradient-to-br from-chad-blue/20 via-[#0a0f1e] to-chad-red/10 border border-white/10 rounded-3xl p-12 text-center overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-chad-gold/50 to-transparent" />
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Prêt à rejoindre la communauté ?</h2>
          <p className="text-gray-400 mb-8 max-w-lg mx-auto">
            Des centaines de développeurs tchadiens construisent ensemble.
            Rejoignez-nous, partagez vos projets et faites avancer le Tchad numérique.
          </p>
          <Link href="/auth/register" className="inline-flex items-center gap-2 px-10 py-4 bg-chad-gold text-[#0a0f1e] font-bold rounded-xl hover:bg-chad-gold/90 transition-all hover:scale-105 text-lg">
            Créer un compte gratuit <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
