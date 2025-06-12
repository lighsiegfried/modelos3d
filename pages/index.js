import { Environment, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React, { useState } from 'react'
import Back1 from '../components/Back1'


export default function Index() {
  const [imageURL, setImageURL] = useState(null)

  const subirImagenyPasaradisenio3d = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setImageURL(url)
    }
  }

  return (
    <div className="h-[100vh] w-[100vw]">

    <div class="mx-auto max-w-xs">
      <label for="example5" class="mb-1 block text-sm font-medium text-gray-700">Subir Archivo</label>
      <label class="flex w-full cursor-pointer appearance-none items-center justify-center rounded-md border-2 border-dashed border-gray-200 p-6 transition-all hover:border-primary-300">
        <div class="space-y-1 text-center">
          <div class="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6 text-gray-500">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
            </svg>
          </div>
          <div class="text-gray-600"><a href="#" class="font-medium text-primary-500 hover:text-primary-700">Click / Presionar para cargar</a> la imagen</div>
          <p class="text-sm text-gray-500">SVG, PNG, JPG, PDF </p>
        </div>
        <input id="file_input" type="file" class="sr-only" accept="image/*" onChange={subirImagenyPasaradisenio3d} />
      </label>
    </div>

      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Environment preset="studio" />
        <OrbitControls />
        <Back1 imageURL={imageURL}  />
        <meshNormalMaterial />
        <spotLight intensity={800} color={0xffea00} position ={[2,5,1]} />
      </Canvas>
    </div>
  );
}; //peso total 167.898.18 
