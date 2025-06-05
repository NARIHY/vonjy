import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { EditFormData, EditProps } from '@/types/type';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import React, { useState } from 'react';

export default function Edit() {
    // Récupération de la prop `actualite` envoyée par le contrôleur via Inertia
    const { actualite } = usePage<{ actualite: EditProps['actualite'] }>().props;

    // Initialisation du formulaire avec les valeurs existantes
    const { data, setData, post, processing, errors } = useForm<EditFormData>({
        titre: actualite.titre,
        contenu: actualite.contenu || '',
        published_at: new Date(actualite.published_at).toISOString().slice(0, 16),
        medias: [],
        media_a_conserver: actualite.medias.map((m) => m.id),
    });

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Actualite', href: '/actualites' },
        { title: "Edition d'une actualité", href: '/' },
    ];

    // États pour gérer les médias existants (à l’affichage) et les nouveaux aperçus
    const [mediasExistants, setMediasExistants] = useState<Array<{ id: number; url: string; type: 'photo' | 'video' }>>(
        actualite.medias.map((m) => ({
            id: m.id,
            url: m.url,
            type: m.type,
        })),
    );

    const [previewFiles, setPreviewFiles] = useState<Array<{ file: File; url: string; type: 'photo' | 'video' }>>([]);

    // Supprimer un média existant de l’affichage + de media_a_conserver
    const removeExisting = (mediaId: number) => {
        setMediasExistants((prev) => prev.filter((m) => m.id !== mediaId));
        setData(
            'media_a_conserver',
            data.media_a_conserver.filter((id) => id !== mediaId),
        );
    };

    // Gérer la sélection de nouveaux fichiers
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const filesArray = Array.from(e.target.files);

        // Compter les médias existants du même type pour respecter le quota
        let photosCount = mediasExistants.filter((m) => m.type === 'photo').length;
        let videosCount = mediasExistants.filter((m) => m.type === 'video').length;

        // Ajouter aux comptes les fichiers déjà sélectionnés dans previewFiles
        previewFiles.forEach((p) => {
            if (p.type === 'photo') photosCount++;
            else if (p.type === 'video') videosCount++;
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
                alert(`Impossible d'ajouter ${file.name} : quota dépassé (6 photos max, 3 vidéos max).`);
            }
        });

        setData('medias', [...data.medias, ...validNewFiles]);
        setPreviewFiles((prev) => [...prev, ...previews]);

        e.target.value = '';
    };

    // Supprimer un fichier nouvellement sélectionné (preview)
    const removeNewFile = (index: number) => {
        const updatedPreviews = [...previewFiles];
        updatedPreviews.splice(index, 1);
        setPreviewFiles(updatedPreviews);

        const updatedFiles = [...data.medias];
        updatedFiles.splice(index, 1);
        setData('medias', updatedFiles);
    };

    // Soumettre la mise à jour
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('titre', data.titre);
        formData.append('contenu', data.contenu);
        formData.append('published_at', data.published_at);

        data.media_a_conserver.forEach((id) => {
            formData.append('media_a_conserver[]', id.toString());
        });
        data.medias.forEach((f) => {
            formData.append('medias[]', f);
        });

        post(route('actualites.update', actualite.id), {
            // data: formData,
            forceFormData: true,
            onSuccess: () => {
                // Optionnel : redirection ou toast
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Modifier l’actualité" />
            <div className="mx-auto max-w-3xl p-6">
                <Head>
                    <title>Modifier l’actualité</title>
                </Head>

                <h1 className="mb-4 text-2xl font-bold">Modifier l’actualité</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Champ titre */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Titre *</label>
                        <input
                            type="text"
                            name="titre"
                            value={data.titre}
                            onChange={(e) => setData('titre', e.target.value)}
                            className="mt-1 block w-full rounded border p-2"
                            required
                        />
                        {errors.titre && <p className="mt-1 text-xs text-red-500">{errors.titre}</p>}
                    </div>

                    {/* Champ contenu */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Contenu</label>
                        <textarea
                            name="contenu"
                            rows={4}
                            value={data.contenu}
                            onChange={(e) => setData('contenu', e.target.value)}
                            className="mt-1 block w-full rounded border p-2"
                        />
                        {errors.contenu && <p className="mt-1 text-xs text-red-500">{errors.contenu}</p>}
                    </div>

                    {/* Date de publication */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Date de publication</label>
                        <input
                            type="datetime-local"
                            name="published_at"
                            value={data.published_at}
                            onChange={(e) => setData('published_at', e.target.value)}
                            className="mt-1 block w-full rounded border p-2"
                        />
                        {errors.published_at && <p className="mt-1 text-xs text-red-500">{errors.published_at}</p>}
                    </div>

                    {/* Médias existants */}
                    {mediasExistants.length > 0 && (
                        <div>
                            <p className="mb-1 text-sm font-medium text-gray-700">Médias existants</p>
                            <div className="flex flex-wrap">
                                {mediasExistants.map((m) => (
                                    <div key={m.id} className="relative m-2 h-32 w-32 overflow-hidden rounded border bg-gray-100">
                                        {m.type === 'photo' ? (
                                            <img src={m.url} alt={`Media ${m.id}`} className="h-full w-full object-cover" />
                                        ) : (
                                            <video src={m.url} className="h-full w-full object-cover" controls />
                                        )}
                                        <button
                                            type="button"
                                            onClick={() => removeExisting(m.id)}
                                            className="absolute top-1 right-1 rounded-full bg-red-500 px-1 text-xs text-white"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Sélection de nouveaux fichiers */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Ajouter des médias (photos & vidéos)</label>
                        <input
                            type="file"
                            name="medias"
                            accept="image/*,video/*"
                            multiple
                            onChange={handleFileChange}
                            className="mt-1 block w-full"
                        />
                        {errors.medias && <p className="mt-1 text-xs text-red-500">{errors.medias}</p>}
                        {errors['medias.*'] && <p className="mt-1 text-xs text-red-500">{errors['medias.*']}</p>}
                    </div>

                    {/* Aperçu des nouveaux fichiers */}
                    {previewFiles.length > 0 && (
                        <div className="flex flex-wrap">
                            {previewFiles.map((p, index) => (
                                <div key={index} className="relative m-2 h-32 w-32 overflow-hidden rounded border bg-gray-100">
                                    {p.type === 'photo' ? (
                                        <img src={p.url} alt={`Aperçu ${index}`} className="h-full w-full object-cover" />
                                    ) : (
                                        <video src={p.url} className="h-full w-full object-cover" controls />
                                    )}
                                    <button
                                        type="button"
                                        onClick={() => removeNewFile(index)}
                                        className="absolute top-1 right-1 rounded-full bg-red-500 px-1 text-xs text-white"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="flex space-x-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                        >
                            {processing ? 'Enregistrement...' : 'Mettre à jour'}
                        </button>
                        <Link href={route('actualites.index')} className="rounded bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-400">
                            Annuler
                        </Link>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
