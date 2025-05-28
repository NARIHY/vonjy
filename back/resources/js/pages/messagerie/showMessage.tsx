import { MessageProps } from '@/interface/utils';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem} from '@/types';
import { Head } from '@inertiajs/react';
import React, { useState } from 'react';



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

const ShowMessage: React.FC<MessageProps> = ({ message}) => {
    // Gestion des thèmes
    const [theme] = useState<'light' | 'dark'>(() => {
        if (typeof window !== 'undefined') {
            const storedTheme = localStorage.getItem('appearance') as 'light' | 'dark' | null;
            if (storedTheme) return storedTheme;
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            return prefersDark ? 'dark' : 'light';
        }
        return 'light';
    });

    const isDark = theme === 'dark';

    const containerClasses = `
        mx-auto mt-4 sm:mt-6 lg:mt-8
        w-full max-w-4xl
        rounded-xl sm:rounded-2xl
        ${isDark
            ? 'bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700'
            : 'bg-gradient-to-br from-white to-gray-50 border border-gray-200'
        }
        shadow-xl shadow-gray-500/10
        p-4 sm:p-6 lg:p-8
        transition-all duration-300 ease-in-out
        hover:shadow-2xl hover:shadow-gray-500/20
    `;

    const headerClasses = `
        flex flex-col sm:flex-row sm:items-start sm:justify-between
        gap-4 mb-6 pb-4
        border-b
        ${isDark ? 'border-gray-700' : 'border-gray-200'}
    `;

    const titleClasses = `
        text-2xl sm:text-3xl lg:text-4xl
        font-bold
        ${isDark ? 'text-white' : 'text-gray-900'}
        leading-tight
        break-words
    `;



    const contentClasses = `
        ${isDark ? 'text-gray-200' : 'text-gray-700'}
        text-base sm:text-lg
        leading-relaxed
        mb-6
        whitespace-pre-wrap
        break-words
        text-justify
    `;

    const metaClasses = `
        flex flex-col sm:flex-row sm:items-center sm:justify-between
        gap-3 pt-4
        border-t
        ${isDark ? 'border-gray-700' : 'border-gray-200'}
    `;

    const userInfoClasses = `
        flex items-center gap-3
        ${isDark ? 'text-gray-300' : 'text-gray-600'}
        text-sm sm:text-base
    `;

    const avatarClasses = `
        w-8 h-8 sm:w-10 sm:h-10
        rounded-full
        ${isDark ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-gradient-to-r from-blue-500 to-purple-500'}
        flex items-center justify-center
        text-white font-semibold
        text-sm sm:text-base
    `;

    const dateClasses = `
        ${isDark ? 'text-gray-400' : 'text-gray-500'}
        text-xs sm:text-sm
        font-medium
    `;

    // Fonction pour obtenir les initiales de l'utilisateur
    const getUserInitials = (userId: string) => {
        return userId.slice(0, 2).toUpperCase();
    };

    // Formatage de la date
    const formatDate = (dateString?: string) => {
        if (!dateString) return 'Date inconnue';
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Message: ${message.subject}`} />

            <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-4">
                <div className={containerClasses}>
                    {/* En-tête avec titre et bouton fermer */}
                    <div className={headerClasses}>
                        <div className="flex-1">
                            <h1 className={titleClasses}>
                                {message.subject}
                            </h1>
                        </div>
                    </div>

                    {/* Contenu du message */}
                    <div className="mb-8">
                        <div className={contentClasses}>
                            {message.content}
                        </div>
                    </div>

                    {/* Métadonnées */}
                    <div className={metaClasses}>
                        <div className={userInfoClasses}>
                            <div className={avatarClasses}>
                                {getUserInitials(message.user.name || 'User')}
                            </div>
                            <div>

                                <div className="font-medium">
                                    Envoyé par {message.user.name|| 'User'}
                                </div>
                                <div className={dateClasses}>
                                    ID: #{message.id}
                                </div>
                            </div>
                        </div>

                        {message.created_at && (
                            <div className={dateClasses}>
                                {formatDate(message.created_at)}
                            </div>
                        )}
                    </div>

                    {/* Actions supplémentaires */}
                    <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                        <button className={`
                            px-4 py-2 rounded-lg font-medium text-sm
                            ${isDark
                                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                : 'bg-blue-500 hover:bg-blue-600 text-white'
                            }
                            transition-colors duration-200
                            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                        `}>
                            Valider l'urgence
                        </button>

                        <button className={`
                            px-4 py-2 rounded-lg font-medium text-sm
                            ${isDark
                                ? 'text-red-400 hover:bg-red-900/20 border border-red-800/50'
                                : 'text-red-600 hover:bg-red-50 border border-red-200'
                            }
                            transition-colors duration-200
                            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500
                        `}>
                            Rummeur
                        </button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default ShowMessage;
