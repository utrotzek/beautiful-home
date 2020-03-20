<?php

namespace App\Http\Controllers\Finance;

use App\Finance\Period;
use App\Http\Resources\Period as PeriodResource;
use App\Http\Resources\PeriodCollection;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PeriodController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     */
    public function index(Request $request)
    {
        if ($request->has('year')){
            $year = (int)$request->input('year');
            $periods = Period::where('year', $year)->get();
        }else{
            $periods = Period::all();
        }

        if (count($periods) > 0){
            return response(new PeriodCollection($periods));
        }else{
            return response([], 404);
        }
    }

    public function show($id){
        return response(new PeriodResource(Period::find($id)));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $period = new Period([
            'month' => $request->month,
            'year' => $request->year,
            'completed' => $request->completed
        ]);
        $period->save();
        return response(new PeriodResource($period));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Finance\Period  $period
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Period $period)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Finance\Period  $period
     * @return \Illuminate\Http\Response
     */
    public function destroy(Period $period)
    {
        //
    }
}
