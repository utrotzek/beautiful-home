<?php

use Illuminate\Database\Seeder;

class ShoppingListGroupSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('groups')->insert([
            'id' => 1,
            'title' => 'Backwaren' 
        ]);

        DB::table('groups')->insert([
            'id' => 2,
            'title' => 'Brotaufstrich'
        ]);

        DB::table('groups')->insert([
            'id' => 3,
            'title' => 'Drogerieartikel'
        ]);

        DB::table('groups')->insert([
            'id' => 4,
            'title' => 'Fertigprodukte'
        ]);

        DB::table('groups')->insert([
            'id' => 5,
            'title' => 'Fleisch & Wurstwaren'
        ]);

        DB::table('groups')->insert([
            'id' => 6,
            'title' => 'Nudeln & Reis'
        ]);
    }
}
