import React, { useState, useEffect } from 'react';

function Home() {
  const [hearts, setHearts] = useState([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Atualiza as dimensões da tela após a montagem do componente
  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };

    // Atualiza as dimensões inicialmente
    updateDimensions();

    // Adiciona um listener para atualizar as dimensões em caso de redimensionamento
    window.addEventListener('resize', updateDimensions);

    // Remove o listener quando o componente é desmontado
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const addHearts = () => {
    if (dimensions.width === 0 || dimensions.height === 0) return;

    const newHearts = [];
    for (let i = 0; i < 10; i++) {
      newHearts.push({
        id: Date.now() + i,
        left: Math.random() * dimensions.width,
        top: dimensions.height + 50, // Inicia abaixo da tela
        animationDuration: 4 + Math.random() * 2, // Duração entre 4s e 6s
      });
    }
    setHearts([...hearts, ...newHearts]);
  };

  // Remove corações após a animação terminar
  useEffect(() => {
    const interval = setInterval(() => {
      setHearts((hearts) =>
        hearts.filter((heart) => Date.now() - heart.id < 7000)
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        backgroundColor: '#ffe6f2',
        minHeight: '100vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#ff80bf',
        padding: '20px',
      }}
    >
      <style>
        {`
          .heart {
            position: absolute;
            font-size: 5vw;
            color: #ff66b3;
            animation-name: floatUp;
            animation-timing-function: ease-out;
            animation-fill-mode: forwards;
          }

          @keyframes floatUp {
            0% {
              transform: translateY(0) scale(1);
              opacity: 1;
            }
            100% {
              transform: translateY(-150vh) scale(0.5);
              opacity: 0;
            }
          }
        `}
      </style>
      <h1
        style={{
          fontFamily: "'Comic Sans MS', cursive, sans-serif",
          fontSize: '8vw',
          textShadow: '2px 2px #ffb3d9',
          textAlign: 'center',
          margin: 0,
        }}
      >
        Te amo, meu xuxu!
      </h1>
      <button
        onClick={addHearts}
        style={{
          backgroundColor: '#ffb3d9',
          border: 'none',
          padding: '3vw 6vw',
          cursor: 'pointer',
          color: '#fff',
          borderRadius: '30px',
          fontSize: '4vw',
          marginTop: '5vh',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          fontFamily: "'Comic Sans MS', cursive, sans-serif",
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <span style={{ position: 'relative', zIndex: 1 }}>Mais amor!</span>
      </button>
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="heart"
          style={{
            left: heart.left,
            top: heart.top,
            animationDuration: `${heart.animationDuration}s`,
          }}
        >
          ❤️
        </div>
      ))}
    </div>
  );
}

export default Home;
