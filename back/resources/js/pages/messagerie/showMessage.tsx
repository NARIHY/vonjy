import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import React from 'react';

interface MessageProps {
    message: {
        id: number;
        subject: string;
        content: string;
        user_id: string;
    };
    onClose: () => void;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Messagerie',
        href: '/messagerie',
    },
    {
        title: 'Voir le message',
        href: '',
    },
];

const ShowMessage: React.FC<MessageProps> = ({ message, onClose }) => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Vue sur un message" />
            <div className="mx-auto mt-8 w-full rounded-lg bg-white p-6 shadow">
                <div className="flex justify-end">
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700" aria-label="Fermer">
                        &times;
                    </button>
                </div>
                <h1 className="mb-2 text-2xl font-bold">{message.subject}</h1>
                <p className="mb-4 text-gray-700">{message.content}</p>
                <p className="text-sm text-gray-500">Envoyé par : {message.user_id}</p>
            </div>
        </AppLayout>
    );
};

export default ShowMessage;
