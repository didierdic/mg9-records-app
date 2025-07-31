// Test des fonctions Netlify en local
async function testNetlifyFunctions() {
  const baseUrl = 'http://localhost:8889/.netlify/functions';
  
  console.log('🧪 Test des fonctions Netlify...');
  
  // Test de generateProgression
  try {
    console.log('📝 Test de generateProgression...');
    const progressionResponse = await fetch(`${baseUrl}/generateProgression`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        key: 'C',
        style: 'jazz',
        complexity: 'intermediate'
      })
    });
    
    if (progressionResponse.ok) {
      const progressionData = await progressionResponse.json();
      console.log('✅ generateProgression fonctionne:', progressionData);
    } else {
      console.error('❌ generateProgression échoué:', progressionResponse.status, await progressionResponse.text());
    }
  } catch (error) {
    console.error('❌ Erreur generateProgression:', error);
  }
  
  // Test de generateSubstitutions
  try {
    console.log('📝 Test de generateSubstitutions...');
    const substitutionsResponse = await fetch(`${baseUrl}/generateSubstitutions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chord: 'Cmaj7',
        key: 'C',
        style: 'jazz'
      })
    });
    
    if (substitutionsResponse.ok) {
      const substitutionsData = await substitutionsResponse.json();
      console.log('✅ generateSubstitutions fonctionne:', substitutionsData);
    } else {
      console.error('❌ generateSubstitutions échoué:', substitutionsResponse.status, await substitutionsResponse.text());
    }
  } catch (error) {
    console.error('❌ Erreur generateSubstitutions:', error);
  }
}

// Exécuter les tests quand la page est chargée
if (typeof window !== 'undefined') {
  window.testNetlifyFunctions = testNetlifyFunctions;
  console.log('🔧 Fonctions de test disponibles. Exécutez testNetlifyFunctions() dans la console.');
}