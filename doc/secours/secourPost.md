### 🧠 Objectif :

Créer un **diagramme de classes** (UML) représentant les entités principales des **postes de secours**, leurs relations et attributs, que tu pourras ensuite coder dans Laravel (Eloquent Models, Migrations, etc.).

---

## 🔧 Types de Postes de Secours

Voici les entités que nous allons représenter :

* **SecoursPost** (classe principale, abstraite)

  * PolicePost
  * GendarmeriePost
  * MilitaryPost
  * HospitalPost
  * FireStationPost (optionnel)

---

## 🔄 Relations prévues :

* Tous héritent de `SecoursPost` (via un champ `type` ou Laravel Single Table Inheritance si tu préfères).
* Chaque poste a :

  * des coordonnées géographiques
  * des contacts
  * une zone géographique couverte
  * des effectifs ou ressources spécifiques

---

## ✅ Diagramme de classes UML (simplifié)

```plaintext
                         +------------------+
                         |   SecoursPost    |  <<abstract>>
                         +------------------+
                         | - id             |
                         | - name           |
                         | - type           | ("police", "gendarmerie", ...)
                         | - address        |
                         | - region         |
                         | - latitude       |
                         | - longitude      |
                         | - phone_number   |
                         | - email          |
                         | - created_at     |
                         | - updated_at     |
                         +------------------+
                                  ▲
     ┌────────────────────────────┼────────────────────────────┐
     │                            │                            │
+----------------+     +--------------------+        +--------------------+
|   PolicePost   |     | GendarmeriePost    |        |   HospitalPost     |
+----------------+     +--------------------+        +--------------------+
| - brigade_type |     | - rural_or_urban   |        | - nb_doctors       |
| - jurisdiction |     | - jurisdiction     |        | - nb_beds          |
+----------------+     +--------------------+        | - has_urgency_unit |
                                                     +--------------------+

                           +-------------------+
                           |  MilitaryPost     |
                           +-------------------+
                           | - base_name       |
                           | - commander_name  |
                           | - nb_soldiers     |
                           +-------------------+
```

---

## 📁 Exemple Laravel : `SecoursPost` model (base)

```php
class SecoursPost extends Model
{
    protected $fillable = [
        'name', 'type', 'address', 'region',
        'latitude', 'longitude', 'phone_number', 'email'
    ];

    public function isHospital() {
        return $this->type === 'hospital';
    }
}
```

### 🏥 `HospitalPost` model (spécifique)

```php
class HospitalPost extends SecoursPost
{
    protected $fillable = [
        'nb_doctors', 'nb_beds', 'has_urgency_unit'
    ];
}
```

---

## 🧱 Structure des tables (Laravel Migrations)

### Table `secours_posts`

```php
Schema::create('secours_posts', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->string('type'); // police, gendarmerie, military, hospital
    $table->string('address');
    $table->string('region');
    $table->decimal('latitude', 10, 7);
    $table->decimal('longitude', 10, 7);
    $table->string('phone_number')->nullable();
    $table->string('email')->nullable();
    $table->timestamps();
});
```

### Table `hospital_post_details`

```php
Schema::create('hospital_post_details', function (Blueprint $table) {
    $table->id();
    $table->foreignId('secours_post_id')->constrained()->onDelete('cascade');
    $table->integer('nb_doctors')->default(0);
    $table->integer('nb_beds')->default(0);
    $table->boolean('has_urgency_unit')->default(false);
});
```

(les autres types peuvent suivre un schéma similaire)

---

## 📌 Vue/Interface Laravel

Tu peux utiliser Livewire, Inertia.js, ou Blade + jQuery pour afficher :

* Une **liste par type**
* Une **carte interactive** (Leaflet ou Google Maps)
* Des **filtres par région, type, etc.**
* Des **détails par poste de secours**

