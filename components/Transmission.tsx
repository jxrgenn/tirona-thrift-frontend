import React, { useState } from 'react';
import { Users, ArrowRight, Check } from 'lucide-react';

const Transmission: React.FC = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'IDLE' | 'SENDING' | 'JOINED'>('IDLE');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim()) return;
        setStatus('SENDING');
        setTimeout(() => setStatus('JOINED'), 1500);
    };

    return (
        <div className="bg-[#050505] border-t border-[#333] py-24 px-6 relative overflow-hidden">
            {/* Background Data Stream Effect */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                 <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(90deg,transparent_0%,rgba(204,255,0,0.1)_50%,transparent_100%)] bg-[length:200%_100%] animate-[shimmer_5s_infinite_linear]" />
            </div>

            <div className="max-w-4xl mx-auto relative z-10 flex flex-col md:flex-row items-center gap-12">
                
                <div className="flex-1 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-3 mb-4 text-[#ccff00]">
                        <Users size={24} />
                        <span className="font-mono text-sm uppercase tracking-widest">Tirona Community</span>
                    </div>
                    <h3 className="font-syne text-5xl md:text-7xl font-bold uppercase text-white leading-[0.9] mb-6">
                        The Inner <br/><span className="text-[#ccff00]">Circle</span>
                    </h3>
                    <p className="font-mono text-gray-500 text-sm max-w-md mx-auto md:mx-0">
                        Join the newsletter. Get early access to drops, secret pop-up locations, and community events.
                    </p>
                </div>

                <div className="flex-1 w-full max-w-md">
                    <form onSubmit={handleSubmit} className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-[#ccff00] to-transparent opacity-20 blur transition duration-500 group-hover:opacity-40"></div>
                        <div className="relative flex bg-black border border-[#333] p-1">
                            {status === 'JOINED' ? (
                                <div className="flex-1 flex items-center justify-center gap-2 py-4 text-[#ccff00] font-mono uppercase font-bold">
                                    <Check size={20} />
                                    <span>Welcome to the Club</span>
                                </div>
                            ) : (
                                <>
                                    <input 
                                        type="email" 
                                        placeholder="ENTER EMAIL" 
                                        className="flex-1 bg-transparent text-white font-mono px-4 py-4 outline-none placeholder:text-gray-700 uppercase"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        disabled={status === 'SENDING'}
                                    />
                                    <button 
                                        type="submit"
                                        disabled={status === 'SENDING'}
                                        className="bg-[#ccff00] text-black px-6 py-2 hover:bg-white transition-colors disabled:opacity-50"
                                    >
                                        {status === 'SENDING' ? '...' : <ArrowRight size={20} />}
                                    </button>
                                </>
                            )}
                        </div>
                    </form>
                    <div className="mt-4 flex justify-between font-mono text-[10px] text-gray-600 uppercase">
                        <span>/// No Spam</span>
                        <span>/// Tirana Only</span>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes shimmer {
                    0% { background-position: 200% 0; }
                    100% { background-position: -200% 0; }
                }
            `}</style>
        </div>
    );
};

export default Transmission;