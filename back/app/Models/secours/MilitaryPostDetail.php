<?php

namespace App\Models\secours;

use Illuminate\Database\Eloquent\Model;

class MilitaryPostDetail extends Model
{
    protected $fillable = ['secours_post_id', 'base_name', 'commander_name', 'nb_soldiers'];

    public function secoursPost()
    {
        return $this->belongsTo(SecoursPost::class);
    }
}
