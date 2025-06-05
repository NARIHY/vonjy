import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Actualite, IndexProps } from '@/types/type';
import { Head, Link, usePage } from '@inertiajs/react';
import { Eye, Plus, Trash2, Edit, Calendar } from 'lucide-react'; // si tu en as un
import MediaPreview from '@/components/media-preview'; // adapte si nécessaire
import { useDarkMode } from '@/hooks/useDarkMode'; // 👈 important
import { formatDate } from '../../components/utils/formatDate';

export default function Index() {
    const { actualites, flash } = usePage<{ actualites: IndexProps['actualites']; flash?: IndexProps['flash'] }>().props;
    const isDarkMode = useDarkMode();

    const breadcrumbs: BreadcrumbItem[] = [{ title: 'Actualite', href: '/actualites' }];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Mes actualités" />

            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-6">
                <div className={`rounded-2xl shadow-xl mb-8 transition-all duration-300 ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100'}`}>
                    <div className="p-6 sm:p-8">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                Mes Actualités
                            </h1>

                            <Link
                                href={route('actualites.create')}
                                className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl"
                            >
                                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                                <div className="relative flex items-center gap-2">
                                    <Plus size={20} />
                                    <span className="hidden sm:inline">Nouvelle actualité</span>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>

                {flash?.message && (
                    <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg animate-pulse">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                            {flash.message}
                        </div>
                    </div>
                )}

                {actualites.data.length === 0 ? (
                    <div className={`text-center py-16 rounded-2xl shadow-xl ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100'}`}>
                        <div className={`mx-auto w-24 h-24 rounded-full flex items-center justify-center mb-6 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                            <Eye size={32} className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} />
                        </div>
                        <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                            Aucune actualité
                        </h3>
                        <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            Commencez par créer votre première actualité
                        </p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {actualites.data.map((a: Actualite) => (
                            <div
                                key={a.id}
                                className={`group rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 ${
                                    isDarkMode
                                        ? 'bg-gray-800 border border-gray-700 hover:border-gray-600'
                                        : 'bg-white border border-gray-100 hover:border-gray-200'
                                }`}
                            >
                                <div className="p-6 sm:p-8">
                                    <div className="flex flex-col lg:flex-row gap-6">
                                        <div className="flex-1">
                                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                                                <div>
                                                    <h2 className={`text-xl sm:text-2xl font-bold mb-2 group-hover:text-blue-600 transition-colors duration-300 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                                                        {a.titre}
                                                    </h2>
                                                    <div className={`flex items-center gap-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                                        <Calendar size={16} />
                                                        <span>Publié le {formatDate(a.published_at)}</span>
                                                    </div>
                                                </div>
                                                <div className="flex gap-2">
                                                    <Link
                                                        href={route('actualites.edit', a.id)}
                                                        className={`p-3 rounded-lg transition-all duration-300 hover:scale-110 flex items-center gap-2 ${isDarkMode ? 'bg-blue-600 hover:bg-blue-500 text-white' : 'bg-blue-100 hover:bg-blue-200 text-blue-600'}`}
                                                    >
                                                        <Edit size={16} />
                                                        <span className="hidden sm:inline text-sm font-medium">Modifier</span>
                                                    </Link>
                                                    <Link
                                                        as="button"
                                                        method="delete"
                                                        href={route('actualites.destroy', a.id)}
                                                        data-confirm="Êtes-vous sûr de vouloir supprimer ?"
                                                        className={`p-3 rounded-lg transition-all duration-300 hover:scale-110 flex items-center gap-2 ${isDarkMode ? 'bg-red-600 hover:bg-red-500 text-white' : 'bg-red-100 hover:bg-red-200 text-red-600'}`}
                                                    >
                                                        <Trash2 size={16} />
                                                        <span className="hidden sm:inline text-sm font-medium">Supprimer</span>
                                                    </Link>
                                                </div>
                                            </div>

                                            {a.medias.length > 0 && (
                                                <div className="mt-4">
                                                    <div className="flex flex-wrap gap-3">
                                                        {a.medias.slice(0, 4).map((m) => {
                                                            // Map 'photo' to 'image' for MediaPreview compatibility
                                                            const mappedMedia = m.type === 'photo'
                                                                ? { ...m, type: 'image' } as const
                                                                : { ...m, type: m.type as 'image' | 'video' | 'document' };
                                                            return (
                                                                <div key={m.id} className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden shadow-lg">
                                                                    <MediaPreview media={mappedMedia} />
                                                                </div>
                                                            );
                                                        })}
                                                        {a.medias.length > 4 && (
                                                            <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-xl flex items-center justify-center font-semibold transition-all duration-300 hover:scale-105 cursor-pointer ${
                                                                isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                            }`}>
                                                                +{a.medias.length - 4}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {actualites.last_page > 1 && (
                    <div className="mt-12 flex justify-center">
                        <div className={`flex items-center gap-2 p-2 rounded-2xl shadow-lg ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100'}`}>
                            {Array.from({ length: actualites.last_page }).map((_, index) => {
                                const page = index + 1;
                                const isActive = actualites.current_page === page;
                                return (
                                    <Link
                                        key={page}
                                        href={route('actualites.index', { page })}
                                        className={`px-4 py-2 rounded-xl transition-all duration-300 font-medium ${
                                            isActive
                                                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                                                : isDarkMode
                                                    ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                                        }`}
                                    >
                                        {page}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
