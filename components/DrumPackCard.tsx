import React from 'react';
import type { DrumPack } from '../data/drum-packs';

interface DrumPackCardProps {
    pack: DrumPack;
}

const DownloadIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
        <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z" />
        <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
    </svg>
);


export const DrumPackCard: React.FC<DrumPackCardProps> = ({ pack }) => {
    return (
        <div className="group bg-gray-800/60 backdrop-blur-md border border-gray-700 rounded-lg shadow-lg overflow-hidden flex flex-col transition-all duration-300 hover:border-indigo-500/50 hover:shadow-indigo-500/10 hover:-translate-y-1">
            <div className="relative h-48 w-full overflow-hidden p-5 flex flex-col justify-end bg-gray-900">
                {/* Fond abstrait */}
                <div 
                    className="absolute inset-0 opacity-70"
                    style={{
                        backgroundImage: `
                            radial-gradient(at 20% 100%, hsla(237, 50%, 40%, 0.3) 0px, transparent 50%),
                            radial-gradient(at 80% 0%, hsla(190, 70%, 55%, 0.25) 0px, transparent 50%),
                            radial-gradient(at 50% 50%, hsla(240, 10%, 10%, 0.9) 0px, transparent 70%)
                        `
                    }}
                ></div>
                
                {/* Superposition de dégradé pour le contraste du texte */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
                
                {/* Contenu */}
                <div className="relative z-10">
                    <h3 className="font-bebas text-4xl text-white tracking-widest uppercase drop-shadow-md">
                        {pack.name}
                    </h3>
                     <div className="flex flex-wrap gap-2 mt-2">
                        {pack.genre.map(g => (
                            <span key={g} className="px-3 py-1 text-xs font-semibold text-cyan-200 bg-cyan-800/60 rounded-full border border-cyan-700/50">
                                {g}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
            
            <div className="p-5 flex flex-col flex-grow">
                <p className="text-gray-400 text-sm flex-grow mb-6">{pack.description}</p>
                <a
                    href={pack.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto w-full inline-flex items-center justify-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-md shadow-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-gray-900 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-transform transform group-hover:scale-105"
                >
                    <DownloadIcon className="w-5 h-5 mr-2" />
                    Download for Free
                </a>
            </div>
        </div>
    );
};
