import React, { useMemo } from 'react';
import { drumPacksData } from '../data/drum-packs';
import type { DrumPack } from '../data/drum-packs';
import { DrumPackCard } from './DrumPackCard';

export const DrumPacksPage: React.FC = () => {
    
    const groupedPacks = useMemo(() => {
        const groups: { [key: string]: DrumPack[] } = {};
        
        drumPacksData.forEach(pack => {
            pack.genre.forEach(g => {
                if (!groups[g]) {
                    groups[g] = [];
                }
                groups[g].push(pack);
            });
        });

        return groups;
    }, []);

    const genreOrder = Object.keys(groupedPacks).sort();

    return (
        <div className="animate-fade-in">
            <div className="text-center p-8 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl shadow-2xl mb-12">
                <h1 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                    Free Drum Kits & Loop Packs
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-300">
                    High-quality, royalty-free drum samples to kickstart your productions.
                </p>
                <p className="mt-2 text-gray-400 max-w-3xl mx-auto">
                    All packs are carefully crafted to provide you with the sounds you need for Hip-Hop, Trap, Pop, and more.
                </p>
            </div>

            <div className="space-y-16">
                {genreOrder.map((genre) => (
                    <section key={genre}>
                        <h2 className="text-3xl font-bold tracking-tight text-gray-100 sm:text-4xl border-b-2 border-indigo-500/30 pb-3 mb-8">
                           {genre}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {groupedPacks[genre].map(pack => (
                                <DrumPackCard key={`${pack.id}-${genre}`} pack={pack} />
                            ))}
                        </div>
                    </section>
                ))}
            </div>

            <style>{`.animate-fade-in { animation: fadeIn 0.5s ease-in-out; } @keyframes fadeIn { 0% { opacity: 0; } 100% { opacity: 1; } }`}</style>
        </div>
    );
};
