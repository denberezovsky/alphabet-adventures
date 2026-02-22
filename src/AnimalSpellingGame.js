import React, { useState, useEffect } from 'react';

export default function AnimalSpellingGame({ animal, onBack }) {
  const [gameState, setGameState] = useState('start'); // start, intro, playing, success
  const [draggedLetter, setDraggedLetter] = useState(null);
  const [placedLetters, setPlacedLetters] = useState({});
  const [confetti, setConfetti] = useState([]); // For confetti animation
  const audioRef = React.useRef(null); // Reference to audio element
  const [touchStart, setTouchStart] = useState(null); // Touch drag start position
  const [touchCurrent, setTouchCurrent] = useState(null); // Current touch position
  const [draggingLetter, setDraggingLetter] = useState(null); // Letter being dragged
  
  const word = animal.name;
  const letters = word.split('');
  const imageUrl = animal.image;
  const audioUrl = animal.audio;
  
  // Debug logging
  console.log('Image URL:', imageUrl);
  console.log('Audio URL:', audioUrl);
  
  // Random positions for scattered letters
  const [letterPositions] = useState(() => {
    return letters.map((_, index) => ({
      top: Math.random() * 60 + 20, // 20-80%
      left: Math.random() * 70 + 10, // 10-80%
    }));
  });

  useEffect(() => {
    if (gameState === 'intro' && audioRef.current) {
      console.log('Intro state - starting audio playback');
      console.log('Audio element:', audioRef.current);
      console.log('Audio src:', audioRef.current.src);
      
      let count = 0;
      
      const playAudio = () => {
        if (count < 2 && audioRef.current) {
          console.log(`Playing audio attempt ${count + 1}`);
          audioRef.current.currentTime = 0;
          audioRef.current.play()
            .then(() => console.log('Audio playing successfully'))
            .catch(err => {
              console.error('Play failed:', err);
              setTimeout(() => setGameState('playing'), 500);
            });
          count++;
        }
      };
      
      const handleEnded = () => {
        console.log('Audio ended, count:', count);
        if (count < 2) {
          setTimeout(playAudio, 500);
        } else {
          console.log('Moving to playing state');
          setTimeout(() => setGameState('playing'), 500);
        }
      };
      
      if (audioRef.current) {
        audioRef.current.addEventListener('ended', handleEnded);
        audioRef.current.addEventListener('error', (e) => {
          console.error('Audio error event:', e);
        });
        playAudio();
      }
      
      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener('ended', handleEnded);
          audioRef.current.pause();
        }
      };
    }
  }, [gameState]);

  // Check if game is won
  useEffect(() => {
    // Win condition: all boxes are filled (they're already correct due to handleDrop validation)
    if (Object.keys(placedLetters).length === letters.length) {
      setTimeout(() => {
        setGameState('success');
        
        // Generate MORE confetti! 150 pieces
        const newConfetti = [];
        for (let i = 0; i < 150; i++) {
          newConfetti.push({
            id: i,
            left: Math.random() * 100,
            delay: Math.random() * 0.5,
            duration: 2 + Math.random() * 2,
            color: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F06292', '#BA68C8'][Math.floor(Math.random() * 8)]
          });
        }
        setConfetti(newConfetti);
        
        // Play celebration sound
        playSound(523, 0.15, 'sine'); // C note
        setTimeout(() => playSound(659, 0.15, 'sine'), 150); // E note
        setTimeout(() => playSound(784, 0.3, 'sine'), 300); // G note
        
        // Add clapping sounds (5 claps)
        setTimeout(() => playClap(), 500);
        setTimeout(() => playClap(), 700);
        setTimeout(() => playClap(), 900);
        setTimeout(() => playClap(), 1100);
        setTimeout(() => playClap(), 1300);
        
        // Say the word again using your voice recording
        setTimeout(() => {
          console.log('Playing celebration audio');
          if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play()
              .then(() => {
                console.log('Celebration audio playing');
              })
              .catch(err => console.error('Celebration audio failed:', err));
          } else {
            console.error('audioRef.current is null during celebration');
          }
        }, 400);
      }, 300);
    }
  }, [placedLetters, letters.length]);

  const handleDragStart = (letterIndex, e) => {
    setDraggedLetter(letterIndex);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (boxIndex, e) => {
    e.preventDefault();
    if (draggedLetter !== null) {
      // Only accept if the dragged letter belongs in this box position
      if (draggedLetter === boxIndex && letters[draggedLetter] === letters[boxIndex]) {
        setPlacedLetters(prev => ({
          ...prev,
          [boxIndex]: letters[boxIndex]
        }));
        setDraggedLetter(null);
        
        // Play success sound (simple frequency beep)
        playSound(800, 0.1, 'sine'); // High pleasant beep
      } else {
        // Wrong letter - don't accept it, reset drag
        setDraggedLetter(null);
        
        // Play error sound (lower frequency)
        playSound(200, 0.2, 'sawtooth'); // Lower "bonk" sound
      }
    }
  };

  // Touch drag handlers for mobile
  const handleTouchStart = (letterIndex, e) => {
    e.stopPropagation();
    const touch = e.touches[0];
    setDraggingLetter(letterIndex);
    setTouchStart({ x: touch.clientX, y: touch.clientY });
    setTouchCurrent({ x: touch.clientX, y: touch.clientY });
    console.log('✅ Touch START on letter:', letterIndex, 'at', touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e) => {
    if (draggingLetter !== null && e.touches[0]) {
      e.preventDefault(); // Prevent scrolling
      const touch = e.touches[0];
      setTouchCurrent({ x: touch.clientX, y: touch.clientY });
      console.log('📍 Touch MOVE - dragging letter:', draggingLetter, 'to', touch.clientX, touch.clientY);
    }
  };

  const handleTouchEnd = (e) => {
    console.log('🔚 Touch END - draggingLetter:', draggingLetter, 'touchCurrent:', touchCurrent);
    
    if (draggingLetter !== null && touchCurrent) {
      const dropX = touchCurrent.x;
      const dropY = touchCurrent.y;
      
      console.log('🎯 Looking for box at position:', dropX, dropY);
      
      const boxes = document.querySelectorAll('[data-box-index]');
      let droppedOnBox = null;
      
      boxes.forEach((box) => {
        const rect = box.getBoundingClientRect();
        console.log('📦 Box', box.getAttribute('data-box-index'), 'rect:', rect.left, rect.top, rect.right, rect.bottom);
        if (dropX >= rect.left && dropX <= rect.right && dropY >= rect.top && dropY <= rect.bottom) {
          droppedOnBox = parseInt(box.getAttribute('data-box-index'));
          console.log('✅ Found box!', droppedOnBox);
        }
      });
      
      console.log('📌 Dropped letter', draggingLetter, 'on box', droppedOnBox);
      
      if (droppedOnBox !== null && draggingLetter === droppedOnBox) {
        console.log('🎉 CORRECT! Placing letter');
        setPlacedLetters(prev => ({ ...prev, [droppedOnBox]: letters[draggingLetter] }));
        playSound(800, 0.1, 'sine');
      } else if (droppedOnBox !== null) {
        console.log('❌ WRONG box!');
        playSound(200, 0.2, 'sawtooth');
      } else {
        console.log('⚠️ Not dropped on any box');
      }
      
      setDraggingLetter(null);
      setTouchStart(null);
      setTouchCurrent(null);
    }
  };

  // Simple sound generator using Web Audio API
  const playSound = (frequency, duration, type = 'sine') => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = frequency;
      oscillator.type = type;
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration);
    } catch (error) {
      console.log('Audio not supported');
    }
  };

  // Clapping sound effect (white noise bursts)
  const playClap = () => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const bufferSize = audioContext.sampleRate * 0.05; // 50ms
      const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
      const data = buffer.getChannelData(0);
      
      // Generate white noise
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      
      const noise = audioContext.createBufferSource();
      noise.buffer = buffer;
      
      const gainNode = audioContext.createGain();
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);
      
      noise.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      noise.start();
    } catch (error) {
      console.log('Audio not supported');
    }
  };

  const handleBoxClick = (boxIndex) => {
    console.log('Box clicked:', boxIndex, 'Touched letter:', draggingLetter);
    
    // If a letter is selected
    if (draggingLetter !== null) {
      // Check if the selected letter belongs in THIS box
      if (letters[boxIndex] === letters[draggingLetter] && boxIndex === draggingLetter) {
        console.log('CORRECT! Letter', letters[draggingLetter], 'placed in position', boxIndex);
        setPlacedLetters(prev => ({
          ...prev,
          [boxIndex]: letters[draggingLetter]
        }));
        setDraggingLetter(null);
        playSound(800, 0.1, 'sine'); // Success sound
      } else {
        console.log('WRONG! Letter does not belong here');
        setDraggingLetter(null);
        playSound(200, 0.2, 'sawtooth'); // Error sound
      }
    } else if (placedLetters[boxIndex]) {
      console.log('Removing letter from box', boxIndex);
      // Remove letter from box
      setPlacedLetters(prev => {
        const updated = { ...prev };
        delete updated[boxIndex];
        return updated;
      });
    }
  };

  const resetGame = () => {
    setGameState('start'); // Changed from 'intro' to 'start'
    setPlacedLetters({});
    setDraggedLetter(null);
    setConfetti([]); // Clear confetti
  };

  // Get available letters (not yet placed) - handle duplicates properly
  const getAvailableLetters = () => {
    const available = [];
    const usedIndices = new Set(Object.keys(placedLetters).map(k => parseInt(k)));
    
    letters.forEach((letter, index) => {
      if (!usedIndices.has(index)) {
        available.push({ letter, originalIndex: index });
      }
    });
    
    return available;
  };

  return (
    <div 
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
      width: '100%',
      height: '100vh',
      position: 'relative',
      overflow: 'hidden',
      backgroundImage: `linear-gradient(rgba(255,255,255,${gameState === 'success' ? '0' : '0.3'}), rgba(255,255,255,${gameState === 'success' ? '0' : '0.3'})), url(${imageUrl})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      fontFamily: 'Arial, sans-serif',
      direction: 'rtl',
      transition: 'background-image 0.5s ease-in-out'
    }}>
      
      {/* Hidden audio element */}
      <audio ref={audioRef} src={audioUrl} preload="auto" />
      
      {/* Back button - only show during playing state */}
      {gameState === 'playing' && (
        <button
          onClick={onBack}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            padding: '10px 20px',
            fontSize: '20px',
            backgroundColor: 'rgba(255,255,255,0.8)',
            color: '#333',
            border: '2px solid #4CAF50',
            borderRadius: '10px',
            cursor: 'pointer',
            fontWeight: 'bold',
            zIndex: 100,
            transition: 'all 0.3s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'white';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.8)';
          }}
        >
          ← חזרה
        </button>
      )}
      
      {/* Start Screen - entire screen is clickable */}
      {gameState === 'start' && (
        <div 
          onClick={() => setGameState('intro')}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            transition: 'transform 0.2s'
          }}
          onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
          onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <div style={{
            fontSize: '48px',
            fontWeight: 'bold',
            color: '#4CAF50',
            marginBottom: '30px',
            textShadow: '3px 3px 6px rgba(0,0,0,0.4)',
            backgroundColor: 'rgba(255,255,255,0.9)',
            padding: '20px 40px',
            borderRadius: '20px',
            animation: 'pulse 2s infinite'
          }}>
            !לחץ להתחלה
          </div>
        </div>
      )}
      
      {/* Word boxes at top */}
      {gameState !== 'start' && (
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '12px',
        direction: 'rtl',
        zIndex: 10
      }}>
        {gameState === 'intro' && (
          <div style={{
            display: 'flex',
            gap: '12px',
            animation: 'fadeIn 0.5s ease-in'
          }}>
            {letters.map((letter, index) => (
              <div key={index} style={{
                width: '70px',
                height: '70px',
                backgroundColor: '#4CAF50',
                color: 'white',
                fontSize: '40px',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '12px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
              }}>
                {letter}
              </div>
            ))}
          </div>
        )}
        
        {gameState === 'playing' && (
          <div style={{
            display: 'flex',
            gap: '12px'
          }}>
            {letters.map((letter, index) => (
              <div
                key={index}
                data-box-index={index}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(index, e)}
                onClick={() => handleBoxClick(index)}
                style={{
                  width: '70px',
                  height: '70px',
                  backgroundColor: placedLetters[index] ? '#4CAF50' : 'rgba(255,255,255,0.9)',
                  color: placedLetters[index] ? 'white' : '#333',
                  fontSize: '40px',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '12px',
                  border: '3px dashed #666',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
                  cursor: placedLetters[index] ? 'pointer' : 'default',
                  transition: 'all 0.3s ease',
                  position: 'relative'
                }}
              >
                {placedLetters[index] || (
                  <span style={{
                    color: 'rgba(0,0,0,0.11)',
                    fontSize: '40px',
                    fontWeight: 'bold',
                    textShadow: 'none',
                    opacity: 0.6
                  }}>
                    {letter}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
        
        {gameState === 'success' && (
          <div style={{
            display: 'flex',
            gap: '12px',
            animation: 'bounce 0.6s ease-in-out'
          }}>
            {letters.map((letter, index) => (
              <div key={index} style={{
                width: '70px',
                height: '70px',
                backgroundColor: '#FFD700',
                color: 'white',
                fontSize: '40px',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '12px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
                animation: `bounce 0.6s ease-in-out ${index * 0.1}s`
              }}>
                {letter}
              </div>
            ))}
          </div>
        )}
      </div>
      )}

      {/* Scattered letters */}
      {gameState === 'playing' && (
        <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
          {getAvailableLetters().map((item, idx) => (
            <div
              key={`letter-${item.originalIndex}`}
              draggable
              onDragStart={(e) => handleDragStart(item.originalIndex, e)}
              onTouchStart={(e) => handleTouchStart(item.originalIndex, e)}
              style={{
                position: draggingLetter === item.originalIndex && touchCurrent ? 'fixed' : 'absolute',
                top: draggingLetter === item.originalIndex && touchCurrent ? `${touchCurrent.y - 35}px` : `${letterPositions[item.originalIndex].top}%`,
                left: draggingLetter === item.originalIndex && touchCurrent ? `${touchCurrent.x - 35}px` : `${letterPositions[item.originalIndex].left}%`,
                width: '70px',
                height: '70px',
                backgroundColor: draggingLetter === item.originalIndex ? '#1976D2' : '#2196F3',
                color: 'white',
                fontSize: '40px',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '12px',
                cursor: 'grab',
                boxShadow: draggingLetter === item.originalIndex ? '0 8px 16px rgba(0,0,0,0.5)' : '0 4px 6px rgba(0,0,0,0.3)',
                animation: 'flyIn 0.6s ease-out',
                userSelect: 'none',
                transition: draggingLetter === item.originalIndex ? 'none' : 'all 0.2s',
                transform: draggingLetter === item.originalIndex ? 'scale(1.2)' : 'scale(1)',
                zIndex: draggingLetter === item.originalIndex ? 1000 : 1,
                touchAction: 'none',
                WebkitTapHighlightColor: 'transparent',
                pointerEvents: draggingLetter === item.originalIndex ? 'none' : 'auto'
              }}
            >
              {item.letter}
            </div>
          ))}
        </div>
      )}

      {/* Success - confetti only, no popup */}
      {gameState === 'success' && (
        <div style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '15px',
          zIndex: 1000
        }}>
          <button
            onClick={resetGame}
            style={{
              padding: '20px 40px',
              fontSize: '28px',
              backgroundColor: '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '15px',
              cursor: 'pointer',
              fontWeight: 'bold',
              boxShadow: '0 6px 12px rgba(0,0,0,0.3)'
            }}
          >
            שחק שוב
          </button>
          <button
            onClick={onBack}
            style={{
              padding: '20px 40px',
              fontSize: '28px',
              backgroundColor: '#FF9800',
              color: 'white',
              border: 'none',
              borderRadius: '15px',
              cursor: 'pointer',
              fontWeight: 'bold',
              boxShadow: '0 6px 12px rgba(0,0,0,0.3)'
            }}
          >
            חזרה לחיות
          </button>
        </div>
      )}

      {/* Confetti animation */}
      {confetti.map((piece) => (
        <div
          key={piece.id}
          style={{
            position: 'absolute',
            top: '-10px',
            left: `${piece.left}%`,
            width: '10px',
            height: '10px',
            backgroundColor: piece.color,
            animation: `confettiFall ${piece.duration}s ease-in ${piece.delay}s`,
            borderRadius: '50%',
            pointerEvents: 'none'
          }}
        />
      ))}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes flyIn {
          from {
            transform: scale(0) rotate(360deg);
            opacity: 0;
          }
          to {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes confettiFall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
}
