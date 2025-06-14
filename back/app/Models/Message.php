<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{

    protected $fillable = [
        'user_id',
        'content',
        'subject',
        'status',
        'read_at',
        'priority'
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    
}
