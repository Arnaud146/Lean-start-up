# Guide d'Accessibilité - Handy's

## Vue d'ensemble

Cette application a été conçue pour être accessible aux personnes utilisant des lecteurs d'écran comme VoiceOver (iOS/Mac) et TalkBack (Android). Voici les améliorations apportées pour l'accessibilité.

## Fonctionnalités d'accessibilité

### 1. Navigation au clavier
- **Tab** : Navigation entre les éléments interactifs
- **Entrée/Espace** : Activation des boutons et liens
- **Alt + M** : Aller directement au contenu principal
- **Alt + P** : Annoncer la page actuelle

### 2. Attributs ARIA
- `aria-label` : Labels descriptifs pour les éléments sans texte visible
- `aria-describedby` : Descriptions supplémentaires pour les éléments complexes
- `aria-current` : Indication de la page/section active
- `aria-live` : Régions dynamiques pour les annonces
- `role` : Rôles sémantiques appropriés (navigation, main, banner, etc.)

### 3. Structure sémantique
- En-têtes hiérarchiques (`h1`, `h2`, `h3`, etc.)
- Navigation avec `nav` et `aria-label`
- Contenu principal avec `main` et `id="main-content"`
- Liens "skip to content" pour aller directement au contenu

### 4. Annonces aux lecteurs d'écran
- Hook `useAccessibility` pour gérer les annonces
- Composant `ScreenReaderAnnouncer` pour les messages dynamiques
- Annonces automatiques lors du chargement des pages

### 5. Focus visible
- Contours de focus bien visibles
- Styles de focus cohérents dans toute l'application
- Gestion du focus pour les éléments interactifs

## Composants améliorés

### Button
- Support des `aria-label` pour les boutons avec icônes
- Descriptions supplémentaires avec `aria-describedby`
- Gestion automatique des labels pour les lecteurs d'écran

### Input
- Labels associés avec `htmlFor`
- Messages d'erreur avec `role="alert"`
- Texte d'aide avec `aria-describedby`
- Validation avec `aria-invalid`

### Navigation
- Rôles appropriés (`navigation`, `banner`)
- Labels descriptifs pour les menus
- Indication de la page active

## Tests d'accessibilité

### Avec VoiceOver (iOS/Mac)
1. Activez VoiceOver
2. Naviguez avec les gestes ou le clavier
3. Vérifiez que tous les éléments sont annoncés correctement
4. Testez les raccourcis clavier

### Avec TalkBack (Android)
1. Activez TalkBack dans les paramètres d'accessibilité
2. Naviguez avec les gestes
3. Vérifiez la navigation et les annonces

### Tests manuels
- Navigation complète au clavier
- Contraste des couleurs
- Taille de texte (zoom 200%)
- Lecteurs d'écran

## Bonnes pratiques implémentées

1. **Contraste** : Couleurs avec un ratio de contraste suffisant
2. **Taille de texte** : Texte redimensionnable jusqu'à 200%
3. **Focus** : Indicateurs de focus visibles et cohérents
4. **Sémantique** : Structure HTML sémantique appropriée
5. **Labels** : Labels explicites pour tous les éléments interactifs
6. **Annonces** : Messages contextuels pour les changements d'état

## Raccourcis clavier

| Raccourci | Action |
|-----------|--------|
| Tab | Navigation entre éléments |
| Entrée | Activer un lien |
| Espace | Activer un bouton |
| Alt + M | Aller au contenu principal |
| Alt + P | Annoncer la page actuelle |

## Maintenance

Pour maintenir l'accessibilité :

1. Testez régulièrement avec des lecteurs d'écran
2. Vérifiez la navigation au clavier
3. Validez les nouveaux composants
4. Maintenez les attributs ARIA à jour
5. Testez avec différents niveaux de zoom

## Ressources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Checklist](https://webaim.org/standards/wcag/checklist) 