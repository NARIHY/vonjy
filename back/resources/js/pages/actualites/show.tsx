import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { ShowProps } from '@/types/type';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Show() {
    const { actualite } = usePage<{ actualite: ShowProps['actualite'] }>().props;

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Actualité', href: '/actualites' },
        { title: 'Voir une actualité', href: '/' },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={actualite.titre} />
            <div className="mx-auto max-w-3xl p-6">
                <Head>
                    <title>{actualite.titre}</title>
                </Head>

                <h1 className="mb-4 text-3xl font-bold">{actualite.titre}</h1>
                <p className="mb-2 text-gray-600">Publié le {new Date(actualite.published_at).toLocaleString()}</p>

                {actualite.contenu && (
                    <div className="prose prose-lg mb-6">
                        <p>{actualite.contenu}</p>
                    </div>
                )}

                <div className="mb-6 flex flex-wrap">
                    {actualite.medias.map((m) => (
                        <div key={m.id} className="m-2 h-48 w-48 overflow-hidden rounded border bg-gray-100">
                            {m.type === 'photo' ? (
                                <img src={m.url} alt={`Media ${m.id}`} className="h-full w-full object-cover" />
                            ) : (
                                <video src={m.url} className="h-full w-full object-cover" controls />
                            )}
                        </div>
                    ))}
                </div>

                <div className="flex space-x-4">
                    <Link href={route('actualites.edit', actualite.id)} className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                        Modifier
                    </Link>
                    <Link href={route('actualites.index')} className="rounded bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-400">
                        Retour à la liste
                    </Link>
                </div>
            </div>
        </AppLayout>
    );
}
