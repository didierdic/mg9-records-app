import React from 'react';

const BulbIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 2a7 7 0 00-7 7c0 1.93.84 3.68 2.2 4.93L6 16.5V18h12v-1.5l-1.2-2.57A7.002 7.002 0 0019 9a7 7 0 00-7-7zM9 21a1 1 0 001 1h4a1 1 0 001-1v-1H9v1z" />
    </svg>
);

const ArticleSection: React.FC<{ title: string; children: React.ReactNode; isSubSection?: boolean }> = ({ title, children, isSubSection = false }) => (
    <div className="mb-10">
        {isSubSection ? (
            <h3 className="text-2xl font-bold text-indigo-400 mb-3">{title}</h3>
        ) : (
            <h2 className="text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-cyan-400 mb-4">{title}</h2>
        )}
        <div className="prose prose-invert prose-lg max-w-none text-gray-300">
            {children}
        </div>
    </div>
);

export const ArtistAdvicePage: React.FC = () => {
    const advicePoints = [
        {
            title: "1. Invest in great headphones, not expensive monitors",
            content: "Forget about complicated room treatment or buying high-end studio monitors right away. A really good pair of headphones will give you much better accuracy, especially if your room isn’t treated. Use basic or midrange monitors just for a second opinion—that’s more than enough when starting out."
        },
        {
            title: "2. Don’t waste your time trying to mix and master everything yourself",
            content: "If your main goal is to be an artist—not a sound engineer—don’t get bogged down in the technical side. Mixing and mastering are real crafts that take years to master. If you can, leave that to the pros and focus on what matters most: your writing, your voice, your creativity. The more time you spend on technical stuff, the less you’ll progress as an artist."
        },
        {
            title: "3. Beware the plugin trap",
            content: "Don’t fall for endless plugin shopping sprees. It’s a common trap. If you do want to experiment with your vocal sound, stick to a good all-in-one plugin (like Pulsar Audio’s Vocal Pro or THR Audio’s Vox Guru). Just keep in mind that even these require some learning if you want professional results."
        },
        {
            title: "4. Set a marketing budget and plan your strategy",
            content: "Millions of songs are released every day. Even if your tracks are amazing, without a strategy and a budget for promotion, your music could get lost in the crowd. Take the time to learn the basics of marketing and communication. Your visibility is as important as your music when you’re independent."
        },
        {
            title: "5. Focus on artistic growth before anything else",
            content: "Great music should always be your top priority. Don’t get distracted: work on your songwriting, your voice, your unique style. When you feel ready artistically, then go all-in on promotion. But don’t wait for perfection—release your music and learn as you go."
        }
    ];

    const finalWords = [
        "Gear doesn’t make the artist.",
        "Mixing is an art that takes years.",
        "If you want your music to live, you need to know how to share it."
    ];

    return (
        <div className="animate-fade-in max-w-4xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl shadow-2xl p-8 md:p-12">
                <header className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-100">
                        Quick Guide for Independent Artists
                    </h1>
                    <p className="mt-4 text-xl text-gray-400">
                        What I Wish I Knew When I Started
                    </p>
                </header>

                <ArticleSection title="Why this guide?">
                    <p>
                        After 7 years experimenting in my home studio—wasting time and money on useless gear and getting lost in technical details—I decided to share what I’ve learned. The goal here isn’t to tell my life story, but to help you avoid the mistakes I made, save you precious time, and keep you from wasting money on gear and plugins you don’t really need.
                    </p>
                </ArticleSection>

                <div className="space-y-12">
                    {advicePoints.map((point, index) => (
                        <ArticleSection key={index} title={point.title} isSubSection>
                            <p>{point.content}</p>
                        </ArticleSection>
                    ))}
                </div>

                <div className="mt-16 pt-8 border-t border-gray-700">
                     <h2 className="text-3xl font-extrabold tracking-tight text-center text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-cyan-400 mb-6">What I wish someone told me at the start:</h2>
                    <div className="space-y-4">
                        {finalWords.map((word, index) => (
                             <blockquote key={index} className="bg-gray-800/60 p-4 rounded-lg border-l-4 border-indigo-500 text-center italic">
                                <p className="text-xl text-gray-200">"{word}"</p>
                            </blockquote>
                        ))}
                    </div>
                </div>
            </div>
            <style>{`
                .animate-fade-in { animation: fadeIn 0.5s ease-in-out; } 
                @keyframes fadeIn { 0% { opacity: 0; transform: translateY(10px); } 100% { opacity: 1; transform: translateY(0); } }
                .prose-invert a { color: #818cf8; }
                .prose-invert a:hover { color: #6366f1; }
            `}</style>
        </div>
    );
};
