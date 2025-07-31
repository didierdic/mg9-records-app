# MG9 Records - Professional Music Services

Une application web moderne pour la génération de progressions d'accords, développée avec React, TypeScript et Vite.

## 🎵 Fonctionnalités

- **Générateur de progressions d'accords** : Créez des progressions harmoniques basées sur l'humeur, la tonalité et la complexité
- **Lecture audio** : Écoutez vos progressions avec un synthétiseur intégré
- **Interface moderne** : Design responsive avec une expérience utilisateur optimisée

## 🚀 Installation et Configuration

### Prérequis
- Node.js (version 18 ou supérieure)
- npm ou yarn

### Installation
```bash
# Cloner le repository
git clone <votre-repo>
cd mg9-records-_-professional-music-services

# Installer les dépendances
npm install

# Installer Netlify CLI (pour le développement local)
npm install -g netlify-cli
```

### Configuration

1. **Mode développement** :
   L'application utilise des modèles ONNX pour la génération.

## 🛠️ Développement

### Démarrage en mode développement
```bash
# Avec Netlify CLI (recommandé - inclut les fonctions)
netlify dev

# Ou avec Vite uniquement (données mockées seulement)
npm run dev
```

L'application sera disponible sur :
- Netlify CLI : http://localhost:8888
- Vite seul : http://localhost:3000

### Build de production
```bash
npm run build
```

## 📁 Structure du projet

```
├── components/          # Composants React
├── contexts/           # Contextes React (PlaybackContext)
├── services/           # Services API (musicService.ts)
├── utils/              # Utilitaires (music.ts, midi.ts)
├── netlify/functions/  # Fonctions Netlify
├── types.ts           # Types TypeScript
├── constants.ts       # Constantes de l'application
└── netlify.toml       # Configuration Netlify
```

## 🎼 Utilisation

1. **Génération de progressions** :
   - Sélectionnez une tonalité, une humeur et un niveau de complexité
   - Cliquez sur "Generate Progression"
   - Écoutez le résultat avec le bouton de lecture

## 🚀 Déploiement

### Netlify (recommandé)
1. Connectez votre repository à Netlify
2. Le déploiement se fait automatiquement

## Déploiement sur Netlify

### Prérequis
1. Compte Netlify
2. Dépôt Git connecté

### Étapes de déploiement

1. **Préparer le dépôt**
   ```bash
   git add .
   git commit -m "Prêt pour le déploiement Netlify"
   git push origin main
   ```

2. **Connecter à Netlify**
   - Aller sur [netlify.com](https://netlify.com)
   - Cliquer sur "New site from Git"
   - Connecter votre dépôt GitHub/GitLab
   - Configurer les paramètres de build :
     - **Build command**: `npm run build`
     - **Publish directory**: `dist`
     - **Functions directory**: `netlify/functions`

3. **Configurer les variables d'environnement**
   Dans le tableau de bord Netlify > Site settings > Environment variables :
   - `OPENAI_API_KEY` : Votre clé API OpenAI

4. **Déployer**
   - Cliquer sur "Deploy site"
   - Attendre la fin du build et du déploiement

### Corrections apportées pour Netlify

Les fonctions Netlify ont été converties de ES6 modules vers CommonJS pour assurer la compatibilité :

- ✅ `generateProgression.js` : Conversion en CommonJS
- ✅ Ajout de `package.json` dans le dossier functions
- ✅ Gestion CORS améliorée
- ✅ Gestion des erreurs robuste

### Test en local

Pour tester les fonctions Netlify en local :

1. Démarrer le serveur de développement :
   ```bash
   netlify dev
   ```

2. L'application sera disponible sur `http://localhost:8889`

3. Tester les fonctions avec le fichier `test-functions.js` :
   - Ouvrir la console du navigateur
   - Exécuter `testNetlifyFunctions()`

### Résolution des problèmes

**Erreur 404 sur les fonctions :**
- Vérifier que les fonctions sont dans `netlify/functions/`
- S'assurer que les fonctions utilisent CommonJS (`exports.handler`)
- Vérifier la configuration dans `netlify.toml`

## 🔧 Technologies utilisées

- **Frontend** : React 18, TypeScript, Vite
- **Styling** : CSS modules, Tailwind CSS
- **API** : Fonctions Netlify, Modèles ONNX
- **Audio** : Web Audio API
- **Build** : Vite, TypeScript

## 📝 Notes de développement

- L'application utilise des modèles ONNX pour la génération en production
- Le contexte de lecture audio permet de contrôler la lecture des accords
- L'application est optimisée pour le déploiement sur Netlify

## 🤝 Contribution

1. Fork le projet
2. Créez une branche pour votre fonctionnalité
3. Committez vos changements
4. Poussez vers la branche
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT.
"# mg9-records-app" 
"# mg9-records-app" 
"# mg9-records-app"
