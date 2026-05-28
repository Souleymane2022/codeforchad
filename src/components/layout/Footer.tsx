import Link from "next/link";
import { Code2, ExternalLink, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#080c18] border-t border-white/5 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 font-bold text-lg mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#003082] via-[#FECB00] to-[#C8102E] flex items-center justify-center">
                <Code2 size={16} className="text-white" />
              </div>
              <span className="text-white">Code<span className="text-[#FECB00]">For</span>Chad</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              La communauté des développeurs et passionnés de technologie tchadiens.
              Ensemble, nous construisons le futur numérique du Tchad.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <a href="https://github.com/codeforchad" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
                <ExternalLink size={18} />
              </a>
              <a href="https://codeforchad.net" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
                <Globe size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">Plateforme</h3>
            <ul className="space-y-2">
              {[
                { href: "/community", label: "Communauté" },
                { href: "/projects", label: "Projets" },
                { href: "/events", label: "Événements" },
                { href: "/auth/register", label: "Rejoindre" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">Événements</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Rencontre des Esprits Numériques</li>
              <li>Hackathons</li>
              <li>Workshops</li>
              <li>Conférences</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">
            © 2024 Code For Chad. Fait avec ❤️ au Tchad 🇹🇩
          </p>
          <p className="text-xs text-gray-600">
            Construisons ensemble le Tchad numérique
          </p>
        </div>
      </div>
    </footer>
  );
}
