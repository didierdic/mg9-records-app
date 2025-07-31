import React from 'react';

export const Welcome: React.FC = () => {
    return (
        <div className="text-center py-10 px-6 mt-8 bg-gray-800/40 backdrop-blur-sm border border-gray-700 rounded-lg">
            <div className="max-w-2xl mx-auto">
                <svg className="mx-auto h-12 w-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z"></path>
                </svg>
                <h2 className="mt-4 text-2xl font-semibold text-gray-200">Welcome to Your Music Studio</h2>
                <p className="mt-2 text-md text-gray-400">
                    Stuck in a creative block or just looking for new composition ideas? Use the controls above to set the stage:
                </p>
                <ul className="mt-4 text-left list-disc list-inside text-gray-400 space-y-2">
                    <li><span className="font-semibold text-gray-300">Describe the Mood:</span> Tell the AI the emotion you want to convey. Be specific for better results!</li>
                    <li><span className="font-semibold text-gray-300">Choose a Key:</span> Set the tonal center for your chord progression.</li>
                    <li><span className="font-semibold text-gray-300">Select Complexity:</span> From simple pop to advanced jazz, choose the harmonic language.</li>
                </ul>
                <p className="mt-6 text-gray-400">
                    Click <span className="font-bold text-indigo-400">"Generate Chords"</span> to find new and inspiring harmony.
                </p>
            </div>
        </div>
    );
};
