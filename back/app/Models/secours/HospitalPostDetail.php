<?php

namespace App\Models\secours;

use Illuminate\Database\Eloquent\Model;

class HospitalPostDetail extends Model
{
    protected $fillable = ['secours_post_id', 'nb_doctors', 'nb_beds', 'has_urgency_unit'];

    public function secoursPost()
    {
        return $this->belongsTo(SecoursPost::class);
    }
}
