Parfait ! Puisque tu utilises **Inertia.js avec React** côté frontend et **Laravel** côté backend, voici un plan complet pour implémenter la **logique métier (CRUD)** pour chaque entité (SecoursPost, PolicePostDetail, GendarmeriePostDetail, HospitalPostDetail, MilitaryPostDetail) via **API Inertia.js**.

---

### ✅ Objectif

Tu veux :

1. Créer des **contrôleurs API Inertia** pour chaque type de `SecoursPost` + son `detail`.
2. Gérer les **routes**.
3. Gérer les **vues React** pour l’interface utilisateur.
4. Avoir une logique **dynamique** en fonction du `type` (`hospital`, `police`, `military`, `gendarmerie`).

---

## 🧩 1. Contrôleurs Laravel (Inertia + logique métier)

### 🔹 `SecoursPostController.php`

```php
namespace App\Http\Controllers;

use App\Models\secours\SecoursPost;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SecoursPostController extends Controller
{
    public function index()
    {
        return Inertia::render('SecoursPost/Index', [
            'posts' => SecoursPost::with(['hospitalDetail', 'policeDetail', 'gendarmerieDetail', 'militaryDetail'])->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('SecoursPost/Create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'type' => 'required|in:hospital,police,military,gendarmerie',
            'address' => 'required|string',
            'region' => 'required|string',
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
            'phone_number' => 'nullable|string',
            'email' => 'nullable|email',
            'detail' => 'required|array'
        ]);

        $post = SecoursPost::create($data);

        // Détails spécifiques
        match($data['type']) {
            'hospital' => $post->hospitalDetail()->create($data['detail']),
            'police' => $post->policeDetail()->create($data['detail']),
            'gendarmerie' => $post->gendarmerieDetail()->create($data['detail']),
            'military' => $post->militaryDetail()->create($data['detail']),
        };

        return redirect()->route('secours-posts.index')->with('success', 'Post created.');
    }

    public function edit(SecoursPost $secoursPost)
    {
        $secoursPost->load(['hospitalDetail', 'policeDetail', 'gendarmerieDetail', 'militaryDetail']);

        return Inertia::render('SecoursPost/Edit', [
            'post' => $secoursPost,
        ]);
    }

    public function update(Request $request, SecoursPost $secoursPost)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'type' => 'required|in:hospital,police,military,gendarmerie',
            'address' => 'required|string',
            'region' => 'required|string',
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
            'phone_number' => 'nullable|string',
            'email' => 'nullable|email',
            'detail' => 'required|array'
        ]);

        $secoursPost->update($data);

        // Update detail
        match($data['type']) {
            'hospital' => $secoursPost->hospitalDetail->update($data['detail']),
            'police' => $secoursPost->policeDetail->update($data['detail']),
            'gendarmerie' => $secoursPost->gendarmerieDetail->update($data['detail']),
            'military' => $secoursPost->militaryDetail->update($data['detail']),
        };

        return redirect()->route('secours-posts.index')->with('success', 'Post updated.');
    }

    public function destroy(SecoursPost $secoursPost)
    {
        $secoursPost->delete();
        return redirect()->route('secours-posts.index')->with('success', 'Post deleted.');
    }
}
```

---

## 🧾 2. Routes (`web.php`)

```php
use App\Http\Controllers\SecoursPostController;

Route::resource('secours-posts', SecoursPostController::class);
```

---

## ⚛️ 3. React Views avec Inertia

### `/resources/js/Pages/SecoursPost/Index.jsx`

```jsx
import React from 'react';
import { Inertia } from '@inertiajs/inertia';

export default function Index({ posts }) {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Liste des Secours</h1>
      <a href="/secours-posts/create" className="bg-blue-500 text-white px-4 py-2 rounded">Créer</a>
      <table className="mt-4 w-full border">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Type</th>
            <th>Adresse</th>
            <th>Région</th>
            <th>Détails</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map(post => (
            <tr key={post.id} className="border-t">
              <td>{post.name}</td>
              <td>{post.type}</td>
              <td>{post.address}</td>
              <td>{post.region}</td>
              <td>
                {post.type === 'hospital' && `${post.hospital_detail?.nb_doctors} docteurs, ${post.hospital_detail?.nb_beds} lits`}
                {post.type === 'police' && `${post.police_detail?.brigade_type}`}
                {post.type === 'gendarmerie' && `${post.gendarmerie_detail?.rural_or_urban}`}
                {post.type === 'military' && `${post.military_detail?.base_name}`}
              </td>
              <td>
                <a href={`/secours-posts/${post.id}/edit`} className="text-blue-600">Modifier</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

> On peut aussi créer les pages `Create.jsx` et `Edit.jsx` selon la même logique : un formulaire dynamique en fonction du type.

---

## 🧠 BONUS : Validation conditionnelle

Dans le contrôleur, tu peux raffiner la validation avec :

```php
use Illuminate\Validation\Rule;

'detail' => Rule::when($request->type === 'hospital', [
    'nb_doctors' => 'required|integer',
    'nb_beds' => 'required|integer',
    'has_urgency_unit' => 'required|boolean',
])
```

---

## 📦 Exemple de payload `POST` via Inertia

```json
{
  "name": "Post Police 1",
  "type": "police",
  "address": "Rue A",
  "region": "Analamanga",
  "latitude": -18.8792,
  "longitude": 47.5079,
  "phone_number": "032456789",
  "email": "police@example.com",
  "detail": {
    "brigade_type": "CRS",
    "jurisdiction": "Antananarivo"
  }
}
```

---

Souhaites-tu que je te génère automatiquement les fichiers `Create.jsx` et `Edit.jsx` pour le formulaire Inertia avec champs dynamiques selon le type ?
