<?php

namespace App\Finance;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Finance\Planning
 *
 * @property-read \App\Finance\CostCenter $costCenter
 * @property-read \App\Finance\Period $period
 * @property-read \App\Finance\Template $template
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Finance\Planning newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Finance\Planning newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Finance\Planning query()
 * @mixin \Eloquent
 * @property int $id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string $description
 * @property float $totalAmount
 * @property string $date
 * @property int $cost_center_id
 * @property int|null $period_id
 * @property int|null $template_id
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Finance\Planning whereCostCenterId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Finance\Planning whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Finance\Planning whereDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Finance\Planning whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Finance\Planning whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Finance\Planning wherePeriodId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Finance\Planning whereTemplateId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Finance\Planning whereTotalAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Finance\Planning whereUpdatedAt($value)
 */
class Planning extends Model
{
    protected $attributes = [
        'description' => '',
        'totalAmount' => 0.0
    ];

    public function period(): BelongsTo
    {
        return $this->belongsTo('App\Finance\Period');
    }

    public function template(): BelongsTo
    {
        return $this->belongsTo('App\Finance\Template');
    }

    public function costCenter(): BelongsTo
    {
        return $this->belongsTo('App\Finance\CostCenter');
    }
}
