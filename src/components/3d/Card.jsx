import React, { forwardRef, useRef } from 'react';
import { Float, RoundedBox } from '@react-three/drei';

const Card = forwardRef((props, ref) => {
    // We expect `ref` to be passed from parent for GSAP control of the entire group.

    return (
        // We remove Float here to yield full control to GSAP, 
        // OR we keep it wrapping a child group if we want independent idle float.
        // Plan: GSAP controls the "Tap" (position Z, rotation).
        // Float handles the "Idle" hover.
        // Issue: If GSAP animates position, Float might conflict if it overwrites position.
        // Solution: Wrap the controllable mesh in a Group that GSAP moves. Float wraps that? No, Float moves its children.
        // Best: GSAP moves the Parent Group. Float is INSIDE, moving the Mesh.
        // Actually, for "Tap", we want to move towards camera. Float might just be noise.
        // Let's Keep Float for the "Idle" feel, but GSAP animates the container.

        <group ref={ref} {...props}>
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5} floatingRange={[-0.1, 0.1]}>
                <group rotation={[0, -0.2, 0]}>
                    {/* Card Body - Dark Premium Metal */}
                    <RoundedBox args={[3.2, 2, 0.1]} radius={0.1} smoothness={4}>
                        <meshPhysicalMaterial
                            color="#0B1426" // Deep Midnight
                            metalness={0.8}
                            roughness={0.2}
                            clearcoat={1}
                            clearcoatRoughness={0.15}
                            envMapIntensity={1.5}
                        />
                    </RoundedBox>

                    {/* Chip - Gold */}
                    <RoundedBox args={[0.5, 0.4, 0.02]} radius={0.05} position={[-1, 0.3, 0.06]}>
                        <meshStandardMaterial
                            color="#FCD34D"
                            metalness={1}
                            roughness={0.3}
                        />
                    </RoundedBox>

                    {/* Logo/Brand Area - Cyan Accent */}
                    <RoundedBox args={[0.8, 0.2, 0.01]} radius={0.01} position={[1, 0.7, 0.06]}>
                        <meshBasicMaterial color="#00D1FF" />
                    </RoundedBox>

                    {/* Magstripe / Back Detail (implied by slight transparency/depth?) - simplified */}

                    {/* Contactless Icon - Minimal Silver */}
                    <group position={[1.2, 0, 0.06]}>
                        {[0.1, 0.18, 0.26].map((r, i) => (
                            <mesh key={i}>
                                <ringGeometry args={[r, r + 0.02, 32]} />
                                <meshStandardMaterial color="#E2E8F0" emissive="#E2E8F0" emissiveIntensity={0.5} />
                            </mesh>
                        ))}
                    </group>
                </group>
            </Float>
        </group>
    );
});

export default Card;
