import React, { useState, useRef, useEffect } from 'react';
import { Product } from '../types';
import { X, ShoppingBag, Send, MessageSquare, Maximize2, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { askReseller } from '../services/geminiService';
import Lightbox from './Lightbox';

interface ProductOverlayProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity?: number) => void;
  onCheckout: (product: Product, details: any) => void;
}

interface ChatMessage {
  sender: 'user' | 'reseller';
  text: string;
}

const ProductOverlay: React.FC<ProductOverlayProps> = ({ product, onClose, onAddToCart, onCheckout }) => {
  const [question, setQuestion] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isChatting, setIsChatting] = useState(false);
  const [showLightbox, setShowLightbox] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  
  // Checkout State
  const [view, setView] = useState<'DETAILS' | 'CHECKOUT'>('DETAILS');
  const [checkoutForm, setCheckoutForm] = useState({
    name: '',
    address: '',
    phone: '',
    email: ''
  });

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setChatHistory([]);
    setQuestion('');
    setIsChatting(false);
    setView('DETAILS'); // Reset to details on open
    setCheckoutForm({ name: '', address: '', phone: '', email: '' });
  }, [product]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || !product) return;

    const userQ = question;
    setQuestion('');
    setIsChatting(true);
    setChatHistory(prev => [...prev, { sender: 'user', text: userQ }]);
    const response = await askReseller(product, userQ);
    setChatHistory(prev => [...prev, { sender: 'reseller', text: response || "..." }]);
    setIsChatting(false);
  };

  const handleWhatsApp = () => {
      if (!product) return;
      const message = `Hello, I'm interested in the ${product.name} (Lek ${product.price}). Is it still available?`;
      const encodedMessage = encodeURIComponent(message);
      window.open(`https://wa.me/355691234567?text=${encodedMessage}`, '_blank');
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (product) {
        onCheckout(product, checkoutForm);
    }
  };

  if (!product) return null;

  return (
    <AnimatePresence>
        {/* Lightbox */}
        {showLightbox && (
            <Lightbox 
                images={product.images} 
                initialIndex={lightboxIndex} 
                onClose={() => setShowLightbox(false)} 
            />
        )}

      {product && !showLightbox && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-40 backdrop-blur-md"
          />
          
          {/* Slide-over Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
            className="fixed inset-y-0 right-0 z-50 w-full md:w-[60vw] lg:w-[50vw] bg-[#090909] border-l border-[#ccff00]/30 shadow-2xl h-[100dvh] flex flex-col"
          >
            {/* Close Button - Absolute */}
            <button 
                onClick={onClose} 
                className="absolute top-4 right-4 z-[60] bg-black/50 p-2 rounded-full text-white hover:text-[#ccff00] transition-colors hover:rotate-90 duration-300"
            >
                <X size={24} />
            </button>

            {/* Main Content Container - Flex Col on Mobile, Flex Row on Desktop */}
            <div className="flex flex-col md:flex-row h-full w-full overflow-hidden">
              
              {/* Image Section - Fixed Height on Mobile, Full Height on Desktop */}
              <div className="h-[25vh] md:h-full w-full md:w-1/2 shrink-0 bg-[#111] relative border-b md:border-b-0 md:border-r border-[#333]">
                 <div 
                    className="w-full h-full relative cursor-zoom-in group"
                    onClick={() => {
                        setLightboxIndex(0);
                        setShowLightbox(true);
                    }}
                >
                    <img 
                        src={product.images[0]} 
                        alt={product.name} 
                        className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                    
                     <div className="absolute center inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        <div className="bg-black/80 px-4 py-2 flex items-center gap-2 rounded-full border border-white/20">
                            <Maximize2 size={16} />
                            <span className="text-xs font-mono uppercase">Expand</span>
                        </div>
                    </div>
                </div>
              </div>

              {/* Info/Content Section - Flex Col */}
              <div className="flex-1 flex flex-col min-h-0 bg-[#090909] w-full md:w-1/2">
                
                {view === 'DETAILS' ? (
                <>
                    {/* Fixed Header */}
                    <div className="p-5 pb-2 shrink-0 border-b border-[#333]/50">
                         <div className="flex flex-wrap items-center gap-3 mb-2">
                            <span className="bg-[#ccff00] text-black font-mono font-bold text-sm px-2 py-0.5 -skew-x-12">
                                Lek {product.price.toLocaleString()}
                            </span>
                            <span className="text-[10px] font-mono uppercase text-white/60 border border-white/20 px-2 py-0.5 rounded-full">
                                {product.category}
                            </span>
                         </div>
                         <h2 className="font-syne text-3xl md:text-5xl font-bold uppercase leading-[0.9] text-white truncate">
                            {product.name}
                        </h2>
                    </div>

                    {/* Scrollable Middle Content */}
                    <div className="flex-1 overflow-y-auto px-5 py-3 custom-scrollbar min-h-0">
                        <p className="text-sm md:text-base text-gray-400 font-light leading-relaxed mb-4">
                            {product.description}
                        </p>
                        <div className="flex gap-2 flex-wrap mb-4">
                            {product.tags.map(tag => (
                            <span key={tag} className="text-[10px] md:text-xs font-mono text-[#ccff00]/70 border border-[#ccff00]/20 px-2 py-0.5">
                                #{tag.toUpperCase()}
                            </span>
                            ))}
                        </div>

                        {/* Chat Embedded in Scroll */}
                        <div className="bg-[#111] border border-[#333] p-3 rounded-sm flex flex-col gap-2">
                            <div className="flex items-center justify-between border-b border-[#333] pb-1">
                                <div className="flex items-center gap-2 text-[#ccff00]">
                                    <MessageSquare size={14} />
                                    <span className="font-syne font-bold uppercase text-xs">Ask the Plug</span>
                                </div>
                                <button onClick={handleWhatsApp} className="text-[#25D366] text-[10px] uppercase flex items-center gap-1 hover:underline">
                                    <Phone size={10} /> WhatsApp
                                </button>
                            </div>
                            
                            <div ref={scrollRef} className="space-y-2 max-h-[100px] overflow-y-auto custom-scrollbar pr-1">
                                {chatHistory.length === 0 && (
                                    <p className="text-white/20 text-[10px] font-mono mt-1">
                                        Ask about sizing, condition, etc...
                                    </p>
                                )}
                                {chatHistory.map((msg, idx) => (
                                    <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[90%] p-1.5 text-[10px] font-mono ${
                                            msg.sender === 'user' 
                                                ? 'bg-[#222] text-white border border-[#444]' 
                                                : 'bg-[#ccff00]/10 text-[#ccff00] border border-[#ccff00]/20'
                                        }`}>
                                            {msg.text}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <form onSubmit={handleAsk} className="flex gap-2 w-full">
                                <input 
                                    value={question}
                                    onChange={(e) => setQuestion(e.target.value)}
                                    placeholder="Type question..."
                                    className="flex-1 bg-black border border-[#333] text-white px-2 py-1.5 text-xs font-mono focus:border-[#ccff00] outline-none"
                                />
                                <button type="submit" className="bg-white text-black p-1.5 hover:bg-[#ccff00]">
                                    <Send size={14} />
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Fixed Footer Actions */}
                    <div className="p-4 md:p-6 border-t border-[#333] bg-[#090909] shrink-0 z-10 space-y-2">
                         <button 
                            onClick={() => setView('CHECKOUT')}
                            className="w-full bg-[#ccff00] text-black font-syne font-bold text-lg md:text-xl py-3 hover:bg-white transition-colors flex items-center justify-center gap-2 uppercase tracking-tighter"
                        >
                            <span>Secure Fit</span>
                            <ShoppingBag size={20} />
                        </button>
                        <p className="text-center text-white/30 font-mono text-[8px] uppercase tracking-widest">
                            No Refunds /// All Sales Final
                        </p>
                    </div>
                </>
                ) : (
                    // CHECKOUT VIEW - Same Flex Layout
                    <div className="flex flex-col h-full">
                         <div className="p-5 pb-2 shrink-0">
                             <h2 className="font-syne text-2xl md:text-3xl font-bold uppercase text-[#ccff00]">Secure The Bag</h2>
                         </div>

                         <div className="flex-1 overflow-y-auto px-5 custom-scrollbar min-h-0">
                            <form id="checkout-form" onSubmit={handleCheckoutSubmit} className="space-y-3 py-2">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-mono text-gray-500 uppercase">Full Name</label>
                                    <input required className="w-full bg-[#111] border border-[#333] p-2 text-white font-mono text-sm"
                                        value={checkoutForm.name} onChange={e => setCheckoutForm({...checkoutForm, name: e.target.value})} />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-mono text-gray-500 uppercase">Address</label>
                                    <textarea required className="w-full bg-[#111] border border-[#333] p-2 text-white font-mono h-16 resize-none text-sm"
                                        value={checkoutForm.address} onChange={e => setCheckoutForm({...checkoutForm, address: e.target.value})} />
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-mono text-gray-500 uppercase">Phone</label>
                                        <input required type="tel" className="w-full bg-[#111] border border-[#333] p-2 text-white font-mono text-sm"
                                            value={checkoutForm.phone} onChange={e => setCheckoutForm({...checkoutForm, phone: e.target.value})} />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-mono text-gray-500 uppercase">Email</label>
                                        <input required type="email" className="w-full bg-[#111] border border-[#333] p-2 text-white font-mono text-sm"
                                            value={checkoutForm.email} onChange={e => setCheckoutForm({...checkoutForm, email: e.target.value})} />
                                    </div>
                                </div>
                            </form>
                         </div>

                         <div className="p-4 md:p-6 border-t border-[#333] shrink-0 z-10">
                            <div className="flex justify-between font-mono text-sm mb-3">
                                <span>Total (COD)</span>
                                <span className="text-[#ccff00]">Lek {product.price.toLocaleString()}</span>
                            </div>
                            <button type="submit" form="checkout-form" className="w-full bg-white text-black font-syne font-bold text-lg py-3 hover:bg-[#ccff00] uppercase">
                                Confirm Order
                            </button>
                            <button type="button" onClick={() => setView('DETAILS')} className="w-full mt-2 text-gray-500 font-mono text-xs py-1 hover:text-white uppercase">
                                Cancel
                            </button>
                         </div>
                    </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProductOverlay;