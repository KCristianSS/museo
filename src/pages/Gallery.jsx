import React from 'react';
import { Link } from 'react-router-dom';
import ModelPreview from '../components/ModelPreview';
import modelos from '../data/modelos';

const Gallery = () => {
  return (
    <div style={{ backgroundColor: 'black', color: 'white', padding: '2rem' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Galería de Modelos 3D</h2>
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '2rem'
      }}>
        {modelos.map((modelo, index) => (
          <article key={index} style={{ 
            backgroundColor: '#222',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 0 10px rgba(255,255,255,0.05)',
            transition: 'transform 0.2s ease-in-out'
          }}>
            <ModelPreview modelPath={modelo.ruta} />
            <div style={{ padding: '1rem' }}>
              <h3 style={{ margin: '0 0 1rem 0', textAlign: 'center' }}>
                {modelo.nombre}
              </h3>
              <Link to={`/model/${modelo.id}`}>
                <button style={{
                  backgroundColor: '#444',
                  color: 'white',
                  padding: '8px 16px',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  width: '100%',
                  transition: 'background-color 0.2s'
                }}
                onMouseOver={e => e.target.style.backgroundColor = '#666'}
                onMouseOut={e => e.target.style.backgroundColor = '#444'}
                >
                  Ver detalles
                </button>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
