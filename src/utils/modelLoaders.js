import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export const load3DModel = (ruta, scene, callbacks = {}) => {
  const { onProgress, onComplete, onError } = callbacks;
  const extension = ruta.split('.').pop().toLowerCase();
  const basePath = ruta.substring(0, ruta.lastIndexOf('/') + 1);
  const nombre = ruta.split('/').pop().replace('.obj', '');

  const handleComplete = (model) => {
    if (onComplete) onComplete(model);
  };

  const handleError = (error) => {
    console.error('Error loading model:', error);
    if (onError) onError(error);
  };

  if (extension === 'obj') {
    const mtlLoader = new MTLLoader();
    mtlLoader.setPath(basePath);
    mtlLoader.load(`${nombre}.mtl`, (materiales) => {
      materiales.preload();
      const objLoader = new OBJLoader();
      objLoader.setMaterials(materiales);
      objLoader.setPath(basePath);
      objLoader.load(
        `${nombre}.obj`,
        (obj) => {
          obj.scale.set(1, 1, 1);
          obj.position.set(0, 0, 0);
          scene.add(obj);
          handleComplete(obj); // ← PASA el objeto
        },
        onProgress || undefined,
        handleError
      );
    }, onProgress || undefined, handleError);
  } else if (extension === 'fbx') {
    const loader = new FBXLoader();
    loader.load(
      ruta,
      (modelo) => {
        modelo.scale.set(1, 1, 1);
        modelo.position.set(0, 0, 0);
        scene.add(modelo);
        handleComplete(modelo); // ← PASA el modelo
      },
      onProgress || undefined,
      handleError
    );
  } else if (extension === 'glb' || extension === 'gltf') {
    const loader = new GLTFLoader();
    loader.load(
      ruta,
      (gltf) => {
        const model = gltf.scene;
        model.scale.set(1, 1, 1);
        model.position.set(0, 0, 0);
        scene.add(model);
        handleComplete(model); // ← PASA el modelo
      },
      onProgress || undefined,
      handleError
    );
  }
};
