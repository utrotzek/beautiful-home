<?php

namespace App\Finance;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Finance\CostCenter
 *
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Finance\CostCenter newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Finance\CostCenter newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Finance\CostCenter query()
 * @mixin \Eloquent
 * @property int $id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string $title
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Finance\CostCenter whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Finance\CostCenter whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Finance\CostCenter whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Finance\CostCenter whereUpdatedAt($value)
 */
class CostCenter extends Model
{
    protected $fillable = [
        'title'
    ];
}
