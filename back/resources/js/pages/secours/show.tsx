import React from 'react';
import { usePage, Link, Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';


export interface Post {
    id: number
    name: string;
    type: string;
    address: string;
    region: string;
    email: string;
    phone_number: string;
    [key: string]: unknown;
}

interface PageProps {
    post: Post;
    [key: string]: unknown;
}
const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Liste des postes de secours', href: '/administration/secours' },
    { title: 'Voir une poste de secours', href:''}
];

export default function Show() {
    const { post } = usePage<PageProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title='Voir une poste de secours' />
            <div className="p-6 space-y-4">
            <h1 className="text-2xl font-bold">Détails du Poste: {post.name}</h1>
            <div className="space-y-2">
                <div><strong>Type:</strong> {post.type}</div>
                <div><strong>Adresse:</strong> {post.address}</div>
                <div><strong>Région:</strong> {post.region}</div>
                <div><strong>Email:</strong> {post.email}</div>
                <div><strong>Téléphone:</strong> {post.phone_number}</div>
            </div>
            <Link href="/secours" className="text-blue-500 underline">← Retour</Link>
        </div>
        </AppLayout>
    );
}
