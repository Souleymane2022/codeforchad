// Catalogue des ressources pour développeurs. Chaque fiche résume une offre
// officielle et renvoie vers sa page source : c'est la page source qui fait foi
// (conditions, prix et disponibilité changent régulièrement).

export type ProviderSlug = "microsoft" | "aws" | "github" | "google" | "open-source";

export type Category =
  | "apprendre"
  | "certifier"
  | "communaute"
  | "credits"
  | "outils"
  | "startups"
  | "securite";

export type Resource = {
  id: string;
  provider: ProviderSlug;
  category: Category;
  title: string;
  summary: string;
  url: string;
  free: boolean;
  /** Pourquoi c'est utile pour un développeur au Tchad. */
  forChad?: string;
};

export type Provider = {
  slug: ProviderSlug;
  name: string;
  tagline: string;
  intro: string;
  officialHub: { label: string; url: string };
  color: string;
};

export const categories: Record<Category, string> = {
  apprendre: "Apprendre",
  certifier: "Certifications",
  communaute: "Communauté",
  credits: "Crédits & offres gratuites",
  outils: "Outils",
  startups: "Startups & partenaires",
  securite: "Sécurité & rétro-ingénierie",
};

export const providers: Provider[] = [
  {
    slug: "microsoft",
    name: "Microsoft",
    tagline: "Azure, .NET, VS Code, GitHub et l'écosystème Microsoft Learn.",
    intro:
      "Microsoft publie des parcours gratuits sur Microsoft Learn, anime des communautés (Tech Community, Reactor, MVP) et propose des crédits Azure aux étudiants. Voici l'essentiel, trié pour un développeur qui débute ou qui veut se certifier.",
    officialHub: {
      label: "Microsoft Developer – Communauté",
      url: "https://developer.microsoft.com/fr-fr/community",
    },
    color: "#2563eb",
  },
  {
    slug: "aws",
    name: "Amazon Web Services",
    tagline: "Le cloud d'Amazon : formation, certifications, communauté et partenaires.",
    intro:
      "AWS propose des formations gratuites (AWS Skill Builder, AWS Educate), un niveau gratuit pour expérimenter, des programmes communautaires (Community Builders, User Groups) et un réseau de partenaires pour moderniser les applications.",
    officialHub: {
      label: "AWS – Partenaires applications modernes",
      url: "https://aws.amazon.com/fr/modern-apps/partners/",
    },
    color: "#d97706",
  },
  {
    slug: "github",
    name: "GitHub",
    tagline: "Collaborer, publier son code et apprendre par la pratique.",
    intro:
      "GitHub est l'endroit où vit le code open source. Le Student Developer Pack donne accès gratuitement à des dizaines d'outils professionnels, et GitHub Skills enseigne Git et l'automatisation directement dans un dépôt.",
    officialHub: { label: "GitHub Education", url: "https://education.github.com/" },
    color: "#334155",
  },
  {
    slug: "google",
    name: "Google",
    tagline: "Android, Firebase, Google Cloud et les Google Developer Groups.",
    intro:
      "Google for Developers regroupe la documentation Android, Web, Firebase et Google Cloud. Les Google Developer Groups (GDG) organisent des rencontres locales partout en Afrique.",
    officialHub: { label: "Google for Developers", url: "https://developers.google.com/" },
    color: "#16a34a",
  },
  {
    slug: "open-source",
    name: "Open source & communauté",
    tagline: "Documentation de référence, sécurité et rétro-ingénierie.",
    intro:
      "Des ressources libres et indépendantes des grands fournisseurs : MDN pour le Web, freeCodeCamp pour apprendre, OWASP pour la sécurité, et REA ou Ghidra pour comprendre un logiciel sans son code source.",
    officialHub: { label: "MDN Web Docs", url: "https://developer.mozilla.org/fr/" },
    color: "#7c3aed",
  },
];

export const resources: Resource[] = [
  // Microsoft
  {
    id: "ms-learn",
    provider: "microsoft",
    category: "apprendre",
    title: "Microsoft Learn",
    summary:
      "Parcours d'apprentissage gratuits et interactifs : Azure, .NET, C#, Python, IA, Power Platform. Beaucoup de modules sont disponibles en français.",
    url: "https://learn.microsoft.com/fr-fr/training/",
    free: true,
    forChad: "Fonctionne dans le navigateur, sans installation : idéal avec une connexion limitée.",
  },
  {
    id: "ms-beginners",
    provider: "microsoft",
    category: "apprendre",
    title: "Cours « For Beginners » sur GitHub",
    summary:
      "Programmes complets publiés par Microsoft en open source : développement Web, IA générative, machine learning, data science. Leçons, quiz et projets.",
    url: "https://github.com/microsoft/Web-Dev-For-Beginners",
    free: true,
    forChad: "Clonez le dépôt une fois et travaillez hors ligne.",
  },
  {
    id: "ms-credentials",
    provider: "microsoft",
    category: "certifier",
    title: "Certifications Microsoft",
    summary:
      "Certifications par rôle (Azure Fundamentals AZ-900, Developer AZ-204, Data, IA…) avec examens d'entraînement gratuits sur Microsoft Learn.",
    url: "https://learn.microsoft.com/fr-fr/credentials/",
    free: false,
  },
  {
    id: "ms-azure-students",
    provider: "microsoft",
    category: "credits",
    title: "Azure for Students",
    summary:
      "Crédit Azure et services gratuits pour les étudiants, sans carte bancaire, avec une adresse e-mail universitaire.",
    url: "https://azure.microsoft.com/fr-fr/free/students/",
    free: true,
    forChad: "Pas de carte bancaire internationale nécessaire : vérifiez que votre université est reconnue.",
  },
  {
    id: "ms-azure-free",
    provider: "microsoft",
    category: "credits",
    title: "Compte gratuit Azure",
    summary: "Crédit de départ et services toujours gratuits dans certaines limites pour tester Azure.",
    url: "https://azure.microsoft.com/fr-fr/free/",
    free: true,
  },
  {
    id: "ms-community",
    provider: "microsoft",
    category: "communaute",
    title: "Microsoft Developer Community",
    summary:
      "Point d'entrée des programmes communautaires Microsoft : événements, groupes, experts et contributions.",
    url: "https://developer.microsoft.com/fr-fr/community",
    free: true,
  },
  {
    id: "ms-reactor",
    provider: "microsoft",
    category: "communaute",
    title: "Microsoft Reactor",
    summary: "Événements, ateliers et séries en ligne animés par des ingénieurs Microsoft, en direct et en replay.",
    url: "https://developer.microsoft.com/fr-fr/reactor/",
    free: true,
  },
  {
    id: "ms-techcommunity",
    provider: "microsoft",
    category: "communaute",
    title: "Microsoft Tech Community",
    summary: "Forums et blogs techniques des équipes produit Microsoft.",
    url: "https://techcommunity.microsoft.com/",
    free: true,
  },
  {
    id: "ms-qna",
    provider: "microsoft",
    category: "communaute",
    title: "Microsoft Q&A",
    summary: "Questions-réponses techniques sur Azure, .NET et Microsoft 365, avec réponses d'experts.",
    url: "https://learn.microsoft.com/fr-fr/answers/",
    free: true,
  },
  {
    id: "ms-mvp",
    provider: "microsoft",
    category: "communaute",
    title: "Programme Microsoft MVP",
    summary:
      "Reconnaissance des experts qui partagent leurs connaissances (articles, talks, open source). Un objectif à long terme pour les leaders de la communauté.",
    url: "https://mvp.microsoft.com/",
    free: true,
  },
  {
    id: "ms-vscode",
    provider: "microsoft",
    category: "outils",
    title: "Visual Studio Code",
    summary: "Éditeur de code gratuit et multiplateforme, avec des milliers d'extensions.",
    url: "https://code.visualstudio.com/",
    free: true,
  },
  {
    id: "ms-startups",
    provider: "microsoft",
    category: "startups",
    title: "Microsoft for Startups",
    summary: "Programme d'accompagnement des startups : crédits cloud, outils et conseils techniques.",
    url: "https://www.microsoft.com/fr-fr/startups",
    free: true,
  },

  // AWS
  {
    id: "aws-skillbuilder",
    provider: "aws",
    category: "apprendre",
    title: "AWS Skill Builder",
    summary:
      "Centaines de cours numériques gratuits sur le cloud AWS, du Cloud Practitioner aux spécialités. Abonnement optionnel pour les laboratoires.",
    url: "https://skillbuilder.aws/",
    free: true,
  },
  {
    id: "aws-educate",
    provider: "aws",
    category: "apprendre",
    title: "AWS Educate",
    summary:
      "Formation au cloud pour étudiants et débutants, sans carte bancaire, avec des laboratoires pratiques et des badges.",
    url: "https://aws.amazon.com/fr/education/awseducate/",
    free: true,
    forChad: "Accessible dès 13 ans et sans moyen de paiement.",
  },
  {
    id: "aws-certification",
    provider: "aws",
    category: "certifier",
    title: "Certifications AWS",
    summary:
      "Parcours de certification : Cloud Practitioner, Solutions Architect, Developer, SysOps… avec questions d'entraînement officielles.",
    url: "https://aws.amazon.com/fr/certification/",
    free: false,
  },
  {
    id: "aws-free",
    provider: "aws",
    category: "credits",
    title: "Offre gratuite AWS",
    summary: "Crédits et services gratuits pour découvrir AWS. Consultez les conditions actuelles sur la page officielle.",
    url: "https://aws.amazon.com/fr/free/",
    free: true,
    forChad: "Activez une alerte de facturation dès le premier jour pour éviter les surprises.",
  },
  {
    id: "aws-repost",
    provider: "aws",
    category: "communaute",
    title: "AWS re:Post",
    summary: "Forum officiel de questions-réponses AWS, modéré par des experts et des employés AWS.",
    url: "https://repost.aws/fr",
    free: true,
  },
  {
    id: "aws-builders",
    provider: "aws",
    category: "communaute",
    title: "AWS Community Builders",
    summary:
      "Programme pour les développeurs qui partagent leurs connaissances AWS : mentorat, crédits et accès anticipé aux nouveautés.",
    url: "https://aws.amazon.com/fr/developer/community/community-builders/",
    free: true,
  },
  {
    id: "aws-usergroups",
    provider: "aws",
    category: "communaute",
    title: "AWS User Groups",
    summary: "Groupes locaux animés par des bénévoles. Code for Chad peut porter un groupe à N'Djamena.",
    url: "https://aws.amazon.com/fr/developer/community/usergroups/",
    free: true,
  },
  {
    id: "aws-modern-apps-partners",
    provider: "aws",
    category: "startups",
    title: "Partenaires AWS pour applications modernes",
    summary:
      "Partenaires certifiés qui aident à migrer et moderniser les applications : conteneurs, serverless, microservices, DevOps.",
    url: "https://aws.amazon.com/fr/modern-apps/partners/",
    free: true,
  },
  {
    id: "aws-apn",
    provider: "aws",
    category: "startups",
    title: "AWS Partner Network",
    summary: "Programme pour les entreprises qui construisent des services ou des produits sur AWS.",
    url: "https://aws.amazon.com/fr/partners/",
    free: true,
  },
  {
    id: "aws-activate",
    provider: "aws",
    category: "startups",
    title: "AWS Activate",
    summary: "Crédits AWS, support technique et formation pour les startups en démarrage.",
    url: "https://aws.amazon.com/fr/startups/",
    free: true,
  },
  {
    id: "aws-well-architected",
    provider: "aws",
    category: "apprendre",
    title: "AWS Well-Architected",
    summary:
      "Bonnes pratiques d'architecture en six piliers : excellence opérationnelle, sécurité, fiabilité, performance, coûts, durabilité.",
    url: "https://aws.amazon.com/fr/architecture/well-architected/",
    free: true,
  },
  {
    id: "aws-snowball-dev",
    provider: "aws",
    category: "outils",
    title: "AWS Snowball – ressources développeurs",
    summary:
      "Documentation, SDK et CLI pour les appareils Snowball, qui transfèrent de gros volumes de données hors ligne ou traitent des données en périphérie. Vérifiez la disponibilité actuelle du service sur la page officielle.",
    url: "https://aws.amazon.com/fr/snowball/disk/developer-resources/",
    free: false,
    forChad: "Le transfert physique de données est une réponse aux connexions lentes ou coûteuses.",
  },

  // GitHub
  {
    id: "gh-pack",
    provider: "github",
    category: "credits",
    title: "GitHub Student Developer Pack",
    summary:
      "Accès gratuit à des outils professionnels (GitHub Copilot, domaines, hébergement, IDE…) pour les étudiants vérifiés.",
    url: "https://education.github.com/pack",
    free: true,
  },
  {
    id: "gh-skills",
    provider: "github",
    category: "apprendre",
    title: "GitHub Skills",
    summary: "Cours pratiques qui se déroulent dans votre propre dépôt : Git, pull requests, GitHub Actions, Pages.",
    url: "https://skills.github.com/",
    free: true,
  },
  {
    id: "gh-docs",
    provider: "github",
    category: "outils",
    title: "Documentation GitHub",
    summary: "Référence complète de Git et GitHub, disponible en français.",
    url: "https://docs.github.com/fr",
    free: true,
  },

  // Google
  {
    id: "google-gdg",
    provider: "google",
    category: "communaute",
    title: "Google Developer Groups",
    summary: "Communautés locales de développeurs autour des technologies Google, avec événements et DevFest.",
    url: "https://gdg.community.dev/",
    free: true,
  },
  {
    id: "google-skills-boost",
    provider: "google",
    category: "apprendre",
    title: "Google Cloud Skills Boost",
    summary: "Laboratoires pratiques et parcours Google Cloud, avec des badges partageables.",
    url: "https://www.cloudskillsboost.google/",
    free: true,
  },
  {
    id: "google-devs",
    provider: "google",
    category: "outils",
    title: "Google for Developers",
    summary: "Documentation Android, Firebase, Flutter, Web et Google Cloud.",
    url: "https://developers.google.com/",
    free: true,
  },

  // Open source
  {
    id: "mdn",
    provider: "open-source",
    category: "apprendre",
    title: "MDN Web Docs",
    summary: "La référence HTML, CSS et JavaScript, maintenue par Mozilla et la communauté. En français.",
    url: "https://developer.mozilla.org/fr/",
    free: true,
  },
  {
    id: "freecodecamp",
    provider: "open-source",
    category: "certifier",
    title: "freeCodeCamp",
    summary: "Cursus complets et certifications gratuites : Web responsive, JavaScript, Python, data.",
    url: "https://www.freecodecamp.org/",
    free: true,
  },
  {
    id: "owasp-top10",
    provider: "open-source",
    category: "securite",
    title: "OWASP Top 10",
    summary: "Les dix risques de sécurité les plus critiques pour les applications Web, avec des contre-mesures.",
    url: "https://owasp.org/www-project-top-ten/",
    free: true,
  },
  {
    id: "rea",
    provider: "open-source",
    category: "securite",
    title: "REA – Reverse Engineer Anything",
    summary:
      "Serveur MCP open source (MIT) qui donne à un agent IA des outils pour analyser binaires, applications JavaScript/Electron, assemblies .NET et sites Web, avec les preuves de chaque conclusion.",
    url: "https://github.com/morluto/rea",
    free: true,
    forChad: "Voir notre guide de rétro-ingénierie responsable.",
  },
  {
    id: "ghidra",
    provider: "open-source",
    category: "securite",
    title: "Ghidra",
    summary: "Suite libre de rétro-ingénierie logicielle (désassembleur, décompilateur), utilisable avec REA.",
    url: "https://ghidra-sre.org/",
    free: true,
  },
];

export function getProvider(slug: string) {
  return providers.find((p) => p.slug === slug);
}

export function resourcesFor(slug: ProviderSlug) {
  return resources.filter((r) => r.provider === slug);
}
