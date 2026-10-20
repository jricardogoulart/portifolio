import { useEffect, useRef, useState, useCallback } from 'react';
import { PERSONA, BACKUP_HERO } from '../data/portfolioData';
import LogoMark3D from './LogoMark3D';
import ArrowIcon from './ArrowIcon';

const VERTEX_SHADER = `
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `
precision highp float;
varying vec2 vUv;
uniform sampler2D image;
uniform vec2 resolution, imageSize, mouse, trail[9];
uniform float strength, time;

vec2 coverUv(vec2 uv) {
  float rs = resolution.x / resolution.y;
  float ims = imageSize.x / imageSize.y;
  vec2 scale = rs < ims ? vec2(rs / ims, 1.0) : vec2(1.0, ims / rs);
  return (uv - 0.5) * scale + 0.5;
}

void main() {
  vec2 uv = vUv;
  vec2 aspect = vec2(resolution.x / resolution.y, 1.0);
  vec2 delta = (uv - mouse) * aspect;
  float dist = length(delta);
  float radius = 0.47;
  float falloff = (1.0 - smoothstep(0.0, radius, dist)) * strength;
  vec2 dir = delta / (dist + 0.0001);
  vec2 tangent = vec2(-dir.y, dir.x);
  float wave = sin(dist * 38.0 - time * 2.15) * falloff;
  float secondary = sin(dist * 19.0 + time * 0.7) * falloff;
  vec2 displacement = dir * (wave * 0.00525 + falloff * 0.004);
  displacement += tangent * secondary * 0.001875;
  vec2 sampleUv = coverUv(uv + displacement);
  float aberration = (falloff * 0.0016 + abs(wave) * 0.0012);
  vec2 rgbShift = dir * aberration;
  float r = texture2D(image, sampleUv + rgbShift).r;
  float g = texture2D(image, sampleUv).g;
  float b = texture2D(image, sampleUv - rgbShift).b;
  vec3 color = vec3(r, g, b);

  // Deep black & white monochrome conversion
  float luma = dot(color, vec3(0.299, 0.587, 0.114));
  luma = pow(luma, 1.25) * 0.76;
  color = vec3(luma);

  float glow = falloff * (0.08 + 0.05 * (sin(dist * 28.0 - time * 1.5) * 0.5 + 0.5));
  float trailGlow = 0.0;
  for (int i = 0; i < 9; i++) {
    vec2 trailDelta = (uv - trail[i]) * aspect;
    float trailDistance = length(trailDelta);
    float age = 1.0 - float(i) / 9.0;
    float halo = exp(-trailDistance * trailDistance * 145.0);
    float core = exp(-trailDistance * trailDistance * 420.0);
    float shimmer = 0.82 + 0.18 * sin(time * 2.0 - float(i) * 0.72);
    trailGlow += (halo * 0.48 + core * 0.28) * age * age * shimmer;
  }
  float headProtection = smoothstep(0.035, 0.105, dist);
  trailGlow = min(trailGlow, 1.35) * strength * headProtection;
  vec3 silver = vec3(0.85, 0.88, 0.92);
  color += silver * (glow * 0.7 + trailGlow * 0.28);
  gl_FragColor = vec4(color, 1.0);
}
`;

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function eventPointerIsFine(event: React.PointerEvent<HTMLElement> | PointerEvent) {
  if (!event) return false;
  if (event.pointerType) return event.pointerType === 'mouse' || event.pointerType === 'pen';
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
}

function isInteractiveTarget(target: EventTarget | null) {
  try {
    return !!(
      target &&
      (target as HTMLElement).closest &&
      (target as HTMLElement).closest('a, button, input, textarea, select')
    );
  } catch {
    return false;
  }
}

function imageCoverCoordinates(
  clientX: number,
  clientY: number,
  stage: HTMLElement | null,
  image: HTMLImageElement | null
) {
  const rect = stage ? stage.getBoundingClientRect() : null;
  if (!rect || !rect.width || !rect.height) return { x: 0.5, y: 0.5, localX: 0, localY: 0 };
  const imageWidth = image && image.naturalWidth ? image.naturalWidth : rect.width;
  const imageHeight = image && image.naturalHeight ? image.naturalHeight : rect.height;
  const imageRatio = imageWidth / Math.max(imageHeight, 1);
  const stageRatio = rect.width / Math.max(rect.height, 1);
  let renderedWidth: number;
  let renderedHeight: number;
  if (stageRatio < imageRatio) {
    renderedHeight = rect.height;
    renderedWidth = renderedHeight * imageRatio;
  } else {
    renderedWidth = rect.width;
    renderedHeight = renderedWidth / Math.max(imageRatio, 0.0001);
  }
  const offsetX = (rect.width - renderedWidth) * 0.5;
  const offsetY = (rect.height - renderedHeight) * 0.5;
  const x = (clientX - rect.left - offsetX) / Math.max(renderedWidth, 1);
  const y = (clientY - rect.top - offsetY) / Math.max(renderedHeight, 1);
  return {
    x,
    y,
    localX: (clientX - rect.left) / Math.max(rect.width, 1),
    localY: (clientY - rect.top) / Math.max(rect.height, 1)
  };
}

function heroLocalCoordinates(clientX: number, clientY: number, hero: HTMLElement | null) {
  const rect = hero ? hero.getBoundingClientRect() : null;
  if (!rect || !rect.width || !rect.height) return { x: 0.5, y: 0.5 };
  return {
    x: (clientX - rect.left) / rect.width,
    y: (clientY - rect.top) / rect.height
  };
}

function LogoWord({ text, name }: { text: string; name: string }) {
  return (
    <span className={`hero-logo-word hero-logo-word--${name}`} aria-hidden="true">
      {[...text].map((char, i) => (
        <span key={i} className="hero-logo-ch" style={{ ['--i' as string]: i } as React.CSSProperties}>
          <span className="hero-logo-glyph">{char}</span>
        </span>
      ))}
    </span>
  );
}

function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 239 127"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M24.994 0C64.4582 21.8017 107.2 47.2097 146.666 69.0149C125.956 55.0928 107.375 37.7733 105.398 23.8364L193.759 24.4224L150.831 100.303L35.1483 99.6328L0 126.26L169.788 127L239 0.175029C238.946 0.181648 25.9391 0.134652 24.994 0Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  );
}

interface HeroProps {
  onNavigate: (hash: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const fallbackGlowRef = useRef<HTMLDivElement>(null);

  const [webglReady, setWebglReady] = useState(false);
  const [heroReady, setHeroReady] = useState(false);
  const [animPlaying, setAnimPlaying] = useState(false);

  // WebGL & Pointer references
  const imageRef = useRef<HTMLImageElement | null>(null);
  const pointerTarget = useRef<[number, number]>([0.5, 0.5]);
  const isInteracting = useRef(false);
  const webglStateRef = useRef<{
    gl: WebGLRenderingContext;
    program: WebGLProgram;
    texture: WebGLTexture;
    buffer: WebGLBuffer;
    vertexShader: WebGLShader;
    fragmentShader: WebGLShader;
    uniforms: {
      image: WebGLUniformLocation | null;
      resolution: WebGLUniformLocation | null;
      imageSize: WebGLUniformLocation | null;
      mouse: WebGLUniformLocation | null;
      strength: WebGLUniformLocation | null;
      time: WebGLUniformLocation | null;
      trail: WebGLUniformLocation[];
    };
    strength: number;
    targetStrength: number;
    mouse: [number, number];
    trail: [number, number][];
    started: number;
    raf: number;
    hasDrawn: boolean;
  } | null>(null);

  // Draw WebGL frame with ripple fluid physics and trail simulation
  const drawWebGL = useCallback(() => {
    const state = webglStateRef.current;
    const img = imageRef.current;
    if (!state || !img) return false;
    const { gl: ctx, program: prg, uniforms: u } = state;

    const now = performance.now();
    const smoothing = state.targetStrength > 0 ? 0.07 : 0.028;
    state.strength += (state.targetStrength - state.strength) * smoothing;
    if (state.strength < 0.001 && state.targetStrength === 0) state.strength = 0;

    state.mouse[0] += (pointerTarget.current[0] - state.mouse[0]) * 0.075;
    state.mouse[1] += (pointerTarget.current[1] - state.mouse[1]) * 0.075;

    state.trail[0][0] += (state.mouse[0] - state.trail[0][0]) * 0.19;
    state.trail[0][1] += (state.mouse[1] - state.trail[0][1]) * 0.19;

    for (let i = 1; i < 9; i++) {
      const follow = 0.19 - i * 0.009;
      state.trail[i][0] += (state.trail[i - 1][0] - state.trail[i][0]) * follow;
      state.trail[i][1] += (state.trail[i - 1][1] - state.trail[i][1]) * follow;
    }

    ctx.useProgram(prg);
    ctx.activeTexture(ctx.TEXTURE0);
    ctx.bindTexture(ctx.TEXTURE_2D, state.texture);

    ctx.uniform2f(u.resolution, ctx.canvas.width, ctx.canvas.height);
    ctx.uniform2f(u.imageSize, img.naturalWidth || 1, img.naturalHeight || 1);
    ctx.uniform2f(u.mouse, state.mouse[0], state.mouse[1]);
    for (let j = 0; j < 9; j++) {
      if (u.trail[j]) ctx.uniform2f(u.trail[j], state.trail[j][0], state.trail[j][1]);
    }
    ctx.uniform1f(u.strength, state.strength);
    ctx.uniform1f(u.time, (now - state.started) / 1000);

    ctx.clear(ctx.COLOR_BUFFER_BIT);
    ctx.drawArrays(ctx.TRIANGLES, 0, 6);

    if (!state.hasDrawn) {
      state.hasDrawn = true;
      setWebglReady(true);
      if (canvasRef.current) canvasRef.current.style.opacity = '1';
      if (heroRef.current) heroRef.current.classList.add('webgl-ready');
      if (fallbackGlowRef.current) {
        fallbackGlowRef.current.classList.remove('active');
        fallbackGlowRef.current.style.opacity = '0';
      }
    }

    return true;
  }, []);

  // Continuous animation loop that runs while mouse moves or ripples decay
  const kickWebGL = useCallback(() => {
    const state = webglStateRef.current;
    if (!state || state.raf) return;
    if (state.hasDrawn && state.strength === 0 && state.targetStrength === 0) return;

    state.raf = window.requestAnimationFrame(() => {
      if (!webglStateRef.current) return;
      webglStateRef.current.raf = 0;
      if (!drawWebGL()) return;
      if (webglStateRef.current.targetStrength > 0 || webglStateRef.current.strength > 0.001) {
        kickWebGL();
      }
    });
  }, [drawWebGL]);

  // Stop interaction and smoothly decay WebGL ripples
  const stopHeroInteraction = useCallback(() => {
    isInteracting.current = false;
    if (stageRef.current) {
      stageRef.current.style.setProperty('--portrait-hover-scale', '1');
    }
    if (fallbackGlowRef.current) {
      fallbackGlowRef.current.classList.remove('active');
      fallbackGlowRef.current.style.opacity = '0';
    }
    const state = webglStateRef.current;
    if (state) {
      state.targetStrength = 0;
      kickWebGL();
    }
  }, [kickWebGL]);

  // Pointer move handler with exact face coordinates and WebGL UV mapping
  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (!eventPointerIsFine(e) || isInteractiveTarget(e.target)) {
      stopHeroInteraction();
      return;
    }

    const imageCoords = imageCoverCoordinates(
      e.clientX,
      e.clientY,
      stageRef.current || heroRef.current,
      imageRef.current
    );
    const heroCoords = heroLocalCoordinates(e.clientX, e.clientY, heroRef.current);

    pointerTarget.current[0] = clamp(heroCoords.x, 0, 1);
    pointerTarget.current[1] = 1 - clamp(heroCoords.y, 0, 1);
    isInteracting.current = true;

    // Exact face bounding box from jgoulart:
    const hoverFace =
      imageCoords.x >= 0.40 &&
      imageCoords.x <= 0.79 &&
      imageCoords.y >= 0.075 &&
      imageCoords.y <= 0.86;
    if (stageRef.current) {
      stageRef.current.style.setProperty('--portrait-hover-scale', hoverFace ? '1.035' : '1');
    }

    // Fallback glow positioning if WebGL is not ready
    if (fallbackGlowRef.current && !webglReady) {
      fallbackGlowRef.current.style.setProperty(
        '--pointer-x',
        `${clamp(imageCoords.localX * 100, 0, 100).toFixed(2)}%`
      );
      fallbackGlowRef.current.style.setProperty(
        '--pointer-y',
        `${clamp(imageCoords.localY * 100, 0, 100).toFixed(2)}%`
      );
      fallbackGlowRef.current.classList.add('active');
      fallbackGlowRef.current.style.opacity = '1';
    }

    const state = webglStateRef.current;
    if (state) {
      state.targetStrength = 1;
      kickWebGL();
    }
  };

  const handlePointerLeave = () => {
    stopHeroInteraction();
  };

  // Initialize Hero & WebGL
  useEffect(() => {
    let scrollRaf = 0;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Trigger entrance animation
    const readyTimer = window.setTimeout(() => {
      setHeroReady(true);
      if (!reduced) {
        setAnimPlaying(true);
      }
    }, 200);

    // Scroll parallax updater
    const updateScroll = () => {
      if (!heroRef.current || !stageRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const progress = clamp(-rect.top / Math.max(rect.height, 1), 0, 1);
      stageRef.current.style.setProperty('--portrait-scroll-scale', (1 + progress * 0.2).toFixed(5));
      stageRef.current.style.setProperty('--portrait-scroll-y', `${(-progress * 7).toFixed(4)}%`);
    };

    const onScroll = () => {
      if (scrollRaf) return;
      scrollRaf = window.requestAnimationFrame(() => {
        scrollRaf = 0;
        updateScroll();
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateScroll();

    // Load Portrait Image
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.decoding = 'async';
    img.src = BACKUP_HERO;

    img.onload = () => {
      imageRef.current = img;
      if (backdropRef.current) {
        backdropRef.current.style.backgroundImage = `url("${BACKUP_HERO}")`;
      }
      if (!reduced) {
        initWebGL(img);
      }
    };

    img.onerror = () => {
      if (backdropRef.current) {
        backdropRef.current.style.backgroundImage = `url("${BACKUP_HERO}")`;
      }
    };

    function initWebGL(loadedImg: HTMLImageElement) {
      const canvas = canvasRef.current;
      const stage = stageRef.current || heroRef.current;
      if (!canvas || !stage) return;

      try {
        const gl = canvas.getContext('webgl', { alpha: true, antialias: false });
        if (!gl) return;

        const compile = (type: number, src: string) => {
          const s = gl.createShader(type);
          if (!s) return null;
          gl.shaderSource(s, src);
          gl.compileShader(s);
          if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
            gl.deleteShader(s);
            return null;
          }
          return s;
        };

        const vShader = compile(gl.VERTEX_SHADER, VERTEX_SHADER);
        const fShader = compile(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
        if (!vShader || !fShader) return;

        const program = gl.createProgram();
        if (!program) return;
        gl.attachShader(program, vShader);
        gl.attachShader(program, fShader);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;

        const positionLoc = gl.getAttribLocation(program, 'position');
        const uniforms = {
          image: gl.getUniformLocation(program, 'image'),
          resolution: gl.getUniformLocation(program, 'resolution'),
          imageSize: gl.getUniformLocation(program, 'imageSize'),
          mouse: gl.getUniformLocation(program, 'mouse'),
          strength: gl.getUniformLocation(program, 'strength'),
          time: gl.getUniformLocation(program, 'time'),
          trail: [] as WebGLUniformLocation[]
        };

        for (let i = 0; i < 9; i++) {
          const loc = gl.getUniformLocation(program, `trail[${i}]`);
          if (loc) uniforms.trail.push(loc);
        }

        const buffer = gl.createBuffer();
        if (!buffer) return;
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(
          gl.ARRAY_BUFFER,
          new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
          gl.STATIC_DRAW
        );

        gl.useProgram(program);
        gl.enableVertexAttribArray(positionLoc);
        gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

        const texture = gl.createTexture();
        if (!texture) return;
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, loadedImg);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
        gl.uniform1i(uniforms.image, 0);

        const rect = stage.getBoundingClientRect();
        const dpr = Math.min(window.devicePixelRatio || 1, 2.25);
        const w = Math.max(1, Math.round((rect.width || canvas.clientWidth) * dpr));
        const h = Math.max(1, Math.round((rect.height || canvas.clientHeight) * dpr));
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);

        webglStateRef.current = {
          gl,
          program,
          texture,
          buffer,
          vertexShader: vShader,
          fragmentShader: fShader,
          uniforms,
          strength: 0,
          targetStrength: 0,
          mouse: [0.5, 0.5],
          trail: Array.from({ length: 9 }, () => [0.5, 0.5]),
          started: performance.now(),
          raf: 0,
          hasDrawn: false
        };

        // Initial paint
        kickWebGL();
      } catch (err) {
        console.warn('WebGL initialization skipped:', err);
      }
    }

    const resizeWebGL = () => {
      updateScroll();
      const state = webglStateRef.current;
      const canvas = canvasRef.current;
      const stage = stageRef.current || heroRef.current;
      if (!state || !canvas || !stage) return;
      const rect = stage.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2.25);
      const w = Math.max(1, Math.round(rect.width * dpr));
      const h = Math.max(1, Math.round(rect.height * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        state.gl.viewport(0, 0, w, h);
      }
      kickWebGL();
    };

    const onBlur = () => {
      stopHeroInteraction();
    };

    window.addEventListener('resize', resizeWebGL, { passive: true });
    window.addEventListener('blur', onBlur, { passive: true });

    return () => {
      window.clearTimeout(readyTimer);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', resizeWebGL);
      window.removeEventListener('blur', onBlur);
      if (scrollRaf) window.cancelAnimationFrame(scrollRaf);

      const state = webglStateRef.current;
      if (state) {
        if (state.raf) window.cancelAnimationFrame(state.raf);
        const gl = state.gl;
        gl.deleteTexture(state.texture);
        gl.deleteBuffer(state.buffer);
        gl.deleteProgram(state.program);
        gl.deleteShader(state.vertexShader);
        gl.deleteShader(state.fragmentShader);
        webglStateRef.current = null;
      }
    };
  }, [kickWebGL, stopHeroInteraction]);

  return (
    <section
      id="top"
      tabIndex={-1}
      ref={heroRef}
      className={`hero ${webglReady ? 'webgl-ready' : ''} ${heroReady ? 'hero-ready' : ''}`}
      data-hero="true"
      aria-label="José Goulart, portfólio"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div id="portraitStage" ref={stageRef} className="portrait-stage" aria-hidden="true">
        <div id="portraitBackdrop" ref={backdropRef} className="portrait-backdrop" />
        <canvas id="heroCanvas" ref={canvasRef} className="hero-canvas" />
      </div>

      <div className="hero-warm" aria-hidden="true" />
      <div className="hero-shade" aria-hidden="true" />
      <div id="fallbackGlow" ref={fallbackGlowRef} className="fallback-glow" aria-hidden="true" />

      <div id="heroContent">
        <div className="hero-heading">
          <h1
            id="heroTitle"
            className={`hero-title ${animPlaying ? 'play' : ''}`}
          >
            <span id="heroAccessibleName" className="sr-only">
              {PERSONA.fullName}
            </span>

            <div id="heroLogo3D" className="hero-logo-3d" aria-hidden="true">
              <LogoMark3D className="hero-logo-3d-canvas" />
            </div>

            <div id="heroLogo" className="hero-logo-lockup" aria-label="Logo José Goulart">
              <LogoMark className="hero-logo-mark" />
              <span className="hero-logo-words">
                <LogoWord text="OSÉ" name="jose" />
                <LogoWord text="OULART" name="goulart" />
              </span>
            </div>
          </h1>

          <div className="hero-subtitle">
            <span id="heroRole" className="sr-only">{PERSONA.role}</span>
            <span className="hero-subtitle-tag">[ PORTFÓLIO // PROJETOS SELECIONADOS ]</span>
          </div>

          <a
            id="downArrow"
            className="down-arrow"
            href="#about"
            aria-label="Rolar para a apresentação"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('#about');
            }}
          >
            <svg width="25" height="25" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M12 4v15M5 12l7 7 7-7"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>

        <p className="hero-caption">DESENVOLVIMENTO WEB / FRANCA, BRASIL</p>

        <div className="hero-notes">
          <p id="heroPractice">{PERSONA.practice}</p>
          <p>Clareza na estrutura. Intenção na experiência.</p>
        </div>

        <a
          className="pill hero-explore"
          href="#work"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('#work');
          }}
        >
          Conheça os projetos <ArrowIcon direction="down-right" className="arrow" />
        </a>

        <span className="hero-vertical" aria-hidden="true">
          JOSÉ GOULART / CÓDIGO &amp; EXPRESSÃO — 001
        </span>
      </div>
    </section>
  );
}
