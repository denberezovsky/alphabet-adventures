import React from 'react';

export default function LandingPage({ onSelectModule }) {
  const modules = [
    {
      id: 'animals',
      title: 'חיות',
      emoji: '🦁',
      color: '#4CAF50',
      gradient: 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)'
    },
    {
      id: 'colors',
      title: 'צבעים',
      emoji: '🎨',
      color: '#FF9800',
      gradient: 'linear-gradient(135deg, #FF9800 0%, #F57C00 100%)'
    },
    {
      id: 'fruits',
      title: 'פירות',
      emoji: '🍎',
      color: '#E91E63',
      gradient: 'linear-gradient(135deg, #E91E63 0%, #C2185B 100%)'
    },
    {
      id: 'vegetables',
      title: 'ירקות',
      emoji: '🥕',
      color: '#8BC34A',
      gradient: 'linear-gradient(135deg, #8BC34A 0%, #689F38 100%)'
    },
    {
      id: 'body',
      title: 'גוף',
      emoji: '👋',
      color: '#FF5722',
      gradient: 'linear-gradient(135deg, #FF5722 0%, #E64A19 100%)'
    },
    {
      id: 'clothes',
      title: 'בגדים',
      emoji: '👕',
      color: '#9C27B0',
      gradient: 'linear-gradient(135deg, #9C27B0 0%, #7B1FA2 100%)'
    },
    {
      id: 'transportation',
      title: 'כלי תחבורה',
      emoji: '🚗',
      color: '#2196F3',
      gradient: 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)'
    },
    {
      id: 'house',
      title: 'בית',
      emoji: '🏠',
      color: '#795548',
      gradient: 'linear-gradient(135deg, #795548 0%, #5D4037 100%)'
    },
    {
      id: 'professions',
      title: 'מקצועות',
      emoji: '👨‍⚕️',
      color: '#00BCD4',
      gradient: 'linear-gradient(135deg, #00BCD4 0%, #0097A7 100%)'
    },
    {
      id: 'shapes',
      title: 'צורות',
      emoji: '⭐',
      color: '#FFC107',
      gradient: 'linear-gradient(135deg, #FFC107 0%, #FFA000 100%)'
    }
  ];

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      direction: 'rtl',
      fontFamily: 'Arial, sans-serif',
      overflow: 'auto'
    }}>
      
      {/* Title */}
      <div style={{
        fontSize: '64px',
        fontWeight: 'bold',
        color: 'white',
        marginBottom: '50px',
        textShadow: '4px 4px 8px rgba(0,0,0,0.3)',
        animation: 'fadeIn 1s ease-in',
        textAlign: 'center'
      }}>
        !בואו נלמד עברית
      </div>

      {/* Module Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '25px',
        maxWidth: '1200px',
        width: '100%',
        padding: '0 20px'
      }}>
        {modules.map((module) => (
          <div
            key={module.id}
            onClick={() => onSelectModule(module.id)}
            style={{
              background: module.gradient,
              borderRadius: '25px',
              padding: '35px 25px',
              cursor: 'pointer',
              boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
              transition: 'transform 0.3s, box-shadow 0.3s',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '200px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px) scale(1.05)';
              e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
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
              marginBottom: '15px',
              animation: 'bounce 2s infinite'
            }}>
              {module.emoji}
            </div>
            <div style={{
              fontSize: '32px',
              fontWeight: 'bold',
              color: 'white',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              textAlign: 'center'
            }}>
              {module.title}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
      `}</style>
    </div>
  );
}
