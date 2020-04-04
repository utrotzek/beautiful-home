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
 * @property int $id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int $month
 * @property int $year
 * @property int $completed
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Finance\Period whereCompleted($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Finance\Period whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Finance\Period whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Finance\Period whereMonth($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Finance\Period whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Finance\Period whereYear($value)
 */
class Period extends Model
{
    protected $fillable = [
        'month',
        'year',
        'completed'
    ];

    protected $attributes = [
        'completed' => false
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
