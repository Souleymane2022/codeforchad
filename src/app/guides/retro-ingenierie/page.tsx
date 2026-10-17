import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Rétro-ingénierie avec REA",
  description:
    "Comprendre comment fonctionne un logiciel sans son code source : installer REA, poser une question à son agent IA et respecter le cadre légal.",
};

const toc = [
  ["definition", "Qu'est-ce que la rétro-ingénierie ?"],
  ["installer", "Installer REA"],
  ["fonctionnement", "Comment REA fonctionne"],
  ["cibles", "Ce que vous pouvez analyser"],
  ["essayer", "Premier exercice"],
  ["cadre", "Cadre légal et usage responsable"],
];

const targets = [
  ["Binaires natifs", "Pseudo-code, assembleur, chaînes, symboles et appels.", "Ghidra, Hopper ou IDA"],
  ["JavaScript / Electron", "Modules, imports, source maps, routes et messages IPC.", "Node.js et npm"],
  ["Sites Web", "Structure, scripts, requêtes réseau et captures d'écran.", "Un navigateur Chrome/Chromium"],
  ["Assemblies .NET", "Métadonnées, instructions CIL, dépendances natives.", "Aucun outil supplémentaire"],
  ["Applications Android", "Manifeste, classes et méthodes décompilées.", "JADX et un JDK"],
  ["Bases SQLite", "Tables, colonnes, index et lignes choisies.", "Node.js récent"],
];

function Code({ children }: { children: string }) {
  return (
    <pre className="mt-3 overflow-x-auto rounded-md bg-ink p-4 font-mono text-sm text-page">
      <code>{children}</code>
    </pre>
  );
}

export default function ReverseEngineeringGuide() {
  return (
    <div className="container-page pt-14 lg:grid lg:grid-cols-[220px_1fr] lg:gap-12">
      <aside className="hidden lg:block">
        <nav aria-label="Sommaire" className="sticky top-28 text-sm">
          <p className="mb-2 font-semibold">Sommaire</p>
          <ol className="space-y-1">
            {toc.map(([id, label]) => (
              <li key={id}>
                <a href={`#${id}`} className="text-muted hover:text-ink">{label}</a>
              </li>
            ))}
          </ol>
        </nav>
      </aside>

      <article className="max-w-3xl">
        <p className="text-sm font-medium uppercase tracking-widest text-chad-red">Guide</p>
        <h1 className="mt-2 text-[clamp(2.2rem,5vw,3.6rem)]">Comprendre un logiciel sans son code source.</h1>
        <p className="mt-5 text-lg text-muted">
          Vous voyez une fonctionnalité dans une application et vous voulez savoir comment elle marche. REA
          (Reverse Engineer Anything) donne à votre agent IA les outils pour inspecter le programme, expliquer
          ce qu&apos;il fait et montrer les preuves de chaque conclusion.
        </p>

        <section id="definition" className="scroll-mt-28 pt-12">
          <h2 className="text-2xl">Qu&apos;est-ce que la rétro-ingénierie ?</h2>
          <p className="mt-3">
            C&apos;est l&apos;étude d&apos;un logiciel compilé pour retrouver sa logique : quelles fonctions sont appelées,
            quelles données circulent, quelle règle produit un résultat. Elle sert à auditer la sécurité,
            analyser un malware, rendre deux systèmes compatibles, préserver de vieux logiciels ou simplement
            apprendre. Pour un développeur, c&apos;est aussi une excellente école : on lit du vrai code de production.
          </p>
        </section>

        <section id="installer" className="scroll-mt-28 pt-12">
          <h2 className="text-2xl">Installer REA</h2>
          <p className="mt-3">
            Il faut Node.js 22 ou plus récent et npm. La commande suivante enregistre REA auprès de votre agent
            (Claude Code, Codex, Cursor, Gemini CLI…), vous montre les changements proposés et vous demande de
            les approuver.
          </p>
          <Code>npx rea-agents setup</Code>
          <p className="mt-3 text-sm text-muted">
            Redémarrez ensuite votre agent. Récupérez REA uniquement depuis ses sources officielles :{" "}
            <a className="prose-link" href="https://github.com/morluto/rea" target="_blank" rel="noopener noreferrer">github.com/morluto/rea</a>,{" "}
            <a className="prose-link" href="https://rea.tools/" target="_blank" rel="noopener noreferrer">rea.tools</a>{" "}
            ou le paquet npm <code className="font-mono">rea-agents</code>.
          </p>
        </section>

        <section id="fonctionnement" className="scroll-mt-28 pt-12">
          <h2 className="text-2xl">Comment REA fonctionne</h2>
          <ol className="mt-4 grid gap-3 sm:grid-cols-3">
            {[
              ["Vous demandez", "Votre agent reçoit une question sur un programme présent sur votre machine."],
              ["REA inspecte", "Via MCP, REA lance les outils d'analyse et renvoie code, références et inconnues."],
              ["L'agent explique", "Il s'appuie sur ces preuves pour expliquer, puis implémenter et tester."],
            ].map(([t, d], i) => (
              <li key={t} className="rounded-lg border border-line p-4">
                <p className="font-mono text-sm text-chad-red">0{i + 1}</p>
                <p className="mt-1 font-semibold">{t}</p>
                <p className="mt-1 text-sm text-muted">{d}</p>
              </li>
            ))}
          </ol>
          <p className="mt-4">L&apos;analyse s&apos;exécute localement. Les mêmes workflows existent en ligne de commande :</p>
          <Code>{"npx -y rea-agents@latest analyze-javascript-application /chemin/absolu/vers/app --json"}</Code>
        </section>

        <section id="cibles" className="scroll-mt-28 pt-12">
          <h2 className="text-2xl">Ce que vous pouvez analyser</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-line">
                  <th className="py-2 pr-4">Cible</th>
                  <th className="py-2 pr-4">Ce que REA renvoie</th>
                  <th className="py-2">Prérequis</th>
                </tr>
              </thead>
              <tbody>
                {targets.map(([t, r, p]) => (
                  <tr key={t} className="border-b border-line align-top">
                    <td className="py-2 pr-4 font-medium">{t}</td>
                    <td className="py-2 pr-4 text-muted">{r}</td>
                    <td className="py-2 text-muted">{p}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-muted">
            Liste complète et à jour dans le{" "}
            <a className="prose-link" href="https://github.com/morluto/rea#what-you-can-analyze" target="_blank" rel="noopener noreferrer">README de REA</a>.
          </p>
        </section>

        <section id="essayer" className="scroll-mt-28 pt-12">
          <h2 className="text-2xl">Premier exercice</h2>
          <p className="mt-3">
            Choisissez une application dont vous êtes l&apos;auteur, ou un logiciel libre, et une fonctionnalité
            précise. Puis demandez à votre agent :
          </p>
          <Code>{"Explique comment fonctionne la recherche dans cette application,\nmontre-moi les preuves, puis construis une fonctionnalité similaire\npour mon projet."}</Code>
          <p className="mt-3">
            Vérifiez une prédiction : si l&apos;agent affirme qu&apos;une fonction trie les résultats par date, modifiez
            une date et observez le résultat. Partagez ensuite votre analyse avec la communauté Code for Chad.
          </p>
        </section>

        <section id="cadre" className="scroll-mt-28 pt-12">
          <h2 className="text-2xl">Cadre légal et usage responsable</h2>
          <p className="mt-3">
            REA est conçu pour des analyses légales : recherche en sécurité, analyse de malware, divulgation
            coordonnée de vulnérabilités, CTF et enseignement, interopérabilité, préservation et audit de
            logiciels que vous possédez ou êtes autorisé à examiner. Le projet refuse explicitement d&apos;aider à :
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-6">
            <li>contourner des DRM, vérifications de licence ou systèmes anti-triche ;</li>
            <li>tricher dans des jeux ou altérer des services en ligne ;</li>
            <li>contourner l&apos;authentification ou les contrôles d&apos;accès de systèmes non autorisés ;</li>
            <li>copier un logiciel propriétaire ou reproduire son code et ses ressources protégés.</li>
          </ul>
          <p className="mt-3">
            Comprendre une idée et la réimplémenter avec votre propre code est différent de copier un produit.
            Obtenez les autorisations nécessaires et respectez la loi, les licences et les conditions
            d&apos;utilisation. Voir le{" "}
            <a className="prose-link" href="https://github.com/morluto/rea/blob/main/DISCLAIMER.md" target="_blank" rel="noopener noreferrer">
              DISCLAIMER officiel de REA
            </a>.
          </p>
          <p className="mt-8">
            <Link href="/parcours#securite" className="prose-link">Suivre le parcours Sécurité & rétro-ingénierie →</Link>
          </p>
        </section>
      </article>
    </div>
  );
}
