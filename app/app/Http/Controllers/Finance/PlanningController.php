<?php

namespace App\Http\Controllers\Finance;

use App\Finance\Planning;
use App\Http\Resources\PlanningCollection;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PlanningController extends Controller
{
    public function forPeriod($periodId){

        $plannings = Planning::where('period_id', '=', (int)$periodId)->get();
        return response(new PlanningCollection($plannings));
    }
}
