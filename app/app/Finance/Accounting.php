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
 * @property int $id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string $title
 * @property float $totalAmount
 * @property float $remainingAmount
 * @property string $date
 * @property int $period_id
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Finance\CostCenterAccounting[] $costCenterAccounting
 * @property-read \App\Finance\Period $period
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Finance\Accounting whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Finance\Accounting whereDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Finance\Accounting whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Finance\Accounting wherePeriodId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Finance\Accounting whereRemainingAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Finance\Accounting whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Finance\Accounting whereTotalAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Finance\Accounting whereUpdatedAt($value)
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
