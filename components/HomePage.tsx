import React from 'react';
import type { Page } from '../App';
import { FeatureCard } from './FeatureCard';

interface HomePageProps {
  setPage: (page: Page) => void;
}

const MusicNoteIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 text-indigo-400">
        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
    </svg>
);
const MixerIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 text-indigo-400">
        <path d="M3 3v18h18V3H3zm4 14H5v-2h2v2zm0-4H5v-2h2v2zm0-4H5V7h2v2zm4 8H9v-2h2v2zm0-4H9v-2h2v2zm0-4H9V7h2v2zm4 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2zm4 8h-2v-2h2v2zm0-4h-2v-2h2v2z" transform="scale(1, -1) translate(0, -24)" />
        <path d="M10 10h4v2h-4zM10 14h4v2h-4z" />
    </svg>
);
const DrumIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 text-indigo-400">
        <path d="M20 6h-2.18c-.45-1.73-2-3-3.82-3-1.82 0-3.37 1.27-3.82 3H8c-2.21 0-4 1.79-4 4v4c0 2.21 1.79 4 4 4h8c2.21 0 4-1.79 4-4v-4c0-2.21-1.79-4-4-4zm-4-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-4 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm4 12h-4c-1.1 0-2-.9-2-2s.9-2 2-2h4c1.1 0 2 .9 2 2s-.9 2-2 2z" />
    </svg>
);
const BulbIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 text-indigo-400">
        <path d="M12 2a7 7 0 00-7 7c0 1.93.84 3.68 2.2 4.93L6 16.5V18h12v-1.5l-1.2-2.57A7.002 7.002 0 0019 9a7 7 0 00-7-7zM9 21a1 1 0 001 1h4a1 1 0 001-1v-1H9v1z" />
    </svg>
);

const features = [
    {
        title: "AI Chord Generator",
        description: "Break creative blocks with harmonically rich chord progressions tailored to your mood, key, and complexity.",
        icon: <MusicNoteIcon />,
        buttonText: "Start Creating",
        page: "generator" as Page
    },
    {
        title: "Mixing & Mastering",
        description: "Elevate your tracks with professional services, using both top-tier digital and legendary analog gear.",
        icon: <MixerIcon />,
        buttonText: "View Services",
        page: "mixing" as Page
    },
    {
        title: "Free Drum Kits",
        description: "Download high-quality, royalty-free drum samples and loop packs to give your beats a professional edge.",
        icon: <DrumIcon />,
        buttonText: "Get Packs",
        page: "drum-packs" as Page
    },
    {
        title: "Artist Advice",
        description: "Read our straightforward guide for indie artists to avoid common pitfalls and focus on your creative growth.",
        icon: <BulbIcon />,
        buttonText: "Read Guide",
        page: "advice" as Page
    }
];

export const HomePage: React.FC<HomePageProps> = ({ setPage }) => {
    return (
        <div className="animate-fade-in space-y-16">
            <div className="text-center p-8 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl shadow-2xl">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                    Your Sound, Elevated.
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-300">
                    Welcome to your all-in-one resource for music creation. From AI-powered tools that spark inspiration to professional audio services that make your music shine.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {features.map((feature) => (
                    <FeatureCard
                        key={feature.title}
                        title={feature.title}
                        description={feature.description}
                        icon={feature.icon}
                        buttonText={feature.buttonText}
                        onClick={() => setPage(feature.page)}
                    />
                ))}
            </div>

            <style>{`.animate-fade-in { animation: fadeIn 0.5s ease-in-out; } @keyframes fadeIn { 0% { opacity: 0; } 100% { opacity: 1; } }`}</style>
        </div>
    );
};
