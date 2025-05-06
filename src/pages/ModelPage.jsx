import { useParams } from 'react-router-dom';
import modelos from '../data/modelos';
import Modelo3D from '../components/Model3D';

const ModeloPage = () => {
  const { id } = useParams();
  console.log(id);  // Verifica que el id se está pasando correctamente

  const modelo = modelos.find((m) => m.id === id);

  if (!modelo) return <div>Modelo no encontrado</div>;

  return (
    <div style={{ backgroundColor: 'black', color: 'white', padding: '2rem' }}>
      <h2>{modelo.nombre}</h2>
      <Modelo3D ruta={modelo.ruta} />
    </div>
  );
};

export default ModeloPage;
