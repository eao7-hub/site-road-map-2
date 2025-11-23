import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as d3 from 'd3';
import { GeoJsonData } from '../types';
import { Sun, Factory, TrendingUp } from 'lucide-react';

interface BrazilMapProps {
  onStateClick?: (stateName: string) => void;
  isVisible?: boolean;
}

export const BrazilMap: React.FC<BrazilMapProps> = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [geoData, setGeoData] = useState<GeoJsonData | null>(null);
  const [scrollState, setScrollState] = useState({ zoom: 0, read: 0 });
  const [loading, setLoading] = useState(true);

  // 1. Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/brazil-states.geojson'
        );
        if (!response.ok) throw new Error("Failed to fetch map data");
        const data = await response.json();
        setGeoData(data);
      } catch (error) {
        console.error("Map loading error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // 2. Scroll Logic
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const { top, height } = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // A. ZOOM PHASE
      const entryProgress = 1 - (top / windowHeight);
      
      // Zoom completa mais rápido agora (multiplicador 1.5)
      let zoom = entryProgress * 1.5;
      zoom = Math.max(0, Math.min(1, zoom));

      // B. READ PHASE
      // Com altura menor, a leitura é rápida
      const totalInternalScroll = height - windowHeight;
      let read = (top * -1) / totalInternalScroll;
      read = Math.max(0, Math.min(1, read));

      setScrollState({ zoom, read });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Init
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 3. Setup D3 Projection
  const { pathGenerator, minasCentroid } = useMemo(() => {
    if (!geoData) return { pathGenerator: null, minasCentroid: null };

    const projection = d3.geoMercator()
      .center([-52, -15]) 
      .scale(800)
      .translate([400, 300]); 

    const path = d3.geoPath().projection(projection);

    const minasFeature = geoData.features.find(f => f.properties.name === 'Minas Gerais');
    const centroid = minasFeature ? path.centroid(minasFeature as any) : [400, 300];

    return { pathGenerator: path, minasCentroid: centroid };
  }, [geoData]);

  // 4. Calculate Dynamic Transform
  const transformStyle = useMemo(() => {
    if (!minasCentroid) return {};

    const [cx, cy] = minasCentroid;
    
    // Zoom scale: 1x to 3.5x
    const maxScale = 3.5; 
    const currentScale = 1 + (scrollState.zoom * (maxScale - 1));

    const translateX = 400 - (cx * currentScale);
    const translateY = 300 - (cy * currentScale);

    // Interpolate translation
    const finalTx = translateX * scrollState.zoom;
    const finalTy = translateY * scrollState.zoom;

    return {
      transform: `translate3d(${finalTx}px, ${finalTy}px, 0) scale(${currentScale})`
    };
  }, [scrollState.zoom, minasCentroid]);

  // Annotations Visibility
  const showAnnotations = scrollState.zoom >= 0.95;
  const annotationsOpacity = showAnnotations ? 1 : 0;

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  // Altura reduzida para 130vh para saída rápida
  return (
    <section ref={containerRef} className="relative h-[130vh] bg-slate-50 dark:bg-slate-950">
      
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Dimmer */}
        <div 
          className="absolute inset-0 pointer-events-none z-0 transition-colors duration-300"
          style={{ backgroundColor: `rgba(0,0,0,${scrollState.zoom * 0.4})` }}
        />

        {/* Map SVG Container */}
        <div className="relative w-full max-w-5xl aspect-square md:aspect-video flex items-center justify-center z-10 will-change-transform">
          <svg
            viewBox="0 0 800 600"
            className="w-full h-full drop-shadow-2xl"
            style={{ overflow: 'visible' }}
          >
            <g 
                style={{ 
                    transition: 'transform 0.1s linear', 
                    transformOrigin: '0 0',
                    ...transformStyle 
                }}
            >
              {geoData?.features.map((feature, i) => {
                const isMinas = feature.properties.name === 'Minas Gerais';
                
                let fill = '#cbd5e1'; // slate-300
                if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    fill = '#334155'; // slate-700
                }
                if (isMinas) fill = '#16a34a'; // green-600

                const opacity = isMinas ? 1 : Math.max(0.1, 1 - (scrollState.zoom * 1.5));
                const strokeWidth = 0.5 / Math.max(1, scrollState.zoom * 3);

                return (
                  <path
                    key={feature.properties.id || i}
                    d={pathGenerator ? pathGenerator(feature as any) || '' : ''}
                    fill={fill}
                    fillOpacity={opacity}
                    stroke={isMinas ? '#ffffff' : 'rgba(255,255,255,0.1)'}
                    strokeWidth={isMinas ? strokeWidth + 0.1 : strokeWidth}
                    className={`transition-all duration-300 ${
                        isMinas 
                        ? 'cursor-pointer hover:brightness-110 hover:drop-shadow-[0_0_15px_rgba(34,197,94,0.6)]' 
                        : ''
                    }`}
                    style={{ vectorEffect: 'non-scaling-stroke' }}
                  />
                );
              })}
            </g>
          </svg>
        </div>

        {/* ANNOTATIONS OVERLAY */}
        <div 
            className="absolute inset-0 pointer-events-none z-20 transition-opacity duration-700"
            style={{ opacity: annotationsOpacity }}
        >
            
            {/* SVG Lines - STYLIZED NEON EFFECT */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                    <filter id="neon-glow">
                        <feGaussianBlur stdDeviation="0.5" result="coloredBlur"/>
                        <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                    </filter>
                    <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                        <polygon points="0 0, 6 3, 0 6" fill="#4ade80" /> {/* Green-400 */}
                    </marker>
                </defs>
                <g filter="url(#neon-glow)">
                    {/* Coordenadas ajustadas para apontar grosseiramente para as áreas certas na escala mobile e desktop */}
                    <line x1="70" y1="15" x2="52" y2="35" stroke="#4ade80" strokeWidth="0.5" markerEnd="url(#arrowhead)" strokeLinecap="round" />
                    <line x1="15" y1="45" x2="38" y2="48" stroke="#4ade80" strokeWidth="0.5" markerEnd="url(#arrowhead)" strokeLinecap="round" />
                    <line x1="50" y1="88" x2="50" y2="60" stroke="#4ade80" strokeWidth="0.5" markerEnd="url(#arrowhead)" strokeLinecap="round" />
                </g>
            </svg>

            {/* INFO CARDS (Callouts) - Posicionamento Mobile Otimizado */}
            <div className="w-full h-full relative p-4 md:p-0">
                
                {/* NORTE */}
                <div className="absolute top-[2%] right-[2%] w-[45%] md:top-[10%] md:right-[15%] md:w-auto md:max-w-xs bg-white/95 dark:bg-slate-900/95 backdrop-blur border-l-4 border-green-500 p-3 md:p-4 rounded shadow-lg transform transition-transform duration-500 pointer-events-auto">
                    <div className="flex items-center gap-2 mb-1">
                        <Sun size={16} className="text-orange-500 flex-shrink-0" />
                        <h4 className="font-bold text-slate-900 dark:text-white text-xs md:text-sm">Norte de Minas</h4>
                    </div>
                    <p className="text-[10px] md:text-xs text-slate-600 dark:text-slate-300">Maior irradiação solar. Hub ideal para geração FV.</p>
                </div>

                {/* TRIÂNGULO (Uberaba) */}
                <div className="absolute top-[40%] left-[2%] w-[42%] md:top-[35%] md:left-[10%] md:w-auto md:max-w-xs bg-white/95 dark:bg-slate-900/95 backdrop-blur border-l-4 border-blue-500 p-3 md:p-4 rounded shadow-lg transform transition-transform duration-500 pointer-events-auto">
                    <div className="flex items-center gap-2 mb-1">
                        <Factory size={16} className="text-blue-500 flex-shrink-0" />
                        <h4 className="font-bold text-slate-900 dark:text-white text-xs md:text-sm">Uberaba: Planta H₂V</h4>
                    </div>
                    <p className="text-[10px] md:text-xs text-slate-600 dark:text-slate-300">Polo estratégico: uma das maiores plantas de amônia e H₂V do país.</p>
                </div>

                {/* CRESCIMENTO (Bottom) */}
                <div className="absolute bottom-[8%] left-1/2 -translate-x-1/2 w-[90%] md:bottom-[5%] md:w-auto md:max-w-md bg-white/95 dark:bg-slate-900/95 backdrop-blur border-t-4 border-green-600 p-3 md:p-4 rounded shadow-lg transform transition-transform duration-500 pointer-events-auto text-center">
                     <div className="flex items-center justify-center gap-2 mb-1">
                        <TrendingUp size={16} className="text-green-600 flex-shrink-0" />
                        <h4 className="font-bold text-slate-900 dark:text-white text-xs md:text-sm">Expansão Acelerada</h4>
                    </div>
                    <p className="text-[10px] md:text-xs text-slate-600 dark:text-slate-300">
                        Crescimento > <strong>2.000% em 6 anos</strong> na capacidade FV, impulsionando a economia do Hidrogênio Verde.
                    </p>
                </div>
            </div>
        </div>

      </div>
    </section>
  );
};