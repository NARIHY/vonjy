import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Liste des messages',
        href: '/messagerie',
    },
];
const Liste: React.FC = () => {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Liste des messages" />
      <div>
        <h1 className="text-2xl font-bold mb-4">Liste des messages</h1>
        {/* Ajouter une boucle ici si vous voulez lister les messages */}
        <Link href="/messagerie/create" className="text-blue-500 underline">
          Créer un nouveau message
        </Link>
      </div>
    </AppLayout>
  );
};

export default Liste;
