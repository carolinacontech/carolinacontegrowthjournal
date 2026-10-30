"use client";

import { useEffect, useRef, useState } from "react";

// Particle tree that grows out of a sphere on load, reflects in a rippling pool,
// pushes away from the pointer, and folds into a cube as the hero scrolls away.
// three.js is imported inside the effect so it stays out of the initial bundle;
// until the first frame renders (or if WebGL / motion is unavailable) the static
// hero artwork underneath stays visible.

const vert = {
  tree: /* glsl */ `
    attribute float aSize, aPhase, aDrift;
    attribute vec3 aTarget, aSphere;
    uniform float uTime, uPixelRatio, uMorph, uIntro, uHover;
    uniform vec2 uPointer, uResolution;
    varying float vGlow, vDepth;
    void main() {
      float m = smoothstep(0., 1., uMorph), intro = smoothstep(0., 1., uIntro);
      vec3 p = mix(mix(aSphere, position, intro), aTarget, m);
      float wind = sin(uTime * .75 + p.y * 1.65 + aPhase) * (.025 + smoothstep(2.5, 7., p.y) * (1. - m) * .14) * intro;
      p.x += wind + aDrift * mod(uTime * .16 + aPhase, 6.) * intro;
      p.z += sin(uTime * .55 + aPhase) * .025 * (1. - m) * intro;
      vec4 mv = modelViewMatrix * vec4(p, 1.);
      gl_Position = projectionMatrix * mv;

      // Push points away from the pointer in screen space.
      vec2 screen = (gl_Position.xy / gl_Position.w * .5 + .5) * uResolution;
      vec2 delta = screen - uPointer;
      float dist = length(delta);
      float radius = mix(170., 200., m);
      float ramp = clamp(1. - dist / radius, 0., 1.);
      ramp = pow(max(ramp * ramp * (3. - 2. * ramp), .0001), mix(1.2, .8, m));
      float repel = ramp * mix(mix(.3, .7, m), 1., smoothstep(0., radius * .34, dist)) * uHover * intro;
      gl_Position.xy += normalize(delta + vec2(.001)) * repel * mix(.056, .072, m) * gl_Position.w;

      vDepth = clamp((-mv.z - 8.) / 14., 0., 1.);
      gl_PointSize = aSize * mix(1.28, .72, vDepth) * uPixelRatio * (27. / -mv.z) * (1. + repel * mix(.07, .22, m));
      vGlow = .62 + .38 * sin(aPhase + uTime * 1.4);
    }`,
  reflection: /* glsl */ `
    attribute float aSize, aPhase, aDrift;
    attribute vec3 aTarget, aSphere;
    uniform float uTime, uMorph, uPixelRatio, uIntro;
    varying float vFade, vGlint, vMorph;
    void main() {
      float m = smoothstep(0., 1., uMorph), intro = smoothstep(0., 1., uIntro);
      vMorph = m;
      vec3 p = mix(mix(aSphere, position, intro), aTarget, m);
      p.x += sin(uTime * .75 + p.y * 1.65 + aPhase) * (.018 + smoothstep(2.5, 7., p.y) * (1. - m) * .08)
        + aDrift * mod(uTime * .16 + aPhase, 6.);
      vec4 world = modelMatrix * vec4(p, 1.);
      float waterY = -.58;
      float h = max(0., world.y - waterY);
      world.y = waterY - h * .66;
      world.x += sin(h * 7.5 + world.x * 1.7 - uTime * 1.4 + aPhase) * (.025 + h * .018) * mix(1., 1.55, m)
        + sin(world.z * 3. + uTime * .55) * h * .012;
      world.z += cos(world.x * 2.2 - uTime * .38 + aPhase) * h * .008;
      vec4 mv = viewMatrix * world;
      gl_Position = projectionMatrix * mv;
      float bands = .38 + .62 * pow(.5 + .5 * sin(h * 8. - uTime * 1.3 + aPhase * .15), 3.);
      vFade = exp(-h * .22) * (1. - smoothstep(8., 11., h)) * bands;
      vGlint = .55 + .45 * sin(aPhase + uTime * .62);
      gl_PointSize = aSize * mix(.78, 1.416, m) * (.85 + vGlint * .2) * uPixelRatio * (26. / -mv.z);
    }`,
  water: /* glsl */ `
    uniform float uTime;
    varying vec3 vP;
    varying float vH;
    void main() {
      vec3 p = position;
      float r = length(p.xz);
      float h = sin(r * 3.1 - uTime * 1.8) * .12 * exp(-r * .065) + sin(p.x * 1.35 + uTime * .7) * .045 + sin(p.z * 1.8 - uTime * .55) * .035;
      p.y += h;
      vP = p;
      vH = h;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.);
    }`,
  ripples: /* glsl */ `
    attribute float aAngle, aBand, aJitter, aSize, aPhase;
    uniform float uTime, uPixelRatio;
    varying float vAlpha, vSpark;
    void main() {
      float cycle = mod(aBand * 2.25 + uTime * .48, 13.5);
      float r = .7 + cycle + aJitter;
      float angle = aAngle + sin(uTime * .12 + aPhase) * .012;
      vec3 p = vec3(cos(angle) * r, -.51, sin(angle) * r);
      p.y += sin(r * 3.1 - uTime * 1.8) * .105 * exp(-r * .06);
      float flick = .68 + .32 * sin(aPhase + uTime * .75);
      vAlpha = smoothstep(.3, 1.6, cycle) * (1. - smoothstep(9.5, 13.5, cycle)) * flick;
      vSpark = pow(flick, 3.);
      vec4 mv = modelViewMatrix * vec4(p, 1.);
      gl_Position = projectionMatrix * mv;
      gl_PointSize = aSize * (1. + vSpark * .32) * uPixelRatio * (25. / -mv.z);
    }`,
  stars: /* glsl */ `
    attribute float aSize, aPhase;
    uniform float uTime, uPixelRatio;
    varying float vGlow;
    void main() {
      float twinkle = .5 + .5 * sin(aPhase + uTime * .34);
      vec4 mv = modelViewMatrix * vec4(position, 1.);
      gl_Position = projectionMatrix * mv;
      gl_PointSize = aSize * 1.85 * (.86 + twinkle * .3) * uPixelRatio * (28. / -mv.z);
      vGlow = .42 + .58 * twinkle;
    }`,
  quad: /* glsl */ `
    varying vec2 vUv;
    void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.); }`,
};

// Palette follows the site's signal green (#79c944) on navy (#061014).
const frag = {
  tree: /* glsl */ `
    varying float vGlow, vDepth;
    void main() {
      float d = length(gl_PointCoord - .5);
      float c = smoothstep(.19, 0., d), h = smoothstep(.5, .08, d);
      vec3 col = mix(vec3(.34, .86, .24), vec3(.04, .3, .14), vDepth);
      col = mix(col, vec3(.82, 1., .7), c * .55);
      gl_FragColor = vec4(col, (c + h * .38) * vGlow * mix(1., .48, vDepth));
    }`,
  reflection: /* glsl */ `
    varying float vFade, vGlint, vMorph;
    void main() {
      float d = length(gl_PointCoord - .5);
      float core = smoothstep(mix(.2, .11, vMorph), 0., d), halo = smoothstep(.5, mix(.055, .015, vMorph), d);
      vec3 treeCol = mix(vec3(.06, .4, .12), vec3(.36, .88, .26), core + vGlint * .2);
      vec3 cubeCol = mix(vec3(.04, .28, .1), vec3(.2, .62, .18), halo);
      vec3 col = mix(treeCol, cubeCol, vMorph);
      float a = core * mix(1., .28, vMorph) + halo * mix(.38, .82, vMorph);
      gl_FragColor = vec4(col, a * vFade * mix(.5, .27, vMorph));
    }`,
  water: /* glsl */ `
    uniform float uTime;
    varying vec3 vP;
    varying float vH;
    void main() {
      float e = .06;
      float hx = sin(length(vP.xz + vec2(e, 0.)) * 3.1 - uTime * 1.8) * .12;
      float hz = sin(length(vP.xz + vec2(0., e)) * 3.1 - uTime * 1.8) * .12;
      vec3 n = normalize(vec3(vH - hx, e, vH - hz));
      vec3 l = normalize(vec3(-.35, 1., .25));
      float spec = pow(max(dot(reflect(-l, n), normalize(vec3(0., 1., .6))), 0.), 36.);
      float wave = .5 + .5 * sin(length(vP.xz) * 4. - uTime * 1.7);
      float rings = pow(wave, 14.4), halo = pow(wave, 5.5);
      float fade = exp(-length(vP.xz) * .1);
      float shimmer = pow(max(0., sin(vP.x * 2.8 + uTime * .85) * cos(vP.z * 4.2 - uTime * .62)), 18.) * fade;
      vec3 col = mix(vec3(.012, .04, .045), vec3(.12, .5, .2), rings * .5 + spec);
      col += vec3(.4, .85, .3) * (shimmer * .3 + spec * .24 + halo * fade * .045);
      gl_FragColor = vec4(col, .48 + fade * .18 + rings * .11 + halo * fade * .025 + shimmer * .13);
    }`,
  ripples: /* glsl */ `
    varying float vAlpha, vSpark;
    void main() {
      float d = length(gl_PointCoord - .5);
      float core = smoothstep(.18, 0., d), halo = smoothstep(.5, .06, d);
      vec3 col = mix(vec3(.08, .45, .14), vec3(.6, .95, .45), core + vSpark * .2);
      gl_FragColor = vec4(col, (core + halo * .38) * vAlpha * .72);
    }`,
  stars: /* glsl */ `
    varying float vGlow;
    void main() {
      float d = length(gl_PointCoord - .5);
      float core = smoothstep(.22, 0., d), halo = smoothstep(.5, .05, d);
      gl_FragColor = vec4(vec3(1.), (core + halo * .68) * vGlow * .7);
    }`,
  glow: /* glsl */ `
    varying vec2 vUv;
    uniform float uTime;
    void main() {
      vec2 p = (vUv - .5) * vec2(1.1, 1.45);
      float radial = exp(-dot(p, p) * 8.);
      gl_FragColor = vec4(.05, .3, .1, radial * (.86 + .14 * sin(uTime * .18 + vUv.y * 5.)) * .2);
    }`,
};

const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

export function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let disposed = false;
    let cleanup = () => {};

    import("three").then((THREE) => {
      if (disposed) return;

      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try {
        renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: "high-performance" });
      } catch {
        return; // No WebGL: keep the static artwork.
      }
      const small = host.clientWidth < 700;
      renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.35;

      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x061014);
      scene.fog = new THREE.FogExp2(0x061014, 0.036);

      const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
      camera.position.set(0, 3.1, 17);

      const group = new THREE.Group();
      scene.add(group);

      const shared = {
        uTime: { value: 0 },
        uPixelRatio: { value: renderer.getPixelRatio() },
        uMorph: { value: 0 },
        uIntro: { value: 0 },
        uHover: { value: 0 },
        uPointer: { value: new THREE.Vector2(-1000, -1000) },
        uResolution: { value: new THREE.Vector2(1, 1) },
      };
      const additive = (vertexShader: string, fragmentShader: string, depthTest = false) =>
        new THREE.ShaderMaterial({
          uniforms: shared,
          vertexShader,
          fragmentShader,
          transparent: true,
          depthWrite: false,
          depthTest,
          blending: THREE.AdditiveBlending,
        });

      // --- Tree, cube and sphere point sets -----------------------------------------
      const pos: number[] = [], cube: number[] = [], size: number[] = [], phase: number[] = [], drift: number[] = [];

      // The front face of the cube spells the journal's name.
      const label = document.createElement("canvas");
      label.width = 720;
      label.height = 180;
      const ctx = label.getContext("2d")!;
      ctx.fillStyle = "#fff";
      ctx.font = "800 90px Inter, Arial, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("AI Growth", 360, 90);
      const pixels = ctx.getImageData(0, 0, 720, 180).data;
      const letters: number[][] = [];
      for (let y = 0; y < 180; y += 3)
        for (let x = 0; x < 720; x += 3)
          if (pixels[(y * 720 + x) * 4 + 3] > 80) letters.push([(x - 360) / 120, -(y - 90) / 120, 2.7]);

      const cubePoint = (i: number) => {
        if (i % 4 === 0 && letters.length) {
          const [x, y, z] = letters[Math.floor(Math.random() * letters.length)];
          return [x + (Math.random() - 0.5) * 0.04, y + (Math.random() - 0.5) * 0.04, z];
        }
        const e = 2.65;
        const p = [0, 0, 0].map(() => (Math.random() * 2 - 1) * e);
        const face = Math.floor(Math.random() * 6);
        const axis = Math.floor(face / 2);
        p[axis] = (face % 2 ? 1 : -1) * e;
        if (Math.random() < 0.34) p[(axis + 1 + Math.floor(Math.random() * 2)) % 3] = (Math.random() < 0.5 ? -1 : 1) * e;
        return p;
      };

      const add = (x: number, y: number, z: number, s = 2, d = 0) => {
        pos.push(x, y, z);
        cube.push(...cubePoint(pos.length / 3));
        size.push(s + 0.25);
        phase.push(Math.random() * 20);
        drift.push(d);
      };

      const density = small ? 0.35 : 0.55;
      const canopy = [
        [-2.5, 5.3, 0, 2.8, 1.7, 2.75], [-0.8, 6.35, 0.15, 2.7, 1.8, 2.8], [1.35, 6.2, -0.1, 2.8, 1.8, 2.85],
        [3, 5.1, 0.1, 2.45, 1.55, 2.4], [0, 4.85, 0, 3.9, 1.6, 3.2], [-3.7, 4.5, 0.2, 1.8, 1.25, 1.9],
        [0, 5.45, 1.75, 2.55, 1.6, 2.1], [0.25, 5.3, -1.8, 2.65, 1.55, 2.15],
      ];
      for (const [cx, cy, cz, rx, ry, rz] of canopy) {
        for (let i = 0, n = Math.round(3200 * density); i < n; i++) {
          const v = Math.random() * 2 - 1, a = Math.random() * Math.PI * 2, r = Math.cbrt(Math.random());
          const s = Math.sqrt(1 - v * v);
          const x = cx + Math.cos(a) * s * r * rx;
          add(x, cy + v * r * ry, cz + Math.sin(a) * s * r * rz, 1.2 + Math.random() * 2.6 + r * r * 1.3,
            x > 1.3 && Math.random() < 0.032 ? 0.1 + Math.random() * 0.2 : 0); // a few leaves blow away
        }
      }

      const V = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);
      const branch = (from: InstanceType<typeof THREE.Vector3>, to: InstanceType<typeof THREE.Vector3>, width: number, n: number) => {
        const p = new THREE.Vector3();
        for (let i = 0, count = Math.round(n * density); i < count; i++) {
          const t = Math.random(), w = (1 - t) * width + 0.07;
          p.lerpVectors(from, to, t);
          add(p.x + (Math.random() - 0.5) * w, p.y + (Math.random() - 0.5) * w, p.z + (Math.random() - 0.5) * w, 1.2 + Math.random() * 1.7);
        }
      };
      const limbs = [[-3.3, 5.3], [-1.7, 6], [-0.4, 6.5], [1.8, 6.2], [3.4, 5.25]];
      branch(V(0, 0, 0), V(0, 3.8, 0), 1.7, 3600);
      limbs.forEach(([x, y], i) => {
        const mid = V(x * 0.34, 3.5 + (i % 2) * 0.35, (i - 2) * 0.18);
        branch(V(0, 1.7, 0), mid, 0.8, 850);
        branch(mid, V(x, y, (i % 2 - 0.5) * 0.6), 0.48, 900);
        for (let j = 0; j < 3; j++) {
          const a = V(x * 0.62, y - 0.72 + j * 0.18, (j - 1) * 0.32);
          const b = V(x + (j - 1) * 0.72, y + 0.25 + j * 0.36, (j - 1) * 0.85 + (i - 2) * 0.12);
          branch(a, b, 0.24, 430);
          branch(b, V(b.x + (j - 1) * 0.42, b.y + 0.42, b.z + (1 - j) * 0.26), 0.13, 230);
        }
      });
      [-1, 1].forEach((side) => {
        for (let i = 0; i < 4; i++) {
          const a = V((i - 1.5) * 0.34, 2.5 + i * 0.27, side * 0.18);
          const b = V((i - 1.5) * 0.62, 3.75 + i * 0.31, side * (1.25 + i * 0.32));
          const c = V((i - 1.5) * 1.02, 5.15 + i * 0.28, side * (3.05 + (i % 2) * 0.55));
          branch(a, b, 0.58, 620);
          branch(b, c, 0.34, 560);
          branch(c, V(c.x + (i % 2 ? -0.55 : 0.55), c.y + 0.48, c.z + side * 0.48), 0.16, 260);
        }
      });

      // Each point starts on a sphere and grows into the tree during the intro.
      const sphere: number[] = [];
      for (let i = 0; i < pos.length / 3; i++) {
        const v = 1 - Math.random() * 2, a = Math.random() * Math.PI * 2, r = 3.15 * Math.cbrt(0.72 + Math.random() * 0.28);
        const s = Math.sqrt(1 - v * v);
        sphere.push(Math.cos(a) * s * r, 4.55 + v * r, Math.sin(a) * s * r);
      }

      const treeGeo = new THREE.BufferGeometry();
      treeGeo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
      treeGeo.setAttribute("aTarget", new THREE.Float32BufferAttribute(cube, 3));
      treeGeo.setAttribute("aSphere", new THREE.Float32BufferAttribute(sphere, 3));
      treeGeo.setAttribute("aSize", new THREE.Float32BufferAttribute(size, 1));
      treeGeo.setAttribute("aPhase", new THREE.Float32BufferAttribute(phase, 1));
      treeGeo.setAttribute("aDrift", new THREE.Float32BufferAttribute(drift, 1));

      const tree = new THREE.Points(treeGeo, additive(vert.tree, frag.tree));
      tree.renderOrder = 20;
      tree.frustumCulled = false;
      group.add(tree);
      const reflection = new THREE.Points(treeGeo, additive(vert.reflection, frag.reflection));
      reflection.renderOrder = 4;
      reflection.frustumCulled = false;
      group.add(reflection);

      // --- Water, ripples, glow and stars -------------------------------------------
      const water = new THREE.Mesh(
        new THREE.PlaneGeometry(42, 26, 220, 140).rotateX(-Math.PI / 2),
        new THREE.ShaderMaterial({ uniforms: shared, vertexShader: vert.water, fragmentShader: frag.water, transparent: true, depthWrite: false, side: THREE.DoubleSide })
      );
      water.position.y = -0.66;
      scene.add(water);

      const rippleCount = small ? 900 : 1600;
      const rippleGeo = new THREE.BufferGeometry();
      rippleGeo.setAttribute("position", new THREE.Float32BufferAttribute(new Float32Array(rippleCount * 3), 3));
      const rippleAttr = (name: string, fn: (i: number) => number) =>
        rippleGeo.setAttribute(name, new THREE.Float32BufferAttribute(Float32Array.from({ length: rippleCount }, (_, i) => fn(i)), 1));
      rippleAttr("aAngle", () => Math.random() * Math.PI * 2);
      rippleAttr("aBand", (i) => i % 6);
      rippleAttr("aJitter", () => (Math.random() - 0.5) * 0.42);
      rippleAttr("aSize", () => (0.75 + Math.random() * 1.65) * 1.2);
      rippleAttr("aPhase", () => Math.random() * 20);
      const ripples = new THREE.Points(rippleGeo, additive(vert.ripples, frag.ripples, true));
      ripples.renderOrder = 3;
      ripples.frustumCulled = false;
      scene.add(ripples);

      const glow = new THREE.Mesh(
        new THREE.PlaneGeometry(18, 12),
        new THREE.ShaderMaterial({ uniforms: shared, vertexShader: vert.quad, fragmentShader: frag.glow, transparent: true, depthWrite: false, depthTest: false, blending: THREE.AdditiveBlending })
      );
      glow.position.set(0, 3.5, -3.5);
      glow.renderOrder = -2;
      scene.add(glow);

      const starPos: number[] = [], starSize: number[] = [], starPhase: number[] = [];
      for (let i = 0; i < 600; i++) {
        starPos.push((Math.random() - 0.5) * 40, 1 + Math.random() * 16, -5 - Math.random() * 13);
        starSize.push(0.45 + Math.random() * 1.25);
        starPhase.push(Math.random() * 20);
      }
      const starGeo = new THREE.BufferGeometry();
      starGeo.setAttribute("position", new THREE.Float32BufferAttribute(starPos, 3));
      starGeo.setAttribute("aSize", new THREE.Float32BufferAttribute(starSize, 1));
      starGeo.setAttribute("aPhase", new THREE.Float32BufferAttribute(starPhase, 1));
      const stars = new THREE.Points(starGeo, additive(vert.stars, frag.stars, true));
      stars.renderOrder = 1;
      scene.add(stars);

      // --- Sizing, input, scroll --------------------------------------------------
      let width = 1, height = 1;
      const resize = () => {
        width = host.clientWidth;
        height = host.clientHeight;
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        // Wide heroes put the copy on the left, so the tree moves right and the
        // camera pulls back slightly to keep the whole canopy in frame.
        camera.fov = camera.aspect < 1 ? 58 : 42;
        camera.updateProjectionMatrix();
        group.position.x = camera.aspect > 1.4 ? Math.min(5.5, (camera.aspect - 1) * 3.2) : 0;
        shared.uResolution.value.set(width, height);
      };
      resize();
      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(host);

      let tiltX = 0, tiltY = 0;
      const onPointerMove = (e: PointerEvent) => {
        const rect = host.getBoundingClientRect();
        const x = e.clientX - rect.left, y = e.clientY - rect.top;
        const inside = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;
        shared.uHover.value = inside ? 1 : 0;
        if (!inside) return;
        shared.uPointer.value.set(x, rect.height - y);
        tiltX = x / rect.width - 0.5;
        tiltY = y / rect.height - 0.5;
      };
      window.addEventListener("pointermove", onPointerMove, { passive: true });

      // Morph from tree to cube as the hero scrolls out of view.
      let scroll = 0;
      const onScroll = () => {
        const rect = host.getBoundingClientRect();
        scroll = Math.min(1, Math.max(0, -rect.top / Math.max(1, rect.height)));
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });

      // Only render while the hero is on screen and the tab is visible.
      let visible = true;
      const intersection = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (visible) schedule();
      });
      intersection.observe(host);
      const onVisibility = () => {
        if (!document.hidden) schedule();
      };
      document.addEventListener("visibilitychange", onVisibility);

      const clock = new THREE.Clock();
      let introStart = -1, frame = 0, first = true;
      const schedule = () => {
        if (!frame && !disposed) frame = requestAnimationFrame(render);
      };
      const render = () => {
        frame = 0;
        if (disposed || !visible || document.hidden) {
          clock.getDelta(); // don't let the clock jump when we resume
          return;
        }
        const t = clock.getElapsedTime();
        if (introStart < 0) introStart = t;
        shared.uIntro.value = smooth(0, 1, (t - introStart) / 2.2);
        const m = smooth(0.12, 0.85, scroll);
        shared.uTime.value = t;
        shared.uMorph.value = m;

        group.position.y = -0.38 + m * 3.9;
        group.scale.setScalar(1 - m * 0.15);
        group.rotation.y += (tiltX * 0.12 * (1 - m) + m * Math.PI * 2.55 - group.rotation.y) * 0.035;
        group.rotation.x += (tiltY * 0.035 * (1 - m) + m * 0.34 - group.rotation.x) * 0.03;
        group.rotation.z += (m * 0.08 - group.rotation.z) * 0.03;

        camera.position.z = 17 - Math.sin(m * Math.PI) * 0.18 + Math.sin(t * 0.34) * 0.11;
        camera.position.y = 3.1 + Math.sin(t * 0.21) * 0.045;
        camera.lookAt(group.position.x * 0.35, 3.2, 0);

        renderer.render(scene, camera);
        if (first) {
          first = false;
          setReady(true);
        }
        schedule();
      };
      schedule();

      cleanup = () => {
        cancelAnimationFrame(frame);
        resizeObserver.disconnect();
        intersection.disconnect();
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("scroll", onScroll);
        document.removeEventListener("visibilitychange", onVisibility);
        scene.traverse((obj) => {
          const o = obj as { geometry?: { dispose(): void }; material?: { dispose(): void } };
          o.geometry?.dispose();
          o.material?.dispose();
        });
        renderer.dispose();
      };
    });

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 size-full transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}
    />
  );
}
