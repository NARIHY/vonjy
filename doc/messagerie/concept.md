### 🎯 Objectif :

Mettre en place un système qui permet :

* d’envoyer un message à tous les utilisateurs (broadcast),
* de recevoir les messages **en temps réel**,
* avec une gestion d’utilisateurs via **WorkOS**,
* en utilisant **Laravel + React**.

---

## 🧱 1. Base de données

### ✅ Migration pour `messages` :

```bash
php artisan make:migration create_messages_table
```

```php
// database/migrations/xxxx_xx_xx_create_messages_table.php
public function up()
{
    Schema::create('messages', function (Blueprint $table) {
        $table->id();
        $table->foreignId('user_id')->constrained()->onDelete('cascade'); // l’expéditeur
        $table->text('content');
        $table->timestamps();
    });
}
```

---

## 🧠 2. Modèle `Message` & relation avec `User`

```php
// app/Models/Message.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    protected $fillable = ['user_id', 'content'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
```

---

## 🔐 3. Authentification avec WorkOS

WorkOS gère le **Single Sign-On (SSO)**. Voici ce qu’il te faut :

* Utiliser le SDK PHP WorkOS côté Laravel
* Authentifier les utilisateurs et stocker leurs infos dans `users`

Tu peux suivre [ce guide officiel WorkOS Laravel](https://workos.com/docs/sso/guide/laravel) pour cela.

---

## 📡 4. Temps réel avec **Laravel Echo + Pusher** (ou Socket.IO)

### 4.1 Installer **Pusher** ou utiliser **Laravel Websockets** :

```bash
composer require pusher/pusher-php-server
```

Dans `.env` :

```
BROADCAST_DRIVER=pusher

PUSHER_APP_ID=your_id
PUSHER_APP_KEY=your_key
PUSHER_APP_SECRET=your_secret
PUSHER_APP_CLUSTER=mt1
```

Dans `config/broadcasting.php` :

```php
'pusher' => [
    'driver' => 'pusher',
    'key' => env('PUSHER_APP_KEY'),
    'secret' => env('PUSHER_APP_SECRET'),
    'app_id' => env('PUSHER_APP_ID'),
    'options' => [
        'cluster' => env('PUSHER_APP_CLUSTER'),
        'useTLS' => true,
    ],
],
```

---

### 4.2 Créer un **event Laravel** à diffuser :

```bash
php artisan make:event NewMessage
```

```php
// app/Events/NewMessage.php
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Queue\SerializesModels;

class NewMessage implements ShouldBroadcast
{
    use InteractsWithSockets, SerializesModels;

    public $message;

    public function __construct($message)
    {
        $this->message = $message;
    }

    public function broadcastOn()
    {
        return ['messages'];
    }

    public function broadcastAs()
    {
        return 'new-message';
    }
}
```

---

### 4.3 Envoyer le message et émettre l’event

```php
use App\Models\Message;
use App\Events\NewMessage;

public function store(Request $request)
{
    $message = Message::create([
        'user_id' => auth()->id(),
        'content' => $request->input('content'),
    ]);

    broadcast(new NewMessage($message))->toOthers();

    return response()->json($message);
}
```

---

## ⚛️ 5. Côté React : Écouter les messages

### 5.1 Installer Laravel Echo + Pusher :

```bash
npm install --save laravel-echo pusher-js
```

### 5.2 Configurer Laravel Echo

```js
// resources/js/echo.js ou dans un composant React
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;

const echo = new Echo({
    broadcaster: 'pusher',
    key: 'your_key',
    cluster: 'mt1',
    forceTLS: true,
});

export default echo;
```

### 5.3 Réception en React

```jsx
import { useEffect, useState } from 'react';
import echo from './echo';

function MessageListener() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    echo.channel('messages')
      .listen('.new-message', (e) => {
        setMessages((prev) => [...prev, e.message]);
      });
  }, []);

  return (
    <div>
      {messages.map((msg, i) => (
        <p key={i}>{msg.content}</p>
      ))}
    </div>
  );
}
```

---

## ✅ Résultat

* 🔐 Utilisateurs connectés via WorkOS
* 📬 Messages envoyés via Laravel
* 📡 Diffusés en **temps réel** avec Laravel Echo + Pusher
* ⚛️ Affichés instantanément dans React

---

## 🔁 Alternatives

* Utiliser **Laravel Websockets** (open-source, auto-hébergé) au lieu de Pusher
* Intégrer **chat privé**, **notification individuelle**, etc.

