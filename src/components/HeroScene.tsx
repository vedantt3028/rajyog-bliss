import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useMotionPreference } from "@/hooks/useMotionPreference";

/**
 * Calm particle hero with strong mobile optimizations:
 * - Tiered particle budget (mobile / tablet / desktop)
 * - prefers-reduced-motion → CSS-only static fallback (no WebGL)
 * - Pauses when tab hidden or hero scrolled out of view
 * - Pointer-fine only parallax (skipped on touch)
 * - DPR cap; skips per-frame position upload on low-end
 */

type Tier = "low" | "mid" | "high";

function detectTier(): Tier {
  if (typeof window === "undefined") return "high";
  const w = window.innerWidth;
  // navigator.deviceMemory is non-standard but useful when present
  const mem = (navigator as unknown as { deviceMemory?: number }).deviceMemory ?? 8;
  const cores = navigator.hardwareConcurrency ?? 8;
  if (w <= 768 || mem <= 4 || cores <= 4) return "low";
  if (w <= 1280) return "mid";
  return "high";
}

function StaticFallback() {
  // Pure CSS calm backdrop — no WebGL, no JS animation cost.
  return (
    <div className="absolute inset-0 -z-0" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.45_0.08_150/0.55),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,oklch(0.78_0.13_85/0.18),transparent_55%)]" />
    </div>
  );
}

export function HeroScene() {
  const mountRef = useRef<HTMLDivElement>(null);
  const { reduced } = useMotionPreference();

  useEffect(() => {
    if (reduced) return;
    const mount = mountRef.current;
    if (!mount) return;

    const tier = detectTier();
    const PARTICLE_COUNT = tier === "low" ? 600 : tier === "mid" ? 1200 : 1800;
    const ACCENT_COUNT = tier === "low" ? 0 : tier === "mid" ? 200 : 400;
    const SKIP_DRIFT = tier === "low"; // skip per-frame buffer upload
    const finePointer = window.matchMedia("(pointer: fine)").matches;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x14331f, tier === "low" ? 0.018 : 0.025);

    const camera = new THREE.PerspectiveCamera(60, mount.clientWidth / mount.clientHeight, 0.1, 200);
    camera.position.set(0, 0, 28);

    const renderer = new THREE.WebGLRenderer({
      antialias: tier === "high",
      alpha: true,
      powerPreference: "low-power",
    });
    const dprCap = tier === "low" ? 1 : tier === "mid" ? 1.5 : 2;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, dprCap));
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
      size: 0.45, map: sprite, transparent: true, depthWrite: false,
      blending: THREE.AdditiveBlending, color: 0xf5e9c4, opacity: 0.85,
    });
    const points = new THREE.Points(geometry, material);
    scene.add(points);

    let accent: THREE.Points | null = null;
    let accentGeo: THREE.BufferGeometry | null = null;
    let accentMat: THREE.PointsMaterial | null = null;
    if (ACCENT_COUNT > 0) {
      accentGeo = new THREE.BufferGeometry();
      const accentPos = new Float32Array(ACCENT_COUNT * 3);
      for (let i = 0; i < ACCENT_COUNT; i++) {
        accentPos[i * 3 + 0] = (Math.random() - 0.5) * 70;
        accentPos[i * 3 + 1] = (Math.random() - 0.5) * 50;
        accentPos[i * 3 + 2] = (Math.random() - 0.5) * 40;
      }
      accentGeo.setAttribute("position", new THREE.BufferAttribute(accentPos, 3));
      accentMat = new THREE.PointsMaterial({
        size: 0.7, map: sprite, transparent: true, depthWrite: false,
        blending: THREE.AdditiveBlending, color: 0x9bd1a3, opacity: 0.5,
      });
      accent = new THREE.Points(accentGeo, accentMat);
      scene.add(accent);
    }

    // Parallax (pointer-fine only; touch devices skip listener entirely)
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    const onMove = (e: PointerEvent) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 2;
      target.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    if (finePointer) window.addEventListener("pointermove", onMove, { passive: true });

    const onResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);

    // Pause when tab hidden or hero offscreen
    let visibleTab = !document.hidden;
    let inView = true;
    const onVisibility = () => { visibleTab = !document.hidden; if (visibleTab && inView) loop(); };
    document.addEventListener("visibilitychange", onVisibility);
    const io = new IntersectionObserver(
      (entries) => {
        inView = entries[0]?.isIntersecting ?? true;
        if (inView && visibleTab) loop();
      },
      { threshold: 0.01 }
    );
    io.observe(mount);

    let raf = 0;
    const clock = new THREE.Clock();
    const positionAttr = geometry.attributes.position as THREE.BufferAttribute;
    const arr = positionAttr.array as Float32Array;

    const loop = () => {
      cancelAnimationFrame(raf);
      const tick = () => {
        if (!visibleTab || !inView) { raf = 0; return; }
        const t = clock.getElapsedTime();

        if (!SKIP_DRIFT) {
          for (let i = 0; i < PARTICLE_COUNT; i++) {
            arr[i * 3 + 1] += speeds[i] * 0.1;
            if (arr[i * 3 + 1] > 30) arr[i * 3 + 1] = -30;
          }
          positionAttr.needsUpdate = true;
        }

        points.rotation.y = t * 0.02;
        if (accent) accent.rotation.y = -t * 0.015;

        if (finePointer) {
          current.x += (target.x - current.x) * 0.04;
          current.y += (target.y - current.y) * 0.04;
          camera.position.x = current.x * 2.5;
          camera.position.y = -current.y * 1.8;
          camera.lookAt(0, 0, 0);
        }

        renderer.render(scene, camera);
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      if (finePointer) window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", onResize);
      geometry.dispose();
      material.dispose();
      accentGeo?.dispose();
      accentMat?.dispose();
      sprite.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, [reducedMotion]);

  if (reducedMotion) return <StaticFallback />;
  return <div ref={mountRef} className="absolute inset-0 -z-0" aria-hidden="true" />;
}
