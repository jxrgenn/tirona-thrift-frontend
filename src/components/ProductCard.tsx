import React, { useState, useEffect } from 'react';
import { Product } from '../types';

interface ProductCardProps {
    product: Product;
    onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
    const [imageIndex, setImageIndex] = useState(0);
    const [loadedImages, setLoadedImages] = useState<boolean[]>(new Array(product.images.length).fill(false));

    useEffect(() => {
        // If we don't have enough images, don't cycle
        if (product.images.length <= 1) return;

        // Random interval between 2s and 4s for organic feel
        const intervalTime = Math.random() * 2000 + 2000;
        
        const interval = setInterval(() => {
            setImageIndex(prev => (prev + 1) % product.images.length);
        }, intervalTime);

        return () => clearInterval(interval);
    }, [product.images.length]);

    const handleImageLoad = (idx: number) => {
        setLoadedImages(prev => {
            const newState = [...prev];
            newState[idx] = true;
            return newState;
        });
    };

    return (
        <div 
            className="group relative aspect-[3/4] bg-[#090909] overflow-hidden cursor-pointer"
            onClick={onClick}
        >
            {/* Image Stack */}
            {product.images.map((img, idx) => (
                <img 
                    key={img}
                    src={img} 
                    alt={product.name}
                    loading="lazy"
                    onLoad={() => handleImageLoad(idx)}
                    onError={(e) => {
                        // Hide broken images completely
                        (e.target as HTMLImageElement).style.display = 'none';
                    }}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 filter grayscale group-hover:grayscale-0 ${
                        idx === imageIndex && loadedImages[idx] 
                            ? 'opacity-80 group-hover:opacity-100 scale-100 group-hover:scale-105 z-10' 
                            : 'opacity-0 z-0'
                    }`}
                />
            ))}

            {/* Placeholder if no images load */}
            {!loadedImages.some(Boolean) && (
                <div className="absolute inset-0 flex items-center justify-center text-[#333] font-mono text-xs">
                    [NO SIGNAL]
                </div>
            )}
            
            {/* Hover Info */}
            <div className="absolute inset-0 p-6 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 z-20">
            <div className="flex justify-between items-start">
                <span className="bg-[#ccff00] text-black font-mono text-xs px-2 py-1">
                    {product.category}
                </span>
                {product.size && (
                    <span className="border border-white/40 text-white font-mono text-xs px-2 py-1 bg-black/50">
                        {product.size}
                    </span>
                )}
            </div>
            <div>
                <h3 className="font-syne font-bold text-3xl uppercase leading-none mb-2">{product.name}</h3>
                <p className="font-mono text-[#ccff00] text-xl">Lek {product.price.toLocaleString()}</p>
            </div>
            </div>

            {/* Mobile Always Visible Info (Bottom) */}
            <div className="absolute bottom-0 left-0 w-full p-4 md:hidden bg-gradient-to-t from-black to-transparent z-20">
                <h3 className="font-syne font-bold text-xl uppercase text-white">{product.name}</h3>
                <p className="font-mono text-[#ccff00] text-sm">Lek {product.price.toLocaleString()}</p>
            </div>
        </div>
    );
};

export default ProductCard;