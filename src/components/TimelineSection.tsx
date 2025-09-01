import { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text, Html } from '@react-three/drei';
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

// Composant pour une particule flottante
function FloatingParticle({ position, isDark }: { position: [number, number, number], isDark: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.1;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.02, 8, 8]} />
      <meshBasicMaterial 
        color={isDark ? '#22c55e' : '#3b82f6'} 
        opacity={0.6} 
        transparent 
      />
    </mesh>
  );
}

// Composant pour la courbe de connexion
function ConnectionCurve({ points, isDark }: { points: THREE.Vector3[], isDark: boolean }) {
  const curve = new THREE.CatmullRomCurve3(points);
  const curvePoints = curve.getPoints(50);
  
  return (
    <line>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={curvePoints.length}
          array={new Float32Array(curvePoints.flatMap(p => [p.x, p.y, p.z]))}
          itemSize={3} args={[]}        />
      </bufferGeometry>
      <lineBasicMaterial 
        color={isDark ? '#22c55e' : '#3b82f6'} 
        linewidth={3}
        opacity={0.8}
        transparent
      />
    </line>
  );
}

// Composant pour un point de timeline
function TimelinePoint({ event, isDark, onHover }: { 
  event: TimelineEvent, 
  isDark: boolean,
  onHover: (event: TimelineEvent | null) => void 
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      const scale = hovered ? 1.2 : 1;
      meshRef.current.scale.setScalar(scale);
      meshRef.current.rotation.y += 0.02;
    }
  });

  const baseColor = isDark ? event.color : event.color;
  
  return (
    <group position={event.position}>
      <mesh
        ref={meshRef}
        onPointerEnter={() => {
          setHovered(true);
          onHover(event);
        }}
        onPointerLeave={() => {
          setHovered(false);
          onHover(null);
        }}
      >
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial 
          color={baseColor}
          emissive={baseColor}
          emissiveIntensity={isDark ? 0.3 : 0.1}
        />
      </mesh>
      
      {/* Glow effect pour le mode dark */}
      {isDark && (
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.25, 16, 16]} />
          <meshBasicMaterial 
            color={baseColor}
            opacity={0.2}
            transparent
          />
        </mesh>
      )}
      
      {/* Date text */}
      <Text
        position={[0, -0.4, 0]}
        fontSize={0.1}
        color={isDark ? '#22c55e' : '#374151'}
        anchorX="center"
        anchorY="middle"
        font={isDark ? '/fonts/mono.woff' : '/fonts/serif.woff'}
      >
        {event.date}
      </Text>
    </group>
  );
}

// Composant principal de la scène 3D
function TimelineScene({ isDark, onHover }: { 
  isDark: boolean, 
  onHover: (event: TimelineEvent | null) => void 
}) {
  const { camera } = useThree();
  
  useEffect(() => {
    camera.position.set(4, 2, 6);
    camera.lookAt(4, 2, 0);
  }, [camera]);

  // Génère les points pour la courbe
  const curvePoints = timelineData.map(event => 
    new THREE.Vector3(...event.position)
  );

  // Génère des particules flottantes
  const particles = [];
  for (let i = 0; i < 20; i++) {
    particles.push(
      <FloatingParticle
        key={i}
        position={[
          Math.random() * 10 - 1,
          Math.random() * 5,
          Math.random() * 4 - 2
        ]}
        isDark={isDark}
      />
    );
  }

  return (
    <>
      {/* Lumières */}
      <ambientLight intensity={isDark ? 0.3 : 0.6} />
      <pointLight 
        position={[10, 10, 10]} 
        intensity={isDark ? 0.8 : 1} 
        color={isDark ? '#22c55e' : '#ffffff'}
      />
      
      {/* Courbe de connexion */}
      <ConnectionCurve points={curvePoints} isDark={isDark} />
      
      {/* Points de timeline */}
      {timelineData.map(event => (
        <TimelinePoint
          key={event.id}
          event={event}
          isDark={isDark}
          onHover={onHover}
        />
      ))}
      
      {/* Particules flottantes */}
      {isDark && particles}
      
      {/* Contrôles */}
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        enableRotate={true}
        maxDistance={12}
        minDistance={4}
        maxPolarAngle={Math.PI / 2}
      />
    </>
  );
}

// Composant tooltip
function Tooltip({ event, isDark }: { event: TimelineEvent | null, isDark: boolean }) {
  if (!event) return null;

  const Icon = event.icon;
  
  return (
    <div
      className={`absolute top-4 left-4 p-4 rounded-lg border-2 max-w-sm z-10 transition-all duration-300 ${
        isDark
          ? 'bg-gray-800/90 border-green-400/50 text-green-400'
          : 'bg-white/90 border-blue-200 text-gray-800 shadow-xl'
      }`}
    >
      <div className="flex items-center gap-3 mb-2">
        <div className={`p-2 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
          <Icon width={20} height={20} style={{ color: event.color }} />
        </div>
        <div>
          <h4 className={`font-bold text-lg ${isDark ? 'font-mono' : 'font-serif'}`}>
            {event.title}
          </h4>
          <p className={`text-sm opacity-80 ${isDark ? 'font-mono' : ''}`}>
            {event.date}
          </p>
        </div>
      </div>
      <p className={`text-sm leading-relaxed ${isDark ? 'font-mono text-gray-300' : 'text-gray-600'}`}>
        {event.description}
      </p>
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
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <section id="timeline" className={`py-20 transition-all duration-1000 ${
        isDark ? 'bg-gradient-to-b from-gray-800 to-gray-900' : 'bg-gradient-to-b from-white to-gray-50'
      }`}>
        <div className="container mx-auto px-8">
          
          {/* Titre */}
          <div className="text-center mb-16">
            <h2 className={`text-5xl font-bold mb-4 transition-all duration-1000 ${
              isDark 
                ? 'font-mono text-green-400' 
                : 'font-serif text-gray-800'
            }`}>
              {isDark ? (
                <span className="flex items-center justify-center gap-4">
                  <Shield className="animate-pulse" />
                  // Evolution Path
                  <Calendar className="text-yellow-400" />
                </span>
              ) : (
                <span>Journey & Milestones</span>
              )}
            </h2>
            
            <p className={`text-xl max-w-2xl mx-auto transition-all duration-1000 ${
              isDark 
                ? 'font-mono text-gray-300' 
                : 'font-serif text-gray-600'
            }`}>
              {isDark ? (
                <>
                  <span className="text-green-400">[TIMELINE]</span> Progression through the digital realm
                  <br />
                  <span className="text-yellow-400">[INTERACTIVE]</span> Hover over nodes to explore
                </>
              ) : (
                "An interactive journey through my academic and professional evolution, from student to cybersecurity enthusiast."
              )}
            </p>
          </div>

          {/* Scène 3D */}
          <div className="relative h-96 md:h-[500px] rounded-xl overflow-hidden border-2 transition-all duration-1000" 
               style={{
                 background: isDark 
                   ? 'linear-gradient(45deg, rgba(31, 41, 55, 0.8) 0%, rgba(17, 24, 39, 0.9) 100%)'
                   : 'linear-gradient(45deg, rgba(248, 250, 252, 0.8) 0%, rgba(241, 245, 249, 0.9) 100%)',
                 borderColor: isDark ? 'rgba(34, 197, 94, 0.3)' : 'rgba(59, 130, 246, 0.3)'
               }}>
            
            <Canvas>
              <TimelineScene isDark={isDark} onHover={setHoveredEvent} />
            </Canvas>
            
            <Tooltip event={hoveredEvent} isDark={isDark} />
          </div>

          {/* Instructions */}
          <div className="mt-8 text-center">
            <p className={`text-sm transition-all duration-1000 ${
              isDark ? 'font-mono text-gray-400' : 'text-gray-600'
            }`}>
              {isDark ? 
                '// Use mouse to navigate • Hover nodes for intel • Scroll to zoom' :
                'Utilisez votre souris pour naviguer • Survolez les points pour plus de détails • Molette pour zoomer'
              }
            </p>
          </div>
        </div>
      </section>
    </>
  );
}