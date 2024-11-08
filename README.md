# Carte Interactive des Universités GEDS

Une carte interactive permettant de visualiser les universités partenaires de GEDS à travers l'Europe. Cette application peut être utilisée de manière autonome ou comme plugin WordPress.

![Screenshot de la carte](screenshot.png)

## 🌟 Fonctionnalités

- Carte interactive avec style "watercolor" personnalisé
- Marqueurs personnalisés avec logos des universités
- Lignes de connexion animées depuis la France
- Preview au survol des marqueurs
- Carte détaillée au clic avec :
  - Informations complètes sur l'université
  - Liste des formations proposées avec icônes
  - Langues d'enseignement
  - Liens vers les pages détaillées
- Design responsive
- Intégration WordPress via shortcode

## 🛠️ Installation

### Mode Développement

1. Clonez le dépôt :
```bash
git clone [url-du-repo]
cd interactive-universities-map
```

2. Installez les dépendances :
```bash
npm install
```

3. Démarrez le serveur de développement :
```bash
npm run dev
```

### Production (Standalone)

```bash
npm run build
```

Les fichiers de production seront générés dans le dossier `dist/`.

### Plugin WordPress

1. Buildez le plugin :
```bash
npm run build:wp
npm run deploy:wp
```

2. Le plugin sera généré dans `dist-plugin/`

3. Zippez le contenu du dossier `dist-plugin/`

4. Dans WordPress :
   - Allez dans "Extensions > Ajouter"
   - Cliquez sur "Téléverser une extension"
   - Sélectionnez le fichier zip
   - Activez le plugin

## 🎯 Utilisation

### En tant qu'application React

Importez et utilisez le composant :

```jsx
import InteractiveMap from './components/InteractiveMap';

function App() {
  return (
    <div>
      <InteractiveMap />
    </div>
  );
}
```

### Dans WordPress

Utilisez le shortcode sur n'importe quelle page ou article :

```
[interactive_universities_map]
```

Avec options :
```
[interactive_universities_map height="600px" width="100%"]
```

## 📁 Structure du Projet

```
interactive-universities-map/
├── src/
│   ├── components/
│   │   ├── Map/
│   │   │   ├── Map.jsx
│   │   │   ├── UniversityMarker.jsx
│   │   │   └── index.js
│   │   ├── InteractiveMap.jsx
│   │   └── UniversityInfoCard.jsx
│   ├── data/
│   │   └── universities.js
│   ├── main.jsx
│   └── index.css
├── public/
│   └── assets/
│       ├── logos/        # Logos des universités
│       └── images/       # Images d'arrière-plan
├── wordpress/           # Fichiers du plugin WordPress
├── scripts/            # Scripts de déploiement
└── dist-plugin/        # Plugin WordPress buildé
```

## 🔧 Configuration

### Ajout d'une université

Modifiez le fichier `src/data/universities.js` :

```javascript
export const universities = [
  {
    id: 'university-id',
    name: 'Nom Université',
    city: 'Ville',
    country: 'Pays',
    coordinates: [latitude, longitude],
    programs: [
      'Programme 1',
      'Programme 2'
    ],
    languages: ['fr', 'en'],
    description: 'Description...',
    logo: '/assets/logos/logo.png',
    backgroundImage: '/assets/images/background.jpg'
  }
  // ...
];
```

### Personnalisation des styles

- Modifiez `src/index.css` pour les styles globaux
- Utilisez les classes Tailwind dans les composants

## 🎨 Assets

Les assets nécessaires :

1. Logos (`public/assets/logos/`) :
   - Format : PNG
   - Taille recommandée : 80x80px
   - Fond transparent

2. Images d'arrière-plan (`public/assets/images/`) :
   - Format : JPG/JPEG
   - Ratio : 16:9
   - Résolution minimale : 800x450px

## 🔍 Debugging

Pour le mode développement :
- Les logs des chargements de logos apparaissent dans la console
- Les erreurs de chargement d'assets sont signalées
- La carte affiche des bordures de debug en mode développement

## 🤝 Contribution

1. Forkez le projet
2. Créez votre branche (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Pushez vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📜 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE.md](LICENSE.md) pour plus de détails.

## 📧 Contact

GEDS - [https://www.geds.fr](https://www.geds.fr)

Lien du projet : [https://github.com/Smile2578/gedsmap](https://github.com/Smile2578/gedsmap)