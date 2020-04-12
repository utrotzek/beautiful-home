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
 * @property int $id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string $title
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Finance\Template whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Finance\Template whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Finance\Template whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Finance\Template whereUpdatedAt($value)
 */
class Template extends Model
{
    protected $fillable = ['title'];

    public function plannings()
    {
        return $this->hasMany('App\Finance\Planning');
    }
}
