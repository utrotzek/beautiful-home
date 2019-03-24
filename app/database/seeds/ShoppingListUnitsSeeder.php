<?php

use Illuminate\Database\Seeder;

class ShoppingListUnitsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('units')->insert([
            'id' => 1,
            'title' => 'Gramm',
            'abbreviation' => 'g' 
        ]);
        
        DB::table('units')->insert([
            'id' => 2,
            'title' => 'Kilogramm',
            'abbreviation' => 'kg' 
        ]);
        
        DB::table('units')->insert([
            'id' => 3,
            'title' => 'Esslöffel',
            'abbreviation' => 'EL' 
        ]);
        
        DB::table('units')->insert([
            'id' => 4,
            'title' => 'Milliliter',
            'abbreviation' => 'ml' 
        ]);

        DB::table('units')->insert([
            'id' => 5,
            'title' => 'Liter',
            'abbreviation' => 'l'
        ]);
    }
}
