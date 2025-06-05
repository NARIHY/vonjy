import React, { useState } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import { CreateFormData } from '@/types/type';
import { BreadcrumbItem } from '@/types';
import AppLayout from '@/layouts/app-layout';

export default function Create() {
  // Initialisation du formulaire (useForm de Inertia React en TypeScript)
  const { data, setData, post, processing, errors } = useForm<CreateFormData>({
    titre: '',
    contenu: '',
    published_at: new Date().toISOString().slice(0, 16), // ex. "2025-06-05T14:30"
    medias: [],
  });

  const breadcrumbs: BreadcrumbItem[] = [
          { title: 'Actualite', href: '/actualites' },
          { title: 'Création d\'une actualité', href: '/'}
];

  // État local pour gérer les aperçus des fichiers sélectionnés
  const [previewFiles, setPreviewFiles] = useState<
    Array<{ file: File; url: string; type: 'photo' | 'video' }>
  >([]);

  // Handler pour la sélection de fichiers
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const filesArray = Array.from(e.target.files);

    // Calcul du nombre actuel de photos/vidéos (ici on ne tient pas compte des quotas existants
    // car on est en création, mais on pourrait tout de même limiter à 6/3 si besoin)
    let photosCount = 0;
    let videosCount = 0;

    // Comptabiliser les fichiers déjà en data.medias (au cas d'une sélection multiple successive)
    data.medias.forEach((f) => {
      if (f.type.startsWith('image/')) photosCount++;
      else if (f.type.startsWith('video/')) videosCount++;
    });

    const validNewFiles: File[] = [];
    const previews: Array<{ file: File; url: string; type: 'photo' | 'video' }> = [];

    filesArray.forEach((file) => {
      const isPhoto = file.type.startsWith('image/');
      const isVideo = file.type.startsWith('video/');
      if (isPhoto && photosCount < 6) {
        photosCount++;
        validNewFiles.push(file);
        previews.push({ file, url: URL.createObjectURL(file), type: 'photo' });
      } else if (isVideo && videosCount < 3) {
        videosCount++;
        validNewFiles.push(file);
        previews.push({ file, url: URL.createObjectURL(file), type: 'video' });
      } else {
        alert(
          `Impossible d'ajouter ${file.name} : quota dépassé (6 photos max, 3 vidéos max).`
        );
      }
    });

    // Mettre à jour l’état du formulaire (data.medias) et les aperçus
    setData('medias', [...data.medias, ...validNewFiles]);
    setPreviewFiles((prev) => [...prev, ...previews]);

    // Réinitialiser l’input pour permettre de re-sélectionner les mêmes fichiers si nécessaire
    e.target.value = '';
  };

  // Soumission du formulaire
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // On prépare un FormData pour gérer l’upload des fichiers
    const formData = new FormData();
    formData.append('titre', data.titre);
    formData.append('contenu', data.contenu);
    formData.append('published_at', data.published_at);

    data.medias.forEach((file) => {
      formData.append('medias[]', file);
    });

    post(route('actualites.store'), {
    //   data: formData,
      forceFormData: true,
      onSuccess: () => {
        // Optionnel : vous pouvez réinitialiser le formulaire ou afficher un toast
      },
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Créer une nouvelle actualité" />
        <div className="max-w-3xl mx-auto p-6">
      <Head>
        <title>Créer une nouvelle actualité</title>
      </Head>

      <h1 className="text-2xl font-bold mb-4">Créer une actualité</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Champ titre */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Titre *</label>
          <input
            type="text"
            name="titre"
            value={data.titre}
            onChange={(e) => setData('titre', e.target.value)}
            className="mt-1 block w-full border rounded p-2"
            required
          />
          {errors.titre && (
            <p className="text-red-500 text-xs mt-1">{errors.titre}</p>
          )}
        </div>

        {/* Champ contenu */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Contenu</label>
          <textarea
            name="contenu"
            rows={4}
            value={data.contenu}
            onChange={(e) => setData('contenu', e.target.value)}
            className="mt-1 block w-full border rounded p-2"
          />
          {errors.contenu && (
            <p className="text-red-500 text-xs mt-1">{errors.contenu}</p>
          )}
        </div>

        {/* Date de publication */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date de publication
          </label>
          <input
            type="datetime-local"
            name="published_at"
            value={data.published_at}
            onChange={(e) => setData('published_at', e.target.value)}
            className="mt-1 block w-full border rounded p-2"
          />
          {errors.published_at && (
            <p className="text-red-500 text-xs mt-1">{errors.published_at}</p>
          )}
        </div>

        {/* Upload médias */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Médias (photos & vidéos)
          </label>
          <input
            type="file"
            name="medias"
            accept="image/*,video/*"
            multiple
            onChange={handleFileChange}
            className="mt-1 block w-full"
          />
          {errors.medias && (
            <p className="text-red-500 text-xs mt-1">{errors.medias}</p>
          )}
          {errors['medias.*'] && (
            <p className="text-red-500 text-xs mt-1">{errors['medias.*']}</p>
          )}
        </div>

        {/* Aperçu des fichiers sélectionnés */}
        {previewFiles.length > 0 && (
          <div className="flex flex-wrap">
            {previewFiles.map((p, index) => (
              <div
                key={index}
                className="relative m-2 border rounded w-32 h-32 overflow-hidden bg-gray-100"
              >
                {p.type === 'photo' ? (
                  <img
                    src={p.url}
                    alt={`Aperçu ${index}`}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <video
                    src={p.url}
                    className="object-cover w-full h-full"
                    controls
                  />
                )}
              </div>
            ))}
          </div>
        )}

        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={processing}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
          >
            {processing ? 'Création...' : 'Créer'}
          </button>
          <Link
            href={route('actualites.index')}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
          >
            Annuler
          </Link>
        </div>
      </form>
    </div>
    </AppLayout>
  );
}
