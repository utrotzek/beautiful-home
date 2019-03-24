<?php

namespace App\ShoppingList;

use Illuminate\Database\Eloquent\Model;

/**
 * App\ShoppingList\Group
 *
 * @method static \Illuminate\Database\Eloquent\Builder|\App\ShoppingList\Group newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\ShoppingList\Group newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\ShoppingList\Group query()
 * @mixin \Eloquent
 * @property int $id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string $title
 * @method static \Illuminate\Database\Eloquent\Builder|\App\ShoppingList\Group whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\ShoppingList\Group whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\ShoppingList\Group whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\ShoppingList\Group whereUpdatedAt($value)
 */
class Group extends Model
{
    //
}
