import type { Metadata } from "next";
import { paths } from "@/data/paths";
import { resources } from "@/data/resources";

export const metadata: Metadata = {
  title: "Parcours d'apprentissage",
  description: "Des parcours pas à pas vers le Web, AWS, Azure et la sécurité, construits avec des cours officiels gratuits.",
};

export default function PathsPage() {
  return (
    <div className="container-page pt-14">
      <h1 className="text-[clamp(2.2rem,5vw,3.6rem)]">Parcours d&apos;apprentissage</h1>
      <p className="mt-4 max-w-2xl text-muted">
        Chaque parcours enchaîne quelques ressources officielles dans un ordre qui fonctionne. Avancez à votre
        rythme ; publiez un petit projet à la fin de chaque étape.
      </p>

      <div className="mt-10 space-y-10">
        {paths.map((p) => (
          <section key={p.slug} id={p.slug} className="scroll-mt-28 rounded-lg border border-line p-6 md:p-8">
            <p className="text-sm text-muted">
              {p.level} · {p.duration}
            </p>
            <h2 className="mt-1 text-2xl">{p.title}</h2>
            <p className="mt-2 text-muted">{p.goal}</p>
            <ol className="mt-6 space-y-4">
              {p.steps.map((s, i) => {
                const r = resources.find((x) => x.id === s.resourceId);
                return (
                  <li key={s.title} className="flex gap-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-soft font-mono text-sm">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-medium">{s.title}</p>
                      <p className="text-sm text-muted">
                        {s.detail}{" "}
                        {r && (
                          <a className="prose-link" href={r.url} target="_blank" rel="noopener noreferrer">
                            {r.title} ↗
                          </a>
                        )}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </section>
        ))}
      </div>
    </div>
  );
}
