import type { Metadata } from "next";
import ResourceExplorer from "./ResourceExplorer";

export const metadata: Metadata = {
  title: "Ressources",
  description: "Catalogue filtrable des ressources Microsoft, AWS, GitHub, Google et open source pour les développeurs.",
};

export default function ResourcesPage() {
  return (
    <div className="container-page pt-14">
      <h1 className="text-[clamp(2.2rem,5vw,3.6rem)]">Toutes les ressources</h1>
      <p className="mt-4 max-w-2xl text-muted">
        Filtrez par fournisseur ou par besoin. Chaque lien ouvre la page officielle.
      </p>
      <ResourceExplorer />
    </div>
  );
}
