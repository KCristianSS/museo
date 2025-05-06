// src/components/ui/ModelViewer/Modelo3D.jsx
import React, { useEffect, useRef } from 'react';
import { useThreeRenderer } from "../hooks/useThreeRenderer";
import { load3DModel } from '../utils/modelLoaders';
import Fondo from './ModelBackground';

const Modelo3D = ({ ruta }) => {
  const refContenedor = useRef();
  const { scene, camera, renderer, controls, resizeHandler } = useThreeRenderer(refContenedor);

  useEffect(() => {
    if (!scene) return;

    Fondo(scene); // Fondo con imagen

    load3DModel(ruta, scene); // Cargar el modelo

    const animate = () => {
      requestAnimationFrame(animate);
      controls?.update();
      renderer?.render(scene, camera);
    };
    animate();

    window.addEventListener('resize', resizeHandler);
    return () => window.removeEventListener('resize', resizeHandler);
  }, [ruta, scene]);

  return <div ref={refContenedor} style={{ width: '100%', height: '90vh' }} />;
};

export default Modelo3D;
