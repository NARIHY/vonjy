<?php

namespace Database\Factories\Secours;

use App\Models\Secours\SecoursPost;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Secours\MilitaryPostDetail>
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
