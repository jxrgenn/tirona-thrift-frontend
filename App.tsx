import React, { useState, useEffect } from 'react';
import { ShoppingCart, User, Menu, Shield } from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

import Scene from './components/Scene';
import ProductOverlay from './components/ProductOverlay';
import ProductCard from './components/ProductCard';
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/AdminLogin';
import UpcomingEvents from './components/UpcomingEvents';
import Transmission from './components/Transmission';
import Logo from './components/Logo';
import { api } from './services/api';
import { Product, CartItem, ViewState, Order } from './types';

const App: React.FC = () => {
  const [viewState, setViewState] = useState<ViewState>('LANDING');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Lifted state for data management
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  
  const [isCartOpen, setIsCartOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  useEffect(() => {
    // Basic Routing Logic
    const path = window.location.pathname;
    if (path === '/admin') {
        setViewState('ADMIN_LOGIN');
    }

    const fetchData = async () => {
        const fetchedProducts = await api.getProducts();
        setProducts(fetchedProducts);
        // Only fetch orders if in admin mode usually, but we'll fetch for state simplicity
        const fetchedOrders = await api.getOrders();
        setOrders(fetchedOrders);
    };
    fetchData();
  }, []);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setSelectedProduct(null); 
    setIsCartOpen(true);
  };

  const handleCheckout = async (product: Product, details: any) => {
      const orderData: Partial<Order> = {
          customerName: details.name,
          customerAddress: details.address,
          customerEmail: details.email,
          customerPhone: details.phone,
          items: [{...product, quantity: 1}],
          total: product.price,
      };
      
      const newOrder = await api.createOrder(orderData);
      
      setOrders(prev => [newOrder, ...prev]);
      alert(`ORDER CONFIRMED FOR ${details.name.toUpperCase()}. CHECK EMAIL.`);
      setSelectedProduct(null);
  };

  const handleUpdateProduct = async (updated: Product) => {
      const res = await api.updateProduct(updated);
      setProducts(prev => prev.map(p => p.id === updated.id ? updated : p));
  };

  const handleUpdateOrder = async (orderId: string, newStatus: Order['status']) => {
      await api.updateOrder(orderId, newStatus);
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  // View Routing
  if (viewState === 'ADMIN_LOGIN') {
      return (
          <AdminLogin 
            onLogin={() => setViewState('ADMIN')}
            onCancel={() => {
                setViewState('LANDING');
                window.history.pushState({}, '', '/');
            }}
          />
      );
  }

  if (viewState === 'ADMIN') {
      return (
          <AdminDashboard 
            products={products}
            orders={orders}
            onUpdateProduct={handleUpdateProduct}
            onUpdateOrder={handleUpdateOrder}
            onClose={() => {
                setViewState('LANDING');
                window.history.pushState({}, '', '/');
            }}
          />
      );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#ccff00] selection:text-black">
      {/* 3D Background */}
      <div className="fixed inset-0 z-0">
        <Scene />
      </div>

      {/* Navigation - Floating/Sticky */}
      <nav className="fixed top-0 left-0 right-0 z-40 p-6 flex justify-between items-start mix-blend-difference pointer-events-none">
        <div className="pointer-events-auto cursor-pointer" onClick={() => {
            setViewState('LANDING');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }}>
          <Logo className="h-10 text-white hover:text-[#ccff00] transition-colors" />
        </div>

        <div className="flex gap-6 pointer-events-auto items-center">
          {/* Hidden Admin Trigger - Now accessible via /admin route or hidden click */}
          {/* Keeping a discrete button just in case, but styled to look like debug */}
          <button 
            onClick={() => {
                window.history.pushState({}, '', '/admin');
                setViewState('ADMIN_LOGIN');
            }}
            className="hidden md:flex items-center gap-2 opacity-0 hover:opacity-100 transition-opacity text-gray-800"
          >
             <Shield size={14} />
          </button>

          <button 
            className="font-mono text-sm uppercase flex items-center gap-2 hover:text-[#ccff00]"
            onClick={() => setIsCartOpen(!isCartOpen)}
          >
            <span>CART ({cart.reduce((a, b) => a + b.quantity, 0)})</span>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative z-10 h-screen flex flex-col justify-center items-center px-4 overflow-hidden">
        <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-center"
        >
          <h1 className="font-syne font-black text-[15vw] leading-[0.8] tracking-tighter text-transparent stroke-text hover:text-[#ccff00] transition-all duration-500 cursor-default">
            TIRONA
          </h1>
          <h1 className="font-syne font-black text-[15vw] leading-[0.8] tracking-tighter text-white mix-blend-overlay">
            THRIFT
          </h1>
        </motion.div>
        
        <div className="absolute bottom-12 left-0 w-full flex justify-between px-6 md:px-12 uppercase font-mono text-xs md:text-sm tracking-widest opacity-60">
            <span>Est. 2024</span>
            <span className="animate-pulse text-[#ccff00]">/// Scroll to Shop</span>
            <span>Tirana, AL</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-20 bg-[#050505] min-h-screen">
        
        {/* Marquee Separator */}
        <div className="border-t border-b border-[#333] py-4 overflow-hidden whitespace-nowrap">
            <motion.div 
                className="inline-block font-mono text-xl md:text-2xl font-bold text-[#ccff00]"
                animate={{ x: [0, -1000] }}
                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            >
                NO RESTOCKS /// ONE OF ONE PIECES /// WORLDWIDE SHIPPING /// TIRONA UNDERGROUND /// NO RESTOCKS /// ONE OF ONE PIECES /// WORLDWIDE SHIPPING /// TIRONA UNDERGROUND
            </motion.div>
        </div>

        {/* New Upcoming Events Section */}
        <UpcomingEvents />

        {/* Product Grid */}
        <div id="product-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0.5 bg-[#333] pb-0">
          {products.map((product) => (
            <ProductCard 
                key={product.id} 
                product={product} 
                onClick={() => setSelectedProduct(product)} 
            />
          ))}
        </div>

        {/* New Transmission/Newsletter Section */}
        <Transmission />

        {/* Footer */}
        <footer className="bg-[#ccff00] text-black py-20 px-6">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-10">
                <div>
                   <Logo className="h-20 md:h-24 text-black" />
                </div>
                <div className="flex flex-col gap-2 font-mono text-sm uppercase font-bold text-right">
                    <a href="#" className="hover:underline">Instagram</a>
                    <a href="#" className="hover:underline">TikTok</a>
                    <a href="#" className="hover:underline">Email Us</a>
                    <div className="mt-8 flex flex-col gap-1 opacity-70">
                        <span>© 2024 Tirona Thrift</span>
                        <a href="https://jxsoft.al" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                            Made by jxsoft.al
                        </a>
                    </div>
                </div>
            </div>
        </footer>
      </main>

      {/* Cart Sidebar (Minimal) */}
      <AnimatePresence>
        {isCartOpen && (
            <motion.div 
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                className="fixed inset-y-0 right-0 z-50 w-full md:w-96 bg-[#111] border-l border-[#333] p-6 flex flex-col"
            >
                <div className="flex justify-between items-center mb-8">
                    <h2 className="font-syne text-2xl font-bold uppercase">Your Bag</h2>
                    <button onClick={() => setIsCartOpen(false)} className="hover:text-[#ccff00]">CLOSE</button>
                </div>

                <div className="flex-1 overflow-y-auto space-y-6">
                    {cart.length === 0 ? (
                        <div className="text-center text-gray-500 font-mono mt-20">BAG IS EMPTY</div>
                    ) : (
                        cart.map(item => (
                            <div key={item.id} className="flex gap-4">
                                <img src={item.images[0]} className="w-20 h-24 object-cover grayscale" />
                                <div>
                                    <h4 className="font-bold font-syne uppercase">{item.name}</h4>
                                    <p className="font-mono text-[#ccff00] text-sm">Lek {item.price.toLocaleString()}</p>
                                    <p className="font-mono text-xs text-gray-500 mt-1">QTY: {item.quantity}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="border-t border-[#333] pt-6 mt-6">
                    <div className="flex justify-between font-mono text-xl mb-6 text-[#ccff00]">
                        <span>TOTAL</span>
                        <span>Lek {cart.reduce((a, b) => a + (b.price * b.quantity), 0).toLocaleString()}</span>
                    </div>
                    <button className="w-full bg-white text-black font-syne font-bold py-4 hover:bg-[#ccff00] transition-colors uppercase">
                        Checkout
                    </button>
                </div>
            </motion.div>
        )}
      </AnimatePresence>

      <ProductOverlay 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)}
        onAddToCart={addToCart}
        onCheckout={handleCheckout}
      />
      
      <style>{`
        .stroke-text {
            -webkit-text-stroke: 2px rgba(255, 255, 255, 0.3);
            color: transparent;
        }
        .stroke-text:hover {
            -webkit-text-stroke: 2px #ccff00;
        }
      `}</style>
    </div>
  );
};

export default App;
