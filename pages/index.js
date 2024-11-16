import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

function Home() {
  const [visible, setVisible] = useState(false);
  const [hearts, setHearts] = useState([]);
  const [heartCount, setHeartCount] = useState(0);
  
  useEffect(() => {
    setVisible(true);
    const timeout = setTimeout(() => addHearts(), 1000);
    return () => clearTimeout(timeout);
  }, []);

  const generateHeart = () => {
    // Posição aleatória em toda a tela
    const left = Math.random() * 90 + 5; // 5% a 95% da largura
    const top = Math.random() * 90 + 5; // 5% a 95% da altura
    const delay = Math.random() * 0.5;
    const size = Math.random() * 24 + (window.innerWidth < 640 ? 16 : 24); // Menor em mobile
    const duration = Math.random() * 1 + 1; // 1-2s duração da animação
    const pinkShade = Math.floor(Math.random() * 3);
    const pinkColors = ['text-pink-400', 'text-pink-500', 'text-pink-600'];
    
    return {
      id: Date.now() + Math.random(),
      left: `${left}%`,
      top: `${top}%`,
      delay: `${delay}s`,
      duration: `${duration}s`,
      size: size,
      color: pinkColors[pinkShade]
    };
  };

  const addHearts = () => {
    const newHearts = Array(4).fill(null).map(generateHeart);
    setHearts(prev => [...prev, ...newHearts]);
    setHeartCount(prev => prev + 4);
  };

  const handleMoreLove = () => {
    if (heartCount < 40) {
      addHearts();
    } else {
      setHearts(prev => [...prev.slice(4), ...Array(4).fill(null).map(generateHeart)]);
    }
  };

  return (
    <div className="relative min-h-screen bg-pink-50 overflow-hidden">
      {/* Container para os corações em posição absoluta */}
      <div className="absolute inset-0">
        {hearts.map(heart => (
          <Heart 
            key={heart.id}
            className={`absolute ${heart.color} transition-opacity`}
            style={{
              left: heart.left,
              top: heart.top,
              width: heart.size,
              height: heart.size,
              animation: `bounce ${heart.duration} infinite ${heart.delay}`,
            }}
            fill="currentColor"
          />
        ))}
      </div>

      {/* Conteúdo centralizado com z-index para ficar sobre os corações */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
        <div className={`transition-all duration-1000 transform ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-pink-600 mb-4 text-center">
            Te amo,
          </h1>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-pink-500 mb-8 text-center">
            meu xuxu!
          </h2>
        </div>
        
        <div className={`mt-8 transition-all duration-1000 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
          <button 
            onClick={handleMoreLove}
            className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-6 rounded-full transform transition hover:scale-110 active:scale-95 shadow-lg"
          >
            💖 Mais amor! 💖
          </button>
        </div>
      </div>

      {/* Estilo global para a animação de bounce */}
      <style jsx global>{`
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </div>
  );
}

export default Home;