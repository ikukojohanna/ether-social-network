import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import TextEther from "./textEther";
import { useRef, useEffect, useState } from "react";
import { Sphere } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { Ground } from "./ground";
import * as THREE from "three";
import { MeshReflectorMaterial } from "@react-three/drei";
import { TextureLoader } from "three";
import { useLoader } from "@react-three/fiber";
import { PositionalAudio } from "@react-three/drei";
import { Stars } from "@react-three/drei";

//postprocessing
import {
    EffectComposer,
    Bloom,
    ChromaticAberration,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

function Clicks({
    p = new THREE.Vector3(),
    q = new THREE.Quaternion(),
    c = new THREE.PerspectiveCamera(),
}) {
    // We will need access to our camera, so grab the three state
    const state = useThree();
    const meshRef = useRef(null);
    const meshRef2 = useRef(null);
    const meshRef3 = useRef(null);
    const meshRef4 = useRef(null);
    const meshRef5 = useRef(null);
    const meshRef6 = useRef(null);

    useFrame(() => {
        if (!meshRef.current) {
            return;
        }
        meshRef.current.rotation.x += 0.0005;
        meshRef.current.rotation.y += 0.0005;
    });

    useFrame(() => {
        if (!meshRef2.current) {
            return;
        }
        meshRef2.current.rotation.x += 0.001;
        meshRef2.current.rotation.y += 0.0005;
    });

    useFrame(() => {
        if (!meshRef3.current) {
            return;
        }
        meshRef3.current.rotation.x += 0.001;
        meshRef3.current.rotation.y += 0.001;
    });

    useFrame(() => {
        if (!meshRef4.current) {
            return;
        }
        meshRef4.current.rotation.x += 0.007;
        meshRef4.current.rotation.y += 0.002;
    });

    useFrame(() => {
        if (!meshRef5.current) {
            return;
        }
        meshRef5.current.rotation.x += 0.0021;
        meshRef5.current.rotation.y += 0.0001;
    });

    useFrame(() => {
        if (!meshRef6.current) {
            return;
        }
        meshRef6.current.rotation.x += 0.0001;
        meshRef6.current.rotation.y += 0.0015;
    });
    const [roughness, normal] = useLoader(TextureLoader, [
        "textures/terrain-normal.jpeg",
        "textures/terrain-roughness.jpeg",

        // "logo.jpg",
    ]);
    /*
    const [roughness2, normal2] = useLoader(TextureLoader, [
        "textures/coral_fort_wall_01_diff_4k.jpg",
        "textures/coral_fort_wall_01_disp_4k.png",

        // "logo.jpg",
    ]);
*/
    // We need to know what object was clicked
    // Keeping track of this in state is not super advisable but this setup
    // relies on a new selection causing a re-render. It's probably better
    // to keep track of this in a ref
    const [clicked, setClicked] = useState(null);

    // On first render just point the camera where we want it
    useEffect(() => {
        state.camera.lookAt(0, 0, 0);
    }, []);

    useEffect(() => {
        (function (history) {
            var pushState = history.pushState;
            history.pushState = function (state) {
                if (typeof history.onpushstate == "function") {
                    history.onpushstate({ state: state });
                }

                return pushState.apply(history, arguments);
            };
        })(window.history);
    }, []);

    useEffect(() => {
        // ...check if there is a currently selected object
        if (clicked !== null) {
            // Update the selected objects world matrix (not sure this is necessary)
            // (true, true) updates it's children and parent matrices I believe
            clicked.updateWorldMatrix(true, true);

            // Put our object into a const because I want to
            const selection = clicked;

            // Grab the position of our selection
            const { position } = selection;

            // Grab the values we assign to object userData.
            // In the return block you can see the value viewPos is a three entry array representing
            // the x, y, and z we want to view the selection from **with relation to the selection**.

            // Make that a Vector3
            const viewPos = new THREE.Vector3(...selection.userData.viewPos);

            // Using the position of the selection, we add our view position.
            // This will give us the world position for our target camera.
            const camPosTarget = new THREE.Vector3(...position).add(viewPos);

            // Put the target camera in the right position.
            c.position.set(...camPosTarget);

            // Point the target camera where you want to look.
            // In this case we are just going to look right at the selection.
            c.lookAt(...position);

            // copy the quaternion of the target camera into q.
            // You can also use .set(...c.quaternion) but copy is cleaner.
            q.copy(c.quaternion);

            // copy the position of the target camera into p.
            p.copy(c.position);
        } else {
            // If nothing is clicked we want to set p back to our start position.
            // In our case we are just hardcoding our camera position back in.
            p.set(0, 0, 65);

            // .identity() resets a quaternion to no rotation.
            // This doesn't bring us back to our original rotation that we set on line 27.
            // You could do that if you want using the same method we use to animate
            // to our target positions.
            // You'll actually notice if you refresh that the camera instanly pans up because of this.
        }
    });

    // On every frame...
    useFrame((state, dt) => {
        // ...lerp (linear interpolate) the camera position to p.
        state.camera.position.lerp(p, THREE.MathUtils.damp(0, 1, 3, dt));

        // ...slerp (spherical linear interpolate) the camera rotation to quaternion q.
        state.camera.quaternion.slerp(q, THREE.MathUtils.damp(0, 1, 3, dt));

        // I don't have anything to say about lerp and slerp that the docs don't have.
        // No idea what damp actually does, probably just smooths it out.
    });

    // The only thing of note below is that in each Box I provide the viewPos to userData.
    // Make sure that mouse events in r3f are not propogating unless you want them to.
    // Objects behind will also trigger if you don't.
    // I don't know why my shadows aren't working but I don't have time to fix it.

    return (
        <>
            <Suspense fallback={null}>
                <color args={[0, 0, 0]} attach="background" />
                <Sphere
                    ref={meshRef}
                    castShadow
                    args={[0.5, 30, 30]}
                    position={[50, 39, -50]}
                    userData={{ viewPos: [0, 0, 0] }}
                    onClick={(e) => {
                        e.stopPropagation();

                        if (clicked === e.object) {
                            setClicked(null);
                        } else {
                            setClicked(e.object);
                        }
                    }}
                    onPointerMissed={() => {
                        setClicked(null);
                    }}
                >
                    <MeshReflectorMaterial
                        side={THREE.DoubleSide}
                        envMapIntensity={0}
                        normalMap={roughness}
                        normalScale={[0.15, 0.15]}
                        roughnessMap={normal}
                        dithering={true}
                        color={[10, 10, 10]}
                        roughness={5}
                        blur={[1000, 400]} // Blur ground reflections (width, heigt), 0 skips blur
                        mixBlur={30} // How much blur mixes with surface roughness (default = 1)
                        mixStrength={80} // Strength of the reflections
                        mixContrast={1} // Contrast of the reflections
                        resolution={1024} // Off-buffer resolution, lower=faster, higher=better quality, slower
                        mirror={0} // Mirror environment, 0 = texture colors, 1 = pick up env colors
                        depthScale={0.01} // Scale the depth factor (0 = no depth, default = 0)
                        minDepthThreshold={0.9} // Lower edge for the depthTexture interpolation (default = 0)
                        maxDepthThreshold={1} // Upper edge for the depthTexture interpolation (default = 0)
                        depthToBlurRatioBias={0.25} // Adds a bias factor to the depthTexture before calculating the blur amount [blurFactor = blurTexture * (depthTexture + bias)]. It accepts values between 0 and 1, default is 0.25. An amount > 0 of bias makes sure that the blurTexture is not too sharp because of the multiplication with the depthTexture
                        debug={0}
                        reflectorOffset={0.1} // Offsets the virtual camera that projects the reflection. Useful when the reflective surface is some distance from the object's origin (default = 0)
                        metalness={1}
                    />{" "}
                </Sphere>

                <Sphere
                    ref={meshRef}
                    castShadow
                    args={[0.5, 30, 30]}
                    position={[2, 18, 0]}
                    userData={{ viewPos: [-0.5, 0, -2] }}
                    onClick={(e) => {
                        e.stopPropagation();

                        if (clicked === e.object) {
                            setClicked(null);
                        } else {
                            setClicked(e.object);
                        }
                    }}
                    onPointerMissed={() => {
                        setClicked(null);
                    }}
                >
                    <MeshReflectorMaterial
                        side={THREE.DoubleSide}
                        envMapIntensity={0}
                        normalMap={roughness}
                        normalScale={[0.15, 0.15]}
                        roughnessMap={normal}
                        dithering={true}
                        color={[10, 10, 10]}
                        roughness={10}
                        blur={[1000, 400]} // Blur ground reflections (width, heigt), 0 skips blur
                        mixBlur={30} // How much blur mixes with surface roughness (default = 1)
                        mixStrength={80} // Strength of the reflections
                        mixContrast={1} // Contrast of the reflections
                        resolution={1024} // Off-buffer resolution, lower=faster, higher=better quality, slower
                        mirror={0} // Mirror environment, 0 = texture colors, 1 = pick up env colors
                        depthScale={0.01} // Scale the depth factor (0 = no depth, default = 0)
                        minDepthThreshold={0.9} // Lower edge for the depthTexture interpolation (default = 0)
                        maxDepthThreshold={1} // Upper edge for the depthTexture interpolation (default = 0)
                        depthToBlurRatioBias={0.25} // Adds a bias factor to the depthTexture before calculating the blur amount [blurFactor = blurTexture * (depthTexture + bias)]. It accepts values between 0 and 1, default is 0.25. An amount > 0 of bias makes sure that the blurTexture is not too sharp because of the multiplication with the depthTexture
                        debug={0}
                        reflectorOffset={0.1} // Offsets the virtual camera that projects the reflection. Useful when the reflective surface is some distance from the object's origin (default = 0)
                        metalness={1}
                    />{" "}
                </Sphere>

                <Sphere
                    ref={meshRef}
                    castShadow
                    args={[0.8, 30, 30]}
                    position={[-7, 20, 0]}
                    userData={{ viewPos: [-2, 0, -5] }}
                    onClick={(e) => {
                        e.stopPropagation();

                        if (clicked === e.object) {
                            setClicked(null);
                        } else {
                            setClicked(e.object);
                        }
                    }}
                    onPointerMissed={() => {
                        setClicked(null);
                    }}
                >
                    {" "}
                    <MeshReflectorMaterial
                        side={THREE.DoubleSide}
                        envMapIntensity={0}
                        normalMap={normal}
                        normalScale={[0.15, 0.15]}
                        roughnessMap={roughness}
                        dithering={true}
                        color={[10, 10, 10]}
                        roughness={10}
                        blur={[1000, 400]} // Blur ground reflections (width, heigt), 0 skips blur
                        mixBlur={30} // How much blur mixes with surface roughness (default = 1)
                        mixStrength={80} // Strength of the reflections
                        mixContrast={1} // Contrast of the reflections
                        resolution={1024} // Off-buffer resolution, lower=faster, higher=better quality, slower
                        mirror={0} // Mirror environment, 0 = texture colors, 1 = pick up env colors
                        depthScale={0.01} // Scale the depth factor (0 = no depth, default = 0)
                        minDepthThreshold={0.9} // Lower edge for the depthTexture interpolation (default = 0)
                        maxDepthThreshold={1} // Upper edge for the depthTexture interpolation (default = 0)
                        depthToBlurRatioBias={0.25} // Adds a bias factor to the depthTexture before calculating the blur amount [blurFactor = blurTexture * (depthTexture + bias)]. It accepts values between 0 and 1, default is 0.25. An amount > 0 of bias makes sure that the blurTexture is not too sharp because of the multiplication with the depthTexture
                        debug={0}
                        reflectorOffset={0.1} // Offsets the virtual camera that projects the reflection. Useful when the reflective surface is some distance from the object's origin (default = 0)
                        metalness={1}
                    />{" "}
                </Sphere>

                <Sphere
                    ref={meshRef}
                    castShadow
                    args={[0.8, 30, 30]}
                    position={[-50, 34, -40]}
                    userData={{ viewPos: [0, 0, 0] }}
                    onClick={(e) => {
                        e.stopPropagation();

                        if (clicked === e.object) {
                            setClicked(null);
                        } else {
                            setClicked(e.object);
                            console.log("lv clicked");
                        }
                    }}
                    onPointerMissed={() => {
                        setClicked(null);
                    }}
                >
                    {" "}
                    <MeshReflectorMaterial
                        side={THREE.DoubleSide}
                        envMapIntensity={0}
                        normalMap={roughness}
                        normalScale={[0.15, 0.15]}
                        roughnessMap={normal}
                        dithering={true}
                        color={[10, 10, 10]}
                        roughness={5}
                        blur={[1000, 400]} // Blur ground reflections (width, heigt), 0 skips blur
                        mixBlur={30} // How much blur mixes with surface roughness (default = 1)
                        mixStrength={80} // Strength of the reflections
                        mixContrast={1} // Contrast of the reflections
                        resolution={1024} // Off-buffer resolution, lower=faster, higher=better quality, slower
                        mirror={0} // Mirror environment, 0 = texture colors, 1 = pick up env colors
                        depthScale={0.01} // Scale the depth factor (0 = no depth, default = 0)
                        minDepthThreshold={0.9} // Lower edge for the depthTexture interpolation (default = 0)
                        maxDepthThreshold={1} // Upper edge for the depthTexture interpolation (default = 0)
                        depthToBlurRatioBias={0.25} // Adds a bias factor to the depthTexture before calculating the blur amount [blurFactor = blurTexture * (depthTexture + bias)]. It accepts values between 0 and 1, default is 0.25. An amount > 0 of bias makes sure that the blurTexture is not too sharp because of the multiplication with the depthTexture
                        debug={0}
                        reflectorOffset={0.1} // Offsets the virtual camera that projects the reflection. Useful when the reflective surface is some distance from the object's origin (default = 0)
                        metalness={1}
                    />{" "}
                </Sphere>
                <Sphere
                    ref={meshRef}
                    castShadow
                    args={[3, 30, 30]}
                    position={[10, 3, 0]}
                    userData={{ viewPos: [0, 0, 0.5] }}
                    onClick={(e) => {
                        e.stopPropagation();

                        if (clicked === e.object) {
                            window.history.pushState("empty", "", "chat");

                            setClicked(null);
                        } else {
                            setClicked(e.object);
                            window.history.pushState("lv-426", "", "lv-426");
                            console.log("lv clicked");
                        }
                    }}
                    onPointerMissed={() => {
                        setClicked(null);
                        window.history.pushState("empty", "", "chat");
                    }}
                >
                    {" "}
                    <PositionalAudio
                        url="lvplanetsound.wav" // Url of the sound file
                        distance={2} // Camera distance (default=1)
                        volume={3}
                        autoplay
                    />
                    <MeshReflectorMaterial
                        side={THREE.DoubleSide}
                        envMapIntensity={0}
                        normalMap={normal}
                        normalScale={[0.15, 0.15]}
                        roughnessMap={roughness}
                        dithering={true}
                        color={[5, 0.015, 0.015]}
                        roughness={10}
                        blur={[1000, 400]} // Blur ground reflections (width, heigt), 0 skips blur
                        mixBlur={30} // How much blur mixes with surface roughness (default = 1)
                        mixStrength={80} // Strength of the reflections
                        mixContrast={1} // Contrast of the reflections
                        resolution={1024} // Off-buffer resolution, lower=faster, higher=better quality, slower
                        mirror={0} // Mirror environment, 0 = texture colors, 1 = pick up env colors
                        depthScale={0.01} // Scale the depth factor (0 = no depth, default = 0)
                        minDepthThreshold={0.9} // Lower edge for the depthTexture interpolation (default = 0)
                        maxDepthThreshold={1} // Upper edge for the depthTexture interpolation (default = 0)
                        depthToBlurRatioBias={0.25} // Adds a bias factor to the depthTexture before calculating the blur amount [blurFactor = blurTexture * (depthTexture + bias)]. It accepts values between 0 and 1, default is 0.25. An amount > 0 of bias makes sure that the blurTexture is not too sharp because of the multiplication with the depthTexture
                        debug={0}
                        reflectorOffset={0.1} // Offsets the virtual camera that projects the reflection. Useful when the reflective surface is some distance from the object's origin (default = 0)
                        metalness={0.5}
                    />{" "}
                </Sphere>
                <Sphere
                    side={THREE.DoubleSide}
                    ref={meshRef2}
                    castShadow
                    args={[2, 30, 30]}
                    position={[20, 3, 5]}
                    userData={{ viewPos: [0, 5, 0] }}
                    onClick={(e) => {
                        e.stopPropagation();

                        if (clicked === e.object) {
                            window.history.pushState("empty", "", "chat");

                            setClicked(null);
                        } else {
                            setClicked(e.object);
                            window.history.pushState("dagobah", "", "dagobah");
                            console.log("lv clicked");
                        }
                    }}
                    onPointerMissed={() => {
                        setClicked(null);
                        window.history.pushState("empty", "", "chat");
                    }}
                >
                    <PositionalAudio
                        url="calmBellnoisesdoro.wav" // Url of the sound file
                        distance={10} // Camera distance (default=1)
                        volume={20}
                        autoplay
                    />
                    <MeshReflectorMaterial
                        side={THREE.DoubleSide}
                        envMapIntensity={0}
                        normalMap={roughness}
                        normalScale={[0.15, 0.15]}
                        roughnessMap={normal}
                        dithering={true}
                        color={[1, 5, 1]}
                        roughness={1}
                        blur={[1000, 400]} // Blur ground reflections (width, heigt), 0 skips blur
                        mixBlur={30} // How much blur mixes with surface roughness (default = 1)
                        mixStrength={80} // Strength of the reflections
                        mixContrast={1} // Contrast of the reflections
                        resolution={1024} // Off-buffer resolution, lower=faster, higher=better quality, slower
                        mirror={0.8} // Mirror environment, 0 = texture colors, 1 = pick up env colors
                        depthScale={0.01} // Scale the depth factor (0 = no depth, default = 0)
                        minDepthThreshold={0.9} // Lower edge for the depthTexture interpolation (default = 0)
                        maxDepthThreshold={1} // Upper edge for the depthTexture interpolation (default = 0)
                        depthToBlurRatioBias={0.25} // Adds a bias factor to the depthTexture before calculating the blur amount [blurFactor = blurTexture * (depthTexture + bias)]. It accepts values between 0 and 1, default is 0.25. An amount > 0 of bias makes sure that the blurTexture is not too sharp because of the multiplication with the depthTexture
                        debug={0}
                        reflectorOffset={0.1} // Offsets the virtual camera that projects the reflection. Useful when the reflective surface is some distance from the object's origin (default = 0)
                        metalness={1.2}
                    />{" "}
                </Sphere>
                <Sphere
                    ref={meshRef3}
                    castShadow
                    args={[3.5, 30, 30]}
                    position={[30, 3, 10]}
                    userData={{ viewPos: [5, 7, 0] }}
                    onClick={(e) => {
                        e.stopPropagation();

                        if (clicked === e.object) {
                            window.history.pushState("empty", "", "chat");

                            setClicked(null);
                        } else {
                            setClicked(e.object);
                            window.history.pushState(
                                "vogsphere",
                                "",
                                "vogsphere"
                            );
                            console.log("lv clicked");
                        }
                    }}
                    onPointerMissed={() => {
                        setClicked(null);
                        window.history.pushState("empty", "", "chat");
                    }}
                >
                    {" "}
                    <PositionalAudio
                        url="123.wav" // Url of the sound file
                        distance={1} // Camera distance (default=1)
                        volume={3}
                        autoplay
                    />
                    <MeshReflectorMaterial
                        side={THREE.DoubleSide}
                        envMapIntensity={0}
                        normalMap={normal}
                        normalScale={[0.15, 0.15]}
                        roughnessMap={roughness}
                        dithering={true}
                        color={[5, 10, 5]}
                        roughness={1}
                        blur={[1000, 400]} // Blur ground reflections (width, heigt), 0 skips blur
                        mixBlur={30} // How much blur mixes with surface roughness (default = 1)
                        mixStrength={80} // Strength of the reflections
                        mixContrast={1} // Contrast of the reflections
                        resolution={1024} // Off-buffer resolution, lower=faster, higher=better quality, slower
                        mirror={0} // Mirror environment, 0 = texture colors, 1 = pick up env colors
                        depthScale={0.01} // Scale the depth factor (0 = no depth, default = 0)
                        minDepthThreshold={0.9} // Lower edge for the depthTexture interpolation (default = 0)
                        maxDepthThreshold={1} // Upper edge for the depthTexture interpolation (default = 0)
                        depthToBlurRatioBias={0.25} // Adds a bias factor to the depthTexture before calculating the blur amount [blurFactor = blurTexture * (depthTexture + bias)]. It accepts values between 0 and 1, default is 0.25. An amount > 0 of bias makes sure that the blurTexture is not too sharp because of the multiplication with the depthTexture
                        debug={0}
                        reflectorOffset={0.1} // Offsets the virtual camera that projects the reflection. Useful when the reflective surface is some distance from the object's origin (default = 0)
                        metalness={1}
                    />{" "}
                </Sphere>
                <Sphere
                    ref={meshRef4}
                    castShadow
                    args={[1, 30, 30]}
                    position={[-10, 3, 0]}
                    userData={{ viewPos: [-2, 2, -2] }}
                    onClick={(e) => {
                        e.stopPropagation();

                        if (clicked === e.object) {
                            window.history.pushState("empty", "", "chat");

                            setClicked(null);
                        } else {
                            setClicked(e.object);
                            window.history.pushState("arrakis", "", "arrakis");
                            console.log("lv clicked");
                        }
                    }}
                    onPointerMissed={() => {
                        setClicked(null);
                        window.history.pushState("empty", "", "chat");
                    }}
                >
                    {" "}
                    <PositionalAudio
                        url="firesyntharrakis.wav" // Url of the sound file
                        distance={0.8} // Camera distance (default=1)
                        volume={1}
                        autoplay
                    />
                    <MeshReflectorMaterial
                        side={THREE.DoubleSide}
                        envMapIntensity={0}
                        normalMap={normal}
                        normalScale={[0.15, 0.15]}
                        roughnessMap={roughness}
                        dithering={true}
                        color={[5, 1, 0]}
                        roughness={100}
                        blur={[1000, 400]} // Blur ground reflections (width, heigt), 0 skips blur
                        mixBlur={50} // How much blur mixes with surface roughness (default = 1)
                        mixStrength={80} // Strength of the reflections
                        mixContrast={1} // Contrast of the reflections
                        resolution={1024} // Off-buffer resolution, lower=faster, higher=better quality, slower
                        mirror={0} // Mirror environment, 0 = texture colors, 1 = pick up env colors
                        depthScale={0.01} // Scale the depth factor (0 = no depth, default = 0)
                        minDepthThreshold={0.9} // Lower edge for the depthTexture interpolation (default = 0)
                        maxDepthThreshold={1} // Upper edge for the depthTexture interpolation (default = 0)
                        depthToBlurRatioBias={0.25} // Adds a bias factor to the depthTexture before calculating the blur amount [blurFactor = blurTexture * (depthTexture + bias)]. It accepts values between 0 and 1, default is 0.25. An amount > 0 of bias makes sure that the blurTexture is not too sharp because of the multiplication with the depthTexture
                        debug={0}
                        reflectorOffset={0.1} // Offsets the virtual camera that projects the reflection. Useful when the reflective surface is some distance from the object's origin (default = 0)
                        metalness={0.8}
                    />{" "}
                </Sphere>
                <Sphere
                    ref={meshRef5}
                    castShadow
                    args={[1.8, 30, 30]}
                    position={[-20, 3, 5]}
                    userData={{ viewPos: [0, 0, 0] }}
                    onClick={(e) => {
                        e.stopPropagation();

                        if (clicked === e.object) {
                            window.history.pushState("empty", "", "chat");

                            setClicked(null);
                        } else {
                            setClicked(e.object);
                            window.history.pushState("solaris", "", "solaris");
                            console.log("lv clicked");
                        }
                    }}
                    onPointerMissed={() => {
                        setClicked(null);
                        window.history.pushState("empty", "", "chat");
                    }}
                >
                    {" "}
                    <PositionalAudio
                        url="killusive.wav" // Url of the sound file
                        distance={10} // Camera distance (default=1)
                        volume={20}
                        autoplay
                    />
                    <MeshReflectorMaterial
                        side={THREE.DoubleSide}
                        envMapIntensity={0}
                        normalMap={normal}
                        normalScale={[0.15, 0.15]}
                        roughnessMap={roughness}
                        dithering={true}
                        color={[2, 3, 5]}
                        roughness={1}
                        blur={[1000, 400]} // Blur ground reflections (width, heigt), 0 skips blur
                        mixBlur={30} // How much blur mixes with surface roughness (default = 1)
                        mixStrength={80} // Strength of the reflections
                        mixContrast={1} // Contrast of the reflections
                        resolution={1024} // Off-buffer resolution, lower=faster, higher=better quality, slower
                        mirror={0.1} // Mirror environment, 0 = texture colors, 1 = pick up env colors
                        depthScale={0.01} // Scale the depth factor (0 = no depth, default = 0)
                        minDepthThreshold={0.9} // Lower edge for the depthTexture interpolation (default = 0)
                        maxDepthThreshold={1} // Upper edge for the depthTexture interpolation (default = 0)
                        depthToBlurRatioBias={0.25} // Adds a bias factor to the depthTexture before calculating the blur amount [blurFactor = blurTexture * (depthTexture + bias)]. It accepts values between 0 and 1, default is 0.25. An amount > 0 of bias makes sure that the blurTexture is not too sharp because of the multiplication with the depthTexture
                        debug={0}
                        reflectorOffset={0.1} // Offsets the virtual camera that projects the reflection. Useful when the reflective surface is some distance from the object's origin (default = 0)
                        metalness={1.2}
                    />{" "}
                </Sphere>
                <Sphere
                    ref={meshRef6}
                    castShadow
                    args={[3, 30, 30]}
                    position={[-30, 3, 10]}
                    userData={{ viewPos: [-6, 0, -5] }}
                    onClick={(e) => {
                        e.stopPropagation();

                        if (clicked === e.object) {
                            window.history.pushState("empty", "", "chat");

                            setClicked(null);
                        } else {
                            setClicked(e.object);
                            window.history.pushState("philia", "", "philia");
                            console.log("lv clicked");
                        }
                    }}
                    onPointerMissed={() => {
                        setClicked(null);
                        window.history.pushState("empty", "", "chat");
                    }}
                >
                    {" "}
                    <PositionalAudio
                        url="Rashiyah3.wav" // Url of the sound file
                        distance={0.8} // Camera distance (default=1)
                        volume={10}
                        autoplay
                    />
                    <MeshReflectorMaterial
                        side={THREE.DoubleSide}
                        envMapIntensity={0}
                        normalMap={normal}
                        normalScale={[0.15, 0.15]}
                        roughnessMap={roughness}
                        dithering={true}
                        color={[10, 0, 2]}
                        roughness={10}
                        blur={[1000, 400]} // Blur ground reflections (width, heigt), 0 skips blur
                        mixBlur={30} // How much blur mixes with surface roughness (default = 1)
                        mixStrength={80} // Strength of the reflections
                        mixContrast={1} // Contrast of the reflections
                        resolution={1024} // Off-buffer resolution, lower=faster, higher=better quality, slower
                        mirror={0} // Mirror environment, 0 = texture colors, 1 = pick up env colors
                        depthScale={0.1} // Scale the depth factor (0 = no depth, default = 0)
                        minDepthThreshold={0.9} // Lower edge for the depthTexture interpolation (default = 0)
                        maxDepthThreshold={1} // Upper edge for the depthTexture interpolation (default = 0)
                        depthToBlurRatioBias={0.25} // Adds a bias factor to the depthTexture before calculating the blur amount [blurFactor = blurTexture * (depthTexture + bias)]. It accepts values between 0 and 1, default is 0.25. An amount > 0 of bias makes sure that the blurTexture is not too sharp because of the multiplication with the depthTexture
                        debug={0}
                        reflectorOffset={0.1} // Offsets the virtual camera that projects the reflection. Useful when the reflective surface is some distance from the object's origin (default = 0)
                        metalness={0.1}
                    />{" "}
                </Sphere>
                <spotLight
                    color={[1, 0.25, 0.7]}
                    intensity={0.5}
                    angle={1}
                    penumbra={1}
                    position={[100, 200, -100]}
                    castShadow
                    shadow-bias={1}
                />
                <spotLight
                    color={[0.14, 0.5, 1]}
                    intensity={0.5}
                    angle={1}
                    penumbra={1}
                    position={[-100, 200, -100]}
                    castShadow
                    shadow-bias={-1}
                />
                <EffectComposer>
                    <Bloom
                        blendFunction={BlendFunction.ADD}
                        intensity={0.9} // The bloom intensity.
                        width={1000} // render width
                        height={1000} // render height
                        kernelSize={5} // blur kernel size
                        luminanceThreshold={0.15} // luminance threshold. Raise this value to mask out darker elements in the scene.
                        luminanceSmoothing={0.025} // smoothness of the luminance threshold. Range is [0, 1]
                    />
                    <ChromaticAberration
                        blendFunction={BlendFunction.NORMAL} // blend mode
                        offset={[0.0005, 0.0012]} // color offset
                    />
                </EffectComposer>
            </Suspense>
        </>
    );
}
export default function ClickApp() {
    return (
        <div className="clickdiv" onScroll={() => console.log("scroll div")}>
            <Suspense fallback={<div>Loading...</div>}>
                <Canvas
                    camera={{ fov: [45], position: [0, 10, 60] }}
                    mode="concurrent"
                    shadows
                >
                    <Ground />

                    <Stars />
                    <Clicks />
                    <TextEther />
                </Canvas>
            </Suspense>
        </div>
    );
}

/* <Plane
                receiveShadow
                rotation={[Math.PI / -2, 0, 0]}
                args={[0, 0, 0]}
                color="transparent"
            >

                            <PerspectiveCamera makeDefault fov={50} position={[0, 10, 40]} />
   

             <PositionalAudio
                    url="sample-3s.mp3" // Url of the sound file
                    distance={1} // Camera distance (default=1)
                    loop // Repat play (default=true)$
                    play
                    volume={10}
                />
                            //
                <Sound2 url="sample-3s.mp3" position={[12, 25, 0]} />

                <meshStandardMaterial color={"white"} />
            </Plane>
            
            
                               
*/
