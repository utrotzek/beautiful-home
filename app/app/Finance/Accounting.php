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
    protected $fillable =  [
        'title',
        'totalAmount',
        'remainingAmount',
        'date'
    ];

    public function updateAmount($newTotalAmount)
    {
        $remainingAmount = $newTotalAmount;
        $this->totalAmount = $newTotalAmount;

        //recalculate the remaining amount depending on the connected costCenterAccountings
        foreach ($this->costCenterAccounting as $costCenterAccounting) {
            $remainingAmount = $remainingAmount - $costCenterAccounting->totalAmount;
        }
        $this->remainingAmount = $remainingAmount;
    }

    public function costCenterAccounting()
    {
        return $this->hasMany('App\Finance\CostCenterAccounting');
    }

    public function period()
    {
        return $this->belongsTo('App\Finance\Period');
    }

    public function isDuplicate(): bool
    {
        $count = Accounting::where('title', '=', $this->title)
            ->where('date', '=', $this->date)
            ->where('totalAmount', '=', $this->totalAmount)
            ->where('period_id', '=', $this->period_id)
            ->get()
            ->count();
        return $count > 0;
    }
}
