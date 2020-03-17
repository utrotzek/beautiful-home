<?php

use App\Finance\CostCenter;
use Illuminate\Database\Seeder;

class CostCenterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $costCenter = new CostCenter();
        $costCenter->title = 'Gehalt';
        $costCenter->save();

        $costCenter = new CostCenter();
        $costCenter->title = 'Einkaufen';
        $costCenter->save();

        $costCenter = new CostCenter();
        $costCenter->title = 'Sparbuch';
        $costCenter->save();

        $costCenter = new CostCenter();
        $costCenter->title = 'Elektronik';
        $costCenter->save();
    }
}
