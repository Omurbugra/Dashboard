import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

function Model({ url }) {
    // prepend Vite baseURL so “models/…” resolves correctly under GitHub Pages
    const path = import.meta.env.BASE_URL + url;
    const { scene } = useGLTF(path);
    // Rotate 180° clockwise around Y
    return <primitive object={scene} rotation={[0, -Math.PI, 0]} />;
}


export function ModelViewer({ url }) {
    return (
        <Canvas
            // moved camera further back, raised up a bit
            camera={{ position: [24, 15, 20], fov: 50 }}
            style={{ background: 'linear-gradient(135deg, #c2ddff 0%, #ffffff 100%)' }}
            gl={{ antialias: true }}
        >
            {/* Brighter ambient + hemisphere fill */}
            <ambientLight intensity={1.2} />
            <hemisphereLight
                skyColor="#ffffff"
                groundColor="#444444"
                intensity={0.5}
            />
            {/* Strong key light */}
            <directionalLight
                position={[10, 10, 10]}
                intensity={1.5}
                castShadow
                shadow-bias={-0.0001}
            />
            <Suspense fallback={null}>
                <Model url={url} />
            </Suspense>
            {/* Enable panning; set target slightly up on Z-axis */}
            <OrbitControls
                enablePan={true}
                enableRotate={true}
                enableZoom={true}
                // default target is [0,0,0]; lift it up on z (forward) and y (up)
                target={[0, 5, 0]}
            />
        </Canvas>
    );
}
