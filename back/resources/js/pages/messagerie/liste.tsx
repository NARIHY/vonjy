import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, User } from '@/types';
import {  DataTable } from '@/components/data/DataTable';
import { Column } from '@/interface/utils';
import { Button } from '@/components/ui/button';
import { PriorityEnum } from '@/enum/priorityEnum';

interface Message {
  id: number;
  content: string;
  subject: string;
  created_at: string;
  user: User;
  status: string;
  read_at?: string | null;
  priority: PriorityEnum;
}

interface PageProps {
  messages: {
    data: Message[];
    count: string;
    links: {
      url: string | null;
      label: string;
      active: boolean;
    }[];
    total: string;
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
        render: msg => msg.id,
        key: 'id',
        },
        {
        label: 'Utilisateur',
        render: (msg) => msg.user?.name || 'N/A',
        },
        {
        label: 'Sujet',
        render: (msg) => msg.subject || 'N/A',
        },
        {
            label: 'Priorité',
            render: (msg) => msg.priority
        },
        {
            label: 'Statut',
            render: (msg) => msg.status || 'N/A',
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
      <Button variant="default" size="sm">
      <Link href="/messagerie/create" className="bg-primary text-primary-foreground shadow-xs hover:bg-primary/90">
        Créer un nouveau message
      </Link>
        </Button>
    </div>
      <div className='container mx-auto mt-4'>
        <div className="flex justify-center mb-4">
            <p className="text-lg font-semibold text-gray-700  px-4 py-2 rounded shadow">
                Nombre de résultats : {messages?.total ?? 0}
            </p>
        </div>
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
