import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "À propos",
  description: "La mission de Code for Chad et comment contribuer au catalogue de ressources.",
};

export default function AboutPage() {
  return (
    <div className="container-page max-w-3xl pt-14">
      <h1 className="text-[clamp(2.2rem,5vw,3.6rem)]">À propos de Code for Chad</h1>
      <p className="mt-5 text-lg text-muted">
        Code for Chad est une communauté de développeurs tchadiens. Notre objectif : que chaque personne qui
        veut apprendre à coder au Tchad trouve rapidement les meilleures ressources, en français, et un groupe
        pour progresser.
      </p>

      <h2 className="mt-12 text-2xl">Ce que nous faisons</h2>
      <ul className="mt-3 list-disc space-y-2 pl-6">
        <li>Nous sélectionnons les programmes officiels utiles : formations, crédits cloud, certifications, communautés.</li>
        <li>Nous les résumons en français et indiquons ce qui compte au Tchad (carte bancaire, connexion, accès étudiant).</li>
        <li>Nous construisons des parcours courts qui mènent à une compétence ou une certification.</li>
        <li>Nous organisons des rencontres et pouvons porter localement des groupes comme AWS User Groups ou Google Developer Groups.</li>
      </ul>

      <h2 className="mt-12 text-2xl">Fiabilité des informations</h2>
      <p className="mt-3">
        Les offres des fournisseurs évoluent souvent. Chaque fiche renvoie vers la page officielle : en cas de
        différence, c&apos;est la page officielle qui fait foi. Code for Chad n&apos;est affilié ni à Microsoft, ni à
        Amazon Web Services, ni à GitHub, ni à Google.
      </p>

      <h2 className="mt-12 text-2xl">Contribuer</h2>
      <p className="mt-3">
        Les ressources sont décrites dans <code className="font-mono">src/data/resources.ts</code> et les parcours dans{" "}
        <code className="font-mono">src/data/paths.ts</code>. Pour proposer un ajout, ouvrez une pull request sur{" "}
        <a className="prose-link" href="https://github.com/souleymane2022/codeforchad" target="_blank" rel="noopener noreferrer">
          le dépôt GitHub
        </a>{" "}
        avec le lien officiel, une description factuelle et, si possible, une note « pour le Tchad ».
      </p>
    </div>
  );
}
