import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page py-24 text-center">
      <h1 className="text-4xl">Page introuvable</h1>
      <p className="mt-4 text-muted">Cette page n&apos;existe pas ou a été déplacée.</p>
      <Link href="/" className="prose-link mt-6 inline-block">Retour à l&apos;accueil</Link>
    </div>
  );
}
