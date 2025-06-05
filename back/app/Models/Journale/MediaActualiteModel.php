<?php

namespace App\Models\Journale;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MediaActualiteModel extends Model
{
    use HasFactory;
    //
    protected $fillable = [
        'actualite_id',
        'type',
        'path',
    ];

    // Relation vers l’actualité
    public function actualite()
    {
        return $this->belongsTo(ActualiteModel::class, 'actualite_id');
    }
}
