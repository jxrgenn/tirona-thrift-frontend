import React, { useState, useRef, useEffect } from 'react';
import { Product } from '../types';
import { X, ShoppingBag, Send, MessageSquare, Maximize2, Phone, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
    }, []);


    const handleWhatsApp = () => {
        if (!product) return;
        const message = `Hello, I'm interested in the ${product.name} (Lek ${product.price}). Is it still available?`;
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/355697645717?text=${encodedMessage}`, '_blank');
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
                                        setLightboxIndex(currentImageIndex);
                                        setShowLightbox(true);
                                    }}
                                >
                                    <img
                                        src={product.images[currentImageIndex]}
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

                                    {/* Navigation Arrows - Always visible on mobile, hover on desktop */}
                                    {product.images.length > 1 && (
                                        <>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setCurrentImageIndex((prev) =>
                                                        prev === 0 ? product.images.length - 1 : prev - 1
                                                    );
                                                }}
                                                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/80 hover:bg-[#ccff00] hover:text-black text-white p-2 md:p-3 rounded-full border border-white/20 hover:border-[#ccff00] transition-all z-10 md:opacity-0 md:group-hover:opacity-100"
                                            >
                                                <ChevronLeft size={20} />
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setCurrentImageIndex((prev) =>
                                                        prev === product.images.length - 1 ? 0 : prev + 1
                                                    );
                                                }}
                                                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/80 hover:bg-[#ccff00] hover:text-black text-white p-2 md:p-3 rounded-full border border-white/20 hover:border-[#ccff00] transition-all z-10 md:opacity-0 md:group-hover:opacity-100"
                                            >
                                                <ChevronRight size={20} />
                                            </button>

                                            {/* Image Counter */}
                                            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/80 px-3 py-1 rounded-full border border-white/20 text-xs font-mono z-10">
                                                {currentImageIndex + 1} / {product.images.length}
                                            </div>
                                        </>
                                    )}
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

                                            {/* Contact Section */}
                                            <div className="bg-[#111] border border-[#333] p-3 rounded-sm flex flex-col gap-2">
                                                <div className="flex items-center justify-between border-b border-[#333] pb-1">
                                                    <div className="flex items-center gap-2 text-[#ccff00]">
                                                        <MessageSquare size={14} />
                                                        <span className="font-syne font-bold uppercase text-xs">Contact the Plug</span>
                                                    </div>
                                                </div>

                                                <div className="p-2">
                                                    <p className="text-white/60 text-[10px] font-mono mb-3">
                                                        Questions about sizing, condition, or shipping? DM us directly.
                                                    </p>
                                                    <button onClick={handleWhatsApp} className="w-full bg-[#25D366] text-black font-bold uppercase text-xs py-2 flex items-center justify-center gap-2 hover:bg-white transition-colors">
                                                        <Phone size={14} /> Chat on WhatsApp
                                                    </button>
                                                </div>
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
                                                        value={checkoutForm.name} onChange={e => setCheckoutForm({ ...checkoutForm, name: e.target.value })} />
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-[10px] font-mono text-gray-500 uppercase">Address</label>
                                                    <textarea required className="w-full bg-[#111] border border-[#333] p-2 text-white font-mono h-16 resize-none text-sm"
                                                        value={checkoutForm.address} onChange={e => setCheckoutForm({ ...checkoutForm, address: e.target.value })} />
                                                </div>
                                                <div className="grid grid-cols-2 gap-3">
                                                    <div className="space-y-1">
                                                        <label className="text-[10px] font-mono text-gray-500 uppercase">Phone</label>
                                                        <input required type="tel" className="w-full bg-[#111] border border-[#333] p-2 text-white font-mono text-sm"
                                                            value={checkoutForm.phone} onChange={e => setCheckoutForm({ ...checkoutForm, phone: e.target.value })} />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <label className="text-[10px] font-mono text-gray-500 uppercase">Email</label>
                                                        <input required type="email" className="w-full bg-[#111] border border-[#333] p-2 text-white font-mono text-sm"
                                                            value={checkoutForm.email} onChange={e => setCheckoutForm({ ...checkoutForm, email: e.target.value })} />
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
            )
            }
        </AnimatePresence >
    );
};

export default ProductOverlay;