import React, { useState } from 'react';
import { Header } from './components/Header';
import { SpotifyPlayer } from './components/SpotifyPlayer';
import { PlaybackProvider } from './contexts/PlaybackContext';
import { HomePage } from './components/HomePage';
import { ChordGeneratorPage } from './components/ChordGeneratorPage';
import { MixingMasteringPage } from './components/MixingMasteringPage';
import { DrumPacksPage } from './components/DrumPacksPage';
import { ArtistAdvicePage } from './components/ArtistAdvicePage';

export type Page = 'home' | 'generator' | 'mixing' | 'drum-packs' | 'advice';

export default function App() {
  const [page, setPage] = useState<Page>('home');

  return (
    <PlaybackProvider>
      <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
        <div className="relative isolate min-h-screen">
          <div 
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" 
            aria-hidden="true">
            <div 
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#8085ff] to-[#4f46e5] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" 
              style={{
                clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div>

          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Header page={page} setPage={setPage} />
            
            <div className="mt-8">
              {page === 'home' && <HomePage setPage={setPage} />}
              {page === 'generator' && <ChordGeneratorPage />}
              {page === 'mixing' && <MixingMasteringPage />}
              {page === 'drum-packs' && <DrumPacksPage />}
              {page === 'advice' && <ArtistAdvicePage />}
            </div>
          </main>
          
          <SpotifyPlayer />

          <div 
            className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" 
            aria-hidden="true"
          >
            <div 
              className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#4f46e5] to-[#8085ff] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" 
              style={{
                clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
              }}
            />
          </div>
        </div>
      </div>
    </PlaybackProvider>
  );
}
