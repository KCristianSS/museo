// src/hooks/useThreeRenderer.js
import { useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export function useThreeRenderer(refContenedor) {
  const [scene, setScene] = useState(null);
  const [camera, setCamera] = useState(null);
  const [renderer, setRenderer] = useState(null);
  const [controls, setControls] = useState(null);

  useEffect(() => {
    const contenedor = refContenedor.current;
    if (!contenedor) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0); // Fondo claro para mejor contraste
    
    const camera = new THREE.PerspectiveCamera(
      75,
      contenedor.clientWidth / contenedor.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 2, 5);

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.shadowMap.enabled = true; // Habilitar sombras
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Sombras suaves
    renderer.setSize(contenedor.clientWidth, contenedor.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio); // Mejor calidad para pantallas retina
    contenedor.innerHTML = '';
    contenedor.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Configuración mejorada de iluminación
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    // Luz direccional principal (como el sol)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(5, 10, 7);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 50;
    directionalLight.shadow.camera.left = -10;
    directionalLight.shadow.camera.right = 10;
    directionalLight.shadow.camera.top = 10;
    directionalLight.shadow.camera.bottom = -10;
    scene.add(directionalLight);

    // Luz de relleno (fill light)
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.5);
    fillLight.position.set(-5, 3, 2);
    scene.add(fillLight);

    // Luz de acento (back light)
    const backLight = new THREE.DirectionalLight(0xffffff, 0.4);
    backLight.position.set(0, 3, -5);
    scene.add(backLight);

    // Luz ambiental desde abajo para suavizar sombras
    const bottomLight = new THREE.HemisphereLight(0xffffff, 0x404040, 0.2);
    bottomLight.position.set(0, -1, 0);
    scene.add(bottomLight);

    setScene(scene);
    setCamera(camera);
    setRenderer(renderer);
    setControls(controls);

    return () => {
      // Limpieza
      renderer.dispose();
      controls.dispose();
    };
  }, []);

  const resizeHandler = () => {
    if (renderer && camera && refContenedor.current) {
      const contenedor = refContenedor.current;
      camera.aspect = contenedor.clientWidth / contenedor.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(contenedor.clientWidth, contenedor.clientHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
    }
  };

  return { scene, camera, renderer, controls, resizeHandler };
}