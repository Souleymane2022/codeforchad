import Link from "next/link";
import Image from "next/image";
import { ExternalLink, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-20" style={{ background: '#0d1b3e', color: '#fff' }}>
      {/* Chad flag stripe */}
      <div className="h-1.5 chad-stripe" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 font-bold text-xl mb-4">
              <Image src="/logo.png" alt="Code for Chad Logo" width={36} height={36} className="object-contain" />
              <span>Code<span style={{ color: '#FECB00' }}>For</span><span style={{ color: '#C8102E' }}>Chad</span></span>
            </div>
            <p className="text-sm leading-relaxed max-w-sm" style={{ color: '#a0adbe' }}>
              La communauté des développeurs et passionnés de technologie tchadiens.
              Ensemble, nous construisons le futur numérique du Tchad.
            </p>
            <div className="flex items-center gap-4 mt-5">
              <a href="https://github.com/codeforchad" target="_blank" rel="noopener noreferrer"
                className="hover-text-gold transition-colors" style={{ color: '#6b7a99' }}>
                <ExternalLink size={18} />
              </a>
              <a href="https://codeforchad.net" target="_blank" rel="noopener noreferrer"
                className="hover-text-gold transition-colors" style={{ color: '#6b7a99' }}>
                <Globe size={18} />
              </a>
            </div>
          </div>

          {/* Nav links */}
          <div>
            <h3 className="font-bold mb-4 text-sm uppercase tracking-wider" style={{ color: '#FECB00' }}>Plateforme</h3>
            <ul className="space-y-2.5">
              {[
                { href: "/community", label: "Communauté" },
                { href: "/projects", label: "Projets" },
                { href: "/events", label: "Événements" },
                { href: "/auth/register", label: "Rejoindre" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm hover-text-white transition-colors" style={{ color: '#a0adbe' }}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Events */}
          <div>
            <h3 className="font-bold mb-4 text-sm uppercase tracking-wider" style={{ color: '#FECB00' }}>Événements</h3>
            <ul className="space-y-2.5 text-sm" style={{ color: '#a0adbe' }}>
              <li>Rencontre des Esprits Numériques</li>
              <li>Hackathons</li>
              <li>Workshops</li>
              <li>Conférences</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <p className="text-xs" style={{ color: '#6b7a99' }}>
            © {new Date().getFullYear()} Code For Chad. Fait avec ❤️ au Tchad 🇹🇩
          </p>
          <p className="text-xs" style={{ color: '#6b7a99' }}>
            Construisons ensemble le Tchad numérique
          </p>
        </div>
      </div>
    </footer>
  );
}
