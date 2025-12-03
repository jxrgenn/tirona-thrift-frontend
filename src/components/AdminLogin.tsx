import React, { useState } from 'react';
import { Shield, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

interface AdminLoginProps {
  onLogin: () => void;
  onCancel: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin, onCancel }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    try {
      const API_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:5001/api';
      const response = await fetch(`${API_URL}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem('adminToken', token);
        onLogin();
      } else {
        setError(true);
        setPassword('');
        setTimeout(() => setError(false), 1000);
      }
    } catch (err) {
      setError(true);
      setPassword('');
      setTimeout(() => setError(false), 1000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-md p-8 border border-[#333] bg-[#050505] relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#ccff00] to-transparent opacity-50"></div>

        <div className="flex items-center gap-2 mb-8 text-[#ccff00]">
          <Shield size={24} />
          <span className="font-mono uppercase tracking-widest text-sm">Restricted Access</span>
        </div>

        <h2 className="font-syne text-3xl font-bold text-white mb-2">TIRONA_OS</h2>
        <p className="font-mono text-gray-500 text-xs mb-8">AUTHENTICATION REQUIRED /// LEVEL 5 SECURITY</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={16} />
            <input
              type="password"
              autoFocus
              placeholder="ENTER PASSPHRASE"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              className={`w-full bg-[#111] border ${error ? 'border-red-500' : 'border-[#333]'} text-white font-mono py-3 pl-10 pr-4 outline-none focus:border-[#ccff00] transition-colors disabled:opacity-50`}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black font-mono font-bold py-3 hover:bg-[#ccff00] transition-colors uppercase disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Authenticate'}
          </button>

          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="w-full text-gray-500 font-mono text-xs hover:text-white uppercase mt-4 disabled:opacity-50"
          >
            Return to Surface
          </button>
        </form>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-red-500 font-mono text-xs text-center"
          >
            ACCESS DENIED. INVALID CREDENTIALS.
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default AdminLogin;
