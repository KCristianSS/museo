// src/components/ui/ModelViewer/Fondo.jsx
import * as THREE from 'three';

const Fondo = (scene) => {
  const texturaFondo = new THREE.TextureLoader().load('/fondos/mar.jpg');
  scene.background = texturaFondo;
};

export default Fondo;
