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
 * @property int $id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property float $totalAmount
 * @property string $description
 * @property int $accounting_id
 * @property int $cost_center_id
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Finance\CostCenterAccounting whereAccountingId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Finance\CostCenterAccounting whereCostCenterId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Finance\CostCenterAccounting whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Finance\CostCenterAccounting whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Finance\CostCenterAccounting whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Finance\CostCenterAccounting whereTotalAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Finance\CostCenterAccounting whereUpdatedAt($value)
 */
class CostCenterAccounting extends Model
{
    public function accounting()
    {
        return $this->belongsTo('App\Finance\Accounting');
    }

    public function costCenter()
    {
        return $this->belongsTo('App\Finance\CostCenter');
    }
}
