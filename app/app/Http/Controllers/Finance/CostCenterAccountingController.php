<?php

namespace App\Http\Controllers\Finance;

use App\Finance\Accounting;
use App\Finance\CostCenter;
use App\Finance\CostCenterAccounting;
use App\Http\Resources\Finance\CostCenterAccounting as CostCenterAccountingResource;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CostCenterAccountingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
        /** @var CostCenterAccounting $costCenterAccounting */
        $costCenterAccounting = CostCenterAccounting::make();
        $costCenterAccounting->accounting()->associate(Accounting::find($request->input('accountingId')));
        $costCenterAccounting->costCenter()->associate(CostCenter::find($request->input('costCenterId')));
        $costCenterAccounting->description = $request->input('description');
        $costCenterAccounting->totalAmount = $request->input('totalAmount');
        $costCenterAccounting->save();

        return response(new CostCenterAccountingResource($costCenterAccounting->refresh()));
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
        //
    }
}
