import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-soft">
      <div className="container-page grid gap-8 py-10 text-sm text-muted sm:grid-cols-3">
        <div>
          <p className="font-semibold text-ink">Code for Chad</p>
          <p className="mt-2">
            La communauté qui aide les développeurs tchadiens à apprendre, se certifier et construire.
          </p>
        </div>
        <ul className="space-y-1">
          <li><Link className="hover:text-ink" href="/ressources">Toutes les ressources</Link></li>
          <li><Link className="hover:text-ink" href="/parcours">Parcours d&apos;apprentissage</Link></li>
          <li><Link className="hover:text-ink" href="/guides/retro-ingenierie">Guide rétro-ingénierie</Link></li>
          <li><Link className="hover:text-ink" href="/a-propos">À propos & contribuer</Link></li>
        </ul>
        <p>
          Code for Chad est une communauté indépendante, non affiliée à Microsoft, Amazon Web Services,
          GitHub ou Google. Les noms cités appartiennent à leurs propriétaires ; chaque fiche renvoie vers
          la source officielle, qui fait foi.
        </p>
      </div>
      <div className="chad-stripe" />
    </footer>
  );
}
