"use client";

import { useMemo, useState } from "react";
import ResourceCard from "@/components/ResourceCard";
import { categories, providers, resources, type Category, type ProviderSlug } from "@/data/resources";

function normalize(s: string) {
  return s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
}

export default function ResourceExplorer() {
  const [query, setQuery] = useState("");
  const [provider, setProvider] = useState<ProviderSlug | "">("");
  const [category, setCategory] = useState<Category | "">("");
  const [freeOnly, setFreeOnly] = useState(false);

  const results = useMemo(() => {
    const q = normalize(query.trim());
    return resources.filter(
      (r) =>
        (!provider || r.provider === provider) &&
        (!category || r.category === category) &&
        (!freeOnly || r.free) &&
        (!q || normalize(`${r.title} ${r.summary}`).includes(q)),
    );
  }, [query, provider, category, freeOnly]);

  const selectClass = "rounded-md border border-line bg-page px-3 py-2 text-sm";

  return (
    <>
      <div className="mt-8 flex flex-wrap items-center gap-3 rounded-lg border border-line bg-soft p-4">
        <label className="min-w-0 flex-1 basis-56">
          <span className="sr-only">Rechercher</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher : certification, crédits, Python…"
            className="w-full rounded-md border border-line bg-page px-3 py-2 text-sm"
          />
        </label>
        <label>
          <span className="sr-only">Fournisseur</span>
          <select className={selectClass} value={provider} onChange={(e) => setProvider(e.target.value as ProviderSlug | "")}>
            <option value="">Tous les fournisseurs</option>
            {providers.map((p) => (
              <option key={p.slug} value={p.slug}>{p.name}</option>
            ))}
          </select>
        </label>
        <label>
          <span className="sr-only">Catégorie</span>
          <select className={selectClass} value={category} onChange={(e) => setCategory(e.target.value as Category | "")}>
            <option value="">Toutes les catégories</option>
            {Object.entries(categories).map(([k, v]) => (
              <option key={k} value={k}>{v}</option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={freeOnly} onChange={(e) => setFreeOnly(e.target.checked)} />
          Gratuit uniquement
        </label>
      </div>
      <p className="mt-6 text-sm text-muted" aria-live="polite">
        {results.length} ressource{results.length > 1 ? "s" : ""}
      </p>
      <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {results.map((r) => (
          <ResourceCard key={r.id} resource={r} />
        ))}
      </div>
    </>
  );
}
