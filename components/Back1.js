import React, { useEffect,useRef  } from 'react'
import * as THREE from 'three'
import { useGLTF, Decal } from '@react-three/drei'
import { useLoader,useFrame   } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export default function Back1({ imageURL }) {
  
  const modelo = 'pouch3.glb';
  const gltf = useLoader(GLTFLoader, `/3dmodel/bagblack/${modelo}`);

  const nodes = gltf?.nodes ?? {};
  const materials = gltf?.materials ?? {};
  const scene = gltf.scene;
  //const { nodes, materials, scene } = useGLTF(`/3dmodel/bagblack/pouch3.glb`);
  const meshRef = useRef();

  // verifica nodos y materiales
  useEffect(() => {
    //console.log(' Nodes:', nodes)
    //console.log(' Materials:', materials)
    //console.log(' Scene:', scene)
  }, [nodes, materials, scene])

  const texture = imageURL
    ? useLoader(THREE.TextureLoader, imageURL)
    : null

    //const texture = useTexture(imagenURL);
    
  const meshNode = Object.values(nodes).find(
    (node) => node.isMesh && node.geometry
  )

  const meshMaterial = meshNode?.material || Object.values(materials)[0];

  useFrame(() => {
    if (meshRef.current) {
      //meshRef.current.rotation.y += 0.004; //rotacion automatica
    }
  });

  useEffect(() => {
    if (imageURL && texture && meshMaterial) {
      meshMaterial.map = texture
      meshMaterial.metalness = 0.3
      meshMaterial.roughness = 0.5
      meshMaterial.envMapIntensity = 1.5
      meshMaterial.needsUpdate = true
    }
  }, [imageURL, texture, meshMaterial])

  if (!meshNode || !meshMaterial) {
    //console.warn(' No se encontró un mesh válido en el modelo')
    return null
  }

  useEffect(() => {
  if (meshNode?.geometry) {
    const faceCount = meshNode.geometry.index
      ? meshNode.geometry.index.count / 3
      : meshNode.geometry.attributes.position.count / 3
    //console.log('Total de caras (triángulos):', faceCount)
  }
}, [meshNode])

  return (
    <group 
      position={[0, 0, 0]} 
      rotation={[0, -Math.PI / -2, 0]}
      scale={20}
      ref={meshRef}
    >
      <mesh
        geometry={meshNode.geometry}
        material={meshMaterial}
        castShadow
        receiveShadow
        scale={1}
        position={[0, 0.05, 0]}
        >
        
        {texture && (
          <Decal
            position={[0, 0, 0]}
            rotation={[0.43, 1.5,  Math.PI / 1.17]}
            scale={-0.21}
            map={texture}
            depthTest={true}
            depthWrite={false}

            //debug 
          />
        )}
      </mesh>
    </group>
  )
}

//useGLTF.preload('/3dmodel/bagblack/${modelo}')
