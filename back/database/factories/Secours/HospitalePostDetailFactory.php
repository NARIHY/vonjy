<?php

namespace Database\Factories\Secours;

use App\Models\Secours\SecoursPost;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Secours\MilitaryPostDetail>
 */
class HospitalePostDetailFactory extends Factory
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
            'nb_doctors' => $this->faker->numberBetween(5, 50),
            'nb_beds' => $this->faker->numberBetween(10, 200),
            'has_urgency_unit' => $this->faker->boolean,
        ];
    }
}
