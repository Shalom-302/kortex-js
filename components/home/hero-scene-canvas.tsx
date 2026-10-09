"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { HeroK } from "./hero-k";

// The K outline (24×24 grid, y pointing down), same geometry as K_PATH.
const K_POLYGON: [number, number][] = [
  [4, 2], [8.5, 2], [8.5, 10.6], [16.2, 2], [21.5, 2], [12.4, 12],
  [21.5, 22], [16.2, 22], [8.5, 13.4], [8.5, 22], [4, 22],
];
const K_CENTER = { x: 12.75, y: 12 };
const K_PARTICLES = 9000;
const DUST_PARTICLES = 1400;
const DEPTH = 2.2;

function hasWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

function insideK(x: number, y: number) {
  let inside = false;
  for (let i = 0, j = K_POLYGON.length - 1; i < K_POLYGON.length; j = i++) {
    const [xi, yi] = K_POLYGON[i];
    const [xj, yj] = K_POLYGON[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

function buildGeometry() {
  const total = K_PARTICLES + DUST_PARTICLES;
  const target = new Float32Array(total * 3);
  const scatter = new Float32Array(total * 3);
  const rand = new Float32Array(total);

  let i = 0;
  while (i < K_PARTICLES) {
    const x = 4 + Math.random() * 17.5;
    const y = 2 + Math.random() * 20;
    if (!insideK(x, y)) continue;
    target.set([x - K_CENTER.x, -(y - K_CENTER.y), (Math.random() * 2 - 1) * DEPTH], i * 3);
    i++;
  }
  for (; i < total; i++) {
    // Dust: a loose shell around the letter.
    const r = 14 + Math.random() * 22;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);
    target.set([r * Math.sin(phi) * Math.cos(theta), r * Math.sin(phi) * Math.sin(theta) * 0.6, r * Math.cos(phi) * 0.5], i * 3);
  }
  for (let p = 0; p < total; p++) {
    const r = 30 + Math.random() * 40;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);
    scatter.set([r * Math.sin(phi) * Math.cos(theta), r * Math.sin(phi) * Math.sin(theta), r * Math.cos(phi)], p * 3);
    rand[p] = p < K_PARTICLES ? Math.random() : -1 - Math.random(); // negative = dust
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(target, 3));
  geometry.setAttribute("aScatter", new THREE.BufferAttribute(scatter, 3));
  geometry.setAttribute("aRand", new THREE.BufferAttribute(rand, 1));
  return geometry;
}

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uProgress;
  uniform float uPixelRatio;
  attribute vec3 aScatter;
  attribute float aRand;
  varying float vAlpha;

  void main() {
    float dust = step(aRand, 0.0);
    float seed = abs(aRand);
    // Each particle lands at its own pace.
    float p = clamp(uProgress * 1.6 - seed * 0.6, 0.0, 1.0);
    p = 1.0 - pow(1.0 - p, 3.0);
    vec3 pos = mix(aScatter, position, p);
    // Slow breathing once assembled.
    pos += vec3(
      sin(uTime * 0.6 + seed * 40.0),
      cos(uTime * 0.5 + seed * 30.0),
      sin(uTime * 0.4 + seed * 20.0)
    ) * mix(0.05, 0.6, dust);

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    float size = mix(1.6 + seed * 1.4, 1.0 + seed, dust);
    gl_PointSize = size * uPixelRatio * (40.0 / -mv.z);
    vAlpha = mix(0.55 + seed * 0.45, 0.18 + seed * 0.2, dust) * p;
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uOpacity;
  varying float vAlpha;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float a = smoothstep(0.5, 0.1, d) * vAlpha * uOpacity;
    gl_FragColor = vec4(vec3(1.0), a);
  }
`;

/**
 * Hero WebGL scene: thousands of white particles gather into a volumetric K, then breathe.
 * Follows the pointer, pauses off-screen, renders one still frame with reduced motion,
 * and falls back to the SVG K without WebGL.
 */
export default function HeroSceneCanvas({ className }: { className?: string }) {
  const mount = useRef<HTMLDivElement>(null);
  // Client-only component (loaded with ssr: false), so the DOM is available here.
  const [failed] = useState(() => !hasWebGL());

  useEffect(() => {
    const host = mount.current;
    if (!host || failed) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: "low-power" });
    } catch {
      return;
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pixelRatio = Math.min(window.devicePixelRatio, 2);
    renderer.setPixelRatio(pixelRatio);
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.cssText = "width:100%;height:100%;display:block";
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 200);
    camera.position.z = 48;

    const geometry = buildGeometry();
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uProgress: { value: reduce ? 1 : 0 },
        uPixelRatio: { value: pixelRatio },
        uOpacity: { value: 1 },
      },
    });
    const points = new THREE.Points(geometry, material);
    const group = new THREE.Group();
    group.add(points);
    scene.add(group);

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = host;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      // Desktop: letter sits on the right. Mobile: centred, quieter, behind the text.
      const visibleH = 2 * Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
      const wide = camera.aspect > 1.1;
      group.position.x = wide ? visibleH * camera.aspect * 0.22 : 0;
      group.scale.setScalar(wide ? 1 : 0.85);
      material.uniforms.uOpacity.value = wide ? 1 : 0.45;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    const pointer = { x: 0, y: 0 };
    const onPointer = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    let frame = 0;
    let visible = true;
    const startedAt = performance.now();

    const render = () => {
      const t = (performance.now() - startedAt) / 1000;
      material.uniforms.uTime.value = t;
      if (!reduce) {
        material.uniforms.uProgress.value = Math.min(1, t / 3.2);
        const targetY = Math.sin(t * 0.18) * 0.35 + pointer.x * 0.35;
        const targetX = pointer.y * 0.18;
        group.rotation.y += (targetY - group.rotation.y) * 0.04;
        group.rotation.x += (targetX - group.rotation.x) * 0.04;
      }
      renderer.render(scene, camera);
    };

    const loop = () => {
      render();
      frame = requestAnimationFrame(loop);
    };
    const start = () => {
      if (reduce || frame || !visible || document.hidden) return;
      frame = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(host);
    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);

    if (reduce) render();
    else start();

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVisibility);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [failed]);

  if (failed) return <HeroK className={className} />;
  return <div ref={mount} aria-hidden className={className} />;
}
