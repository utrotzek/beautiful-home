<?php

namespace App\Http\Controllers\Finance;

use App\Finance\CostCenter;
use App\Finance\Period;
use App\Finance\Planning;
use App\Http\Resources\PlanningCollection;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PlanningController extends Controller
{
    public function forPeriod($periodId)
    {
        $plannings = Planning::where('period_id', '=', (int)$periodId)->get();
        return response(new PlanningCollection($plannings));
    }

    public function forTemplate($templateId)
    {
        $plannings = Planning::where('template_id', '=', (int)$templateId)->get();
        return response(new PlanningCollection($plannings));
    }

    public function show($id)
    {
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
     * Inserts a new planning
     */
    public function store(Request $request): \Illuminate\Http\Response
    {
        /** @var Planning $planning */
        $planning = Planning::make([
            'date' => new \DateTime($request->input('date')),
            'description' => $request->input('description'),
            'totalAmount' => $request->input('totalAmount'),
        ]);

        $planning->costCenter()->associate(CostCenter::find($request->input('costCenter')['id']));

        if (!empty($request->input('period'))) {
            $planning->period()->associate(Period::find($request->input('period')['id']));
        }

        if (!empty($request->input('template'))) {
            $planning->template()->associate(Period::find($request->input('template')['id']));
        }

        $planning->save();
        $planning->refresh();
        return response(new \App\Http\Resources\Planning($planning));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Planning $planning)
    {
        $planning->delete();
    }
}
