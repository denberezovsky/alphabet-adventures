import React, { useState } from 'react';
import LandingPage from './LandingPage';
import AnimalSelection from './AnimalSelection';
import AnimalSpellingGame from './AnimalSpellingGame';

function App() {
  const [currentScreen, setCurrentScreen] = useState('landing'); // landing, animals, numbers, colors, game
  const [selectedAnimal, setSelectedAnimal] = useState(null);

  const handleSelectModule = (moduleId) => {
    if (moduleId === 'animals') {
      setCurrentScreen('animals');
    } else {
      // All other categories - coming soon
      const categoryNames = {
        'colors': 'צבעים',
        'fruits': 'פירות',
        'vegetables': 'ירקות',
        'body': 'גוף',
        'clothes': 'בגדים',
        'transportation': 'כלי תחבורה',
        'house': 'בית',
        'professions': 'מקצועות',
        'shapes': 'צורות'
      };
      alert(`${categoryNames[moduleId]} - בקרוב!`);
    }
  };

  const handleSelectAnimal = (animal) => {
    setSelectedAnimal(animal);
    setCurrentScreen('game');
  };

  const handleBackToAnimals = () => {
    setSelectedAnimal(null);
    setCurrentScreen('animals');
  };

  const handleBackToLanding = () => {
    setSelectedAnimal(null);
    setCurrentScreen('landing');
  };

  return (
    <div className="App">
      {currentScreen === 'landing' && (
        <LandingPage onSelectModule={handleSelectModule} />
      )}
      
      {currentScreen === 'animals' && (
        <AnimalSelection 
          onSelectAnimal={handleSelectAnimal}
          onBack={handleBackToLanding}
        />
      )}
      
      {currentScreen === 'game' && selectedAnimal && (
        <AnimalSpellingGame 
          animal={selectedAnimal}
          onBack={handleBackToAnimals}
        />
      )}
    </div>
  );
}

export default App;
