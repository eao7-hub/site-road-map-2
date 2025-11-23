import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as d3 from 'd3';
import { Sun, Factory, TrendingUp } from 'lucide-react';
import { GeoJsonData } from '../types';

export const BrazilMap: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [geoData, setGeoData] = useState<GeoJsonData | null>(null);
  const [zoomProgress, setZoomProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  // 1. Fetch GeoJSON Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/brazil-states.geojson'
        );
        if (!response.ok) throw new Error("Failed to load map data");
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

  // 2. Scroll Progress Logic
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Logic: 0 (entering) -> 1 (snapped)
      const start = windowHeight;
      const end = 0;
      
      let progress = (start - rect.top) / (start - end);
      
      if (progress < 0) progress = 0;
      if (progress > 1) progress = 1;

      setZoomProgress(progress);
    };

    const scrollContainer = document.querySelector('.overflow-y-scroll');
    const target = scrollContainer || window;

    target.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // initial
    
    return () => target.removeEventListener('scroll', handleScroll);
  }, []);

  // 3. D3 Calculations
  const { pathGenerator, minasCentroid, scale, translate } = useMemo(() => {
    if (!geoData) return { pathGenerator: null, minasCentroid: null, scale: 1, translate: [0,0] };

    const width = 800;
    const height = 600;

    // Use any cast to bypass strict TS check for CDN imported module
    const d3Any = d3 as any;

    const proj = d3Any.geoMercator()
      .center([-52, -15])
      .scale(750)
      .translate([width / 2, height / 2]);

    const pathGen = d3Any.geoPath().projection(proj);

    const minasFeature = geoData.features.find((f: any) => f.properties.name === 'Minas Gerais');
    
    let centroid = [0, 0];
    let targetScale = 1;
    let targetTx = 0;
    let targetTy = 0;

    if (minasFeature) {
      centroid = pathGen.centroid(minasFeature);
      targetScale = 3.5; // Zoom level
      
      // Calculate translation based on (0,0) origin scaling
      targetTx = (width / 2) - (centroid[0] * targetScale);
      targetTy = (height / 2) - (centroid[1] * targetScale);
    }

    return { 
      pathGenerator: pathGen, 
      minasCentroid: centroid,
      scale: targetScale,
      translate: [targetTx, targetTy]
    };
  }, [geoData]);

  // Interpolation
  const ease = (t: number) => t * (2 - t);
  const smoothProgress = ease(zoomProgress);

  const currentScale = 1 + (smoothProgress * (scale - 1));
  const currentTx = smoothProgress * translate[0];
  const currentTy = smoothProgress * translate[1];
  
  const showInfo = zoomProgress > 0.8;

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden">
      
      <div 
        className="absolute top-0 left-0 w-full flex justify-center pt-12 z-0 transition-opacity duration-500 pointer-events-none"
        style={{ opacity: 1 - zoomProgress }}
      >
        <h2 className="text-4xl md:text-6xl font-bold text-slate-200 dark:text-slate-800 uppercase tracking-widest">
          Brasil
        </h2>
      </div>

      <div className="w-full h-full flex items-center justify-center relative z-10">
        <svg
          ref={svgRef}
          viewBox="0 0 800 600"
          className="w-full h-full drop-shadow-xl"
          preserveAspectRatio="xMidYMid meet" 
          style={{ overflow: 'visible' }}
        >
          <g
            style={{
              transform: `translate(${currentTx}px, ${currentTy}px) scale(${currentScale})`,
              transformOrigin: '0 0', // Ensures proper zoom centering
              transition: 'transform 0.1s linear'
            }}
          >
            {geoData?.features.map((feature, i) => {
              const isMG = feature.properties.name === 'Minas Gerais';
              return (
                <path
                  key={feature.properties.id || i}
                  d={pathGenerator?.(feature as any) || ''}
                  className={`transition-all duration-300 vector-effect-non-scaling-stroke ${
                    isMG 
                       ? 'hover:brightness-125 hover:drop-shadow-[0_0_25px_rgba(74,222,128,0.6)] cursor-pointer' 
                       : 'hover:fill-slate-600'
                  }`}
                  stroke={isMG ? 'white' : '#334155'}
                  strokeWidth={isMG ? 1.5 / currentScale : 0.5 / currentScale}
                  fill={isMG ? '#22c55e' : '#1e293b'}
                  fillOpacity={isMG ? 1 : Math.max(0.2, 1 - zoomProgress)}
                  style={{ vectorEffect: 'non-scaling-stroke' }}
                >
                  <title>{feature.properties.name}</title>
                </path>
              );
            })}

            {minasCentroid && (
                <g 
                    style={{ opacity: showInfo ? 1 : 0 }} 
                    className="transition-opacity duration-700 delay-200 pointer-events-none"
                >
                    <line 
                        x1={minasCentroid[0]} y1={minasCentroid[1] - 30} 
                        x2={minasCentroid[0] + 60} y2={minasCentroid[1] - 80} 
                        stroke="#4ade80" strokeWidth={2 / currentScale}
                        className="drop-shadow-[0_0_5px_rgba(74,222,128,0.8)]"
                    />
                    <circle cx={minasCentroid[0] + 60} cy={minasCentroid[1] - 80} r={3 / currentScale} fill="#4ade80" />

                    <line 
                        x1={minasCentroid[0] - 40} y1={minasCentroid[1] + 10} 
                        x2={minasCentroid[0] - 100} y2={minasCentroid[1] + 10} 
                        stroke="#3b82f6" strokeWidth={2 / currentScale}
                        className="drop-shadow-[0_0_5px_rgba(59,130,246,0.8)]"
                    />
                    <circle cx={minasCentroid[0] - 100} cy={minasCentroid[1] + 10} r={3 / currentScale} fill="#3b82f6" />

                    <line 
                        x1={minasCentroid[0] + 10} y1={minasCentroid[1] + 30} 
                        x2={minasCentroid[0] + 10} y2={minasCentroid[1] + 90} 
                        stroke="#eab308" strokeWidth={2 / currentScale}
                        className="drop-shadow-[0_0_5px_rgba(234,179,8,0.8)]"
                    />
                    <circle cx={minasCentroid[0] + 10} cy={minasCentroid[1] + 90} r={3 / currentScale} fill="#eab308" />
                </g>
            )}
          </g>
        </svg>

        <div className={`absolute inset-0 pointer-events-none transition-all duration-700 delay-300 ${showInfo ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            
            <div className="absolute top-[15%] right-[5%] md:top-[25%] md:right-[20%] bg-slate-900/90 backdrop-blur border-l-4 border-green-400 p-3 rounded-r-xl shadow-2xl max-w-[160px] md:max-w-xs">
                <div className="flex items-center gap-2 mb-1">
                    <Sun size={16} className="text-green-400 shrink-0" />
                    <h4 className="font-bold text-white text-xs md:text-sm">Potencial Solar</h4>
                </div>
                <p className="text-[10px] md:text-xs text-slate-300 leading-tight">Maior irradiação do estado (Norte de MG).</p>
            </div>

            <div className="absolute top-[15%] left-[5%] md:top-[35%] md:left-[20%] bg-slate-900/90 backdrop-blur border-l-4 border-blue-500 p-3 rounded-r-xl shadow-2xl max-w-[160px] md:max-w-xs">
                <div className="flex items-center gap-2 mb-1">
                    <Factory size={16} className="text-blue-500 shrink-0" />
                    <h4 className="font-bold text-white text-xs md:text-sm">Uberaba: H₂V</h4>
                </div>
                <p className="text-[10px] md:text-xs text-slate-300 leading-tight">Planta de Hidrogênio Verde em implantação.</p>
            </div>

            <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 bg-slate-900/90 backdrop-blur border-t-4 border-yellow-500 p-3 md:p-4 rounded-b-xl shadow-2xl w-[90%] max-w-sm text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                    <TrendingUp size={16} className="text-yellow-500 shrink-0" />
                    <h4 className="font-bold text-white text-xs md:text-sm">Crescimento Exponencial</h4>
                </div>
                <p className="text-[10px] md:text-xs text-slate-300">
                    Aumento de <strong className="text-yellow-400">+2.000%</strong> na geração em 6 anos.
                </p>
            </div>
        </div>
      </div>
    </section>
  );
};