export interface DrumPack {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    downloadUrl: string;
    genre: string[];
}

// COMMENT CRÉER UN LIEN DE TÉLÉCHARGEMENT DIRECT GOOGLE DRIVE :
// 1. Uploadez votre fichier .zip sur Google Drive.
// 2. Clic droit sur le fichier -> "Partager" -> "Partager".
// 3. Sous "Accès général", changez pour "Tous les utilisateurs disposant du lien".
// 4. Cliquez sur "Copier le lien". Vous obtiendrez un lien comme :
//    https://drive.google.com/file/d/FILE_ID/view?usp=sharing
// 5. Copiez le FILE_ID de ce lien.
// 6. Collez-le dans ce format d'URL :
//    https://drive.google.com/uc?export=download&id=VOTRE_FILE_ID_ICI
// Cette nouvelle URL est votre lien de téléchargement direct.

export const drumPacksData: DrumPack[] = [
    {
        id: 1,
        name: 'Trap Drums & Loops - Pack 1',
        description: 'The first in our professional Trap series. Contains hard-hitting 808s, crispy hi-hats, punchy snares, and unique melody loops to kickstart your next hit.',
        imageUrl: 'https://images.unsplash.com/photo-1581329245138-ab4a53acc329?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600',
        downloadUrl: 'https://download.drive.shadow.tech/s/CqY64WBZn3wWYeW',
        genre: ['Trap']
    }
];
