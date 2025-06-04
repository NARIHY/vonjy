<?php

namespace Database\Factories\Secours;

use App\Models\Secours\SecoursPost;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Secours\MilitaryPostDetail>
 */
class GendarmeriePostDetailFactory extends Factory
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
            'rural_or_urban' => $this->faker->randomElement(['rural', 'urban']),
            'jurisdiction' => $this->faker->city,
        ];
    }
}
