<?php

namespace App\Finance;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Finance\Template
 *
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Finance\Planning[] $plannings
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Finance\Template newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Finance\Template newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Finance\Template query()
 * @mixin \Eloquent
 */
class Template extends Model
{
    public function plannings()
    {
        return $this->hasMany('App\Finance\Planning');
    }
}
