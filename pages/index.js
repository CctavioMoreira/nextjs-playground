import React, { useState, useEffect } from 'react';

function Home() {
  const [hearts, setHearts] = useState([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Atualiza as dimensões da tela
  useEffect(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  const addHeart = () => {
    const newHeart = {
      id: Date.now(),
      left: Math.random() * dimensions.width,
      top: Math.random() * dimensions.height,
    };
    setHearts([...hearts, newHeart]);
  };

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
      }}
    >
      <h1
        style={{
          fontFamily: "'Comic Sans MS', cursive, sans-serif",
          fontSize: '3em',
          textShadow: '2px 2px #ffb3d9',
        }}
      >
        Te amo, meu xuxu!
      </h1>
      <button
        onClick={addHeart}
        style={{
          backgroundColor: '#ffb3d9',
          border: 'none',
          padding: '15px 30px',
          cursor: 'pointer',
          color: '#fff',
          borderRadius: '30px',
          fontSize: '18px',
          marginTop: '20px',
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
          style={{
            position: 'absolute',
            left: heart.left,
            top: heart.top,
            fontSize: '30px',
            color: '#ff66b3',
          }}
        >
          ❤️
        </div>
      ))}
    </div>
  );
}

export default Home;
