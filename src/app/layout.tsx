import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Code for Chad — Ressources pour les développeurs tchadiens",
    template: "%s · Code for Chad",
  },
  description:
    "Les meilleures ressources officielles de Microsoft, AWS, GitHub, Google et de l'open source, triées et expliquées en français pour les développeurs du Tchad.",
  keywords: [
    "Code for Chad",
    "développeurs Tchad",
    "N'Djamena tech",
    "Microsoft Learn",
    "AWS Skill Builder",
    "certification cloud",
    "rétro-ingénierie",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr">
      <body className="flex min-h-screen flex-col font-sans">
        <a
          href="#contenu"
          className="absolute -top-20 left-4 z-50 bg-ink px-4 py-2 text-page focus:top-3"
        >
          Aller au contenu
        </a>
        <Header />
        <main id="contenu" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
