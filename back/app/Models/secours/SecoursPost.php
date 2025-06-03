<?php

namespace App\Models\secours;

use Illuminate\Database\Eloquent\Model;

class SecoursPost extends Model
{
    protected $fillable = [
        'name', 'type', 'address', 'region',
        'latitude', 'longitude', 'phone_number', 'email',
    ];

    public function hospitalDetail()
    {
        return $this->hasOne(HospitalPostDetail::class);
    }

    public function policeDetail()
    {
        return $this->hasOne(PolicePostDetail::class);
    }

    public function gendarmerieDetail()
    {
        return $this->hasOne(GendarmeriePostDetail::class);
    }

    public function militaryDetail()
    {
        return $this->hasOne(MilitaryPostDetail::class);
    }
}
