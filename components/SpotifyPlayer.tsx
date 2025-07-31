import React from 'react';

export const SpotifyPlayer: React.FC = () => {
  const spotifyTrackId = '49JG76MIi3n15gUIbBq8tD';
  // L'URL d'intégration utilise theme=0 pour le mode sombre, qui correspond au design du site.
  const embedUrl = `https://open.spotify.com/embed/track/${spotifyTrackId}?utm_source=generator&theme=0`;

  return (
    <footer className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-12 w-full">
      <h2 className="text-2xl font-bold text-gray-300 text-center mb-6">
        Get Inspired
      </h2>
      <div className="flex justify-center shadow-2xl rounded-xl overflow-hidden border border-gray-700">
        <iframe
          style={{ borderRadius: '12px' }}
          src={embedUrl}
          width="100%"
          height="152"
          frameBorder="0"
          allowFullScreen
          // L'attribut 'allow' est crucial pour l'autoplay, bien que les navigateurs puissent toujours le bloquer.
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          title="Spotify Player"
        ></iframe>
      </div>
    </footer>
  );
};
