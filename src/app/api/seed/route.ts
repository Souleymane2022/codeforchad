import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST() {
  // Categories
  const categories = [
    { name: "Annonces", slug: "annonces", description: "Annonces officielles de Code For Chad", color: "#003082", icon: "📢" },
    { name: "Aide & Questions", slug: "aide", description: "Posez vos questions techniques", color: "#FECB00", icon: "❓" },
    { name: "Projets", slug: "projets", description: "Partagez et discutez vos projets", color: "#C8102E", icon: "🚀" },
    { name: "Ressources", slug: "ressources", description: "Tutoriels, articles et ressources utiles", color: "#10b981", icon: "📚" },
    { name: "Opportunités", slug: "opportunites", description: "Jobs, stages, freelance", color: "#8b5cf6", icon: "💼" },
    { name: "Off-topic", slug: "off-topic", description: "Discussions générales", color: "#6b7280", icon: "💬" },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }

  // Admin user
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

  const admin = await prisma.user.findUnique({ where: { email: "admin@codeforchad.net" } });
  const annonces = await prisma.category.findUnique({ where: { slug: "annonces" } });
  const ressources = await prisma.category.findUnique({ where: { slug: "ressources" } });
  const projets = await prisma.category.findUnique({ where: { slug: "projets" } });

  if (admin && annonces) {
    await prisma.post.upsert({
      where: { id: "seed-post-1" },
      update: {},
      create: {
        id: "seed-post-1",
        title: "Bienvenue dans la communauté Code For Chad ! 🇹🇩",
        content: `Bienvenue à tous les développeurs et passionnés de technologie tchadiens !

Code For Chad est votre espace de partage, d'apprentissage et de collaboration. Ici vous pouvez :

- **Poser des questions** et obtenir de l'aide de la communauté
- **Partager vos projets** et recevoir des retours
- **Découvrir des opportunités** de carrière et de formation
- **Collaborer** sur des projets innovants pour le Tchad
- **Participer aux événements** : hackathons, conférences, workshops

N'hésitez pas à vous présenter dans un nouveau post et à explorer les différentes catégories.

**La Rencontre des Esprits Numériques** revient bientôt — restez connectés ! 🚀`,
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
        title: "Ressources gratuites pour apprendre le développement web en 2024",
        content: `Voici une liste de ressources gratuites pour tous les niveaux :

**HTML/CSS/JavaScript**
- freeCodeCamp.org (en français)
- The Odin Project
- MDN Web Docs

**React / Next.js**
- Documentation officielle Next.js (excellente !)
- Fireship sur YouTube

**Backend (Node.js, Python)**
- Node.js documentation officielle
- CS50 de Harvard (gratuit en ligne)

**Bases de données**
- SQLZoo pour apprendre SQL
- MongoDB University

**En Français**
- Grafikart.fr
- Pierre Giraud - developpez votre site

N'hésitez pas à ajouter vos propres ressources en répondant à ce post !`,
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
        title: "Appel à projets : Hackathon Code For Chad 2024",
        content: `Nous lançons un appel à projets pour le prochain hackathon Code For Chad !

**Thème : La Tech au service du développement durable au Tchad**

Vous avez 48h pour créer un prototype innovant qui répond à un défi réel au Tchad dans l'un des domaines suivants :

- Agriculture et sécurité alimentaire
- Santé et accès aux soins
- Éducation et formation
- Accès à l'eau potable
- Finance inclusive

**Prix**
- 1er prix : 500 000 FCFA + mentoring
- 2ème prix : 300 000 FCFA
- 3ème prix : 150 000 FCFA

**Inscription** : Remplissez le formulaire avant le 15 décembre 2024

Partagez ce post avec vos amis développeurs !`,
        authorId: admin.id,
        categoryId: projets.id,
        views: 215,
      },
    });
  }

  // Events
  await prisma.event.upsert({
    where: { id: "seed-event-1" },
    update: {},
    create: {
      id: "seed-event-1",
      title: "Rencontre des Esprits Numériques - Edition 2024",
      description: "La grande conférence annuelle de Code For Chad. Conférences, workshops, hackathon et exposition technologique. Un événement incontournable pour tous les développeurs tchadiens.",
      date: new Date("2024-12-15T09:00:00"),
      endDate: new Date("2024-12-17T18:00:00"),
      location: "N'Djaména, Tchad",
      type: "conference",
      featured: true,
      capacity: 500,
    },
  });

  await prisma.event.upsert({
    where: { id: "seed-event-2" },
    update: {},
    create: {
      id: "seed-event-2",
      title: "Workshop React & Next.js",
      description: "Apprenez à construire des applications web modernes avec React et Next.js. Workshop pratique pour développeurs intermédiaires.",
      date: new Date("2024-11-20T10:00:00"),
      endDate: new Date("2024-11-20T17:00:00"),
      location: "En ligne (Zoom)",
      type: "workshop",
      featured: false,
      capacity: 50,
    },
  });

  await prisma.event.upsert({
    where: { id: "seed-event-3" },
    update: {},
    create: {
      id: "seed-event-3",
      title: "Hackathon Agritech Chad",
      description: "48h pour créer des solutions innovantes pour l'agriculture tchadienne. Équipes de 2 à 5 personnes. Tous niveaux bienvenus.",
      date: new Date("2025-01-25T08:00:00"),
      endDate: new Date("2025-01-27T18:00:00"),
      location: "N'Djaména, Tchad",
      type: "hackathon",
      featured: true,
      capacity: 200,
    },
  });

  // Demo projects
  if (admin) {
    await prisma.project.upsert({
      where: { id: "seed-proj-1" },
      update: {},
      create: {
        id: "seed-proj-1",
        title: "ChadPay - Mobile Payment Solution",
        description: "Application de paiement mobile adaptée aux réalités du marché tchadien. Permet les transferts d'argent, le paiement de factures et le commerce local.",
        authorId: admin.id,
        tags: "mobile,fintech,react-native,nodejs",
        github: "https://github.com/codeforchad/chadpay",
        featured: true,
      },
    });

    await prisma.project.upsert({
      where: { id: "seed-proj-2" },
      update: {},
      create: {
        id: "seed-proj-2",
        title: "EduChad - Plateforme e-learning",
        description: "Plateforme d'apprentissage en ligne avec du contenu adapté au programme scolaire tchadien. Support offline pour les zones avec faible connectivité.",
        authorId: admin.id,
        tags: "education,web,react,python,offline",
        github: "https://github.com/codeforchad/educhad",
        featured: true,
      },
    });

    await prisma.project.upsert({
      where: { id: "seed-proj-3" },
      update: {},
      create: {
        id: "seed-proj-3",
        title: "AgriData Chad",
        description: "Application de collecte et visualisation de données agricoles. Aide les agriculteurs à prendre de meilleures décisions grâce aux données météo et aux prix du marché.",
        authorId: admin.id,
        tags: "agriculture,data,python,dashboard",
        featured: false,
      },
    });
  }

  return NextResponse.json({ success: true, message: "Base de données initialisée !" });
}
