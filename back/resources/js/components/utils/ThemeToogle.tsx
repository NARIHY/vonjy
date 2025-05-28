import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

const ThemeToggle: React.FC = () => {
    const [theme, setTheme] = useState<Theme>(() => {
        if (typeof window !== 'undefined') {
            const storedTheme = localStorage.getItem('ea/colorScheme') as Theme | null;
            if (storedTheme === 'light' || storedTheme === 'dark') return storedTheme;
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            return prefersDark ? 'dark' : 'light';
        }
        return 'light';
    });

    const [isHovered, setIsHovered] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    useEffect(() => {
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(theme);
        localStorage.setItem('ea/colorScheme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setIsClicked(true);
        setTimeout(() => setIsClicked(false), 300);
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    };

    return (
        <>
            {/* Styles CSS intégrés pour les animations avancées */}
            <style>{`
                @keyframes pulse-glow {
                    0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.5); }
                    50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.8), 0 0 60px rgba(59, 130, 246, 0.4); }
                }

                @keyframes rotate-sun {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                @keyframes bounce-moon {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    25% { transform: translateY(-8px) rotate(-5deg); }
                    75% { transform: translateY(-4px) rotate(5deg); }
                }

                @keyframes particle-float {
                    0% { opacity: 0; transform: translateY(0px) scale(0.5); }
                    50% { opacity: 1; transform: translateY(-20px) scale(1); }
                    100% { opacity: 0; transform: translateY(-40px) scale(0.5); }
                }

                @keyframes shimmer {
                    0% { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                }

                .theme-button {
                    background: linear-gradient(135deg,
                        ${theme === 'light'
                            ? 'rgba(255,255,255,0.95), rgba(248,250,252,0.95)'
                            : 'rgba(17,24,39,0.95), rgba(31,41,55,0.95)'
                        });
                    backdrop-filter: blur(20px);
                    border: 2px solid ${theme === 'light'
                        ? 'rgba(59,130,246,0.3)'
                        : 'rgba(147,197,253,0.3)'};
                    position: relative;
                    overflow: hidden;
                }

                .theme-button::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(90deg,
                        transparent,
                        ${theme === 'light'
                            ? 'rgba(59,130,246,0.2)'
                            : 'rgba(147,197,253,0.2)'},
                        transparent);
                    background-size: 200% 100%;
                    animation: shimmer 2s infinite;
                    opacity: ${isHovered ? 1 : 0};
                    transition: opacity 0.3s ease;
                }

                .theme-icon {
                    position: relative;
                    z-index: 1;
                    font-size: 1.5rem;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    animation: ${theme === 'light' ? 'rotate-sun 8s linear infinite' : 'bounce-moon 2s ease-in-out infinite'};
                }

                .glow-effect {
                    animation: pulse-glow 2s ease-in-out infinite;
                }

                .particle {
                    position: absolute;
                    width: 4px;
                    height: 4px;
                    background: ${theme === 'light' ? '#fbbf24' : '#60a5fa'};
                    border-radius: 50%;
                    pointer-events: none;
                    animation: particle-float 1.5s ease-out forwards;
                }
            `}</style>

            <button
                onClick={toggleTheme}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={`
                    theme-button fixed bottom-6 right-6 w-16 h-16 rounded-full
                    shadow-2xl hover:shadow-3xl
                    transform transition-all duration-300 ease-out
                    hover:scale-110 active:scale-95
                    focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-opacity-50
                    ${isHovered ? 'glow-effect -translate-y-2' : ''}
                    ${isClicked ? 'animate-bounce' : ''}
                    group relative z-[9999]
                `}
                aria-label="Toggle Theme"
                title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
                {/* Cercles d'animation de fond */}
                <div className={`
                    absolute inset-0 rounded-full opacity-20
                    ${theme === 'light'
                        ? 'bg-gradient-to-r from-yellow-400 to-orange-500'
                        : 'bg-gradient-to-r from-blue-400 to-purple-500'
                    }
                    transform transition-all duration-500
                    ${isHovered ? 'scale-150 opacity-30' : 'scale-100'}
                `} />

                {/* Particules animées */}
                {isClicked && Array.from({ length: 8 }).map((_, i) => (
                    <div
                        key={i}
                        className="particle"
                        style={{
                            left: '50%',
                            top: '50%',
                            animationDelay: `${i * 0.1}s`,
                            transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-20px)`
                        }}
                    />
                ))}

                {/* Icône principale */}
                <span className="theme-icon flex items-center justify-center">
                    {theme === 'light' ? '🌙' : '☀️'}
                </span>

                {/* Effet de brillance au hover */}
                <div className={`
                    absolute inset-0 rounded-full pointer-events-none
                    bg-gradient-to-r from-transparent via-white to-transparent
                    opacity-0 group-hover:opacity-20
                    transform -skew-x-12 -translate-x-full group-hover:translate-x-full
                    transition-all duration-1000 ease-out
                `} />

                {/* Badge indicateur */}
                <div className={`
                    absolute -top-1 -right-1 w-4 h-4 rounded-full
                    ${theme === 'light'
                        ? 'bg-gradient-to-r from-yellow-400 to-orange-500'
                        : 'bg-gradient-to-r from-blue-400 to-indigo-500'
                    }
                    shadow-lg transform transition-all duration-300
                    ${isHovered ? 'scale-125 animate-pulse' : 'scale-100'}
                `} />

                {/* Texte flottant au hover */}
                <div className={`
                    absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2
                    px-3 py-1 rounded-full text-xs font-medium
                    ${theme === 'light'
                        ? 'bg-gray-800 text-white'
                        : 'bg-white text-gray-800'
                    }
                    shadow-lg opacity-0 group-hover:opacity-100
                    transition-all duration-300 ease-out
                    ${isHovered ? 'translate-y-0' : 'translate-y-2'}
                    whitespace-nowrap pointer-events-none
                `}>
                    {theme === 'light' ? '🌙 Mode sombre' : '☀️ Mode clair'}
                    {/* Petite flèche */}
                    <div className={`
                        absolute top-full left-1/2 transform -translate-x-1/2
                        border-4 border-transparent
                        ${theme === 'light'
                            ? 'border-t-gray-800'
                            : 'border-t-white'
                        }
                    `} />
                </div>
            </button>
        </>
    );
};

export default ThemeToggle;
