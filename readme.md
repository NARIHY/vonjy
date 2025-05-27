## 🇲🇬 **Nom du projet : Vonjy – Plateforme de secours collaboratif pour Madagascar**

---

### 🧭 **Contexte malgache**

* Accès limité à Internet dans certaines régions 🛰️
* Faible couverture médicale et logistique dans les zones rurales 🏥
* Forte solidarité communautaire et présence d’ONG locales 🤝
* Manque d’outils numériques centralisés pour gérer les urgences ⛑️

---

### 🎯 **Objectif**

Créer une **plateforme numérique (web et mobile)** pour :

* Alerter rapidement en cas de catastrophe (cyclone, incendie, accident)
* Permettre aux **citoyens** de signaler des urgences via **géolocalisation**
* Connecter **bénévoles, médecins, autorités locales et ONG**
* Gérer les **dons, besoins de première nécessité**, et la **logistique**

---

### 🧪 **Technos utilisées (adaptées à Madagascar)**

| Domaine              | Technologies pratiques/locales                                |
| -------------------- | ------------------------------------------------------------- |
| **Frontend Web**     | Vue.js ou Laravel Blade + Tailwind CSS                        |
| **Frontend Mobile**  | Flutter (cross-platform Android/iOS) ou Android Java/Kotlin   |
| **Backend**          | Laravel 10 avec API REST                                      |
| **Base de données**  | MySQL ou PostgreSQL (hébergé sur serveur local ou VPS)        |
| **Temps réel**       | Laravel Echo + Pusher (ou Firebase)                           |
| **Cartographie**     | Leaflet.js + données OpenStreetMap Madagascar                 |
| **Géolocalisation**  | HTML5 API + GPS mobile                                        |
| **Notifications**    | SMS (via Orange/Airtel API), Firebase Push                    |
| **Connexion faible** | IndexedDB / localStorage + sync offline (PWA mobile-friendly) |
| **Traductions**      | Français / Malagasy / Anglais                                 |

---

### 🔧 **Fonctionnalités clés – Version Madagascar**

1. **🆘 Bouton “Vonjy” (Urgence)**

   * Envoie une alerte avec position GPS + type de problème
   * Fonctionne même avec un réseau faible (via SMS fallback)

2. **📍 Carte des sinistres**

   * Affiche les zones touchées, centres de secours, besoins (eau, riz, soins…)

3. **👥 Coordination communautaire**

   * ONG, fokontany, communes peuvent s’inscrire pour recevoir les alertes locales
   * Les utilisateurs peuvent s’enregistrer comme **volontaires**

4. **📦 Suivi des dons**

   * Argent, vivres, vêtements, médicaments
   * Historique + preuve de livraison (photo, localisation)

5. **🔄 Mode hors ligne**

   * Les infos sont stockées localement et envoyées dès qu’un réseau est dispo

6. **📢 Notifications par SMS ou message vocal**

   * Pour les zones sans accès à Internet
   * Intégration avec des opérateurs locaux

---

### 💡 **Exemples d’usage à Madagascar**

| Situation réelle                 | Comment Vonjy aide                                     |
| -------------------------------- | ------------------------------------------------------ |
| Cyclone à Antalaha               | Carte des abris, appels à l’aide localisés, logistique |
| Pénurie d’eau à Tuléar           | Signalement des besoins, coordination des ONG          |
| Incendie à Tana (Andavamamba)    | Alertes en temps réel + dispatch des volontaires       |
| Épidémie dans une commune rurale | Notifications aux autorités sanitaires, suivi des cas  |

---

### 🧠 **Impact humain**

* 🌍 Sauver des vies dans un pays vulnérable aux catastrophes
* 🧒 Aider les enfants et familles isolées rapidement
* 🛠️ Renforcer les capacités des **fokontany** à réagir efficacement
* 💬 Créer un canal de communication entre l'État, les citoyens et les ONG

---
