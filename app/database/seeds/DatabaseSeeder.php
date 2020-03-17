<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            ShoppingListGroupSeeder::class,
            ShoppingListArticlesSeeder::class,
            ShoppingListUnitsSeeder::class,
            PeriodsSeeder::class,
            TemplateSeeder::class,
            CostCenterSeeder::class,
            PlanningSeeder::class,
            AccountingSeeder::class
        ]);
    }
}
