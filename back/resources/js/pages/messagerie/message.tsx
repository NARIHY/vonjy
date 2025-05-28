import React, { useEffect, useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { PriorityEnum } from '@/enum/priorityEnum';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Messagerie', href: '/messagerie' },
    { title: 'Création d\'un message', href: '/messagerie/create' },
];
const priorityOptions = Object.entries(PriorityEnum).map(([key, value]) => ({
    label: key.charAt(0).toUpperCase() + key.slice(1).toLowerCase(),
    value,
}));
const Message: React.FC = () => {
    const { data, setData, post, processing, errors } = useForm({
        subject: '',
        content: '',
        priority: '',
    });

    // Thèmes
    const [theme] = useState<'light' | 'dark'>(() => {
        if (typeof window !== 'undefined') {
            const storedTheme = localStorage.getItem('ea/colorScheme') as 'light' | 'dark' | null;if (storedTheme) return storedTheme;
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            return prefersDark ? 'dark' : 'light';
        }
        return 'light';
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('theme', theme);
        }
    }, [theme]);

    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
    }, [theme]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/messagerie');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Création d'un message" />
            <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Nouveau message</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block font-semibold text-gray-800 dark:text-gray-200">Objet</label>
                        <input
                            type="text"
                            className="border rounded w-full p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                            value={data.subject}
                            onChange={(e) => setData('subject', e.target.value)}
                        />
                        {errors.subject && <p className="text-red-500">{errors.subject}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block font-semibold text-gray-800 dark:text-gray-200">Contenu</label>
                        <textarea
                            className="border rounded w-full p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                            value={data.content}
                            onChange={(e) => setData('content', e.target.value)}
                        />
                        {errors.content && <p className="text-red-500">{errors.content}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block font-semibold text-gray-800 dark:text-gray-200">Priorité</label>
                        <select
                            className="border rounded w-full p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                            value={data.priority || ''}
                            onChange={(e) => setData('priority', e.target.value)}
                        >
                            <option value="">Sélectionner la priorité</option>
                            {priorityOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        {errors.priority && <p className="text-red-500">{errors.priority}</p>}
                    </div>
                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Envoyer
                    </button>
                </form>
            </div>
        </AppLayout>
    );
};

export default Message;
