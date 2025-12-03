import React, { useState } from 'react';
import { getVibeCheck } from '../services/geminiService';
import { Loader2, Sparkles, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface VibeCuratorProps {
  onRecommendation: (ids: string[]) => void;
}

const VibeCurator: React.FC<VibeCuratorProps> = ({ onRecommendation }) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [commentary, setCommentary] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setCommentary(null);
    
    const result = await getVibeCheck(input);
    
    // Always call onRecommendation, even if empty, to handle feedback upstream
    if (result.recommendedIds && result.recommendedIds.length > 0) {
      onRecommendation(result.recommendedIds);
    } else {
        // Fallback if AI fails to return IDs
        console.warn("No IDs returned from AI");
    }
    
    setCommentary(result.commentary || "NO MATCHES FOUND. TRY AGAIN.");
    setLoading(false);
  };

  return (
    <div className="w-full border-t border-b border-[#333] bg-[#050505] py-16 px-4 mb-20 relative overflow-hidden group">
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#ccff00]/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[2s] pointer-events-none" />

        <div className="absolute top-0 right-0 p-4 opacity-20 text-[#ccff00]">
            <Sparkles size={120} strokeWidth={0.5} className="animate-pulse" />
        </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 mb-4 border border-[#ccff00] px-3 py-1 rounded-full bg-[#ccff00]/10">
             <Terminal size={14} className="text-[#ccff00]" />
             <span className="font-mono text-[10px] text-[#ccff00] uppercase tracking-widest">System Online</span>
        </div>

        <h3 className="font-syne text-4xl md:text-6xl font-bold uppercase mb-4 text-white tracking-tighter">
          Vibe <span className="text-transparent stroke-text text-[#ccff00]">Match</span>
        </h3>
        
        <p className="font-mono text-gray-400 mb-10 max-w-lg mx-auto text-sm md:text-base leading-relaxed">
          Describe your aesthetic. We'll curate the rack. <br/>
          <span className="text-[#ccff00]/60 text-xs">Try: "Berlin rave at 4am" or "Y2K popstar"</span>
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-0 max-w-xl mx-auto shadow-[0_0_20px_rgba(204,255,0,0.1)] transition-shadow hover:shadow-[0_0_30px_rgba(204,255,0,0.2)]">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="INPUT AESTHETIC DATA..."
            className="flex-1 bg-[#111] text-white font-mono p-5 outline-none placeholder:text-gray-600 uppercase border border-[#333] focus:border-[#ccff00] transition-colors"
          />
          <button 
            type="submit" 
            disabled={loading}
            className="bg-[#ccff00] text-black hover:bg-white px-8 py-5 font-bold font-syne uppercase transition-all disabled:opacity-50 disabled:cursor-not-allowed border-t md:border-t-0 md:border-l border-[#333]"
          >
            {loading ? <Loader2 className="animate-spin" /> : 'INITIATE'}
          </button>
        </form>

        <AnimatePresence mode="wait">
            {commentary && (
                <motion.div 
                    key={commentary}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="mt-8 font-mono text-[#ccff00] text-sm md:text-lg bg-black/50 backdrop-blur inline-block px-6 py-4 border border-[#ccff00]/30 shadow-lg max-w-2xl"
                >
                    <span className="mr-2 opacity-50">{">"}</span>
                    <span className="uppercase tracking-wide">{commentary}</span>
                </motion.div>
            )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default VibeCurator;