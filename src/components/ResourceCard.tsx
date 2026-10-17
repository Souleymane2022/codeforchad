import { categories, getProvider, type Resource } from "@/data/resources";

export default function ResourceCard({ resource }: { resource: Resource }) {
  const provider = getProvider(resource.provider);
  return (
    <article className="flex flex-col rounded-lg border border-line bg-page p-5 transition-colors hover:border-accent">
      <div className="mb-3 flex flex-wrap items-center gap-2 text-xs">
        <span
          className="rounded px-2 py-0.5 font-medium text-white"
          style={{ background: provider?.color }}
        >
          {provider?.name}
        </span>
        <span className="rounded bg-soft px-2 py-0.5 text-muted">{categories[resource.category]}</span>
        {resource.free && <span className="rounded bg-soft px-2 py-0.5 text-muted">Gratuit</span>}
      </div>
      <h3 className="text-lg">
        <a href={resource.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
          {resource.title}
          <span aria-hidden className="ml-1 text-muted">↗</span>
        </a>
      </h3>
      <p className="mt-2 text-sm text-muted">{resource.summary}</p>
      {resource.forChad && (
        <p className="mt-3 border-l-2 border-chad-gold pl-3 text-sm">{resource.forChad}</p>
      )}
    </article>
  );
}
