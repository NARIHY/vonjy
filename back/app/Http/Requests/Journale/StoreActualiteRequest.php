<?php

namespace App\Http\Requests\Journale;

use App\Models\Journale\MediaActualiteModel;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class StoreActualiteRequest extends FormRequest
{
    public function authorize(): bool
    {
        return Auth::check();
    }

    public function rules()
    {
        $actualiteId = $this->route('actualite') ?? null;

        $nbPhotosExistantes = 0;
        $nbVideosExistantes = 0;
        if ($actualiteId) {
            $mediasExistants = MediaActualiteModel::where('actualite_id', $actualiteId)->get();
            $nbPhotosExistantes = $mediasExistants->where('type', 'photo')->count();
            $nbVideosExistantes = $mediasExistants->where('type', 'video')->count();
        }

        $reglesPhoto = ['image', 'mimes:jpg,jpeg,png,gif', 'max:5120'];
        $reglesVideo = ['mimetypes:video/mp4,video/avi,video/mpeg,video/quicktime', 'max:51200'];

        return [
            'titre' => [
                'required', 'string', 'max:255',
                Rule::unique('actualite_models')->ignore($actualiteId)
            ],
            'contenu' => ['nullable', 'string'],
            'published_at' => ['nullable', 'date'],
            'medias' => [
                'array',
                function ($attribut, $valeur, $echec) use ($nbPhotosExistantes, $nbVideosExistantes) {
                    if (!is_array($valeur)) return;
                    $nbPhotos = 0;
                    $nbVideos = 0;
                    foreach ($valeur as $fichier) {
                        $extension = strtolower($fichier->getClientOriginalExtension());
                        if (in_array($extension, ['jpg', 'jpeg', 'png', 'gif'])) {
                            $nbPhotos++;
                        } elseif (in_array($extension, ['mp4', 'avi', 'mpeg', 'mov', 'mkv'])) {
                            $nbVideos++;
                        }
                    }
                    if (($nbPhotosExistantes + $nbPhotos) > 6) {
                        return $echec("Vous ne pouvez pas avoir plus de 6 photos au total.");
                    }
                    if (($nbVideosExistantes + $nbVideos) > 3) {
                        return $echec("Vous ne pouvez pas avoir plus de 3 vidéos au total.");
                    }
                }
            ],
            'medias.*' => [
                'file',
                function ($attribut, $valeur, $echec) {
                    $extension = strtolower($valeur->getClientOriginalExtension());
                    $estPhoto = in_array($extension, ['jpg', 'jpeg', 'png', 'gif']);
                    $estVideo = in_array($extension, ['mp4', 'avi', 'mpeg', 'mov', 'mkv']);
                    if (!$estPhoto && !$estVideo) {
                        return $echec("Le fichier {$attribut} doit être une image ou une vidéo valide.");
                    }
                }
            ],
        ];
    }

    public function messages()
    {
        return [
            'titre.required' => 'Le titre est obligatoire.',
            'medias.*.max' => 'Chaque fichier doit faire au plus 5 Mo (images) ou 50 Mo (vidéos).',
        ];
    }
}
