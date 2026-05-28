import { prisma } from "@/lib/prisma";
import { Calendar, MapPin, Users, ExternalLink, Clock } from "lucide-react";
import { format, isPast } from "date-fns";
import { fr } from "date-fns/locale";

export const dynamic = "force-dynamic";

async function getEvents() {
  return prisma.event.findMany({
    orderBy: [{ featured: "desc" }, { date: "asc" }],
  });
}

const typeConfig: Record<string, { label: string; color: string; icon: string }> = {
  conference: { label: "Conférence", color: "bg-blue-500/10 text-blue-400 border-blue-500/20", icon: "🎤" },
  workshop: { label: "Workshop", color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20", icon: "🛠️" },
  hackathon: { label: "Hackathon", color: "bg-red-500/10 text-red-400 border-red-500/20", icon: "⚡" },
};

export default async function EventsPage() {
  const events = await getEvents();

  const upcoming = events.filter((e) => !isPast(new Date(e.date)));
  const past = events.filter((e) => isPast(new Date(e.date)));

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2 mb-2">
          <Calendar size={24} className="text-[#C8102E]" />
          Événements
        </h1>
        <p className="text-gray-400 text-sm">
          Conférences, hackathons, workshops — restez connecté à la communauté
        </p>
      </div>

      {events.find((e) => e.featured && !isPast(new Date(e.date))) && (() => {
        const featured = events.find((e) => e.featured && !isPast(new Date(e.date)))!;
        const tc = typeConfig[featured.type] || { label: featured.type, color: "bg-gray-500/10 text-gray-400 border-gray-500/20", icon: "📅" };
        return (
          <div className="relative bg-gradient-to-br from-[#003082]/30 via-[#0a0f1e] to-[#C8102E]/20 border border-[#003082]/30 rounded-3xl p-8 mb-10 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FECB00]/5 rounded-full blur-3xl" />
            <div className="relative">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className={`text-xs px-3 py-1 rounded-full border ${tc.color}`}>
                  {tc.icon} {tc.label}
                </span>
                <span className="text-xs text-[#FECB00] bg-[#FECB00]/10 px-3 py-1 rounded-full">★ Événement phare</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">{featured.title}</h2>
              <p className="text-gray-400 mb-6 max-w-2xl leading-relaxed">{featured.description}</p>
              <div className="flex flex-wrap gap-4 text-sm text-gray-300 mb-6">
                <span className="flex items-center gap-2">
                  <Calendar size={16} className="text-[#FECB00]" />
                  {format(new Date(featured.date), "d MMMM yyyy", { locale: fr })}
                  {featured.endDate && ` → ${format(new Date(featured.endDate), "d MMMM yyyy", { locale: fr })}`}
                </span>
                <span className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#FECB00]" />
                  {featured.location}
                </span>
                {featured.capacity && (
                  <span className="flex items-center gap-2">
                    <Users size={16} className="text-[#FECB00]" />
                    {featured.capacity} participants max.
                  </span>
                )}
              </div>
              {featured.registrationLink ? (
                <a href={featured.registrationLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-[#FECB00] text-[#0a0f1e] font-semibold rounded-xl hover:bg-[#FECB00]/90 transition-colors">
                  S&apos;inscrire <ExternalLink size={16} />
                </a>
              ) : (
                <span className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-gray-300 rounded-xl text-sm">
                  <Clock size={16} /> Inscriptions bientôt disponibles
                </span>
              )}
            </div>
          </div>
        );
      })()}

      {upcoming.length > 0 && (
        <div className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Événements à venir
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {upcoming.map((evt) => {
              const tc = typeConfig[evt.type] || { label: evt.type, color: "bg-gray-500/10 text-gray-400 border-gray-500/20", icon: "📅" };
              return (
                <div key={evt.id} className="bg-white/3 border border-white/8 rounded-2xl p-6 hover:border-white/15 transition-all">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${tc.color}`}>{tc.icon} {tc.label}</span>
                    {evt.featured && <span className="text-xs text-[#FECB00]">★ Vedette</span>}
                  </div>
                  <h3 className="font-semibold text-white mb-2 text-lg leading-snug">{evt.title}</h3>
                  <p className="text-sm text-gray-400 mb-4 line-clamp-2 leading-relaxed">{evt.description}</p>
                  <div className="space-y-1.5 text-sm text-gray-500 mb-5">
                    <div className="flex items-center gap-2"><Calendar size={14} className="text-gray-600" />{format(new Date(evt.date), "EEEE d MMMM yyyy", { locale: fr })}</div>
                    <div className="flex items-center gap-2"><MapPin size={14} className="text-gray-600" />{evt.location}</div>
                    {evt.capacity && <div className="flex items-center gap-2"><Users size={14} className="text-gray-600" />{evt.capacity} places disponibles</div>}
                  </div>
                  {evt.registrationLink ? (
                    <a href={evt.registrationLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-[#FECB00] hover:underline">
                      S&apos;inscrire <ExternalLink size={13} />
                    </a>
                  ) : (
                    <span className="text-xs text-gray-600">Inscriptions à venir</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {past.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-500 mb-5">Événements passés</h2>
          <div className="space-y-3">
            {past.map((evt) => {
              const tc = typeConfig[evt.type] || { label: evt.type, color: "bg-gray-500/10 text-gray-500 border-gray-500/20", icon: "📅" };
              return (
                <div key={evt.id} className="flex gap-4 bg-white/2 border border-white/5 rounded-xl p-4 opacity-60">
                  <div className="text-center min-w-14">
                    <div className="text-lg font-bold text-gray-500">{format(new Date(evt.date), "d", { locale: fr })}</div>
                    <div className="text-xs text-gray-600">{format(new Date(evt.date), "MMM yyyy", { locale: fr })}</div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${tc.color}`}>{tc.icon} {tc.label}</span>
                    </div>
                    <h3 className="text-gray-400 font-medium">{evt.title}</h3>
                    <div className="text-xs text-gray-600 mt-1">{evt.location}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {events.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          <Calendar size={48} className="mx-auto mb-4 text-gray-700" />
          <p>Aucun événement pour l&apos;instant.</p>
          <p className="text-sm mt-1">Revenez bientôt !</p>
        </div>
      )}
    </div>
  );
}
