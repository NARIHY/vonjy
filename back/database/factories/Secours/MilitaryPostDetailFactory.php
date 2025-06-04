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
