'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Header: React.FC = () => {
  const navItemClasses = "px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer flex-grow text-center";
  const activeClasses = "bg-indigo-600 text-white";
  const inactiveClasses = "text-gray-300 hover:bg-gray-700 hover:text-white";
  // Use current pathname to determine active
  // But for simplicity, since no page prop, perhaps use usePathname
  // Add import { usePathname } from 'next/navigation';
  const pathname = usePathname();

    return (
        <header className="text-center mb-8 md:mb-12">
            <h1 className="font-bebas text-5xl sm:text-6xl md:text-7xl font-bold tracking-wider text-gray-100 uppercase" style={{ letterSpacing: '0.1em' }}>
                mg9 records
            </h1>
            <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-400 tracking-wide">
                Professional Audio Services & AI-Powered Music Creation Tools
            </p>
            <nav className="mt-8 flex flex-wrap justify-center items-center gap-2 p-1.5 bg-gray-800/60 backdrop-blur-md border border-gray-700 rounded-full max-w-3xl sm:max-w-4xl mx-auto">
                <Link href="/" className={`${navItemClasses} ${pathname === '/' ? activeClasses : inactiveClasses}`}>Home</Link>
                <Link href="/advice" className={`${navItemClasses} ${pathname === '/advice' ? activeClasses : inactiveClasses}`}>Artist Advice</Link>
                <Link href="/drum-packs" className={`${navItemClasses} ${pathname === '/drum-packs' ? activeClasses : inactiveClasses}`}>Free Drum Kits</Link>
                <Link href="/mixing" className={`${navItemClasses} ${pathname === '/mixing' ? activeClasses : inactiveClasses}`}>Mixing & Mastering</Link>
                <Link href="/generator" className={`${navItemClasses} ${pathname === '/generator' ? activeClasses : inactiveClasses}`}>AI Chord Generator</Link>
            </nav>
        </header>
    );
};
