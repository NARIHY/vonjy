<?php

namespace App\Models\secours;

use Illuminate\Database\Eloquent\Model;

class GendarmeriePostDetail extends Model
{
    protected $fillable = ['secours_post_id', 'rural_or_urban', 'jurisdiction'];

    public function secoursPost()
    {
        return $this->belongsTo(SecoursPost::class);
    }
}
