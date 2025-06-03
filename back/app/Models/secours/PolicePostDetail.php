<?php

namespace App\Models\secours;

use Illuminate\Database\Eloquent\Model;

class PolicePostDetail extends Model
{
    protected $fillable = ['secours_post_id', 'brigade_type', 'jurisdiction'];

    public function secoursPost()
    {
        return $this->belongsTo(SecoursPost::class);
    }
}
