<?php

use App\Finance\Accounting;
use App\Finance\Planning;
use Illuminate\Database\Seeder;

class AccountingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker\Factory::create();

        //january
        factory(Accounting::class, 3)
            ->states('income')
            ->create([
                'date' => $faker->dateTimeBetween(new DateTime('01.01.2020'), new DateTime('04.01.2020')),
                'totalAmount' => 0,
                'period_id' => \App\Finance\Period::find(1)->id
            ]);

        factory(Accounting::class, 20)
            ->states('outgoing')
            ->create([
                'date' => $faker->dateTimeBetween(new DateTime('01.01.2020'), new DateTime('31.01.2020')),
                'totalAmount' => 0,
                'period_id' => \App\Finance\Period::find(1)->id
            ]);

        //february
        factory(Accounting::class, 3)
            ->states('income')
            ->create([
                'date' => $faker->dateTimeBetween(new DateTime('01.02.2020'), new DateTime('04.02.2020')),
                'totalAmount' => 0,
                'period_id' => \App\Finance\Period::find(2)->id
            ]);

        factory(Accounting::class, 15)
            ->states('outgoing')
            ->create([
                'date' => $faker->dateTimeBetween(new DateTime('01.02.2020'), new DateTime('29.02.2020')),
                'totalAmount' => 0,
                'period_id' => \App\Finance\Period::find(2)->id
            ]);

        //march
        factory(Accounting::class, 3)
            ->states('income')
            ->create([
                'date' => $faker->dateTimeBetween(new DateTime('01.03.2020'), new DateTime('04.03.2020')),
                'period_id' => \App\Finance\Period::find(3)->id
            ]);

        factory(Accounting::class, 10)
            ->states('outgoing')
            ->create([
                'date' => $faker->dateTimeBetween(new DateTime('01.03.2020'), new DateTime('15.03.2020')),
                'period_id' => \App\Finance\Period::find(3)->id
            ]);

        factory(Accounting::class, 5)
            ->states('outgoingWithoutCostCenters')
            ->create([
                'date' => $faker->dateTimeBetween(new DateTime('15.03.2020'), new DateTime('29.03.2020')),
                'period_id' => \App\Finance\Period::find(3)->id
            ]);
    }
}
