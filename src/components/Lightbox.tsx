import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface LightboxProps {
  images: string[];
  initialIndex: number;
  onClose: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ images, initialIndex, onClose }) => {
  const [index, setIndex] = useState(initialIndex);

  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button onClick={onClose} className="absolute top-6 right-6 text-white hover:text-[#ccff00] z-50">
        <X size={32} />
      </button>

      <div className="relative w-full h-full max-w-7xl max-h-[90vh] flex items-center justify-center">
        {images.length > 1 && (
          <button 
            onClick={prev}
            className="absolute left-0 md:-left-12 p-2 text-white hover:text-[#ccff00] transition-colors"
          >
            <ChevronLeft size={48} />
          </button>
        )}

        <motion.img 
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            src={images[index]} 
            alt="Detail" 
            className="max-w-full max-h-full object-contain pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
        />

        {images.length > 1 && (
          <button 
            onClick={next}
            className="absolute right-0 md:-right-12 p-2 text-white hover:text-[#ccff00] transition-colors"
          >
            <ChevronRight size={48} />
          </button>
        )}
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <div 
            key={i} 
            className={`w-2 h-2 rounded-full ${i === index ? 'bg-[#ccff00]' : 'bg-gray-600'}`} 
          />
        ))}
      </div>
    </motion.div>
  );
};

export default Lightbox;