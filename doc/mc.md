## 🧠 **Mini Cahier des Charges (MC)** – *Module de Communication et Cartographie en Temps Réel pour Vonjy 🇲🇬*

---

### 🔖 **Nom du module : Vonjy Connect**

---

### 🎯 **Objectif du module**

Permettre une communication temps réel entre citoyens et volontaires à travers :

* Un **chat d’urgence temps réel** (texte) entre utilisateurs connectés
* Une **carte interactive** pour localiser les appels à l’aide ou sinistres
* Une **radio communautaire intégrée** pour diffuser les consignes vocales
* La synchronisation entre plusieurs interfaces React avec une API Laravel centralisée

---

### ⚙️ **Stack technique**

| Fonction                   | Techno                        |
| -------------------------- | ----------------------------- |
| Backend API                | Laravel 10                    |
| Auth API                   | Laravel Sanctum               |
| Temps réel                 | Laravel Websockets + Echo     |
| Frontend (Admin)           | React Vite App #1             |
| Frontend (Public/Citoyens) | React Vite App #2             |
| Cartographie               | OpenLayers + OpenRouteService |
| Géolocalisation            | GPS API HTML5                 |
| Web Radio                  | Lecteur audio HTML5           |

---

### 🔐 **Authentification**

* Laravel Sanctum avec tokens pour authentifier les utilisateurs
* Deux rôles : `admin`, `citoyen`
* Chaque application React consomme la même API mais avec des interfaces et permissions différentes

---

### 🔁 **Temps réel**

#### Laravel

* `MessageController` avec événement `MessageSent`
* `SOSController` avec événement `SOSDispatched`
* Laravel Websockets (`beyondcode/laravel-websockets`) ou Pusher

#### React

* React consomme Echo avec Laravel Websockets
* Composant `ChatBox` pour discuter
* Notification en temps réel quand un SOS est reçu

---

### 🗺️ **Carte & itinéraire**

* Composant `MapView` avec OpenLayers
* Marker utilisateur en temps réel via `navigator.geolocation.watchPosition`
* Traçage d’itinéraires via OpenRouteService API
* Affichage des zones sinistrées en rouge
* Mode "itinéraire vers sinistré"

---

### 📻 **Web Radio**

* Intégration dans la sidebar de React :

```jsx
<audio controls autoPlay>
  <source src="https://stream.radio-don-bosco.org/live" type="audio/mpeg" />
</audio>
```

---

### 📱 **Fonctionnalités utilisateur (React citoyen)**

| Fonction                              | Description                              |
| ------------------------------------- | ---------------------------------------- |
| 🔴 Envoyer un SOS                     | Envoie localisation + message            |
| 🗺️ Voir la carte des urgences        | Affiche incidents signalés en temps réel |
| 💬 Chat avec un volontaire            | Canal de secours texte                   |
| 📻 Écouter la radio                   | Flux d’alerte humanitaire                |
| 🧭 Obtenir un itinéraire vers un abri | Calcul d’itinéraire OpenRouteService     |

---

### 🖥️ **Fonctionnalités admin (React admin)**

| Fonction                      | Description                                  |
| ----------------------------- | -------------------------------------------- |
| 📍 Voir toutes les urgences   | Interface admin cartographique               |
| 💬 Répondre aux SOS           | Chat réactif                                 |
| 🔔 Push de notifications      | Notifications de masse via WebSocket         |
| 📡 Statistiques en temps réel | Nombre de SOS, messages, utilisateurs actifs |

---

### 📦 **Structure backend (Laravel)**

```bash
app/
├── Models/
│   ├── User.php
│   ├── Message.php
│   └── Alert.php
├── Events/
│   ├── MessageSent.php
│   └── SOSDispatched.php
├── Http/Controllers/
│   ├── AuthController.php
│   ├── MessageController.php
│   └── SOSController.php
routes/
└── api.php
```

---

### 📂 **Structure frontend (React public)**

```bash
src/
├── components/
│   ├── ChatBox.jsx
│   ├── MapView.jsx
│   └── RadioPlayer.jsx
├── pages/
│   ├── Home.jsx
│   └── SOS.jsx
└── App.jsx
```

---

## ✅ **Étapes de mise en place**

1. Créer le backend Laravel (auth, messages, alertes)
2. Installer Laravel WebSockets ou Pusher
3. Créer l’app React citoyen + intégrer OpenLayers + Chat + Radio
4. Créer l’app React admin pour superviser
5. Tester communication entre les deux apps via WebSocket

---
