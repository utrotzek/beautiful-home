<?php

use Faker\Generator as Faker;

$factory->define(\App\Finance\Accounting::class, function (Faker $faker) {
    return [
        'title' => $faker->text(60),
        'date' => $faker->date
    ];
});

$factory->state(\App\Finance\Accounting::class, 'income', function (Faker $faker) {
    $totalAmount = $faker->randomFloat(2, 100, 2900);
    return [
        'totalAmount' => $totalAmount,
        'remainingAmount' => $totalAmount,
    ];
});

$factory->afterCreatingState(\App\Finance\Accounting::class, 'income', function (\App\Finance\Accounting $accounting, Faker $faker) {
    $accounting->costCenterAccounting()->saveMany(
        factory(\App\Finance\CostCenterAccounting::class, 1)->make([
            'totalAmount' => $accounting->totalAmount,
            'cost_center_id' => \App\Finance\CostCenter::find(1)
        ])
    );

    $accounting->remainingAmount = 0;
    $accounting->save();
});

$factory->state(\App\Finance\Accounting::class, 'outgoing', function (Faker $faker) {
    $totalAmount = $faker->randomFloat(2, -200, -1.99);
    return [
        'totalAmount' => $totalAmount,
        'remainingAmount' => $totalAmount,
    ];
});

$factory->afterCreatingState(\App\Finance\Accounting::class, 'outgoing', function (\App\Finance\Accounting $accounting, Faker $faker) {
    $accounting->costCenterAccounting()->saveMany(
        factory(\App\Finance\CostCenterAccounting::class, 1)->make([
            'totalAmount' => $accounting->totalAmount,
            'cost_center_id' => \App\Finance\CostCenter::find($faker->randomElement([2,3,4]))
        ])
    );

    $accounting->remainingAmount = 0;
    $accounting->save();
});

$factory->state(\App\Finance\Accounting::class, 'outgoingWithoutCostCenters', function (Faker $faker) {
    $totalAmount = $faker->randomFloat(2, -200, -1.99);
    return [
        'totalAmount' => $totalAmount,
        'remainingAmount' => $totalAmount,
    ];
});
