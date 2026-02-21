import React from 'react';

export default function AnimalSelection({ onSelectAnimal, onBack }) {
  // Animal list - all 10 animals!
  const animals = [
    {
      id: 'lion',
      name: 'אריה',
      emoji: '🦁',
      image: '/images/lion.jpg',
      audio: '/sounds/arye.mp3'
    },
    {
      id: 'elephant',
      name: 'פיל',
      emoji: '🐘',
      image: '/images/elephant.jpg',
      audio: '/sounds/pil.mp3'
    },
    {
      id: 'parrot',
      name: 'תוקי',
      emoji: '🦜',
      image: '/images/parrot.jpg',
      audio: '/sounds/tuki.mp3'
    },
    {
      id: 'fox',
      name: 'שועל',
      emoji: '🦊',
      image: '/images/fox.jpg',
      audio: '/sounds/shual.mp3'
    },
    {
      id: 'dog',
      name: 'כלב',
      emoji: '🐕',
      image: '/images/dog.jpg',
      audio: '/sounds/kelev.mp3'
    },
    {
      id: 'cat',
      name: 'חתול',
      emoji: '🐱',
      image: '/images/cat.jpg',
      audio: '/sounds/chatul.mp3'
    },
    {
      id: 'camel',
      name: 'גמל',
      emoji: '🐪',
      image: '/images/camel.jpg',
      audio: '/sounds/gamal.mp3'
    },
    {
      id: 'peacock',
      name: 'טווס',
      emoji: '🦚',
      image: '/images/peacock.jpg',
      audio: '/sounds/tavus.mp3'
    },
    {
      id: 'horse',
      name: 'סוס',
      emoji: '🐴',
      image: '/images/horse.jpg',
      audio: '/sounds/sus.mp3'
    },
    {
      id: 'dove',
      name: 'יונה',
      emoji: '🕊️',
      image: '/images/dove.jpg',
      audio: '/sounds/yona.mp3'
    }
  ];

  return (
    <div style={{
      width: '100%',
      height: '100vh',
      background: 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',
      display: 'flex',
      flexDirection: 'column',
      padding: '20px',
      direction: 'rtl',
      fontFamily: 'Arial, sans-serif',
      overflow: 'auto'
    }}>
      
      {/* Header with back button */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '30px',
        gap: '20px'
      }}>
        <button
          onClick={onBack}
          style={{
            padding: '15px 30px',
            fontSize: '24px',
            backgroundColor: 'rgba(255,255,255,0.3)',
            color: 'white',
            border: '2px solid white',
            borderRadius: '15px',
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: 'all 0.3s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.3)';
          }}
        >
          ← חזרה
        </button>
        
        <div style={{
          fontSize: '48px',
          fontWeight: 'bold',
          color: 'white',
          textShadow: '3px 3px 6px rgba(0,0,0,0.3)'
        }}>
          בחר חיה
        </div>
      </div>

      {/* Animal Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '25px',
        padding: '20px',
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%'
      }}>
        {animals.map((animal) => (
          <div
            key={animal.id}
            onClick={() => onSelectAnimal(animal)}
            style={{
              backgroundColor: 'white',
              borderRadius: '20px',
              padding: '30px',
              cursor: 'pointer',
              boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
              transition: 'transform 0.3s, box-shadow 0.3s',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '200px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px) scale(1.05)';
              e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.2)';
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)';
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px) scale(1.05)';
            }}
          >
            <div style={{
              fontSize: '80px',
              marginBottom: '15px'
            }}>
              {animal.emoji}
            </div>
            <div style={{
              fontSize: '36px',
              fontWeight: 'bold',
              color: '#4CAF50'
            }}>
              {animal.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
