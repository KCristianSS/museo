import modelos from './data/modelos';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div style={{ backgroundColor: 'black', color: 'white', padding: '2rem' }}>
      <h2>Galería de Modelos 3D</h2>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {modelos.map((m, i) => (
          <Link key={i} to={`/modelo/${m.id}`}>
            <button
              style={{
                backgroundColor: '#333',
                color: 'white',
                padding: '10px',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {m.nombre}
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default App;
