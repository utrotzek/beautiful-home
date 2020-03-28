<?php

namespace App\Http\Controllers\Finance;

use App\Finance\Accounting;
use App\Http\Resources\Finance\AccountingResource;
use App\Http\Resources\Finance\AccountingResourceCollection;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AccountingController extends Controller
{
    public function forPeriod($periodId)
    {
        $accountings = Accounting::where('period_id', '=', (int)$periodId)->get();
        return response(new AccountingResourceCollection($accountings));
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response(new AccountingResourceCollection(Accounting::all()));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Accounting::find($id)->delete();
    }
}
