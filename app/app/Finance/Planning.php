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
