## ✅ Objectif

Créer les **Models**, **Migrations**, et **Factories** pour :

* `SecoursPost` (classe de base)
* `HospitalPostDetail`
* `PolicePostDetail`
* `GendarmeriePostDetail`
* `MilitaryPostDetail`

---

## 📁 Fichier Laravel : `SecoursPost.php` (Model principal)

```php
// app/Models/SecoursPost.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class SecoursPost extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'type', 'address', 'region',
        'latitude', 'longitude', 'phone_number', 'email',
    ];

    public function hospitalDetail()
    {
        return $this->hasOne(HospitalPostDetail::class);
    }

    public function policeDetail()
    {
        return $this->hasOne(PolicePostDetail::class);
    }

    public function gendarmerieDetail()
    {
        return $this->hasOne(GendarmeriePostDetail::class);
    }

    public function militaryDetail()
    {
        return $this->hasOne(MilitaryPostDetail::class);
    }
}
```

---

## 🧱 Migration : `create_secours_posts_table.php`

```php
// database/migrations/xxxx_xx_xx_create_secours_posts_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSecoursPostsTable extends Migration
{
    public function up()
    {
        Schema::create('secours_posts', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->enum('type', ['police', 'gendarmerie', 'military', 'hospital']);
            $table->string('address');
            $table->string('region');
            $table->decimal('latitude', 10, 7);
            $table->decimal('longitude', 10, 7);
            $table->string('phone_number')->nullable();
            $table->string('email')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('secours_posts');
    }
}
```

---

## 📦 Détails liés (models + migrations)

### `HospitalPostDetail.php`

```php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HospitalPostDetail extends Model
{
    protected $fillable = ['secours_post_id', 'nb_doctors', 'nb_beds', 'has_urgency_unit'];

    public function secoursPost()
    {
        return $this->belongsTo(SecoursPost::class);
    }
}
```

### Migration `create_hospital_post_details_table.php`

```php
Schema::create('hospital_post_details', function (Blueprint $table) {
    $table->id();
    $table->foreignId('secours_post_id')->constrained()->onDelete('cascade');
    $table->integer('nb_doctors');
    $table->integer('nb_beds');
    $table->boolean('has_urgency_unit')->default(false);
});
```

---

### `PolicePostDetail.php`

```php
class PolicePostDetail extends Model
{
    protected $fillable = ['secours_post_id', 'brigade_type', 'jurisdiction'];

    public function secoursPost()
    {
        return $this->belongsTo(SecoursPost::class);
    }
}
```

### Migration

```php
Schema::create('police_post_details', function (Blueprint $table) {
    $table->id();
    $table->foreignId('secours_post_id')->constrained()->onDelete('cascade');
    $table->string('brigade_type');
    $table->string('jurisdiction');
});
```

---

### `GendarmeriePostDetail.php`

```php
class GendarmeriePostDetail extends Model
{
    protected $fillable = ['secours_post_id', 'rural_or_urban', 'jurisdiction'];

    public function secoursPost()
    {
        return $this->belongsTo(SecoursPost::class);
    }
}
```

### Migration

```php
Schema::create('gendarmerie_post_details', function (Blueprint $table) {
    $table->id();
    $table->foreignId('secours_post_id')->constrained()->onDelete('cascade');
    $table->enum('rural_or_urban', ['rural', 'urban']);
    $table->string('jurisdiction');
});
```

---

### `MilitaryPostDetail.php`

```php
class MilitaryPostDetail extends Model
{
    protected $fillable = ['secours_post_id', 'base_name', 'commander_name', 'nb_soldiers'];

    public function secoursPost()
    {
        return $this->belongsTo(SecoursPost::class);
    }
}
```

### Migration

```php
Schema::create('military_post_details', function (Blueprint $table) {
    $table->id();
    $table->foreignId('secours_post_id')->constrained()->onDelete('cascade');
    $table->string('base_name');
    $table->string('commander_name');
    $table->integer('nb_soldiers');
});
```

---

## 🧪 Factory : `SecoursPostFactory.php`

```php
// database/factories/SecoursPostFactory.php

namespace Database\Factories;

use App\Models\SecoursPost;
use Illuminate\Database\Eloquent\Factories\Factory;

class SecoursPostFactory extends Factory
{
    protected $model = SecoursPost::class;

    public function definition()
    {
        return [
            'name' => $this->faker->company,
            'type' => $this->faker->randomElement(['hospital', 'police', 'gendarmerie', 'military']),
            'address' => $this->faker->streetAddress,
            'region' => $this->faker->city,
            'latitude' => $this->faker->latitude,
            'longitude' => $this->faker->longitude,
            'phone_number' => $this->faker->phoneNumber,
            'email' => $this->faker->email,
        ];
    }
}
```

