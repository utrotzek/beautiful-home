<?php

namespace App\Finance;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Finance\Accounting
 *
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Finance\Accounting newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Finance\Accounting newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Finance\Accounting query()
 * @mixin \Eloquent
 */
class Accounting extends Model
{
    public function costCenterAccounting()
    {
        return $this->hasMany('App\Finance\CostCenterAccounting');
    }

    public function period()
    {
        return $this->belongsTo('App\Finance\Period');
    }
}
