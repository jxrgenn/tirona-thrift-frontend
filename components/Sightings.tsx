import React from 'react';
import { Camera } from 'lucide-react';
import { motion } from 'framer-motion';

const Sightings: React.FC = () => {
    // Mock images using picsum
    const sightings = [
        'https://picsum.photos/seed/s1/400/500',
        'https://picsum.photos/seed/s2/400/500',
        'https://picsum.photos/seed/s3/400/500',
        'https://picsum.photos/seed/s4/400/500',
        'https://picsum.photos/seed/s5/400/500',
    ];

    return (
        <div className="bg-[#050505] border-t border-[#333] py-20 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 mb-10 flex justify-between items-end">
                <div>
                    <h3 className="font-syne text-3xl font-bold uppercase text-white mb-2">
                        The <span className="text-[#ccff00]">Archive</span>
                    </h3>
                    <p className="font-mono text-xs text-gray-500 uppercase">/// Seen on streets of Tirana</p>
                </div>
                <div className="flex items-center gap-2 text-[#ccff00] animate-pulse">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <span className="font-mono text-xs uppercase">REC</span>
                </div>
            </div>

            <div className="relative w-full overflow-hidden">
                <motion.div 
                    className="flex gap-4 px-6"
                    drag="x"
                    dragConstraints={{ right: 0, left: -1000 }}
                >
                    {sightings.map((src, idx) => (
                        <div key={idx} className="relative min-w-[250px] md:min-w-[300px] aspect-[3/4] bg-[#111] border border-[#333] group overflow-hidden grayscale hover:grayscale-0 transition-all duration-500">
                            <img src={src} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                            
                            {/* Overlay UI to look like camera */}
                            <div className="absolute inset-0 p-4 flex flex-col justify-between pointer-events-none">
                                <div className="flex justify-between text-[10px] font-mono text-white/70">
                                    <span>CAM_0{idx + 1}</span>
                                    <span>[RAW]</span>
                                </div>
                                <div className="flex justify-between text-[10px] font-mono text-white/70">
                                    <span>ISO 800</span>
                                    <span>1/125</span>
                                </div>
                                
                                {/* Crosshair center */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 border border-white/30 rounded-full flex items-center justify-center">
                                    <div className="w-0.5 h-0.5 bg-white/50"></div>
                                </div>
                            </div>

                            {/* Scanline effect */}
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-1 w-full animate-[scan_2s_linear_infinite] pointer-events-none"></div>
                        </div>
                    ))}
                </motion.div>
            </div>
            
            <style>{`
                @keyframes scan {
                    0% { transform: translateY(-100%); }
                    100% { transform: translateY(500%); }
                }
            `}</style>
        </div>
    );
};

export default Sightings;