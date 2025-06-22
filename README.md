# 🧙‍♂️ Jeux IDLE RPG - Fantasy 2D

[![Build](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/Masterjeremysu/Jeux-IDLE)
[![MadeWith](https://img.shields.io/badge/made%20with-TypeScript-blue)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-green)](./LICENSE)

Bienvenue dans **Jeux IDLE RPG**, un jeu 2D **fantasy** à progression **automatisée** où vous incarnez un héros évolutif, débloquez des équipements légendaires, affrontez des vagues d’ennemis et améliorez vos stats en continu ! ⚔️

---

## 🎮 Aperçu

> Interface intuitive. Gameplay automatisé. Loots, buffs, et défis épiques.

![screenshot](./screenshots/preview.png) <!-- à créer dans ton repo -->
![image](https://github.com/user-attachments/assets/8781b0b1-d68c-4cbc-810a-e155ee2c5105)


---

## 🚀 Fonctionnalités

- 🦸‍♂️ **Héros personnalisable** avec amélioration de stats
- ⚔️ **Système de combat dynamique** avec coups critiques, défense, buffs temporaires
- 🛡️ **Équipements lootables** de différentes raretés
- 🧪 **Boutique complète** : potions, améliorations, buffs, équipements mystères
- 🎁 **Offres spéciales** (ex : 3 potions pour le prix de 2)
- 🔄 **Reroll des buffs** contre de l'or
- 🧬 **Système de buffs actifs** avec compte à rebours
- 🧠 **Auto-mode intelligent** pour du farming AFK
- 💾 **Sauvegarde automatique** via `localStorage`
- 🎯 **Succès à débloquer**
- 💸 **Animations d’achat** ("💸 -100g" flottant)
- 🌍 **100% en français**

---

## 📦 Installation

```bash
git clone https://github.com/Masterjeremysu/Jeux-IDLE.git
cd Jeux-IDLE
npm install
npm run dev
Puis ouvre http://localhost:5173 dans ton navigateur préféré 🌐

🧱 Architecture
hooks/useGame.ts → Logique de jeu centralisée (combat, achats, buffs...)

components/ → UI du héros, ennemis, boutique...

data/gameData.ts → Constantes de gameplay (prix, buffs, loots)

utils/gameLogic.ts → Fonctions de calcul, génération, stats

types/ → Types TypeScript (héros, ennemis, buffs...)

📘 Technologies
React (Vite)

TypeScript

TailwindCSS

Lucide React Icons

localStorage pour la persistance

📦 Zéro backend, 100% client-side pour l’instant

🗺️ Roadmap
 🎨 Effets visuels supplémentaires (animations, transitions)

 🧝 Classes de héros (mage, archer…)

 🗺️ Système de zones / cartes

 ⛺ Donjons et boss multi-étapes

 ☁️ Sauvegarde cloud (via Supabase)

 🧠 IA d’auto-combat plus stratégique

 🎮 Déploiement mobile (PWA)

🤝 Contribution
Fork le projet

Crée une branche : git checkout -b feature/ma-feature

Commit : git commit -am 'Ajoute une fonctionnalité'

Push : git push origin feature/ma-feature

Fais une PR 🚀

🧙‍♂️ Auteur
Jeremy Jedi
📧 Contact via GitHub

📄 Licence
Ce projet est sous licence MIT.
Libre à toi de l'utiliser, le modifier, le partager (même commercialement) — en gardant l'attribution.

