import Link from "next/link";
import ResourceCard from "@/components/ResourceCard";
import { providers, resources, resourcesFor } from "@/data/resources";
import { paths } from "@/data/paths";

const featured = ["ms-learn", "aws-skillbuilder", "aws-educate", "ms-azure-students", "gh-pack", "rea"];

const faq = [
  {
    q: "Les ressources sont-elles gratuites ?",
    a: "La plupart, oui. Chaque fiche porte l'étiquette « Gratuit » quand l'accès de base ne coûte rien. Les examens de certification sont en général payants, mais les formations qui y préparent sont gratuites.",
  },
  {
    q: "Faut-il une carte bancaire ?",
    a: "Non pour Microsoft Learn, AWS Educate, AWS Skill Builder, Azure for Students et GitHub Skills. Les comptes cloud classiques (Azure, AWS) en demandent une.",
  },
  {
    q: "Code for Chad est-il un site de Microsoft ou d'Amazon ?",
    a: "Non. Code for Chad est une communauté indépendante. Nous résumons les offres officielles en français et renvoyons toujours vers la page source, qui fait foi.",
  },
  {
    q: "Comment proposer une ressource ?",
    a: "Ouvrez une issue ou une pull request sur le dépôt GitHub de Code for Chad avec le lien officiel et une phrase sur son intérêt pour les développeurs tchadiens.",
  },
];

export default function Home() {
  return (
    <>
      <section className="container-page grid gap-10 pt-16 pb-12 md:grid-cols-[1.3fr_1fr] md:pt-24">
        <div>
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-chad-red">
            Communauté des développeurs du Tchad
          </p>
          <h1 className="text-[clamp(2.4rem,5vw,3.8rem)]">
            Apprenez avec les meilleurs, depuis N&apos;Djamena.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted">
            Code for Chad réunit les formations, crédits cloud, certifications et communautés de Microsoft,
            AWS, GitHub, Google et de l&apos;open source. Tout est trié, résumé en français et relié à la source
            officielle.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/parcours" className="rounded-md bg-chad-blue px-5 py-3 font-medium text-white hover:opacity-90">
              Commencer un parcours
            </Link>
            <Link href="/ressources" className="rounded-md border border-line px-5 py-3 font-medium hover:bg-soft">
              Parcourir les {resources.length} ressources
            </Link>
          </div>
        </div>
        <ol className="space-y-4 self-center rounded-lg border border-line bg-soft p-6">
          {[
            ["Choisissez un objectif", "Web, cloud AWS, Azure ou sécurité."],
            ["Suivez le parcours", "Des étapes courtes, chacune liée à un cours officiel."],
            ["Partagez", "Montrez vos projets et aidez la communauté suivante."],
          ].map(([t, d], i) => (
            <li key={t} className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-chad-gold font-mono font-semibold text-chad-blue">
                {i + 1}
              </span>
              <div>
                <p className="font-semibold">{t}</p>
                <p className="text-sm text-muted">{d}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="container-page py-12">
        <h2 className="text-3xl">Par fournisseur</h2>
        <p className="mt-2 max-w-2xl text-muted">
          Un portail par écosystème, organisé comme les espaces développeurs officiels : apprendre, se
          certifier, rejoindre la communauté, obtenir des crédits.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {providers.map((p) => (
            <Link
              key={p.slug}
              href={`/fournisseurs/${p.slug}`}
              className="group rounded-lg border border-line p-5 hover:border-accent"
            >
              <span className="mb-3 block h-1 w-10 rounded" style={{ background: p.color }} />
              <h3 className="text-xl group-hover:underline">{p.name}</h3>
              <p className="mt-1 text-sm text-muted">{p.tagline}</p>
              <p className="mt-3 text-sm font-medium text-accent">{resourcesFor(p.slug).length} ressources →</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-page py-12">
        <h2 className="text-3xl">À ne pas manquer</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((id) => {
            const r = resources.find((x) => x.id === id);
            return r ? <ResourceCard key={id} resource={r} /> : null;
          })}
        </div>
      </section>

      <section className="container-page py-12">
        <h2 className="text-3xl">Parcours d&apos;apprentissage</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {paths.map((p) => (
            <Link key={p.slug} href={`/parcours#${p.slug}`} className="rounded-lg border border-line p-5 hover:border-accent">
              <p className="text-xs text-muted">
                {p.level} · {p.duration}
              </p>
              <h3 className="mt-1 text-xl">{p.title}</h3>
              <p className="mt-2 text-sm text-muted">{p.goal}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-page py-12">
        <div className="rounded-lg bg-chad-blue p-8 text-white md:p-12">
          <p className="text-sm uppercase tracking-widest text-chad-gold">Nouveau guide</p>
          <h2 className="mt-2 text-3xl">Comprendre un logiciel sans son code source.</h2>
          <p className="mt-4 max-w-2xl text-white/80">
            La rétro-ingénierie aide à auditer la sécurité, à rendre deux systèmes compatibles et à apprendre
            comment fonctionnent les applications que vous utilisez. Notre guide présente REA, un outil open
            source qui relie un agent IA à Ghidra, aux applications JavaScript et .NET, dans un cadre légal.
          </p>
          <Link href="/guides/retro-ingenierie" className="mt-6 inline-block rounded-md bg-chad-gold px-5 py-3 font-medium text-chad-blue">
            Lire le guide
          </Link>
        </div>
      </section>

      <section className="container-page py-12">
        <h2 className="text-3xl">Questions fréquentes</h2>
        <div className="mt-6 divide-y divide-line border-y border-line">
          {faq.map((f) => (
            <details key={f.q} className="py-4">
              <summary className="font-medium">{f.q}</summary>
              <p className="mt-2 pl-5 text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
