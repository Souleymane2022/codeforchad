# Code for Chad

Site de la communauté Code for Chad : un catalogue en français des ressources officielles pour développeurs
(Microsoft, AWS, GitHub, Google, open source), des parcours d'apprentissage et un guide de rétro-ingénierie
responsable avec [REA](https://github.com/morluto/rea).

## Démarrer

```bash
npm install
npm run dev
```

Ouvrez <http://localhost:3000>. `npm run build` génère un site entièrement statique (aucune base de données).

## Structure

| Chemin | Rôle |
| --- | --- |
| `src/data/resources.ts` | Fournisseurs et fiches ressources (lien officiel, résumé, note « pour le Tchad ») |
| `src/data/paths.ts` | Parcours d'apprentissage construits à partir des fiches |
| `src/app/ressources` | Catalogue filtrable (fournisseur, catégorie, gratuit, recherche) |
| `src/app/fournisseurs/[slug]` | Portail par fournisseur, organisé comme les espaces développeurs officiels |
| `src/app/parcours` | Parcours Web, AWS, Azure, Sécurité |
| `src/app/guides/retro-ingenierie` | Guide REA : installation, fonctionnement, cadre légal |

## Ajouter une ressource

Ajoutez une entrée dans `src/data/resources.ts` avec le lien **officiel** et une description factuelle.
La page officielle fait toujours foi : ne recopiez pas les contenus des fournisseurs, résumez-les et liez-les.

Code for Chad est une communauté indépendante, non affiliée à Microsoft, Amazon Web Services, GitHub ou Google.
