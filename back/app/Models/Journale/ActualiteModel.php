<?php

namespace App\Models\Journale;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class ActualiteModel extends Model
{
    use HasFactory;

     protected $table = 'actualite_models';
    protected $fillable = [
        'user_id',
        'titre',
        'slug',
        'contenu',
        'published_at',
    ];

    // Relation vers l'auteur (User)
    public function auteur()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    // Relation vers les médias
    public function medias()
    {
        return $this->hasMany(MediaActualiteModel::class, 'actualite_id');
    }

    // Générer automatiquement le slug à partir du titre
    public static function boot()
    {
        parent::boot();

        static::creating(function ($actualite) {
            $actualite->slug = static::makeUniqueSlug($actualite->titre);
        });

        static::updating(function ($actualite) {
            // si le titre change, régénérer le slug
            if ($actualite->isDirty('titre')) {
                $actualite->slug = static::makeUniqueSlug($actualite->titre, $actualite->id);
            }
        });
    }

    protected static function makeUniqueSlug(string $titre, $ignoreId = null)
    {
        $slug = Str::slug($titre);
        $original = $slug;
        $count = 1;

        while (static::where('slug', $slug)
                     ->when($ignoreId, fn($q) => $q->where('id','<>',$ignoreId))
                     ->exists())
        {
            $slug = "{$original}-{$count}";
            $count++;
        }

        return $slug;
    }

}
