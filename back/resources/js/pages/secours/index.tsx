// resources/js/Pages/Secours/Index.tsx
import React from 'react';
import { Link, usePage, router, Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';

type Post = {
  id: number;
  name: string;
  type: string;
  address: string;
};

type Pagination<T> = {
  data: T[];
  current_page: number;
  last_page: number;
  next_page_url: string | null;
  prev_page_url: string | null;
};

type PageProps = {
  posts: Pagination<Post>;
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Liste des postes de secours', href: '/administration/secours' }
];

export default function Index() {
  const { posts } = usePage<PageProps>().props;

  const handleDelete = (id: number) => {
    if (confirm('Voulez-vous vraiment supprimer ce poste ?')) {
      router.delete(`/administration/secours/${id}`);
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Liste des postes de secours" />

    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Liste des Postes de Secours
        </h1>
        <Link
          href="/administration/secours/create"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          + Ajouter un poste
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left border border-gray-200 dark:border-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 border dark:border-gray-700">Nom</th>
              <th className="px-4 py-3 border dark:border-gray-700">Type</th>
              <th className="px-4 py-3 border dark:border-gray-700">Adresse</th>
              <th className="px-4 py-3 border dark:border-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.data.map((post) => (
              <tr key={post.id} className="bg-white dark:bg-gray-900 border-t dark:border-gray-700">
                <td className="px-4 py-2 border dark:border-gray-700">{post.name}</td>
                <td className="px-4 py-2 border dark:border-gray-700">{post.type}</td>
                <td className="px-4 py-2 border dark:border-gray-700">{post.address}</td>
                <td className="px-4 py-2 border dark:border-gray-700 space-x-2">
                  <Link
                    href={`/secours/${post.id}`}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-xs"
                  >
                    Voir
                  </Link>
                  <Link
                    href={`/secours/${post.id}/edit`}
                    className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500 text-xs"
                  >
                    Modifier
                  </Link>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-xs"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
    <div className="mt-6 flex justify-center items-center flex-wrap gap-2">
      {posts.prev_page_url && (
        <Link
        href={posts.prev_page_url}
        className="px-3 py-1 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
        >
        ← Précédent
        </Link>
      )}

      {/* Always show first page */}
      <Link
        href="?page=1"
        className={`px-3 py-1 text-sm rounded border ${
        posts.current_page === 1
          ? 'bg-blue-600 text-white border-blue-600'
          : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
        }`}
      >
        1
      </Link>

      {/* Show ... if needed before window */}
      {posts.current_page > 3 && posts.last_page > 5 && (
        <span className="px-2 text-gray-400">...</span>
      )}

      {/* Show window of pages around current */}
      {Array.from({ length: posts.last_page }, (_, i) => i + 1)
        .filter(
        (page) =>
          page !== 1 &&
          page !== posts.last_page &&
          page >= posts.current_page - 1 &&
          page <= posts.current_page + 1
        )
        .map((page) => (
        <Link
          key={page}
          href={`?page=${page}`}
          className={`px-3 py-1 text-sm rounded border ${
            posts.current_page === page
            ? 'bg-blue-600 text-white border-blue-600'
            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          {page}
        </Link>
        ))}

      {/* Show ... if needed after window */}
      {posts.current_page < posts.last_page - 2 && posts.last_page > 5 && (
        <span className="px-2 text-gray-400">...</span>
      )}

      {/* Always show last page if more than 1 */}
      {posts.last_page > 1 && (
        <Link
        href={`?page=${posts.last_page}`}
        className={`px-3 py-1 text-sm rounded border ${
          posts.current_page === posts.last_page
            ? 'bg-blue-600 text-white border-blue-600'
            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
        }`}
        >
        {posts.last_page}
        </Link>
      )}

      {posts.next_page_url && (
        <Link
        href={posts.next_page_url}
        className="px-3 py-1 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
        >
        Suivant →
        </Link>
      )}
    </div>
    </div>
    </AppLayout>
  );
}
