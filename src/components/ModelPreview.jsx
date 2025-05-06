import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { load3DModel } from '../utils/modelLoaders';

const ModelPreview = ({ modelPath }) => {
  const containerRef = useRef();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Configuración básica con baja resolución
    const width = Math.min(container.clientWidth, 400); // Limitar ancho máximo
    const height = 250; // Altura fija pequeña
    
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x111111);

    // Cámara con ajuste para vista pequeña
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 50);
    camera.position.set(1, 1, 2); // Posición más cercana

    // Renderer con baja resolución
    const renderer = new THREE.WebGLRenderer({
      antialias: false, // Desactivar antialiasing para mejor rendimiento
      powerPreference: "low-power" // Modo bajo consumo
    });
    renderer.setPixelRatio(0.8); // Reducir calidad
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    // Iluminación simple
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0.5, 1, 0.5);
    scene.add(directionalLight);

    // Función para ajustar modelo
    const adjustModel = (model) => {
      // Escala reducida
      model.scale.set(0.5, 0.5, 0.5);
      
      // Centrar modelo
      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      model.position.sub(center);
      
      // Ajustar cámara
      const size = box.getSize(new THREE.Vector3()).length();
      camera.position.z = size * 1.2;
      camera.lookAt(0, 0, 0);
      
      renderer.render(scene, camera);
      setLoading(false);
    };

    // Cargar modelo con configuración ligera
    try {
      load3DModel(modelPath, scene, {
        onComplete: () => {
          const model = scene.children.find(obj => obj.type === 'Group' || obj.type === 'Mesh');
          if (model) {
            adjustModel(model);
          } else {
            setError('Modelo no visible');
            setLoading(false);
          }
        },
        onError: (err) => {
          console.error('Error:', err);
          setError('Error al cargar');
          setLoading(false);
        }
      });
    } catch (err) {
      console.error('Error inesperado:', err);
      setError('Error inesperado');
      setLoading(false);
    }

    return () => {
      if (container && renderer.domElement) {
        renderer.dispose();
        container.removeChild(renderer.domElement);
      }
    };
  }, [modelPath]);

  return (
    <div style={{ 
      width: '100%', 
      height: '250px',
      position: 'relative',
      backgroundColor: '#111'
    }} ref={containerRef}>
      
      {loading && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: '#aaa'
        }}>
          Cargando...
        </div>
      )}
      
      {error && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: '#ff5555'
        }}>
          {error}
        </div>
      )}
    </div>
  );
};

export default ModelPreview;