<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePlanningsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('plannings', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();
            $table->string('description')->nullable();
            $table->float('totalAmount');
            $table->date('date');

            //foreign keys
            $table->unsignedInteger('cost_center_id')->nullable();
            $table->unsignedInteger('period_id')->nullable();
            $table->unsignedInteger('template_id')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('plannings');
    }
}
