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

const eventTypeColors: Record<string, { bg: string; text: string; label: string }> = {
  conference: { bg: "#EEF2FF", text: "#003082", label: "Conférence" },
  workshop: { bg: "#ECFDF5", text: "#065F46", label: "Workshop" },
  hackathon: { bg: "#FFF1F2", text: "#C8102E", label: "Hackathon" },
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

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center" style={{ background: 'linear-gradient(160deg, #f0f5ff 0%, #f5f7fa 50%, #fff8e1 100%)' }}>
        <div className="absolute top-20 -left-32 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl pointer-events-none" style={{ background: '#003082' }} />
        <div className="absolute bottom-10 -right-32 w-[400px] h-[400px] rounded-full opacity-15 blur-3xl pointer-events-none" style={{ background: '#FECB00' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5 blur-3xl pointer-events-none" style={{ background: '#C8102E' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-28 text-center">
          {/* badge */}
          <div className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold mb-8 shadow-sm"
            style={{ background: '#FECB00', color: '#0d1b3e' }}>
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            Communauté active · {stats.users > 0 ? `${stats.users} développeurs` : "développeurs tchadiens"} connectés
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black leading-tight mb-6" style={{ color: '#0d1b3e' }}>
            La tech au service
            <br />
            <span className="bg-clip-text text-transparent gradient-animate"
              style={{ backgroundImage: 'linear-gradient(90deg, #003082, #1a4fa0, #FECB00, #C8102E)' }}>
              du Tchad 🇹🇩
            </span>
          </h1>

          <p className="text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed" style={{ color: '#6b7a99' }}>
            Code For Chad est la communauté des développeurs, programmeurs et passionnés du
            numérique tchadiens. Partagez, apprenez, collaborez et construisez ensemble.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register"
              className="px-8 py-4 font-bold rounded-xl transition-all hover:scale-105 flex items-center gap-2 justify-center shadow-lg"
              style={{ background: '#003082', color: '#fff', boxShadow: '0 8px 24px rgba(0,48,130,0.3)' }}>
              Rejoindre la communauté <ArrowRight size={18} />
            </Link>
            <Link href="/community"
              className="px-8 py-4 font-semibold rounded-xl transition-all flex items-center gap-2 justify-center hover-bg-light"
              style={{ background: '#fff', color: '#003082', border: '2px solid #003082' }}>
              Explorer les discussions
            </Link>
          </div>

          {/* stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto mt-16">
            {[
              { label: "Membres", value: stats.users || "100+", icon: Users, color: '#003082' },
              { label: "Discussions", value: stats.posts || "50+", icon: MessageSquare, color: '#FECB00' },
              { label: "Projets", value: stats.projects || "20+", icon: Rocket, color: '#C8102E' },
              { label: "Événements", value: stats.events || "10+", icon: Calendar, color: '#003082' },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-2xl p-5 text-center shadow-sm" style={{ border: '1px solid #dde3f0' }}>
                <s.icon size={22} className="mx-auto mb-2" style={{ color: s.color }} />
                <div className="text-2xl font-black" style={{ color: '#0d1b3e' }}>{s.value}</div>
                <div className="text-xs font-medium mt-1" style={{ color: '#6b7a99' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-black mb-3" style={{ color: '#0d1b3e' }}>Tout ce dont vous avez besoin</h2>
          <p style={{ color: '#6b7a99' }}>Une plateforme complète pour la communauté tech tchadienne</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: MessageSquare, title: "Forum communautaire", desc: "Posez vos questions, partagez vos expériences et obtenez de l'aide de la communauté.", bg: '#003082', href: "/community" },
            { icon: Rocket, title: "Vitrine de projets", desc: "Présentez vos créations, découvrez les projets innovants des développeurs tchadiens.", bg: '#FECB00', iconColor: '#0d1b3e', href: "/projects" },
            { icon: Calendar, title: "Événements", desc: "Hackathons, conférences, workshops — participez aux événements tech au Tchad.", bg: '#C8102E', href: "/events" },
            { icon: BookOpen, title: "Ressources", desc: "Tutoriels, articles, opportunités — tout pour progresser dans votre carrière tech.", bg: '#059669', href: "/community?category=ressources" },
          ].map((f) => (
            <Link key={f.title} href={f.href}
              className="bg-white rounded-2xl p-6 transition-all hover-card"
              style={{ border: '1px solid #dde3f0' }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-sm" style={{ background: f.bg }}>
                <f.icon size={22} style={{ color: f.iconColor ?? '#fff' }} />
              </div>
              <h3 className="font-bold mb-2" style={{ color: '#0d1b3e' }}>{f.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#6b7a99' }}>{f.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ── POSTS + EVENTS ───────────────────────────────────────── */}
      <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Posts */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-black flex items-center gap-2" style={{ color: '#0d1b3e' }}>
                <MessageSquare size={20} style={{ color: '#FECB00' }} />
                Discussions récentes
              </h2>
              <Link href="/community" className="text-sm font-semibold flex items-center gap-1 hover-text-blue transition-colors" style={{ color: '#003082' }}>
                Tout voir <ArrowRight size={14} />
              </Link>
            </div>
            <div className="space-y-3">
              {posts.length === 0 ? (
                <div className="bg-white rounded-xl p-8 text-center" style={{ border: '1px solid #dde3f0', color: '#6b7a99' }}>
                  Aucune discussion pour l&apos;instant — soyez le premier !
                </div>
              ) : (
                posts.map((post) => (
                  <Link key={post.id} href={`/community/${post.id}`}
                    className="flex gap-4 bg-white rounded-xl p-4 transition-all group hover-border-blue"
                    style={{ border: '1px solid #dde3f0', display: 'flex' }}>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs px-2.5 py-0.5 rounded-full font-medium" style={{ background: `${post.category.color}15`, color: post.category.color }}>
                          {post.category.icon} {post.category.name}
                        </span>
                        {post.pinned && <span className="text-xs font-medium" style={{ color: '#d4a900' }}>📌 Épinglé</span>}
                      </div>
                      <h3 className="font-semibold truncate mb-1 transition-colors" style={{ color: '#0d1b3e' }}>{post.title}</h3>
                      <div className="flex items-center gap-3 text-xs" style={{ color: '#6b7a99' }}>
                        <span>{post.author.name}</span>
                        <span>·</span>
                        <span>{format(new Date(post.createdAt), "d MMM yyyy", { locale: fr })}</span>
                        <span>·</span>
                        <span>{post._count.replies} réponses</span>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
            <Link href="/community/new"
              className="mt-4 flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold transition-colors hover-border-dashed"
              style={{ border: '2px dashed #dde3f0', color: '#6b7a99' }}>
              <Zap size={16} />
              Démarrer une nouvelle discussion
            </Link>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-black flex items-center gap-2" style={{ color: '#0d1b3e' }}>
                  <Calendar size={20} style={{ color: '#C8102E' }} />
                  Événements
                </h2>
                <Link href="/events" className="text-sm font-semibold flex items-center gap-1 hover-text-blue transition-colors" style={{ color: '#003082' }}>
                  Tout voir <ArrowRight size={14} />
                </Link>
              </div>
              <div className="space-y-3">
                {events.length === 0 ? (
                  <div className="bg-white rounded-xl p-6 text-center text-sm" style={{ border: '1px solid #dde3f0', color: '#6b7a99' }}>Bientôt des événements !</div>
                ) : (
                  events.map((evt) => {
                    const evtStyle = eventTypeColors[evt.type] ?? { bg: '#f3f4f6', text: '#4a5568', label: evt.type };
                    return (
                      <div key={evt.id} className="bg-white rounded-xl p-4" style={{ border: '1px solid #dde3f0' }}>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold" style={{ background: evtStyle.bg, color: evtStyle.text }}>
                            {evtStyle.label}
                          </span>
                          {evt.featured && <span className="text-xs font-bold" style={{ color: '#d4a900' }}>★ Vedette</span>}
                        </div>
                        <h3 className="font-semibold text-sm leading-snug mb-2" style={{ color: '#0d1b3e' }}>{evt.title}</h3>
                        <div className="text-xs space-y-0.5" style={{ color: '#6b7a99' }}>
                          <div>📅 {format(new Date(evt.date), "d MMMM yyyy", { locale: fr })}</div>
                          <div>📍 {evt.location}</div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* CTA card */}
            <div className="rounded-2xl p-6 text-center text-white" style={{ background: 'linear-gradient(135deg, #003082, #1a4fa0)' }}>
              <Globe size={28} className="mx-auto mb-3" style={{ color: '#FECB00' }} />
              <h3 className="font-black mb-2">Rencontre des Esprits Numériques</h3>
              <p className="text-sm mb-4 opacity-80">L&apos;événement annuel incontournable des développeurs tchadiens.</p>
              <Link href="/events"
                className="block w-full py-2.5 font-bold text-sm rounded-lg transition-colors"
                style={{ background: '#FECB00', color: '#0d1b3e' }}>
                En savoir plus
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED PROJECTS ─────────────────────────────────────── */}
      {projects.length > 0 && (
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black flex items-center gap-2" style={{ color: '#0d1b3e' }}>
              <Rocket size={22} style={{ color: '#C8102E' }} />
              Projets en vedette
            </h2>
            <Link href="/projects" className="text-sm font-semibold flex items-center gap-1 hover-text-blue transition-colors" style={{ color: '#003082' }}>
              Tous les projets <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div key={project.id} className="bg-white rounded-2xl p-6 transition-all hover-card-strong" style={{ border: '1px solid #dde3f0' }}>
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center" style={{ background: '#f0f3f8', border: '1px solid #dde3f0' }}>
                    <Image src="/logo.png" alt="Logo" width={28} height={28} className="object-contain" />
                  </div>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: '#FECB00', color: '#0d1b3e' }}>★ Vedette</span>
                </div>
                <h3 className="font-bold mb-2" style={{ color: '#0d1b3e' }}>{project.title}</h3>
                <p className="text-sm mb-4 line-clamp-2" style={{ color: '#6b7a99' }}>{project.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tags.split(",").slice(0, 3).map((tag) => (
                    <span key={tag} className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: '#EEF2FF', color: '#003082' }}>{tag.trim()}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between text-xs" style={{ color: '#6b7a99' }}>
                  <span>par {project.author.name}</span>
                  <div className="flex items-center gap-3">
                    <span style={{ color: '#C8102E' }}>❤️ {project._count.likes}</span>
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="hover-text-blue transition-colors" style={{ color: '#003082' }}>
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── FINAL CTA ────────────────────────────────────────────── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative rounded-3xl p-12 text-center text-white overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #003082 0%, #001855 50%, #1a0a30 100%)' }}>
          <div className="absolute top-0 left-0 right-0 h-1.5 chad-stripe" />
          <h2 className="text-3xl sm:text-4xl font-black mb-4">Prêt à rejoindre la communauté ?</h2>
          <p className="mb-8 max-w-lg mx-auto opacity-80">
            Des centaines de développeurs tchadiens construisent ensemble.
            Rejoignez-nous, partagez vos projets et faites avancer le Tchad numérique.
          </p>
          <Link href="/auth/register"
            className="inline-flex items-center gap-2 px-10 py-4 font-black rounded-xl transition-all hover:scale-105 text-lg shadow-lg"
            style={{ background: '#FECB00', color: '#0d1b3e', boxShadow: '0 8px 24px rgba(254,203,0,0.4)' }}>
            Créer un compte gratuit <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
