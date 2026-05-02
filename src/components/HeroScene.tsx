import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Three.js calm particle field with parallax camera and fog.
 * Optimized for mobile (reduced particle count + DPR cap).
 */
export function HeroScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const PARTICLE_COUNT = isMobile ? 1100 : 1900;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x14331f, 0.025);

    const camera = new THREE.PerspectiveCamera(
      60,
      mount.clientWidth / mount.clientHeight,
      0.1,
      200
    );
    camera.position.set(0, 0, 28);

    const renderer = new THREE.WebGLRenderer({ antialias: !isMobile, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // Particles
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const speeds = new Float32Array(PARTICLE_COUNT);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 60;
      speeds[i] = 0.005 + Math.random() * 0.015;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    // Soft circular sprite
    const sprite = (() => {
      const c = document.createElement("canvas");
      c.width = c.height = 64;
      const ctx = c.getContext("2d")!;
      const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      g.addColorStop(0, "rgba(255,238,180,1)");
      g.addColorStop(0.4, "rgba(220,200,140,0.6)");
      g.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 64, 64);
      return new THREE.CanvasTexture(c);
    })();

    const material = new THREE.PointsMaterial({
      size: 0.45,
      map: sprite,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      color: 0xf5e9c4,
      opacity: 0.85,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Subtle accent layer (greenish dust)
    const accentGeo = new THREE.BufferGeometry();
    const accentPos = new Float32Array(400 * 3);
    for (let i = 0; i < 400; i++) {
      accentPos[i * 3 + 0] = (Math.random() - 0.5) * 70;
      accentPos[i * 3 + 1] = (Math.random() - 0.5) * 50;
      accentPos[i * 3 + 2] = (Math.random() - 0.5) * 40;
    }
    accentGeo.setAttribute("position", new THREE.BufferAttribute(accentPos, 3));
    const accentMat = new THREE.PointsMaterial({
      size: 0.7,
      map: sprite,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      color: 0x9bd1a3,
      opacity: 0.5,
    });
    const accent = new THREE.Points(accentGeo, accentMat);
    scene.add(accent);

    // Mouse parallax
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    const onMove = (e: MouseEvent) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 2;
      target.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove);

    const onResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);

    let raf = 0;
    const clock = new THREE.Clock();
    const animate = () => {
      const t = clock.getElapsedTime();
      // Slow drift
      const pos = geometry.attributes.position as THREE.BufferAttribute;
      const arr = pos.array as Float32Array;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        arr[i * 3 + 1] += speeds[i] * 0.1;
        if (arr[i * 3 + 1] > 30) arr[i * 3 + 1] = -30;
      }
      pos.needsUpdate = true;

      points.rotation.y = t * 0.02;
      accent.rotation.y = -t * 0.015;

      // Smooth parallax
      current.x += (target.x - current.x) * 0.04;
      current.y += (target.y - current.y) * 0.04;
      camera.position.x = current.x * 2.5;
      camera.position.y = -current.y * 1.8;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      geometry.dispose();
      material.dispose();
      accentGeo.dispose();
      accentMat.dispose();
      sprite.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 -z-0" aria-hidden="true" />;
}
