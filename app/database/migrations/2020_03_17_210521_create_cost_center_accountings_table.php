<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCostCenterAccountingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cost_center_accountings', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();
            $table->float('totalAmount');
            $table->string('description');

            //foreign keys
            $table->unsignedInteger('accounting_id');
            $table->unsignedInteger('cost_center_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cost_center_accountings');
    }
}
