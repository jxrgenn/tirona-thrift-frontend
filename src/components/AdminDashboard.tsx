import React, { useState } from 'react';
import { Product, Order } from '../types';
import { Package, TrendingUp, Users, Edit2, Trash2, Plus, CheckCircle, Clock, Truck, Upload } from 'lucide-react';

interface AdminDashboardProps {
  products: Product[];
  orders: Order[];
  onUpdateProduct: (product: Product) => void;
  onUpdateOrder: (orderId: string, status: Order['status']) => void;
  onClose: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ products, orders, onUpdateProduct, onUpdateOrder, onClose }) => {
  const [activeTab, setActiveTab] = useState<'INVENTORY' | 'SALES'>('INVENTORY');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Product>>({});

  // Inventory Logic
  const handleEditClick = (product: Product) => {
    setEditingId(product.id);
    setEditForm(product);
  };

  const handleSave = () => {
    if (editingId && editForm) {
      // Merge changes
      const updated = products.find(p => p.id === editingId);
      if (updated) {
        onUpdateProduct({ ...updated, ...editForm } as Product);
      }
      setEditingId(null);
    }
  };

  const removeImage = (indexToRemove: number) => {
    if (editForm.images) {
      const newImages = editForm.images.filter((_, idx) => idx !== indexToRemove);
      setEditForm({ ...editForm, images: newImages });
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string' && editForm.images) {
          setEditForm({ ...editForm, images: [...editForm.images, reader.result] });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Sales Logic
  const totalRevenue = orders.reduce((acc, curr) => acc + curr.total, 0);
  const totalSold = orders.reduce((acc, curr) => acc + curr.items.length, 0);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6 md:p-12 pt-24 font-mono">
      {/* Header */}
      <div className="flex justify-between items-end mb-12 border-b border-[#333] pb-6">
        <div>
          <h1 className="font-syne text-4xl font-bold text-[#ccff00] mb-2">TIRONA_OS DASHBOARD</h1>
          <p className="text-gray-500 text-sm">System Status: OPERATIONAL</p>
        </div>
        <button onClick={onClose} className="text-white hover:text-red-500 underline">LOGOUT</button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-[#111] border border-[#333] p-6">
          <div className="flex justify-between items-start mb-4">
            <span className="text-gray-500 text-xs">REVENUE</span>
            <TrendingUp className="text-[#ccff00]" size={20} />
          </div>
          <h3 className="text-3xl font-bold font-syne">Lek {totalRevenue.toLocaleString()}</h3>
        </div>
        <div className="bg-[#111] border border-[#333] p-6">
          <div className="flex justify-between items-start mb-4">
            <span className="text-gray-500 text-xs">ITEMS SOLD</span>
            <Package className="text-[#ccff00]" size={20} />
          </div>
          <h3 className="text-3xl font-bold font-syne">{totalSold}</h3>
        </div>
        <div className="bg-[#111] border border-[#333] p-6">
          <div className="flex justify-between items-start mb-4">
            <span className="text-gray-500 text-xs">TOTAL ORDERS</span>
            <Users className="text-[#ccff00]" size={20} />
          </div>
          <h3 className="text-3xl font-bold font-syne">{orders.length}</h3>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setActiveTab('INVENTORY')}
          className={`px-6 py-2 border ${activeTab === 'INVENTORY' ? 'bg-[#ccff00] text-black border-[#ccff00]' : 'border-[#333] hover:border-white'}`}
        >
          INVENTORY
        </button>
        <button
          onClick={() => setActiveTab('SALES')}
          className={`px-6 py-2 border ${activeTab === 'SALES' ? 'bg-[#ccff00] text-black border-[#ccff00]' : 'border-[#333] hover:border-white'}`}
        >
          SALES
        </button>
      </div>

      {/* Content */}
      <div className="bg-[#111] border border-[#333] overflow-hidden min-h-[500px]">
        {activeTab === 'INVENTORY' && (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#050505] text-gray-500 text-xs uppercase">
                    <th className="p-4 border-b border-[#333]">ID</th>
                    <th className="p-4 border-b border-[#333] w-1/3">Product</th>
                    <th className="p-4 border-b border-[#333]">Category</th>
                    <th className="p-4 border-b border-[#333]">Size</th>
                    <th className="p-4 border-b border-[#333]">Price (Lek)</th>
                    <th className="p-4 border-b border-[#333]">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product.id} className="border-b border-[#333] hover:bg-[#1a1a1a] transition-colors valign-top">
                      <td className="p-4 text-xs text-gray-500 align-top">#{product.id}</td>
                      <td className="p-4 font-bold align-top">
                        {editingId === product.id ? (
                          <div className="space-y-4">
                            <input
                              className="bg-black border border-gray-600 p-2 text-white w-full text-sm"
                              placeholder="Product Name"
                              value={editForm.name}
                              onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                            />

                            <div className="bg-black/50 p-2 border border-dashed border-[#333]">
                              <p className="text-[10px] text-gray-500 uppercase mb-2">Image Gallery</p>
                              <div className="space-y-2">
                                {editForm.images?.map((img, idx) => (
                                  <div key={idx} className="flex items-center gap-2">
                                    <img src={img} className="w-8 h-8 object-cover border border-gray-600" />
                                    <span className="flex-1 text-[10px] text-gray-400 truncate w-32">
                                      {img.startsWith('data:') ? 'Uploaded File' : img}
                                    </span>
                                    <button onClick={() => removeImage(idx)} className="text-red-500 hover:text-white">
                                      <Trash2 size={12} />
                                    </button>
                                  </div>
                                ))}
                                <div className="flex gap-2 pt-2 border-t border-[#333]">
                                  <label className="flex-1 cursor-pointer bg-[#111] border border-[#333] hover:border-[#ccff00] p-2 flex items-center justify-center gap-2 text-xs text-gray-400 hover:text-white transition-colors">
                                    <Upload size={14} />
                                    <span>Upload Image</span>
                                    <input
                                      type="file"
                                      accept="image/*"
                                      className="hidden"
                                      onChange={handleImageUpload}
                                    />
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="flex gap-3">
                            <div className="w-12 h-16 shrink-0 bg-[#333]">
                              <img src={product.images[0]} className="w-full h-full object-cover" />
                            </div>
                            <span>{product.name}</span>
                          </div>
                        )}
                      </td>
                      <td className="p-4 text-sm align-top">{product.category}</td>
                      <td className="p-4 text-sm align-top">
                        {editingId === product.id ? (
                          <input
                            className="bg-black border border-gray-600 p-1 text-white w-16"
                            value={editForm.size || ''}
                            onChange={e => setEditForm({ ...editForm, size: e.target.value })}
                          />
                        ) : (product.size || 'N/A')}
                      </td>
                      <td className="p-4 text-[#ccff00] align-top">
                        {editingId === product.id ? (
                          <input
                            type="number"
                            className="bg-black border border-gray-600 p-1 text-white w-24"
                            value={editForm.price}
                            onChange={e => setEditForm({ ...editForm, price: Number(e.target.value) })}
                          />
                        ) : product.price.toLocaleString()}
                      </td>
                      <td className="p-4 align-top">
                        {editingId === product.id ? (
                          <div className="flex gap-2 flex-col">
                            <button onClick={handleSave} className="text-[#ccff00] text-xs underline bg-[#ccff00]/10 p-1">SAVE CHANGES</button>
                            <button onClick={() => setEditingId(null)} className="text-red-500 text-xs underline">CANCEL</button>
                          </div>
                        ) : (
                          <button onClick={() => handleEditClick(product)}>
                            <Edit2 size={16} className="text-gray-500 hover:text-white" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden p-4 space-y-4">
              {products.map(product => (
                <div key={product.id} className="bg-[#0a0a0a] border border-[#333] p-4">
                  {editingId === product.id ? (
                    <div className="space-y-3">
                      <div className="flex gap-3 mb-3">
                        <img src={product.images[0]} className="w-20 h-24 object-cover border border-[#333]" />
                        <input
                          className="flex-1 bg-black border border-gray-600 p-2 text-white text-sm"
                          placeholder="Product Name"
                          value={editForm.name}
                          onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] text-gray-500 uppercase block mb-1">Size</label>
                          <input
                            className="bg-black border border-gray-600 p-2 text-white w-full text-sm"
                            value={editForm.size || ''}
                            onChange={e => setEditForm({ ...editForm, size: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-gray-500 uppercase block mb-1">Price (Lek)</label>
                          <input
                            type="number"
                            className="bg-black border border-gray-600 p-2 text-white w-full text-sm"
                            value={editForm.price}
                            onChange={e => setEditForm({ ...editForm, price: Number(e.target.value) })}
                          />
                        </div>
                      </div>

                      <div className="bg-black/50 p-3 border border-dashed border-[#333]">
                        <p className="text-[10px] text-gray-500 uppercase mb-2">Images</p>
                        <div className="grid grid-cols-3 gap-2 mb-2">
                          {editForm.images?.map((img, idx) => (
                            <div key={idx} className="relative group">
                              <img src={img} className="w-full aspect-square object-cover border border-gray-600" />
                              <button
                                onClick={() => removeImage(idx)}
                                className="absolute top-1 right-1 bg-red-500 text-white p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>
                          ))}
                        </div>
                        <label className="w-full cursor-pointer bg-[#111] border border-[#333] hover:border-[#ccff00] p-2 flex items-center justify-center gap-2 text-xs text-gray-400 hover:text-white transition-colors">
                          <Upload size={14} />
                          <span>Add Image</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageUpload}
                          />
                        </label>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <button onClick={handleSave} className="flex-1 bg-[#ccff00] text-black font-bold text-xs py-2 uppercase">Save</button>
                        <button onClick={() => setEditingId(null)} className="flex-1 bg-red-900 text-red-300 font-bold text-xs py-2 uppercase">Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex gap-3 mb-3">
                        <img src={product.images[0]} className="w-20 h-24 object-cover border border-[#333]" />
                        <div className="flex-1">
                          <div className="text-xs text-gray-500 mb-1">#{product.id}</div>
                          <div className="font-bold mb-2">{product.name}</div>
                          <div className="text-xs text-gray-400">{product.category} · {product.size || 'N/A'}</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-[#333]">
                        <div className="text-[#ccff00] font-bold">Lek {product.price.toLocaleString()}</div>
                        <button onClick={() => handleEditClick(product)} className="bg-[#111] border border-[#333] px-4 py-2 text-xs uppercase hover:border-[#ccff00] transition-colors">
                          Edit
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'SALES' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#050505] text-gray-500 text-xs uppercase">
                  <th className="p-4 border-b border-[#333]">Order ID</th>
                  <th className="p-4 border-b border-[#333]">Date</th>
                  <th className="p-4 border-b border-[#333]">Customer</th>
                  <th className="p-4 border-b border-[#333]">Items</th>
                  <th className="p-4 border-b border-[#333]">Total</th>
                  <th className="p-4 border-b border-[#333]">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id} className="border-b border-[#333] hover:bg-[#1a1a1a]">
                    <td className="p-4 text-xs font-mono">{order.id}</td>
                    <td className="p-4 text-sm text-gray-400">{order.date}</td>
                    <td className="p-4">
                      <div className="font-bold text-sm">{order.customerName}</div>
                      <div className="text-xs text-gray-500">{order.customerPhone}</div>
                    </td>
                    <td className="p-4 text-xs">
                      {order.items.map(i => (
                        <div key={i.id}>{i.name} (x{i.quantity})</div>
                      ))}
                    </td>
                    <td className="p-4 text-[#ccff00]">Lek {order.total.toLocaleString()}</td>
                    <td className="p-4">
                      <div className="relative inline-block">
                        <select
                          value={order.status}
                          onChange={(e) => onUpdateOrder(order.id, e.target.value as Order['status'])}
                          className={`appearance-none outline-none text-[10px] font-bold uppercase pl-6 pr-8 py-1 rounded cursor-pointer transition-colors ${order.status === 'DELIVERED' ? 'bg-green-900 text-green-300 hover:bg-green-800' :
                              order.status === 'SHIPPED' ? 'bg-blue-900 text-blue-300 hover:bg-blue-800' :
                                'bg-yellow-900 text-yellow-300 hover:bg-yellow-800'
                            }`}
                        >
                          <option value="PENDING">Pending</option>
                          <option value="SHIPPED">Shipped</option>
                          <option value="DELIVERED">Delivered</option>
                        </select>
                        <div className="absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none">
                          {order.status === 'DELIVERED' ? <CheckCircle size={10} /> :
                            order.status === 'SHIPPED' ? <Truck size={10} /> :
                              <Clock size={10} />}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;