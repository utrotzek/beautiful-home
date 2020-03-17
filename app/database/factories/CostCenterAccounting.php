<?php

use Faker\Generator as Faker;

$factory->define(\App\Finance\CostCenterAccounting::class, function (Faker $faker) {
    return [
        'description' => $faker->text(80)
    ];
});
