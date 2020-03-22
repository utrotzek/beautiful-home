<?php

namespace App\Http\Controllers\Finance;

use App\Finance\CostCenter;
use App\Finance\Planning;
use App\Http\Resources\PlanningCollection;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Input;

class PlanningController extends Controller
{

    public function forPeriod($periodId){

        $plannings = Planning::where('period_id', '=', (int)$periodId)->get();
        return response(new PlanningCollection($plannings));
    }

    public function show($id) {
        return response()->json(new \App\Http\Resources\Planning(Planning::find($id)));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Planning $planning)
    {
        $planning->description = $request->input('description');
        $planning->totalAmount = (float)$request->input('totalAmount');
        $planning->date = new \DateTime($request->input('date'));

        $planning->costCenter()->associate(CostCenter::find((int)$request->input('costCenter')['id']));
        $planning->save();

        $updatedPlanning = $planning->fresh();
        return response()->json(new \App\Http\Resources\Planning($updatedPlanning));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Planning $planning)
    {
        $planning->delete();
    }
}
