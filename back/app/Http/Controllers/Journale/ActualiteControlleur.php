<?php

namespace App\Http\Controllers\Journale;

use App\Http\Controllers\Controller;
use App\Http\Requests\Journale\StoreActualiteRequest;
use App\Jobs\Journale\ProcessVideoUploadJob ;
use App\Models\Journale\ActualiteModel;
use App\Models\Journale\MediaActualite;
use App\Models\Journale\MediaActualiteModel;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class ActualiteControlleur extends Controller
{
    use AuthorizesRequests;

    public function __construct()
    {
        // Applique la policy sur ActualiteModel automatiquement
        // $this->authorizeResource(ActualiteModel::class, 'actualiteModel');
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = Auth::user();

        // Récupérer les actualités de l'utilisateur, avec pagination (10 par page)
        $actualites = ActualiteModel::where('user_id', $user->id)
            ->with('medias')
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->through(function ($actualite) {
                // On prépare uniquement les champs nécessaires côté front
                return [
                    'id'           => $actualite->id,
                    'titre'        => $actualite->titre,
                    'slug'         => $actualite->slug,
                    'published_at' => $actualite->published_at,
                    'medias'       => $actualite->medias->map(fn($m) => [
                        'id'   => $m->id,
                        'type' => $m->type,
                        'url'  => Storage::url($m->path), // '/storage/...'
                    ]),
                    'created_at'   => $actualite->created_at,
                ];
            });

        return Inertia::render('actualites/index', [
            'actualites' => $actualites,
            // On peut envoyer un message flash si désiré
            'flash'      => [
                'message' => $request->session()->get('message'),
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('actualites/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreActualiteRequest $request)
    {
        $user = Auth::user();

        DB::beginTransaction();
        try {
            // 1) Créer l'actualité (le slug se crée automatiquement dans le modèle via boot())
            $actualite = ActualiteModel::create([
                'user_id'      => $user->id,
                'titre'        => $request->input('titre'),
                'contenu'      => $request->input('contenu'),
                'published_at' => $request->filled('published_at')
                    ? Carbon::parse($request->published_at)
                    : Carbon::now(),
            ]);

            // 2) Déterminer le dossier cible : actualites/{user_id}/{YYYY-MM-DD}/{HH-MM-SS}
            $date = Carbon::parse($actualite->published_at)->format('Y-m-d');
            $heure = Carbon::parse($actualite->published_at)->format('H-i-s');
            $dossierBase = "actualites/{$user->id}/{$date}/{$heure}";

            // 3) Traiter chaque fichier media
            if ($request->hasFile('medias')) {
                foreach ($request->file('medias') as $file) {
                    $ext = strtolower($file->getClientOriginalExtension());
                    $isPhoto = in_array($ext, ['jpg','jpeg','png','gif']);

                    if ($isPhoto) {
                        // Stockage immédiat pour les photos
                        $nomFichier   = \Illuminate\Support\Str::uuid() . '.' . $ext;
                        $cheminRelatif = "{$dossierBase}/{$nomFichier}";
                        Storage::disk('public')->putFileAs($dossierBase, $file, $nomFichier);

                        MediaActualiteModel::create([
                            'actualite_id' => $actualite->id,
                            'type'         => 'photo',
                            'path'         => $cheminRelatif,
                        ]);
                    } else {
                        // Pour les vidéos, on délègue au Job pour ne pas bloquer l'UX
                        ProcessVideoUploadJob::dispatch($file, $actualite->id, $dossierBase);
                    }
                }
            }

            DB::commit();

            return redirect()
                ->route('actualites.index')
                ->with('message', 'L’actualité a bien été créée.');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()
                ->back()
                ->withInput()
                ->withErrors(['store' => "Erreur lors de la création : {$e->getMessage()}"]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(ActualiteModel $actualiteModel)
    {
        // L'autorisation est déjà gérée par authorizeResource()
        $actualite = $actualiteModel->load('medias');

        // Préparer les données pour Inertia
        $data = [
            'id'           => $actualite->id,
            'titre'        => $actualite->titre,
            'slug'         => $actualite->slug,
            'contenu'      => $actualite->contenu,
            'published_at' => $actualite->published_at,
            'medias'       => $actualite->medias->map(fn($m) => [
                'id'   => $m->id,
                'type' => $m->type,
                'url'  => Storage::url($m->path),
            ]),
            'created_at'   => $actualite->created_at,
            'updated_at'   => $actualite->updated_at,
        ];

        return Inertia::render('actualites/show', [
            'actualite' => $data,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ActualiteModel $actualiteModel)
    {
        $actualite = $actualiteModel->load('medias');

        // Préparer les props pour React
        $data = [
            'id'           => $actualite->id,
            'titre'        => $actualite->titre,
            'contenu'      => $actualite->contenu,
            'published_at' => $actualite->published_at,
            'medias'       => $actualite->medias->map(fn($m) => [
                'id'   => $m->id,
                'type' => $m->type,
                'url'  => Storage::url($m->path),
            ]),
        ];

        return Inertia::render('actualites/edit', [
            'actualite' => $data,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(\App\Http\Requests\Journale\StoreActualiteRequest $request, ActualiteModel $actualiteModel)
    {
        // On sait que seul l’auteur peut passer, grâce à la policy
        $actualite = $actualiteModel;

        DB::beginTransaction();
        try {
            // 1) Mettre à jour les champs basiques
            $actualite->update([
                'titre'        => $request->input('titre'),
                'contenu'      => $request->input('contenu'),
                'published_at' => $request->filled('published_at')
                    ? Carbon::parse($request->published_at)
                    : $actualite->published_at,
            ]);

            // 2) Recalculer le dossier si la date de publication a changé
            $date = Carbon::parse($actualite->published_at)->format('Y-m-d');
            $heure = Carbon::parse($actualite->published_at)->format('H-i-s');
            $dossierBase = "actualites/{$actualite->user_id}/{$date}/{$heure}";

            // 3) Gérer la suppression des médias que l’utilisateur a retirés
            //    Le front envoie un tableau `media_a_conserver` contenant les IDs qu’on garde
            if ($request->has('media_a_conserver')) {
                $idsConserver = $request->input('media_a_conserver', []);
                $toDelete = MediaActualiteModel::where('actualite_id', $actualite->id)
                    ->whereNotIn('id', $idsConserver)
                    ->get();

                foreach ($toDelete as $media) {
                    if (Storage::disk('public')->exists($media->path)) {
                        Storage::disk('public')->delete($media->path);
                    }
                    $media->delete();
                }
            }

            // 4) Traiter l’ajout des nouveaux fichiers (photos + vidéos)
            if ($request->hasFile('medias')) {
                foreach ($request->file('medias') as $file) {
                    $ext = strtolower($file->getClientOriginalExtension());
                    $isPhoto = in_array($ext, ['jpg','jpeg','png','gif']);

                    if ($isPhoto) {
                        $nomFichier    = \Illuminate\Support\Str::uuid() . '.' . $ext;
                        $cheminRelatif = "{$dossierBase}/{$nomFichier}";
                        Storage::disk('public')->putFileAs($dossierBase, $file, $nomFichier);

                        MediaActualiteModel::create([
                            'actualite_id' => $actualite->id,
                            'type'         => 'photo',
                            'path'         => $cheminRelatif,
                        ]);
                    } else {
                        ProcessVideoUploadJob::dispatch($file, $actualite->id, $dossierBase);
                    }
                }
            }

            DB::commit();

            return redirect()
                ->route('actualites.index')
                ->with('message', 'L’actualité a bien été mise à jour.');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()
                ->back()
                ->withInput()
                ->withErrors(['update' => "Erreur lors de la mise à jour : {$e->getMessage()}"]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ActualiteModel $actualiteModel)
    {
        $actualite = $actualiteModel;

        // Supprimer physiquement tous les fichiers avant de supprimer la ligne
        foreach ($actualite->medias as $media) {
            if (Storage::disk('public')->exists($media->path)) {
                Storage::disk('public')->delete($media->path);
            }
        }

        $actualite->delete();

        return redirect()
            ->route('actualites.index')
            ->with('message', 'L’actualité a bien été supprimée.');
    }
}
