<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class ProductFactory extends Factory
{
    protected $model = Product::class;

    public function definition(): array
    {

        $name = $this->faker->unique()->word;

        return [
            'name' => $name,
            'slug' => Str::slug($name),
            'category_id' => Category::all()->random()->id,
            'description' => $this->faker->realText(200),
            'stock' => $this->faker->randomDigit(),
            'sku' => $this->faker->uuid,
            'price' => $this->faker->numberBetween(0, 200),
        ];
    }
}
