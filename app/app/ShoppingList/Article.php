<?php

namespace App\ShoppingList;

use Illuminate\Database\Eloquent\Model;

/**
 * App\ShoppingList\ArticleController
 *
 * @method static \Illuminate\Database\Eloquent\Builder|\App\ShoppingList\Article newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\ShoppingList\Article newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\ShoppingList\Article query()
 * @mixin \Eloquent
 * @property int $id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string $title
 * @property int $group_id
 * @method static \Illuminate\Database\Eloquent\Builder|\App\ShoppingList\Article whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\ShoppingList\Article whereGroupId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\ShoppingList\Article whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\ShoppingList\Article whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\ShoppingList\Article whereUpdatedAt($value)
 */
class Article extends Model
{
    //
    
    public function group()
    {
        return $this->belongsTo(Group::class);
    }
}
