import React from 'react';
import { Link } from '@inertiajs/react';
import { breadcrumbs } from '@/entity/breadcrumbs';
import AppLayout from '@/layouts/app-layout';

const Liste: React.FC = () => {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div>
        <h1 className="text-2xl font-bold mb-4">Liste des messages</h1>
        {/* Ajouter une boucle ici si vous voulez lister les messages */}
        <Link href="/messages/create" className="text-blue-500 underline">
          Créer un nouveau message
        </Link>
      </div>
    </AppLayout>
  );
};

export default Liste;
