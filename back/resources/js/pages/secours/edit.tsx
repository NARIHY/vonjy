import React, { useState } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import { Post } from './show';
import { BreadcrumbItem } from '@/types';
import AppLayout from '@/layouts/app-layout';


const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Liste des postes de secours', href: '/administration/secours' },
    { title: 'Edition d\'une poste de secours', href:''}
];

export default function Edit() {
    const { post } = usePage().props as unknown as { post: Post };
    const [form, setForm] = useState<Post>({ ...post });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        Object.entries(form).forEach(([key, value]) => {
            formData.append(key, value !== undefined && value !== null ? String(value) : '');
        });
        router.put(`/secours/${post.id}`, formData);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edition d'un poste de secours  " />

        <div className="p-6 space-y-4">
            <h1 className="text-2xl font-bold">Modifier le Poste de Secours</h1>
            <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
                {Object.keys(form).map((key) => (
                    <div key={key}>
                        <label className="block capitalize">{key.replace('_', ' ')}</label>
                        <input
                            type="text"
                            name={key}
                            value={form[key] !== undefined && form[key] !== null ? String(form[key]) : ''}
                            onChange={handleChange}
                            className="border p-2 w-full"
                        />
                    </div>
                ))}
                <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded">
                    Modifier
                </button>
            </form>
        </div>
        </AppLayout>
    );
}
