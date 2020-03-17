<?php

use App\Finance\Period;
use Illuminate\Database\Seeder;

class PeriodsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Period::create([
            'id' => 1,
            'month' => 1,
            'year' => 2020,
            'completed' => true
        ])->save();

        Period::create([
            'id' => 2,
            'month' => 2,
            'year' => 2020,
            'completed' => true
        ])->save();

        Period::create([
            'id' => 3,
            'month' => 3,
            'year' => 2020,
            'completed' => false
        ])->save();
    }
}
