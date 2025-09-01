import { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Html, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { Calendar, Award, Briefcase, Trophy, GraduationCap, Shield, Target } from 'lucide-react';

// Types
interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  category: 'education' | 'certification' | 'experience' | 'achievement';
  icon: React.ElementType;
  color: string;
  position: [number, number, number];
}

// Données de la timeline
const timelineData: TimelineEvent[] = [
  {
    id: '1',
    date: 'Juin 2023',
    title: 'Bac C',
    description: 'Obtention du Baccalauréat série C - Point de départ de mon parcours tech',
    category: 'education',
    icon: GraduationCap,
    color: '#3b82f6',
    position: [0, 0, 0]
  },
  {
    id: '2',
    date: '2024',
    title: 'Certification Python',
    description: 'Certification Coding Game Python - Validation des compétences en programmation',
    category: 'certification',
    icon: Award,
    color: '#10b981',
    position: [2, 1, 1]
  },
  {
    id: '3',
    date: 'Juillet - Nov 2024',
    title: 'Assistant Réseau',
    description: 'Stage première année - Expérience pratique en administration réseau',
    category: 'experience',
    icon: Briefcase,
    color: '#f59e0b',
    position: [4, 2, 0.5]
  },
  {
    id: '4',
    date: 'Mars 2025',
    title: 'AER Epitech',
    description: 'Assistant Epitech Régional - Responsabilité et encadrement',
    category: 'achievement',
    icon: Shield,
    color: '#8b5cf6',
    position: [6, 3.5, 1.5]
  },
  {
    id: '5',
    date: 'Mai 2025',
    title: 'Hackerlab 8e/20',
    description: '8ème place sur 20 équipes - Compétition nationale de cybersécurité',
    category: 'achievement',
    icon: Target,
    color: '#ef4444',
    position: [8, 4, 0]
  }
];

// Shader pour effet cyberpunk
const CyberpunkMaterial = ({ color, isDark }: { color: string, isDark: boolean }) => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  
  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  const vertexShader = `
    varying vec3 vPosition;
    varying vec3 vNormal;
    uniform float uTime;
    
    void main() {
      vPosition = position;
      vNormal = normal;
      
      vec3 pos = position;
      // Effet de pulsation
      pos += normal * sin(uTime * 2.0 + position.x * 10.0) * 0.02;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float uTime;
    uniform vec3 uColor;
    uniform bool uIsDark;
    varying vec3 vPosition;
    varying vec3 vNormal;
    
    void main() {
      vec3 color = uColor;
      
      if (uIsDark) {
        // Mode cyberpunk
        float scanline = sin(vPosition.y * 50.0 + uTime * 5.0) * 0.1 + 0.9;
        color *= scanline;
        
        // Effet de grille
        float grid = sin(vPosition.x * 30.0) * sin(vPosition.z * 30.0);
        color += vec3(0.0, 1.0, 0.4) * grid * 0.1;
        
        // Glow effect
        float fresnel = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
        color += vec3(0.0, 1.0, 0.2) * fresnel * 0.5;
      } else {
        // Mode cristallin élégant
        float fresnel = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);
        color = mix(color, vec3(1.0), fresnel * 0.3);
      }
      
      gl_FragColor = vec4(color, 1.0);
    }
  `;

  return (
    <shaderMaterial
      ref={materialRef}
      vertexShader={vertexShader}
      fragmentShader={fragmentShader}
      uniforms={{
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(color) },
        uIsDark: { value: isDark }
      }}
    />
  );
};

// Particule qui voyage le long de la courbe
function TravelingParticle({ curve, isDark }: { curve: THREE.CatmullRomCurve3, isDark: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current && curve) {
      const t = (Math.sin(state.clock.elapsedTime * 0.5) + 1) / 2;
      const point = curve.getPoint(t);
      meshRef.current.position.copy(point);
      
      // Trail effect
      meshRef.current.material.opacity = Math.sin(state.clock.elapsedTime * 2) * 0.5 + 0.5;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshBasicMaterial 
        color={isDark ? '#00ff41' : '#3b82f6'} 
        transparent 
        opacity={0.8}
      />
    </mesh>
  );
}

// Connexion lightning entre points
function LightningConnection({ start, end, isDark }: { 
  start: [number, number, number], 
  end: [number, number, number], 
  isDark: boolean 
}) {
  const lineRef = useRef<THREE.Line>(null);
  
  useFrame((state) => {
    if (lineRef.current && isDark) {
      // Animation de l'intensité du lightning
      const material = lineRef.current.material as THREE.LineBasicMaterial;
      material.opacity = Math.sin(state.clock.elapsedTime * 3) * 0.3 + 0.7;
    }
  });

  // Génère une ligne avec des perturbations pour effet lightning
  const points = [];
  const startVec = new THREE.Vector3(...start);
  const endVec = new THREE.Vector3(...end);
  const segments = 20;
  
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const point = startVec.clone().lerp(endVec, t);
    
    // Ajoute des perturbations aléatoires
    if (i > 0 && i < segments) {
      point.x += (Math.random() - 0.5) * 0.2;
      point.y += (Math.random() - 0.5) * 0.2;
      point.z += (Math.random() - 0.5) * 0.2;
    }
    
    points.push(point);
  }

  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  return (
    <line ref={lineRef} geometry={geometry}>
      <lineBasicMaterial 
        color={isDark ? '#00ff41' : '#3b82f6'} 
        opacity={isDark ? 0.7 : 0.5}
        transparent
      />
    </line>
  );
}

// Grille cyberpunk en arrière-plan
function CyberpunkGrid({ isDark }: { isDark: boolean }) {
  if (!isDark) return null;
  
  const gridRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  const lines = [];
  const gridSize = 20;
  const gridSpacing = 0.5;
  
  // Lignes horizontales
  for (let i = -gridSize; i <= gridSize; i++) {
    const points = [
      new THREE.Vector3(-gridSize * gridSpacing, -2, i * gridSpacing),
      new THREE.Vector3(gridSize * gridSpacing, -2, i * gridSpacing)
    ];
    lines.push(points);
  }
  
  // Lignes verticales
  for (let i = -gridSize; i <= gridSize; i++) {
    const points = [
      new THREE.Vector3(i * gridSpacing, -2, -gridSize * gridSpacing),
      new THREE.Vector3(i * gridSpacing, -2, gridSize * gridSpacing)
    ];
    lines.push(points);
  }

  return (
    <group ref={gridRef}>
      {lines.map((points, index) => {
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        return (
          <line key={index} geometry={geometry}>
            <lineBasicMaterial 
              color="#00ff41" 
              opacity={0.1} 
              transparent 
            />
          </line>
        );
      })}
    </group>
  );
}

// Point de timeline cyberpunk
function CyberpunkTimelinePoint({ event, isDark, onHover }: { 
  event: TimelineEvent, 
  isDark: boolean,
  onHover: (event: TimelineEvent | null) => void 
}) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (groupRef.current) {
      // Rotation constante
      groupRef.current.rotation.y += 0.01;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime + event.position[0]) * 0.1;
      
      // Effet de hovering
      const targetScale = hovered ? 1.5 : 1;
      groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
      
      // Position flottante
      groupRef.current.position.y = event.position[1] + Math.sin(state.clock.elapsedTime * 2 + event.position[0]) * 0.1;
    }
  });

  const geometry = isDark ? 
    new THREE.OctahedronGeometry(0.2, 1) : 
    new THREE.IcosahedronGeometry(0.15, 1);

  return (
    <group 
      ref={groupRef}
      position={[event.position[0], event.position[1], event.position[2]]}
      onPointerEnter={() => {
        setHovered(true);
        onHover(event);
      }}
      onPointerLeave={() => {
        setHovered(false);
        onHover(null);
      }}
    >
      <mesh geometry={geometry}>
        <CyberpunkMaterial color={event.color} isDark={isDark} />
      </mesh>
      
      {/* Anneaux orbitaux pour mode cyberpunk */}
      {isDark && (
        <>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.4, 0.01, 8, 32]} />
            <meshBasicMaterial color="#00ff41" opacity={0.3} transparent />
          </mesh>
          <mesh rotation={[0, Math.PI / 2, 0]}>
            <torusGeometry args={[0.3, 0.005, 6, 24]} />
            <meshBasicMaterial color="#ff0080" opacity={0.5} transparent />
          </mesh>
        </>
      )}
      
      {/* Halo de particules */}
      {hovered && (
        <Sphere args={[0.5, 16, 16]}>
          <meshBasicMaterial 
            color={event.color} 
            opacity={0.1} 
            transparent 
            side={THREE.BackSide}
          />
        </Sphere>
      )}
    </group>
  );
}

// Scène principale
function CyberpunkTimelineScene({ isDark, onHover }: { 
  isDark: boolean, 
  onHover: (event: TimelineEvent | null) => void 
}) {
  const { camera } = useThree();
  
  useEffect(() => {
    camera.position.set(6, 4, 8);
    camera.lookAt(4, 2, 0);
  }, [camera]);

  // Courbe pour les particules voyageuses
  const curvePoints = timelineData.map(event => new THREE.Vector3(...event.position));
  const curve = new THREE.CatmullRomCurve3(curvePoints);

  return (
    <>
      {/* Éclairage dynamique */}
      <ambientLight intensity={isDark ? 0.2 : 0.4} />
      
      {isDark ? (
        <>
          <pointLight position={[0, 5, 0]} intensity={0.8} color="#00ff41" />
          <pointLight position={[8, 5, 0]} intensity={0.6} color="#ff0080" />
          <spotLight 
            position={[4, 8, 4]} 
            target-position={[4, 0, 0]}
            intensity={1}
            color="#00ffff"
            angle={Math.PI / 4}
            penumbra={0.5}
          />
        </>
      ) : (
        <>
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[4, 6, 4]} intensity={0.5} color="#ffffff" />
        </>
      )}
      
      {/* Grille cyberpunk */}
      <CyberpunkGrid isDark={isDark} />
      
      {/* Points de timeline */}
      {timelineData.map(event => (
        <CyberpunkTimelinePoint
          key={event.id}
          event={event}
          isDark={isDark}
          onHover={onHover}
        />
      ))}
      
      {/* Connexions lightning */}
      {timelineData.slice(0, -1).map((event, index) => (
        <LightningConnection
          key={`connection-${index}`}
          start={event.position}
          end={timelineData[index + 1].position}
          isDark={isDark}
        />
      ))}
      
      {/* Particules voyageuses */}
      {isDark && Array.from({ length: 3 }, (_, i) => (
        <TravelingParticle key={i} curve={curve} isDark={isDark} />
      ))}
      
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        enableRotate={true}
        maxDistance={15}
        minDistance={3}
        maxPolarAngle={Math.PI / 2.2}
        autoRotate={false}
        autoRotateSpeed={0.5}
      />
    </>
  );
}

// Tooltip amélioré
function CyberpunkTooltip({ event, isDark }: { event: TimelineEvent | null, isDark: boolean }) {
  if (!event) return null;

  const Icon = event.icon;
  
  return (
    <div
      className={`absolute top-4 left-4 p-6 rounded-xl border-2 max-w-sm z-10 transition-all duration-500 transform ${
        isDark
          ? 'bg-gray-900/95 border-green-400/70 text-green-400 shadow-2xl shadow-green-400/20'
          : 'bg-white/95 border-blue-200 text-gray-800 shadow-2xl backdrop-blur-sm'
      }`}
      style={{
        backdropFilter: 'blur(20px)',
        animation: 'slideInLeft 0.3s ease-out'
      }}
    >
      <div className="flex items-center gap-4 mb-3">
        <div className={`p-3 rounded-full relative overflow-hidden ${
          isDark ? 'bg-gray-800 border border-green-400/30' : 'bg-gray-100'
        }`}>
          <Icon size={24} style={{ color: event.color }} />
          {isDark && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400/20 to-transparent animate-pulse"></div>
          )}
        </div>
        <div>
          <h4 className={`font-bold text-xl mb-1 ${isDark ? 'font-mono text-green-400' : 'font-serif text-gray-800'}`}>
            {isDark ? `> ${event.title}` : event.title}
          </h4>
          <p className={`text-sm opacity-80 ${isDark ? 'font-mono text-yellow-400' : 'text-blue-600'}`}>
            {isDark ? `[${event.date}]` : event.date}
          </p>
        </div>
      </div>
      <p className={`text-sm leading-relaxed ${isDark ? 'font-mono text-gray-300' : 'text-gray-600'}`}>
        {isDark ? `// ${event.description}` : event.description}
      </p>
      {isDark && (
        <div className="mt-3 text-xs font-mono text-green-400/70">
          [SCAN_COMPLETE] • [DATA_RETRIEVED] • [ACCESS_GRANTED]
        </div>
      )}
    </div>
  );
}

// Composant principal
export default function TimelineSection() {
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains('dark')
  );
  const [hoveredEvent, setHoveredEvent] = useState<TimelineEvent | null>(null);

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          const newIsDark = document.documentElement.classList.contains('dark');
          setIsDark(newIsDark);
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @keyframes slideInLeft {
          from { transform: translateX(-20px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
      `}</style>

      <section id="timeline" className={`py-20 relative transition-all duration-1000 ${
        isDark 
          ? 'bg-gradient-to-b from-gray-900 via-black to-gray-900' 
          : 'bg-gradient-to-b from-white via-gray-50 to-blue-50'
      }`}>
        
        {/* Effet scanline pour mode cyberpunk */}
        {isDark && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div 
              className="absolute w-full h-px bg-gradient-to-r from-transparent via-green-400/30 to-transparent"
              style={{
                animation: 'scanline 3s linear infinite'
              }}
            />
          </div>
        )}
        
        <div className="container mx-auto px-8 relative z-10">
          
          {/* Titre avec effet glitch */}
          <div className="text-center mb-16">
            <h2 className={`text-6xl font-bold mb-6 relative transition-all duration-1000 ${
              isDark 
                ? 'font-mono text-green-400' 
                : 'font-serif text-gray-800'
            }`}>
              {isDark ? (
                <span className="flex items-center justify-center gap-6">
                  <Shield className="animate-pulse text-red-400" />
                  <span className="relative">
                    // NEURAL_PATHWAY.exe
                    <span className="absolute inset-0 text-red-400 animate-ping opacity-20">
                      // NEURAL_PATHWAY.exe
                    </span>
                  </span>
                  <Calendar className="text-yellow-400 animate-bounce" />
                </span>
              ) : (
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                  Evolution Timeline
                </span>
              )}
            </h2>
            
            <p className={`text-xl max-w-3xl mx-auto transition-all duration-1000 ${
              isDark 
                ? 'font-mono text-gray-300' 
                : 'font-serif text-gray-600'
            }`}>
              {isDark ? (
                <>
                  <span className="text-green-400 font-bold">[SYSTEM_INITIALIZED]</span> Mapping digital evolution pathway...
                  <br />
                  <span className="text-yellow-400 font-bold">[INTERACTIVE_MODE]</span> Deploy cursor to access node intel
                  <br />
                  <span className="text-red-400 font-bold animate-pulse">[WARNING]</span> Highly classified progression data
                </>
              ) : (
                "Navigate through my professional journey in this interactive 3D timeline. Each milestone represents a step forward in my quest for knowledge and expertise in technology."
              )}
            </p>
          </div>

          {/* Canvas 3D avec effets */}
          <div 
            className="relative h-[600px] rounded-2xl overflow-hidden border-2 transition-all duration-1000 shadow-2xl" 
            style={{
              background: isDark 
                ? 'radial-gradient(circle at center, rgba(0, 20, 0, 0.3) 0%, rgba(0, 0, 0, 0.8) 100%)'
                : 'radial-gradient(circle at center, rgba(59, 130, 246, 0.1) 0%, rgba(255, 255, 255, 0.9) 100%)',
              borderColor: isDark ? 'rgba(34, 197, 94, 0.5)' : 'rgba(59, 130, 246, 0.3)',
              boxShadow: isDark 
                ? '0 0 50px rgba(34, 197, 94, 0.2), inset 0 0 50px rgba(0, 255, 65, 0.05)' 
                : '0 25px 50px rgba(0, 0, 0, 0.1)'
            }}
          >
            <Canvas shadows>
              <CyberpunkTimelineScene isDark={isDark} onHover={setHoveredEvent} />
            </Canvas>
            
            <CyberpunkTooltip event={hoveredEvent} isDark={isDark} />
          </div>

          {/* Contrôles et stats */}
          <div className="mt-12 grid md:grid-cols-3 gap-6 text-center">
            <div className={`p-4 rounded-lg border transition-all duration-1000 ${
              isDark 
                ? 'bg-gray-900/50 border-green-400/30 text-green-400' 
                : 'bg-white border-blue-200 text-gray-700'
            }`}>
              <h4 className={`font-bold mb-2 ${isDark ? 'font-mono' : 'font-serif'}`}>
                {isDark ? '// Navigation' : 'Controls'}
              </h4>
              <p className={`text-sm ${isDark ? 'font-mono' : ''}`}>
                {isDark 
                  ? 'Mouse: Orbital scan • Scroll: Zoom protocol • Hover: Data extraction'
                  : 'Drag to rotate • Scroll to zoom • Hover for details'
                }
              </p>
            </div>
            
            <div className={`p-4 rounded-lg border transition-all duration-1000 ${
              isDark 
                ? 'bg-gray-900/50 border-yellow-400/30 text-yellow-400' 
                : 'bg-white border-blue-200 text-gray-700'
            }`}>
              <h4 className={`font-bold mb-2 ${isDark ? 'font-mono' : 'font-serif'}`}>
                {isDark ? '// Timeline Span' : 'Duration'}
              </h4>
              <p className={`text-sm ${isDark ? 'font-mono' : ''}`}>
                {isDark ? '[2023.06] → [2025.05] • 24 months active' : 'June 2023 - May 2025'}
              </p>
            </div>
            
            <div className={`p-4 rounded-lg border transition-all duration-1000 ${
              isDark 
                ? 'bg-gray-900/50 border-red-400/30 text-red-400' 
                : 'bg-white border-blue-200 text-gray-700'
            }`}>
              <h4 className={`font-bold mb-2 ${isDark ? 'font-mono' : 'font-serif'}`}>
                {isDark ? '// Achievements' : 'Milestones'}
              </h4>
              <p className={`text-sm ${isDark ? 'font-mono' : ''}`}>
                {isDark ? '5 nodes • 3 levels • 1 exploit ranked' : '5 major achievements unlocked'}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}