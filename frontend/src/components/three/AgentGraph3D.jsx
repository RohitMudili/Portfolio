import React, { useMemo, useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Billboard, Text } from "@react-three/drei";
import * as THREE from "three";

/* ------------------------------------------------------------------
   A live 3D agent / knowledge graph. Nodes = stages in an agentic RAG
   pipeline; edges carry traveling data pulses. The graph slowly rotates,
   parallaxes to the mouse, and dollies on scroll.

   Nodes are DRAGGABLE: grab one and move it; its edges + pulses follow
   live. Auto-rotation pauses while dragging so placement is precise.
   ------------------------------------------------------------------ */

const ACCENT = "#5aa6ff";
const ACCENT_DIM = "#2f6dd0";
const LINE = "#6f7891";
const LABEL = "#aab2c8";

// Layout is shifted right (positive X) so the left-most nodes clear the
// headline/text column on the left half of the hero.
const NODE_DEFS = [
  { id: "input", label: "INPUT", p: [-2.4, 3.2, 0.4], r: 0.34 },
  { id: "docs", label: "DOCS", p: [-2.0, -1.6, -0.8], r: 0.34 },
  { id: "embed", label: "EMBED", p: [-0.2, 3.1, 1.4], r: 0.42 },
  { id: "retrieve", label: "RETRIEVE", p: [-0.4, -2.8, -1.2], r: 0.42 },
  { id: "memory", label: "MEMORY", p: [2.9, 1.7, 2.4], r: 0.36 },
  { id: "agent", label: "AGENT", p: [2.4, -0.4, -0.2], r: 0.66, core: true },
  { id: "tools", label: "TOOLS", p: [5.6, 2.7, 1.0], r: 0.4 },
  { id: "act", label: "ACTION", p: [5.8, -2.6, -0.9], r: 0.4 },
  { id: "output", label: "OUTPUT", p: [7.8, 0.1, 0.6], r: 0.44 },
];

const EDGES = [
  ["input", "embed"], ["docs", "retrieve"], ["embed", "agent"],
  ["retrieve", "agent"], ["memory", "agent"], ["agent", "tools"],
  ["agent", "act"], ["tools", "agent"], ["agent", "output"],
  ["act", "output"], ["agent", "memory"],
];

// stable per-edge arc offset so curves don't jitter frame to frame
const EDGE_ARC = EDGES.map((_, i) => ({
  z: ((i * 37) % 13) / 13 - 0.5,
  y: ((i * 53) % 11) / 11 - 0.5,
}));

function makeCurve(A, B, arc) {
  const mid = A.clone().lerp(B, 0.5);
  mid.z += arc.z * 0.6 + 0.2;
  mid.y += arc.y * 0.4;
  return new THREE.QuadraticBezierCurve3(A, mid, B);
}

/* -------- shared mutable state (single source of truth for positions) -------- */
function useGraphState() {
  return useMemo(() => {
    const positions = {};
    NODE_DEFS.forEach((n) => (positions[n.id] = new THREE.Vector3(...n.p)));
    return {
      positions,
      dragging: { id: null }, // which node is being dragged (pauses rotation)
    };
  }, []);
}

/* -------------------------------- Node -------------------------------- */
function Node({ node, state, groupRef, setHot }) {
  const ref = useRef();        // outer group (gets live position)
  const shell = useRef();      // wireframe mesh (scale/breathe)
  const [hovered, setHovered] = useState(false);
  const { camera, gl } = useThree();

  // drag math
  const plane = useMemo(() => new THREE.Plane(), []);
  const planeNormal = useMemo(() => new THREE.Vector3(), []);
  const intersect = useMemo(() => new THREE.Vector3(), []);
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const ndc = useMemo(() => new THREE.Vector2(), []);
  const grabOffset = useRef(new THREE.Vector3());
  const dragging = useRef(false);

  useFrame(() => {
    if (ref.current) ref.current.position.copy(state.positions[node.id]);
    if (shell.current) {
      const t = performance.now() / 1000;
      const breathe = node.core ? 1 + Math.sin(t * 1.4) * 0.05 : 1;
      shell.current.scale.setScalar((hovered ? 1.25 : 1) * breathe);
    }
  });

  const screenToLocal = (e) => {
    const rect = gl.domElement.getBoundingClientRect();
    ndc.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    ndc.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(ndc, camera);
    raycaster.ray.intersectPlane(plane, intersect);
    // world -> group-local (graph group is rotated/parallaxed)
    return groupRef.current ? groupRef.current.worldToLocal(intersect.clone()) : intersect.clone();
  };

  const onDown = (e) => {
    e.stopPropagation();
    dragging.current = true;
    state.dragging.id = node.id;
    setHot && setHot(true);
    gl.domElement.style.cursor = "grabbing";
    // drag plane: faces the camera, through the node's current world pos
    const worldPos = node ? state.positions[node.id].clone() : new THREE.Vector3();
    if (groupRef.current) groupRef.current.localToWorld(worldPos);
    camera.getWorldDirection(planeNormal);
    plane.setFromNormalAndCoplanarPoint(planeNormal, worldPos);
    const local = screenToLocal(e);
    grabOffset.current.copy(state.positions[node.id]).sub(local);
    e.target.setPointerCapture?.(e.pointerId);
  };

  const onMove = (e) => {
    if (!dragging.current) return;
    e.stopPropagation();
    const local = screenToLocal(e);
    state.positions[node.id].copy(local.add(grabOffset.current));
  };

  const onUp = (e) => {
    if (!dragging.current) return;
    e.stopPropagation();
    dragging.current = false;
    state.dragging.id = null;
    setHot && setHot(false);
    gl.domElement.style.cursor = hovered ? "grab" : "auto";
    e.target.releasePointerCapture?.(e.pointerId);
  };

  return (
    <group ref={ref}>
      {/* generous invisible hit sphere so it's easy to grab */}
      <mesh
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); gl.domElement.style.cursor = "grab"; }}
        onPointerOut={() => { setHovered(false); if (!dragging.current) gl.domElement.style.cursor = "auto"; }}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
      >
        <sphereGeometry args={[node.r * 1.9, 12, 12]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {/* wire shell */}
      <mesh ref={shell}>
        <icosahedronGeometry args={[node.r, 1]} />
        <meshBasicMaterial color={node.core ? ACCENT : LINE} wireframe transparent opacity={node.core ? 0.9 : 0.55} />
      </mesh>
      {/* glowing core */}
      <mesh scale={node.r * 0.5}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial color={node.core ? ACCENT : ACCENT_DIM} transparent opacity={node.core ? 1 : 0.85} />
      </mesh>
      {/* halo */}
      <mesh scale={node.r * (node.core ? 2.0 : 1.4)}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial color={ACCENT} transparent opacity={hovered ? 0.18 : 0.07} depthWrite={false} />
      </mesh>
      <Billboard>
        <Text
          position={[0, -node.r - 0.42, 0]}
          fontSize={0.27}
          color={hovered ? ACCENT : LABEL}
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.12}
          outlineWidth={0}
        >
          {node.label}
        </Text>
      </Billboard>
    </group>
  );
}

/* -------- Edges + pulses: one buffer object, rebuilt live every frame -------- */
function Connections({ state }) {
  const linesRef = useRef();
  const pulseGroup = useRef();
  const SEG = 24;

  // pulse descriptors on the busy edges
  const pulses = useMemo(() => {
    const picks = [
      ["embed", "agent"], ["retrieve", "agent"], ["agent", "tools"],
      ["agent", "output"], ["memory", "agent"], ["act", "output"],
    ];
    return picks.map(([a, b], i) => {
      const ei = EDGES.findIndex(([x, y]) => x === a && y === b);
      return { a, b, ei: ei < 0 ? 0 : ei, speed: 0.22 + (i % 3) * 0.08, offset: i / picks.length };
    });
  }, []);

  // preallocate line geometry: EDGES * SEG points, 2 verts per segment
  const lineGeo = useMemo(() => {
    const positions = new Float32Array(EDGES.length * (SEG) * 2 * 3);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  const tmpCurves = useRef([]);

  useFrame((stateClock) => {
    const arr = lineGeo.attributes.position.array;
    let o = 0;
    const curves = [];
    for (let e = 0; e < EDGES.length; e++) {
      const [a, b] = EDGES[e];
      const A = state.positions[a];
      const B = state.positions[b];
      const curve = makeCurve(A, B, EDGE_ARC[e]);
      curves[e] = curve;
      const pts = curve.getPoints(SEG);
      for (let i = 0; i < SEG; i++) {
        const p0 = pts[i];
        const p1 = pts[Math.min(i + 1, SEG)];
        arr[o++] = p0.x; arr[o++] = p0.y; arr[o++] = p0.z;
        arr[o++] = p1.x; arr[o++] = p1.y; arr[o++] = p1.z;
      }
    }
    lineGeo.attributes.position.needsUpdate = true;
    tmpCurves.current = curves;

    // pulses ride their edge's live curve
    if (pulseGroup.current) {
      const t0 = stateClock.clock.elapsedTime;
      pulseGroup.current.children.forEach((mesh, i) => {
        const pd = pulses[i];
        const curve = curves[pd.ei];
        if (!curve) return;
        const t = ((t0 * pd.speed + pd.offset) % 1 + 1) % 1;
        const pos = curve.getPoint(t);
        mesh.position.copy(pos);
        const fade = Math.sin(t * Math.PI);
        mesh.material.opacity = fade;
        mesh.scale.setScalar(0.07 + fade * 0.06);
      });
    }
  });

  return (
    <group>
      <lineSegments geometry={lineGeo}>
        <lineBasicMaterial color={LINE} transparent opacity={0.3} />
      </lineSegments>
      <group ref={pulseGroup}>
        {pulses.map((_, i) => (
          <mesh key={i}>
            <sphereGeometry args={[1, 10, 10]} />
            <meshBasicMaterial color={ACCENT} transparent />
          </mesh>
        ))}
      </group>
    </group>
  );
}

/* -------------------------------- Rig -------------------------------- */
function GraphRig({ pointer, state }) {
  const group = useRef();
  const { camera } = useThree();
  const [, setHot] = useState(false);

  useFrame((s, delta) => {
    if (!group.current) return;
    const t = s.clock.elapsedTime;
    const isDragging = state.dragging.id !== null;

    // auto-rotate only when not dragging a node
    if (!isDragging) {
      group.current.rotation.y += delta * 0.08;
      group.current.rotation.x = Math.sin(t * 0.15) * 0.08;
      group.current.rotation.y += pointer.current.x * 0.0008;
    }

    // camera parallax + scroll dolly (always)
    const px = pointer.current.x;
    const py = pointer.current.y;
    camera.position.x += (px * 1.6 - camera.position.x) * 0.04;
    camera.position.y += (-py * 1.0 - camera.position.y) * 0.04;
    const scrollY = window.scrollY || 0;
    const vh = window.innerHeight || 1;
    const k = Math.min(1, scrollY / vh);
    const targetZ = 16.5 + k * 7;
    camera.position.z += (targetZ - camera.position.z) * 0.05;
    // look slightly right to keep the right-shifted graph framed
    camera.lookAt(1.6, 0.1, 0);
  });

  return (
    <group ref={group}>
      <Connections state={state} />
      {NODE_DEFS.map((n) => (
        <Node key={n.id} node={n} state={state} groupRef={group} setHot={setHot} />
      ))}
    </group>
  );
}

export default function AgentGraph3D() {
  const pointer = useRef({ x: 0, y: 0 });
  const state = useGraphState();

  const onPointerMove = (e) => {
    const w = window.innerWidth, h = window.innerHeight;
    pointer.current.x = (e.clientX / w) * 2 - 1;
    pointer.current.y = (e.clientY / h) * 2 - 1;
  };

  return (
    <div
      className="absolute inset-0 h-full w-full"
      onPointerMove={onPointerMove}
      data-cursor
      aria-hidden="true"
    >
      <Canvas
        dpr={[1, 1.8]}
        camera={{ position: [0, 0, 16.5], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <GraphRig pointer={pointer} state={state} />
        </Suspense>
      </Canvas>
    </div>
  );
}
