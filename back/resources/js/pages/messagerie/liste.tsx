import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, User } from '@/types';
import {  DataTable } from '@/components/data/DataTable';
import { Column } from '@/interface/utils';


interface Message {
  id: number;
  content: string;
  created_at: string;
  user: User;
}

interface PageProps {
  messages: {
    data: Message[];
    links: {
      url: string | null;
      label: string;
      active: boolean;
    }[];
  };
  [key: string]: unknown;
}


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Liste des messages',
        href: '/messagerie',
    },
];
const Liste: React.FC = () => {
    const { messages } = usePage<PageProps>().props;

    const columns: Column<Message>[] = [
        {
        label: '#',
        render: (_, index) => index! + 1,
        },
        {
        label: 'Utilisateur',
        render: (msg) => msg.user?.name || 'N/A',
        },
        {
        label: 'Message',
        key: 'content',
        },
        {
        label: 'Date',
        render: (msg) => new Date(msg.created_at).toLocaleString(),
        },
    ];
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Liste des messages" />
    <div className="flex items-center justify-between mb-4">
      <h1 className="text-2xl font-bold">Liste des messages</h1>
      <Link href="/messagerie/create" className="bg-primary text-primary-foreground shadow-xs hover:bg-primary/90">
        Créer un nouveau message
      </Link>
    </div>
      <div className='container mx-auto mt-4'>
        <DataTable<Message>
        title="Mes Messages"
        columns={columns}
        data={messages.data}
        pagination={messages}
        />
      </div>
    </AppLayout>
  );
};

export default Liste;
