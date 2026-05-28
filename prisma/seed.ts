import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding...");

  const categories = [
    { name: "Annonces", slug: "annonces", description: "Annonces officielles de Code For Chad", color: "#003082", icon: "📢" },
    { name: "Aide & Questions", slug: "aide", description: "Posez vos questions techniques", color: "#FECB00", icon: "❓" },
    { name: "Projets", slug: "projets", description: "Partagez et discutez vos projets", color: "#C8102E", icon: "🚀" },
    { name: "Ressources", slug: "ressources", description: "Tutoriels, articles et ressources utiles", color: "#10b981", icon: "📚" },
    { name: "Opportunités", slug: "opportunites", description: "Jobs, stages, freelance", color: "#8b5cf6", icon: "💼" },
    { name: "Off-topic", slug: "off-topic", description: "Discussions générales", color: "#6b7280", icon: "💬" },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({ where: { slug: cat.slug }, update: {}, create: cat });
  }
  console.log("✅ Categories done");

  const password = await bcrypt.hash("admin123", 12);
  await prisma.user.upsert({
    where: { email: "admin@codeforchad.net" },
    update: {},
    create: {
      name: "Code For Chad",
      email: "admin@codeforchad.net",
      password,
      role: "admin",
      bio: "L'équipe officielle de Code For Chad",
      github: "codeforchad",
    },
  });
  console.log("✅ Admin user done");

  const admin = await prisma.user.findUnique({ where: { email: "admin@codeforchad.net" } });
  const [annonces, ressources, projets, aide] = await Promise.all([
    prisma.category.findUnique({ where: { slug: "annonces" } }),
    prisma.category.findUnique({ where: { slug: "ressources" } }),
    prisma.category.findUnique({ where: { slug: "projets" } }),
    prisma.category.findUnique({ where: { slug: "aide" } }),
  ]);

  if (admin && annonces) {
    await prisma.post.upsert({
      where: { id: "seed-post-1" },
      update: {},
      create: {
        id: "seed-post-1",
        title: "Bienvenue dans la communauté Code For Chad ! 🇹🇩",
        content: `Bienvenue à tous les développeurs tchadiens !

Code For Chad est votre espace de partage, d'apprentissage et de collaboration. Ici vous pouvez :

- Poser des questions et obtenir de l'aide de la communauté
- Partager vos projets et recevoir des retours
- Découvrir des opportunités de carrière et de formation
- Collaborer sur des projets innovants pour le Tchad
- Participer aux événements : hackathons, conférences, workshops

N'hésitez pas à vous présenter dans un nouveau post et à explorer les différentes catégories.

La Rencontre des Esprits Numériques revient bientôt — restez connectés ! 🚀`,
        authorId: admin.id,
        categoryId: annonces.id,
        pinned: true,
        views: 142,
      },
    });
  }

  if (admin && ressources) {
    await prisma.post.upsert({
      where: { id: "seed-post-2" },
      update: {},
      create: {
        id: "seed-post-2",
        title: "Ressources gratuites pour apprendre le développement web",
        content: `Voici une liste de ressources gratuites pour tous les niveaux :

HTML/CSS/JavaScript
- freeCodeCamp.org (en français)
- The Odin Project
- MDN Web Docs

React / Next.js
- Documentation officielle Next.js
- Fireship sur YouTube

Backend (Node.js, Python)
- Node.js documentation officielle
- CS50 de Harvard (gratuit en ligne)

En Français
- Grafikart.fr
- Pierre Giraud

N'hésitez pas à ajouter vos propres ressources !`,
        authorId: admin.id,
        categoryId: ressources.id,
        views: 89,
      },
    });
  }

  if (admin && projets) {
    await prisma.post.upsert({
      where: { id: "seed-post-3" },
      update: {},
      create: {
        id: "seed-post-3",
        title: "Appel à projets : Hackathon Code For Chad 2025",
        content: `Nous lançons un appel à projets pour le hackathon Code For Chad !

Thème : La Tech au service du développement durable au Tchad

48h pour créer un prototype innovant dans les domaines :
- Agriculture et sécurité alimentaire
- Santé et accès aux soins
- Éducation et formation
- Finance inclusive

Prix :
- 1er prix : 500 000 FCFA + mentoring
- 2ème prix : 300 000 FCFA
- 3ème prix : 150 000 FCFA`,
        authorId: admin.id,
        categoryId: projets.id,
        views: 215,
      },
    });
  }

  if (admin && aide) {
    await prisma.post.upsert({
      where: { id: "seed-post-4" },
      update: {},
      create: {
        id: "seed-post-4",
        title: "Comment démarrer avec React en 2025 ?",
        content: `Bonjour à tous,

Je suis débutant en développement web et je veux apprendre React. Par où commencer ?

J'ai déjà des bases en HTML, CSS et JavaScript. Est-ce que quelqu'un peut me recommander un parcours d'apprentissage ?`,
        authorId: admin.id,
        categoryId: aide.id,
        views: 67,
      },
    });
  }
  console.log("✅ Posts done");

  const events = [
    {
      id: "seed-ev-1",
      title: "Rencontre des Esprits Numériques 2025",
      description: "La grande conférence annuelle de Code For Chad. Conférences inspirantes, workshops pratiques, hackathon 48h et exposition technologique. Un événement incontournable pour tous les développeurs tchadiens.",
      date: new Date("2025-06-15T09:00:00"),
      endDate: new Date("2025-06-17T18:00:00"),
      location: "N'Djaména, Tchad",
      type: "conference",
      featured: true,
      capacity: 500,
    },
    {
      id: "seed-ev-2",
      title: "Workshop React & Next.js",
      description: "Apprenez à construire des applications web modernes avec React et Next.js. Workshop pratique pour développeurs intermédiaires.",
      date: new Date("2025-07-12T10:00:00"),
      endDate: new Date("2025-07-12T17:00:00"),
      location: "En ligne (Zoom)",
      type: "workshop",
      featured: false,
      capacity: 50,
    },
    {
      id: "seed-ev-3",
      title: "Hackathon AgriTech Chad",
      description: "48h pour créer des solutions innovantes pour l'agriculture tchadienne. Équipes de 2 à 5 personnes. Tous niveaux bienvenus.",
      date: new Date("2025-08-22T08:00:00"),
      endDate: new Date("2025-08-24T18:00:00"),
      location: "N'Djaména, Tchad",
      type: "hackathon",
      featured: true,
      capacity: 200,
    },
  ];

  for (const ev of events) {
    await prisma.event.upsert({ where: { id: ev.id }, update: {}, create: ev });
  }
  console.log("✅ Events done");

  if (admin) {
    const projects = [
      { id: "seed-proj-1", title: "ChadPay", description: "Application de paiement mobile adaptée aux réalités du marché tchadien. Transferts d'argent, paiement de factures et commerce local sans connexion stable.", tags: "mobile,fintech,react-native,nodejs", github: "https://github.com/codeforchad", featured: true },
      { id: "seed-proj-2", title: "EduChad", description: "Plateforme e-learning avec contenu adapté au programme scolaire tchadien. Support offline pour les zones avec faible connectivité.", tags: "education,web,react,python", featured: true },
      { id: "seed-proj-3", title: "AgriData Chad", description: "Application de collecte et visualisation de données agricoles. Aide les agriculteurs à prendre de meilleures décisions.", tags: "agriculture,data,python,dashboard", featured: false },
      { id: "seed-proj-4", title: "ChadMap", description: "Cartographie participative des ressources et services au Tchad. Permet aux citoyens de signaler et trouver des services essentiels.", tags: "web,cartographie,javascript,nodejs", featured: false },
    ];

    for (const proj of projects) {
      await prisma.project.upsert({ where: { id: proj.id }, update: {}, create: { ...proj, authorId: admin.id } });
    }
    console.log("✅ Projects done");
  }

  console.log("🎉 Seed terminé !");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
