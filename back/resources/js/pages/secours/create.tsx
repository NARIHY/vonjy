import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Liste des postes de secours', href: '/administration/secours' },
    { title: 'Création d\'un poste de secours', href: '' }
];

interface FormState {
    name: string;
    type: string;
    address: string;
    region: string;
    latitude: string;
    longitude: string;
    phone_number: string;
    email: string;
}

const initialForm: FormState = {
    name: '',
    type: '',
    address: '',
    region: '',
    latitude: '',
    longitude: '',
    phone_number: '',
    email: '',
};

const Create: React.FC = () => {
    const [form, setForm] = useState<FormState>(initialForm);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.post('/secours', { ...form });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Création d'un poste de secours" />
            <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
                <div className="w-full max-w-lg bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8 space-y-6">
                    <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white">
                        Créer un Poste de Secours
                    </h1>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {(Object.keys(form) as (keyof FormState)[]).map((key) => (
                            <div key={key}>
                                <label
                                    htmlFor={key}
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 capitalize"
                                >
                                    {key.replace('_', ' ')}
                                </label>
                                <input
                                    id={key}
                                    type="text"
                                    name={key}
                                    value={form[key]}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        ))}
                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow transition"
                        >
                            Enregistrer
                        </button>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
};

export default Create;
