### ✅ `HospitalPostDetailFactory.php`

```php
// database/factories/HospitalPostDetailFactory.php

namespace Database\Factories;

use App\Models\HospitalPostDetail;
use App\Models\SecoursPost;
use Illuminate\Database\Eloquent\Factories\Factory;

class HospitalPostDetailFactory extends Factory
{
    protected $model = HospitalPostDetail::class;

    public function definition()
    {
        return [
            'secours_post_id' => SecoursPost::factory(),
            'nb_doctors' => $this->faker->numberBetween(5, 50),
            'nb_beds' => $this->faker->numberBetween(10, 200),
            'has_urgency_unit' => $this->faker->boolean,
        ];
    }
}
```

---

### ✅ `PolicePostDetailFactory.php`

```php
// database/factories/PolicePostDetailFactory.php

namespace Database\Factories;

use App\Models\PolicePostDetail;
use App\Models\SecoursPost;
use Illuminate\Database\Eloquent\Factories\Factory;

class PolicePostDetailFactory extends Factory
{
    protected $model = PolicePostDetail::class;

    public function definition()
    {
        return [
            'secours_post_id' => SecoursPost::factory(),
            'brigade_type' => $this->faker->randomElement(['CRS', 'BAC', 'PJ']),
            'jurisdiction' => $this->faker->city,
        ];
    }
}
```

---

### ✅ `GendarmeriePostDetailFactory.php`

```php
// database/factories/GendarmeriePostDetailFactory.php

namespace Database\Factories;

use App\Models\GendarmeriePostDetail;
use App\Models\SecoursPost;
use Illuminate\Database\Eloquent\Factories\Factory;

class GendarmeriePostDetailFactory extends Factory
{
    protected $model = GendarmeriePostDetail::class;

    public function definition()
    {
        return [
            'secours_post_id' => SecoursPost::factory(),
            'rural_or_urban' => $this->faker->randomElement(['rural', 'urban']),
            'jurisdiction' => $this->faker->city,
        ];
    }
}
```

---

### ✅ `MilitaryPostDetailFactory.php`

```php
// database/factories/MilitaryPostDetailFactory.php

namespace Database\Factories;

use App\Models\MilitaryPostDetail;
use App\Models\SecoursPost;
use Illuminate\Database\Eloquent\Factories\Factory;

class MilitaryPostDetailFactory extends Factory
{
    protected $model = MilitaryPostDetail::class;

    public function definition()
    {
        return [
            'secours_post_id' => SecoursPost::factory(),
            'base_name' => $this->faker->word . ' Base',
            'commander_name' => $this->faker->name,
            'nb_soldiers' => $this->faker->numberBetween(100, 1000),
        ];
    }
}
```

---

### ✅ Astuce pour les Seeder

Tu peux créer un `DatabaseSeeder` ou un `SecoursSeeder` pour générer un mix automatique :

```php
// database/seeders/SecoursSeeder.php

use App\Models\SecoursPost;
use App\Models\HospitalPostDetail;
use App\Models\PolicePostDetail;
use App\Models\GendarmeriePostDetail;
use App\Models\MilitaryPostDetail;

public function run()
{
    SecoursPost::factory()
        ->count(20)
        ->create()
        ->each(function ($post) {
            match ($post->type) {
                'hospital' => HospitalPostDetail::factory()->create(['secours_post_id' => $post->id]),
                'police' => PolicePostDetail::factory()->create(['secours_post_id' => $post->id]),
                'gendarmerie' => GendarmeriePostDetail::factory()->create(['secours_post_id' => $post->id]),
                'military' => MilitaryPostDetail::factory()->create(['secours_post_id' => $post->id]),
            };
        });
}