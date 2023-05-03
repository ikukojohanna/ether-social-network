import { Canvas, useFrame } from "@react-three/fiber";
import React, { Suspense } from "react";
import { useRef, useEffect } from "react";

//import { Ground } from "./ground";
import { Rings } from "./rings";
import { Boxes } from "./boxes";
import { GroundBeginning } from "./groundBeginning";

import { Text } from "@react-three/drei";

//postprocessing:
import {
    EffectComposer,
    Bloom,
    ChromaticAberration,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

const { OrbitControls, PerspectiveCamera } = require("@react-three/drei");

function Carshow() {
    return null;
}
function Cube() {
    const meshRef = useRef(null);
    const camRef = useRef(null);

    useEffect(() => {
        console.log("camera position", camRef.position);
    }, []);

    useFrame(() => {
        if (!meshRef.current) {
            return;
        }
        meshRef.current.rotation.x += 0.01;
        meshRef.current.rotation.y += 0.01;
    });

    return (
        <>
            <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45} />
            <PerspectiveCamera
                ref={camRef}
                makeDefault
                fov={50}
                position={[0, 2, 5]}
            />
            <color args={[0, 0, 0]} attach="background" />

            <mesh
                position={[0, 0.2, -10]}
                ref={meshRef}
                onClick={() => console.log("click")}
            >
                <sphereBufferGeometry args={[0.2, 30, 30]} attach="geometry" />

                <meshStandardMaterial
                    attach="material"
                    color="white"
                    roughness={0.1}
                    metalness={0.5}
                />
            </mesh>
            <mesh position={[5, 5, 5]} onClick={() => console.log("click")}>
                <boxGeometry attach="geometry" args={[6, 3, 6]} />
                <meshStandardMaterial attach="material" color="red" />
            </mesh>
            <Text
                font="https://fonts.gstatic.com/s/orbitron/v9/yMJRMIlzdpvBhQQL_Qq7dys.woff"
                color="white" // default
                anchorX="center" // default
                anchorY="middle" // default
                rotation={[-0.5, 0, 0]}
                position={[0, 2.1, -1.5]}
                fontSize={0.4}
            >
                Welcome to the Ether
            </Text>

            <GroundBeginning />

            <spotLight
                color={[1, 0.25, 0.7]}
                intensity={1.5}
                angle={0.5}
                penumbra={0.5}
                position={[10, 5, 0]}
                castShadow
                shadow-bias={-0.0001}
            />
            <spotLight
                color={[0.14, 0.5, 1]}
                intensity={2}
                angle={0.6}
                penumbra={0.5}
                position={[-5, 5, 0]}
                castShadow
                shadow-bias={-0.0001}
            />
            <Boxes />
            <Rings />
            <Rings />
            <EffectComposer>
                <Bloom
                    blendFunction={BlendFunction.ADD}
                    intensity={1.3} // The bloom intensity.
                    width={300} // render width
                    height={300} // render height
                    kernelSize={5} // blur kernel size
                    luminanceThreshold={0.15} // luminance threshold. Raise this value to mask out darker elements in the scene.
                    luminanceSmoothing={0.025} // smoothness of the luminance threshold. Range is [0, 1]
                />
                <ChromaticAberration
                    blendFunction={BlendFunction.NORMAL} // blend mode
                    offset={[0.0005, 0.0012]} // color offset
                />
            </EffectComposer>
        </>
    );
}

export default function FiberTry() {
    useEffect(() => {
        document.addEventListener("scroll", () => console.log("scroll"));
    }, []);

    useEffect(() => {
        console.log("react version", React.version);
    }, []);

    return (
        <div className="fiberdiv" onScroll={() => console.log("scroll div")}>
            <Suspense fallback={null}>
                <Canvas
                    mode="concurrent"
                    onClick={() => console.log("clicked Canvas")}
                    shadows
                >
                    <Cube />
                    <Carshow />
                </Canvas>
            </Suspense>
        </div>
    );
}

/*

(in canvas tag)
 camera={{ fov: 70, position: [0, 10, 10] }}$

<ambientLight />
                    <pointLight position={[10, 10, 10]} />
                    <directionalLight position={[20, 20, 20]} />
  <OrbitControls
                        enablePan={true}
                        enableZoom={true}
                        enableRotate={true}
                        
                    />
                    
                     <boxGeometry attach="geometry" args={[1, 1, 1]} />*/
