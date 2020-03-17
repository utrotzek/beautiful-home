<?php

use Faker\Generator as Faker;

$factory->define(\App\Finance\Planning::class, function (Faker $faker) {
    return [
        'description' => $faker->text(50),
        'date' => $faker->date
    ];
});

$factory->state(\App\Finance\Planning::class, 'income', function (Faker $faker) {
    return [
        'totalAmount' => $faker->randomFloat(2, 100, 2900),
        'cost_center_id' => function () {
            return \App\Finance\CostCenter::find(1)->id;
        }
    ];
});

$factory->state(\App\Finance\Planning::class, 'outgoing', function (Faker $faker) {
    return [
        'totalAmount' => $faker->randomFloat(2, -200, -1.99),
        'cost_center_id' => function () use($faker) {
            return \App\Finance\CostCenter::find($faker->randomElement([2,3,4]))->id;
        }
    ];
});
