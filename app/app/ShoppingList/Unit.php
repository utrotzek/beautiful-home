<?php

namespace App\ShoppingList;

use Illuminate\Database\Eloquent\Model;

/**
 * App\ShoppingList\Unit
 *
 * @property int $id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string $title
 * @property string $abbreviation
 * @method static \Illuminate\Database\Eloquent\Builder|\App\ShoppingList\Unit newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\ShoppingList\Unit newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\ShoppingList\Unit query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\ShoppingList\Unit whereAbbreviation($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\ShoppingList\Unit whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\ShoppingList\Unit whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\ShoppingList\Unit whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\ShoppingList\Unit whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Unit extends Model
{
    //
}
