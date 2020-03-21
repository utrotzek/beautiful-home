<?php

namespace App\Finance;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Finance\Period
 *
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Finance\Accounting[] $accountings
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Finance\Planning[] $plannings
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Finance\Period newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Finance\Period newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Finance\Period query()
 * @mixin \Eloquent
 */
class Period extends Model
{
    protected $fillable = [
        'month',
        'year',
        'completed'
    ];

    public function plannings()
    {
        return $this->hasMany('App\Finance\Planning');
    }

    public function accountings()
    {
        return  $this->hasMany('App\Finance\Accounting');
    }
}
