## ⚙️ **Architecture globale du projet Vonjy+**

```
                         [ Laravel API ]
                       /       |       \
         [React App A]     [React App B]   [Mobile App (optionnel)]
            (admin/NGO)        (public/citoyens)  
                   \               /
                [ WebSocket Server - Laravel Echo / Socket.IO ]
                          |
                   [Real-Time Chat / SOS]
                          |
              [OpenLayers + OpenRouteService Maps]
                          |
                      [Web Radio Player]
```

---

## 📱 1. **Deuxième App React : pour les citoyens**

Tu peux créer une app React **séparée** (dans un autre dossier ou repo) qui communique avec le même backend Laravel via API.

### ⚙️ Technologies

* React + Vite
* Axios (pour les appels API vers Laravel)
* Zustand ou Redux (pour la gestion d’état si besoin)
* WebSocket pour temps réel

---

## 💬 2. **Module de communication temps réel**

### 🔧 Options :

#### ✅ Simple : Laravel Echo + Pusher

* Facile à mettre en place
* Laravel Broadcaster + Pusher (ou Ably / Centrifugo)
* Écoute des événements `ChatMessageSent`, `SOSAlertTriggered`, etc.

#### ✅ Alternatif : Laravel WebSockets (self-hosted)

* Utilise le package `beyondcode/laravel-websockets`
* Tu peux héberger toi-même ton serveur WS gratuitement
* Compatible avec Laravel Echo

### 🎯 Exemples d’événements :

* `message.envoyé` : chat textuel en temps réel
* `alerte.sos` : notification d’une urgence
* `localisation.miseAJour` : déplacement d’un utilisateur/volontaire sur la carte

---

## 🗺️ 3. **Carte avec OpenLayers + OpenRouteService**

### 🔧 Ajout d’un itinéraire vers la personne en danger :

* OpenRouteService pour calculer l’itinéraire
* OpenLayers pour dessiner la route
* Position en temps réel d’un volontaire ou d’un sinistré (via WebSocket ou polling)

```js
// Exemple simple d'appel ORS
const fetchRoute = async (start, end) => {
  const response = await axios.post(
    'https://api.openrouteservice.org/v2/directions/foot-walking',
    {
      coordinates: [start, end],
    },
    {
      headers: {
        Authorization: 'TON_API_KEY',
      },
    }
  );
  return response.data;
};
```

---

## 📻 4. **Web Radio (intégration)**

Tu peux intégrer une **radio communautaire ou humanitaire** dans ton appli (ou même créer la tienne).

### 🔧 Méthodes :

* Utiliser un lecteur audio HTML5 simple avec une URL de flux radio
* Exemple avec **Radio Don Bosco** ou une webradio locale si disponible

```jsx
<audio controls autoPlay>
  <source src="https://stream.radio-don-bosco.org/live" type="audio/mpeg" />
  Votre navigateur ne supporte pas l'audio.
</audio>
```

> ⚠️ Pour que ça soit **intégré de manière permanente**, ajoute des boutons **play/stop** avec état global.

---

## ✨ Bonus : Idée d'intégration UI dans React

```jsx
function VonjySidebar() {
  return (
    <div className="p-4 bg-white shadow rounded-xl space-y-4">
      <h2 className="text-xl font-bold">Vonjy Panel</h2>

      <button onClick={joinChat} className="btn btn-primary">Rejoindre le chat</button>
      <button onClick={sendSOS} className="btn btn-danger">Envoyer un SOS</button>

      <div className="mt-4">
        <h3 className="text-sm font-semibold">📻 Radio communautaire</h3>
        <audio controls autoPlay>
          <source src="https://stream.radio-don-bosco.org/live" type="audio/mpeg" />
        </audio>
      </div>
    </div>
  );
}
```

---

## 📦 À prévoir dans Laravel

* Authentification API (Laravel Sanctum ou Passport)
* `ChatController`, `SOSController` avec événements broadcast
* Modèle `Message`, `Alert`, `Location`, etc.
* Système de rôles (admin, volontaire, citoyen)

---