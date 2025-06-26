import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

const TechDNAHelix = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();

  // Your tech stack data
  const techStack = [
    { name: 'React', color: '#61DAFB', size: 1.2 },
    { name: 'TypeScript', color: '#3178C6', size: 1.1 },
    { name: 'Three.js', color: '#049EF4', size: 1.3 },
    { name: 'Node.js', color: '#68A063', size: 1.0 },
    { name: 'MongoDB', color: '#47A248', size: 1.2 },
    { name: 'Tailwind', color: '#38B2AC', size: 0.9 },
    { name: 'Docker', color: '#2496ED', size: 1.1 },
    { name: 'GraphQL', color: '#E10098', size: 1.0 }
  ];

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // Bloom effect
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5, 0.4, 0.85
    );
    composer.addPass(bloomPass);

    // Create DNA helix
    const group = new THREE.Group();
    const radius = 10;
    const tubeRadius = 0.4;
    const segmentCount = techStack.length;

    // Create spheres for each technology
    techStack.forEach((tech, i) => {
      const angle = (i / segmentCount) * Math.PI * 2;
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);
      const z = i * 1.5 - (segmentCount * 1.5) / 2;

      // Technology sphere
      const geometry = new THREE.SphereGeometry(tech.size, 32, 32);
      const material = new THREE.MeshPhongMaterial({ 
        color: new THREE.Color(tech.color),
        emissive: new THREE.Color(tech.color).multiplyScalar(0.3),
        shininess: 100
      });
      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.set(x, y, z);
      sphere.userData = { tech };
      group.add(sphere);

      // Connecting tubes
      if (i > 0) {
        const prevTech = techStack[i - 1];
        const prevAngle = ((i - 1) / segmentCount) * Math.PI * 2;
        const prevX = radius * Math.cos(prevAngle);
        const prevY = radius * Math.sin(prevAngle);
        const prevZ = (i - 1) * 1.5 - (segmentCount * 1.5) / 2;

        const distance = Math.sqrt(
          Math.pow(x - prevX, 2) + 
          Math.pow(y - prevY, 2) + 
          Math.pow(z - prevZ, 2)
        );

        const tubeGeometry = new THREE.CylinderGeometry(
          tubeRadius, tubeRadius, distance, 8
        );
        const tubeMaterial = new THREE.MeshBasicMaterial({ 
          color: 0x888888,
          transparent: true,
          opacity: 0.7
        });
        const tube = new THREE.Mesh(tubeGeometry, tubeMaterial);

        // Position and rotate the tube
        tube.position.set(
          (x + prevX) / 2,
          (y + prevY) / 2,
          (z + prevZ) / 2
        );
        tube.quaternion.setFromUnitVectors(
          new THREE.Vector3(0, 1, 0),
          new THREE.Vector3(x - prevX, y - prevY, z - prevZ).normalize()
        );
        group.add(tube);
      }
    });

    scene.add(group);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Animation
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      group.rotation.y += 0.005;
      composer.render();
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationRef.current!);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="w-full h-[500px] relative rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700"
    />
  );
};

export default TechDNAHelix;