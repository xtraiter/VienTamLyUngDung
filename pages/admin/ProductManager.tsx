import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, Save, BookOpen, Image as ImageIcon, Search, MoreHorizontal, DollarSign } from 'lucide-react';
import { Product } from '../../types';
import { useData } from '../../context/DataContext';

const ProductManager: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useData();
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({});
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddNew = () => {
    setCurrentProduct({ 
      title: '', 
      description: '', 
      coverImage: '', 
      type: 'textbook', 
      status: 'available',
      price: 0,
      author: '',
      publishYear: new Date().getFullYear()
    });
    setIsEditing(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentProduct.id) {
      updateProduct(currentProduct as Product);
    } else {
      addProduct({ ...currentProduct, id: Date.now() } as Product);
    }
    setIsEditing(false);
  };

  const handleDelete = (id: number) => {
    if (confirm('Bạn có chắc chắn muốn xóa ấn phẩm này?')) {
        deleteProduct(id);
    }
  };

  const filteredProducts = products.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="relative">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
             Quản lý Ấn phẩm
             <span className="text-xs font-normal text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">{products.length} mục</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">Quản lý sách, giáo trình và công cụ trắc nghiệm.</p>
        </div>
        <button onClick={handleAddNew} className="flex items-center px-5 py-2.5 bg-primary text-white rounded-xl font-bold hover:bg-blue-600 transition-colors shadow-lg shadow-primary/20 active:scale-95">
          <Plus className="w-5 h-5 mr-2" /> Thêm ấn phẩm
        </button>
      </div>

       {/* Search Bar */}
       <div className="bg-white dark:bg-[#1e293b] p-4 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 mb-6">
          <div className="relative">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
             <input 
               type="text" 
               placeholder="Tìm kiếm ấn phẩm theo tên..." 
               className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-gray-700 rounded-xl outline-none text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
               value={searchTerm}
               onChange={e => setSearchTerm(e.target.value)}
             />
          </div>
       </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <div key={product.id} className="group bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden flex flex-col hover:shadow-xl transition-all duration-300">
            <div className="aspect-[3/4] overflow-hidden bg-gray-100 dark:bg-black/20 relative">
               <img src={product.coverImage} alt={product.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
               <div className="absolute top-2 right-2 px-2 py-1 bg-black/60 backdrop-blur-sm text-white text-[10px] rounded uppercase font-bold tracking-wide shadow-sm">
                  {product.type === 'textbook' ? 'Giáo trình' : product.type === 'research' ? 'Chuyên khảo' : 'Công cụ'}
               </div>
               {product.status === 'unavailable' && (
                 <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="text-white font-bold uppercase border-2 border-white px-3 py-1 rounded">Tạm hết</span>
                 </div>
               )}
            </div>
            
            <div className="p-5 flex-1 flex flex-col">
               <h3 className="font-bold text-gray-900 dark:text-white line-clamp-2 mb-2 text-sm h-10" title={product.title}>{product.title}</h3>
               
               <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <span>{product.author || 'Đang cập nhật'}</span>
                  <span>{product.publishYear}</span>
               </div>

               <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                  <div>
                      <span className={`inline-block w-2 h-2 rounded-full mr-2 ${product.status === 'available' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                      <span className="text-sm font-bold text-primary">
                        {product.price ? product.price.toLocaleString() + ' đ' : 'Liên hệ'}
                      </span>
                  </div>
                  
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => { setCurrentProduct(product); setIsEditing(true); }} className="p-2 text-gray-500 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"><Edit2 className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(product.id)} className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </div>
               </div>
            </div>
          </div>
        ))}
      </div>

      {/* Slide-over Form */}
      {isEditing && (
        <div className="fixed inset-0 z-[100] overflow-hidden">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={() => setIsEditing(false)}></div>
          <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex sm:pl-16">
            <div className="w-screen max-w-xl transform transition-transform ease-in-out duration-300 translate-x-0">
               <div className="h-full flex flex-col bg-white dark:bg-[#1e293b] shadow-2xl">
                  {/* Header */}
                  <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between bg-gray-50 dark:bg-[#0f172a]">
                     <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                        {currentProduct.id ? 'Cập nhật ấn phẩm' : 'Thêm ấn phẩm mới'}
                     </h2>
                     <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800"><X className="w-6 h-6" /></button>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-6">
                     <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Tên ấn phẩm</label>
                        <input required className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-black/20 focus:ring-2 focus:ring-primary/50 outline-none text-gray-900 dark:text-white" value={currentProduct.title} onChange={e => setCurrentProduct({...currentProduct, title: e.target.value})} placeholder="Nhập tên sách/công cụ..." />
                     </div>

                     <div className="grid grid-cols-2 gap-6">
                        <div>
                           <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Phân loại</label>
                           <div className="relative">
                              <select className="w-full appearance-none px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-black/20 focus:ring-2 focus:ring-primary/50 outline-none cursor-pointer text-gray-900 dark:text-white" value={currentProduct.type} onChange={e => setCurrentProduct({...currentProduct, type: e.target.value as any})}>
                                 <option value="textbook">Sách Giáo trình</option>
                                 <option value="research">Sách Chuyên khảo</option>
                                 <option value="tool">Công cụ hỗ trợ</option>
                              </select>
                              <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-500">
                                 <MoreHorizontal className="w-4 h-4" />
                              </div>
                           </div>
                        </div>
                        <div>
                           <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Trạng thái kho</label>
                           <div className="relative">
                              <select className="w-full appearance-none px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-black/20 focus:ring-2 focus:ring-primary/50 outline-none cursor-pointer text-gray-900 dark:text-white" value={currentProduct.status} onChange={e => setCurrentProduct({...currentProduct, status: e.target.value as any})}>
                                 <option value="available">Có sẵn</option>
                                 <option value="unavailable">Tạm hết</option>
                              </select>
                              <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-500">
                                 <MoreHorizontal className="w-4 h-4" />
                              </div>
                           </div>
                        </div>
                     </div>
                     
                     <div className="grid grid-cols-2 gap-6">
                        <div>
                           <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Tác giả</label>
                           <input className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-black/20 focus:ring-2 focus:ring-primary/50 outline-none text-gray-900 dark:text-white" value={currentProduct.author || ''} onChange={e => setCurrentProduct({...currentProduct, author: e.target.value})} placeholder="Tên tác giả..." />
                        </div>
                        <div>
                           <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Giá tiền (VNĐ)</label>
                           <div className="relative">
                              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                              <input type="number" className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-black/20 focus:ring-2 focus:ring-primary/50 outline-none text-gray-900 dark:text-white" value={currentProduct.price || ''} onChange={e => setCurrentProduct({...currentProduct, price: Number(e.target.value)})} placeholder="0" />
                           </div>
                        </div>
                     </div>

                     <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Mô tả ngắn</label>
                        <textarea rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-black/20 focus:ring-2 focus:ring-primary/50 outline-none text-gray-900 dark:text-white resize-none" value={currentProduct.description} onChange={e => setCurrentProduct({...currentProduct, description: e.target.value})} placeholder="Giới thiệu nội dung..." />
                     </div>

                     <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Ảnh bìa (URL)</label>
                        <div className="flex gap-4 items-start">
                           <div className="relative flex-1">
                              <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                              <input className="w-full pl-10 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-black/20 focus:ring-2 focus:ring-primary/50 outline-none text-gray-900 dark:text-white" value={currentProduct.coverImage} onChange={e => setCurrentProduct({...currentProduct, coverImage: e.target.value})} placeholder="https://..." />
                           </div>
                           {currentProduct.coverImage && (
                              <div className="h-20 w-16 rounded border border-gray-200 dark:border-gray-700 overflow-hidden shrink-0 bg-gray-100">
                                 <img src={currentProduct.coverImage} className="w-full h-full object-cover" alt="Preview" />
                              </div>
                           )}
                        </div>
                     </div>
                  </form>

                  {/* Footer */}
                  <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#0f172a] flex justify-end gap-3">
                     <button onClick={() => setIsEditing(false)} className="px-6 py-2.5 rounded-xl text-gray-600 dark:text-gray-300 font-bold hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">Hủy bỏ</button>
                     <button onClick={handleSave} className="px-8 py-2.5 rounded-xl bg-primary text-white font-bold hover:bg-blue-600 shadow-lg shadow-primary/30 flex items-center">
                        <Save className="w-5 h-5 mr-2" /> Lưu
                     </button>
                  </div>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManager;
