import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
                <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl">
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                                >
                                    Log in
                                </Link>
                            </>
                        )}
                    </nav>
                </header>

                {/* Hero Section */}
                <main className="w-full max-w-6xl">
                    <div className="text-center mb-16">
                        <div className="mb-8">
                            <h1 className="text-5xl lg:text-7xl font-bold mb-4 bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
                                Vonjy
                            </h1>
                            <div className="flex items-center justify-center gap-2 mb-4">
                                <span className="text-2xl">🇲🇬</span>
                                <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300">
                                    Plateforme de secours collaboratif pour Madagascar
                                </p>
                            </div>
                        </div>

                        <p className="text-lg lg:text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                            Une solution numérique pour alerter, coordonner et sauver des vies lors de catastrophes naturelles et d'urgences à Madagascar.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-all duration-200 transform hover:scale-105 shadow-lg">
                                🆘 Urgence Vonjy
                            </button>
                            <Link
                                href="#features"
                                className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white font-semibold px-8 py-4 rounded-lg text-lg transition-all duration-200"
                            >
                                Découvrir les fonctionnalités
                            </Link>
                        </div>
                    </div>

                    {/* Statistics */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                        <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                            <div className="text-3xl mb-2">🌪️</div>
                            <div className="text-2xl font-bold text-blue-600">24/7</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Surveillance cyclonique</div>
                        </div>
                        <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                            <div className="text-3xl mb-2">👥</div>
                            <div className="text-2xl font-bold text-green-600">500+</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Bénévoles actifs</div>
                        </div>
                        <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                            <div className="text-3xl mb-2">🏥</div>
                            <div className="text-2xl font-bold text-purple-600">50+</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Centres partenaires</div>
                        </div>
                        <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                            <div className="text-3xl mb-2">📍</div>
                            <div className="text-2xl font-bold text-orange-600">22</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Régions couvertes</div>
                        </div>
                    </div>

                    {/* Features Section */}
                    <section id="features" className="mb-20">
                        <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12 dark:text-white">
                            Fonctionnalités adaptées à Madagascar
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300">
                                <div className="text-4xl mb-4">🆘</div>
                                <h3 className="text-xl font-semibold mb-3 dark:text-white">Alerte Vonjy</h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Bouton d'urgence avec géolocalisation GPS, fonctionne même avec un réseau faible via SMS de secours.
                                </p>
                            </div>

                            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300">
                                <div className="text-4xl mb-4">📍</div>
                                <h3 className="text-xl font-semibold mb-3 dark:text-white">Carte des sinistres</h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Visualisation en temps réel des zones touchées, centres de secours et besoins urgents.
                                </p>
                            </div>

                            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300">
                                <div className="text-4xl mb-4">👥</div>
                                <h3 className="text-xl font-semibold mb-3 dark:text-white">Coordination communautaire</h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Connecte ONG, fokontany, communes et volontaires pour une réponse rapide et organisée.
                                </p>
                            </div>

                            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300">
                                <div className="text-4xl mb-4">📦</div>
                                <h3 className="text-xl font-semibold mb-3 dark:text-white">Suivi des dons</h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Gestion transparente des dons (argent, vivres, médicaments) avec preuve de livraison.
                                </p>
                            </div>

                            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300">
                                <div className="text-4xl mb-4">🔄</div>
                                <h3 className="text-xl font-semibold mb-3 dark:text-white">Mode hors ligne</h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Stockage local des données avec synchronisation automatique dès que le réseau revient.
                                </p>
                            </div>

                            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300">
                                <div className="text-4xl mb-4">📢</div>
                                <h3 className="text-xl font-semibold mb-3 dark:text-white">Notifications SMS</h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Alertes par SMS et messages vocaux pour les zones sans accès Internet stable.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Use Cases */}
                    <section className="mb-20">
                        <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12 dark:text-white">
                            Vonjy en action à Madagascar
                        </h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-8 rounded-2xl">
                                <div className="text-3xl mb-4">🌪️</div>
                                <h3 className="text-xl font-semibold mb-3 text-blue-800 dark:text-blue-300">Cyclone à Antalaha</h3>
                                <p className="text-blue-700 dark:text-blue-200">
                                    Carte des abris d'urgence, coordination des évacuations, et distribution de vivres via la plateforme.
                                </p>
                            </div>

                            <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 p-8 rounded-2xl">
                                <div className="text-3xl mb-4">💧</div>
                                <h3 className="text-xl font-semibold mb-3 text-orange-800 dark:text-orange-300">Pénurie d'eau à Tuléar</h3>
                                <p className="text-orange-700 dark:text-orange-200">
                                    Signalement des besoins urgents et coordination des ONG pour l'acheminement d'eau potable.
                                </p>
                            </div>

                            <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 p-8 rounded-2xl">
                                <div className="text-3xl mb-4">🔥</div>
                                <h3 className="text-xl font-semibold mb-3 text-red-800 dark:text-red-300">Incendie à Tana</h3>
                                <p className="text-red-700 dark:text-red-200">
                                    Alertes en temps réel aux pompiers et mobilisation rapide des volontaires locaux.
                                </p>
                            </div>

                            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-8 rounded-2xl">
                                <div className="text-3xl mb-4">🏥</div>
                                <h3 className="text-xl font-semibold mb-3 text-green-800 dark:text-green-300">Urgence médicale rurale</h3>
                                <p className="text-green-700 dark:text-green-200">
                                    Notification immédiate aux centres de santé et coordination du transport d'urgence.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* CTA Section */}
                    <section className="text-center bg-gradient-to-r from-red-600 to-orange-500 text-white p-12 rounded-3xl">
                        <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                            Rejoignez la communauté Vonjy
                        </h2>
                        <p className="text-xl mb-8 opacity-90">
                            Ensemble, sauvons des vies et renforçons la solidarité malgache
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            {!auth.user && (
                                <Link
                                    href={route('login')}
                                    className="bg-white text-red-600 font-semibold px-8 py-4 rounded-lg text-lg hover:bg-gray-100 transition-colors duration-200"
                                >
                                    Créer un compte
                                </Link>
                            )}
                            <button className="border-2 border-white text-white font-semibold px-8 py-4 rounded-lg text-lg hover:bg-white hover:text-red-600 transition-all duration-200">
                                Devenir bénévole
                            </button>
                        </div>
                    </section>
                </main>

                {/* Footer */}
                <footer className="mt-20 text-center text-sm text-gray-500 dark:text-gray-400">
                    <p>© 2024 Vonjy - Plateforme de secours collaboratif pour Madagascar</p>
                    <p className="mt-2">Développé avec ❤️ pour la solidarité malgache</p>
                </footer>
            </div>
        </>
    );
}
