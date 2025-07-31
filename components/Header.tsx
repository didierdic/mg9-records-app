import React from 'react';
import type { Page } from '../App';

interface HeaderProps {
    page: Page;
    setPage: (page: Page) => void;
}

export const Header: React.FC<HeaderProps> = ({ page, setPage }) => {
    const navItemClasses = "px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer flex-grow text-center";
    const activeClasses = "bg-indigo-600 text-white";
    const inactiveClasses = "text-gray-300 hover:bg-gray-700 hover:text-white";

    return (
        <header className="text-center mb-8 md:mb-12">
            <h1 className="font-bebas text-5xl sm:text-6xl md:text-7xl font-bold tracking-wider text-gray-100 uppercase" style={{ letterSpacing: '0.1em' }}>
                mg9 records
            </h1>
            <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-400 tracking-wide">
                Professional Audio Services & AI-Powered Music Creation Tools
            </p>
            <nav className="mt-8 flex flex-wrap justify-center items-center gap-2 p-1.5 bg-gray-800/60 backdrop-blur-md border border-gray-700 rounded-full max-w-3xl sm:max-w-4xl mx-auto">
                 <a 
                    onClick={() => setPage('home')} 
                    className={`${navItemClasses} ${page === 'home' ? activeClasses : inactiveClasses}`}
                    aria-current={page === 'home' ? 'page' : undefined}
                >
                    Home
                </a>
                <a 
                    onClick={() => setPage('advice')} 
                    className={`${navItemClasses} ${page === 'advice' ? activeClasses : inactiveClasses}`}
                    aria-current={page === 'advice' ? 'page' : undefined}
                >
                    Artist Advice
                </a>
                <a 
                    onClick={() => setPage('drum-packs')} 
                    className={`${navItemClasses} ${page === 'drum-packs' ? activeClasses : inactiveClasses}`}
                    aria-current={page === 'drum-packs' ? 'page' : undefined}
                >
                    Free Drum Kits
                </a>
                <a 
                    onClick={() => setPage('mixing')} 
                    className={`${navItemClasses} ${page === 'mixing' ? activeClasses : inactiveClasses}`}
                    aria-current={page === 'mixing' ? 'page' : undefined}
                >
                    Mixing & Mastering
                </a>
                <a 
                    onClick={() => setPage('generator')}
                    className={`${navItemClasses} ${page === 'generator' ? activeClasses : inactiveClasses}`}
                    aria-current={page === 'generator' ? 'page' : undefined}
                >
                    AI Chord Generator
                </a>
            </nav>
        </header>
    );
};
