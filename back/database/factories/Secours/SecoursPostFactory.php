<?php

namespace Database\Factories\Secours;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Secours\SecoursPost>
 */
class SecoursPostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
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
