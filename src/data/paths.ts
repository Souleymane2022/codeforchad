// Parcours d'apprentissage : une suite ordonnée de ressources du catalogue.

export type LearningPath = {
  slug: string;
  title: string;
  level: "Débutant" | "Intermédiaire" | "Avancé";
  duration: string;
  goal: string;
  steps: { title: string; detail: string; resourceId: string }[];
};

export const paths: LearningPath[] = [
  {
    slug: "web",
    title: "Développeur Web",
    level: "Débutant",
    duration: "3 à 6 mois",
    goal: "Construire et publier un site ou une application Web complète.",
    steps: [
      { title: "Bases du Web", detail: "HTML, CSS et JavaScript sur MDN.", resourceId: "mdn" },
      { title: "Cursus guidé", detail: "Certification Responsive Web Design.", resourceId: "freecodecamp" },
      { title: "Projets", detail: "Web Dev For Beginners : 24 leçons en projets.", resourceId: "ms-beginners" },
      { title: "Git et GitHub", detail: "Versionner et publier son code.", resourceId: "gh-skills" },
    ],
  },
  {
    slug: "aws",
    title: "Cloud AWS",
    level: "Débutant",
    duration: "2 à 3 mois",
    goal: "Préparer la certification AWS Certified Cloud Practitioner.",
    steps: [
      { title: "Découvrir le cloud", detail: "Premiers laboratoires sans carte bancaire.", resourceId: "aws-educate" },
      { title: "Cours officiel", detail: "AWS Cloud Practitioner Essentials.", resourceId: "aws-skillbuilder" },
      { title: "Bonnes pratiques", detail: "Les six piliers Well-Architected.", resourceId: "aws-well-architected" },
      { title: "Examen", detail: "Questions d'entraînement puis examen.", resourceId: "aws-certification" },
    ],
  },
  {
    slug: "azure",
    title: "Cloud Azure",
    level: "Débutant",
    duration: "1 à 2 mois",
    goal: "Obtenir la certification Azure Fundamentals (AZ-900).",
    steps: [
      { title: "Crédits étudiants", detail: "Activer Azure for Students.", resourceId: "ms-azure-students" },
      { title: "Parcours AZ-900", detail: "Modules Microsoft Learn.", resourceId: "ms-learn" },
      { title: "Questions", detail: "Poser ses questions aux experts.", resourceId: "ms-qna" },
      { title: "Examen", detail: "Évaluation d'entraînement gratuite puis examen.", resourceId: "ms-credentials" },
    ],
  },
  {
    slug: "securite",
    title: "Sécurité & rétro-ingénierie",
    level: "Intermédiaire",
    duration: "2 à 4 mois",
    goal: "Comprendre comment un logiciel fonctionne et le sécuriser.",
    steps: [
      { title: "Risques Web", detail: "Lire et appliquer l'OWASP Top 10.", resourceId: "owasp-top10" },
      { title: "Outil d'analyse", detail: "Installer Ghidra.", resourceId: "ghidra" },
      { title: "Analyse assistée", detail: "Brancher REA à votre agent IA.", resourceId: "rea" },
    ],
  },
];
