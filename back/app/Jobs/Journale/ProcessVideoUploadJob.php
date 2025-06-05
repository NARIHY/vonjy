<?php

namespace App\Jobs\Journale;

use App\Models\Journale\MediaActualiteModel;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Http\UploadedFile;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProcessVideoUploadJob implements ShouldQueue
{
    use InteractsWithQueue, SerializesModels ,Queueable;



    protected $fichierVideo;
    protected $idActualite;
    protected $cheminDossier;

    /**
     * @param UploadedFile $videoFile  Le fichier vidéo temporaire
     * @param int $actualiteId          L'ID de l'actualité associée
     * @param string $dossier           Chemin relatif (e.g. "actualites/{user}/{date}/{heure}")
     */
    public function __construct(UploadedFile $fichierVideo, int $idActualite, string $cheminDossier)
    {
        $this->fichierVideo = $fichierVideo;
        $this->idActualite  = $idActualite;
        $this->cheminDossier = $cheminDossier;
    }

    public function handle()
    {
        $nomUnique = Str::uuid()->toString() . '.' . $this->fichierVideo->getClientOriginalExtension();
        $chemin = $this->cheminDossier . '/' . $nomUnique;

        Storage::disk('public')->putFileAs($this->cheminDossier, $this->fichierVideo, $nomUnique);

        MediaActualiteModel::create([
            'actualite_id' => $this->idActualite,
            'type'         => 'video',
            'path'         => $chemin,
        ]);
    }
}
