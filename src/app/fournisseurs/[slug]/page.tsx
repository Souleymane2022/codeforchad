import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ResourceCard from "@/components/ResourceCard";
import { categories, getProvider, providers, resourcesFor, type Category } from "@/data/resources";

export const dynamicParams = false;

export function generateStaticParams() {
  return providers.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/fournisseurs/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const provider = getProvider(slug);
  return provider ? { title: `Ressources ${provider.name}`, description: provider.tagline } : {};
}

export default async function ProviderPage(props: PageProps<"/fournisseurs/[slug]">) {
  const { slug } = await props.params;
  const provider = getProvider(slug);
  if (!provider) notFound();

  const list = resourcesFor(provider.slug);
  const groups = (Object.keys(categories) as Category[])
    .map((c) => ({ category: c, items: list.filter((r) => r.category === c) }))
    .filter((g) => g.items.length > 0);

  return (
    <div className="container-page pt-14">
      <span className="block h-1.5 w-16 rounded" style={{ background: provider.color }} />
      <h1 className="mt-4 text-[clamp(2.2rem,5vw,3.6rem)]">{provider.name} pour les développeurs</h1>
      <p className="mt-4 max-w-2xl text-lg text-muted">{provider.intro}</p>
      <p className="mt-4 text-sm">
        Source officielle :{" "}
        <a className="prose-link" href={provider.officialHub.url} target="_blank" rel="noopener noreferrer">
          {provider.officialHub.label}
        </a>
      </p>

      <nav aria-label="Sections" className="mt-8 flex flex-wrap gap-2 text-sm">
        {groups.map((g) => (
          <a key={g.category} href={`#${g.category}`} className="rounded-full border border-line px-3 py-1 hover:bg-soft">
            {categories[g.category]}
          </a>
        ))}
      </nav>

      {groups.map((g) => (
        <section key={g.category} id={g.category} className="scroll-mt-28 pt-12">
          <h2 className="text-2xl">{categories[g.category]}</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {g.items.map((r) => (
              <ResourceCard key={r.id} resource={r} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
