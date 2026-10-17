import Image from "next/image";
import Link from "next/link";

const links = [
  { href: "/ressources", label: "Ressources" },
  { href: "/fournisseurs/microsoft", label: "Microsoft" },
  { href: "/fournisseurs/aws", label: "AWS" },
  { href: "/parcours", label: "Parcours" },
  { href: "/guides/retro-ingenierie", label: "Rétro-ingénierie" },
  { href: "/a-propos", label: "À propos" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-page/95 backdrop-blur">
      <div className="chad-stripe" />
      <div className="container-page flex flex-wrap items-center justify-between gap-x-6 gap-y-2 py-3">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <Image src="/logo.png" alt="" width={32} height={32} className="rounded" />
          Code for Chad
        </Link>
        <nav aria-label="Navigation principale" className="-mx-2 flex max-w-full gap-1 overflow-x-auto text-sm">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="whitespace-nowrap rounded px-2 py-1 text-muted hover:bg-soft hover:text-ink"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
