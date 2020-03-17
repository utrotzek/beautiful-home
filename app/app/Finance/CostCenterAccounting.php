<?php

namespace App\Finance;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Finance\CostCenterAccounting
 *
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Finance\CostCenterAccounting newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Finance\CostCenterAccounting newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Finance\CostCenterAccounting query()
 * @mixin \Eloquent
 */
class CostCenterAccounting extends Model
{
    public function accounting()
    {
        $this->belongsTo('App\Finance\Accounting');
    }

    public function costCenter()
    {
        $this->belongsTo('App\Finance\CostCenter');
    }
}
