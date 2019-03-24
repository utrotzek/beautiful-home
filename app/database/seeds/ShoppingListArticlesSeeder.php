<?php

use Illuminate\Database\Seeder;

class ShoppingListArticlesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('articles')->insert([
            'title' => 'Weizentortillas',
            'group_id' => 1
        ]);

        DB::table('articles')->insert([
            'title' => 'Knäckebrot',
            'group_id' => 1
        ]);

        DB::table('articles')->insert([
            'title' => 'Haarshampoo',
            'group_id' => 3
        ]);

        DB::table('articles')->insert([
            'title' => 'Dusch Das',
            'group_id' => 3
        ]);

        DB::table('articles')->insert([
            'title' => 'Rasierschaum',
            'group_id' => 3
        ]);

        DB::table('articles')->insert([
            'title' => 'Salami',
            'group_id' => 5
        ]);

        DB::table('articles')->insert([
            'title' => 'Roher Schninken',
            'group_id' => 5
        ]);
        
        DB::table('articles')->insert([
            'title' => 'Vollkornspaghetti',
            'group_id' => 6
        ]);
    }
}
