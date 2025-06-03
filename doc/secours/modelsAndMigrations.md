## Gendarmerie 
```php

namespace App\Models\secours;

use Illuminate\Database\Eloquent\Model;

class GendarmeriePostDetail extends Model
{
    protected $fillable = ['secours_post_id', 'rural_or_urban', 'jurisdiction'];

    public function secoursPost()
    {
        return $this->belongsTo(SecoursPost::class);
    }
}
```

```php

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('gendarmerie_post_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('secours_post_id')->constrained()->onDelete('cascade');
            $table->enum('rural_or_urban', ['rural', 'urban']);
            $table->string('jurisdiction');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('gendarmerie_post_details');
    }
};

```


## Police 
```php

<?php

namespace Database\Factories\secorus;

use App\Models\secours\SecoursPost;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\secours\MilitaryPostDetail>
 */
class PolicePostDetailFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'secours_post_id' => SecoursPost::factory(),
            'brigade_type' => $this->faker->randomElement(['CRS', 'BAC', 'PJ']),
            'jurisdiction' => $this->faker->city,
        ];
    }
}

```

```php

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('police_post_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('secours_post_id')->constrained()->onDelete('cascade');
            $table->string('brigade_type');
            $table->string('jurisdiction');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('police_post_details');
    }
};

```

## Hospital
```php
<?php

namespace App\Models\secours;

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

```php

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('hospital_post_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('secours_post_id')->constrained()->onDelete('cascade');
            $table->integer('nb_doctors');
            $table->integer('nb_beds');
            $table->boolean('has_urgency_unit')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hospital_post_details');
    }
};

```


## Military
```php
<?php

namespace Database\Factories\secorus;

use App\Models\secours\SecoursPost;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\secours\MilitaryPostDetail>
 */
class MilitaryPostDetailFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
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

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('military_post_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('secours_post_id')->constrained()->onDelete('cascade');
            $table->string('base_name');
            $table->string('commander_name');
            $table->integer('nb_soldiers');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('military_post_details');
    }
};


```
## secoursPost
```php
<?php

namespace App\Models\secours;

use Illuminate\Database\Eloquent\Model;

class SecoursPost extends Model
{
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

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
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

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('secours_posts');
    }
};


```

