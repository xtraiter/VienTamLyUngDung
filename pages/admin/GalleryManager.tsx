import React, { useState } from 'react';
import { Plus, Trash2, X, Image as ImageIcon, Save, ZoomIn } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { GalleryImage } from '../../types';

const GalleryManager: React.FC = () => {
  const { gallery, addGalleryImage, deleteGalleryImage } = useData();
  const [isAdding, setIsAdding] = useState(false);
  const [newImage, setNewImage] = useState<Partial<GalleryImage>>({ url: '', caption: '' });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (newImage.url && newImage.caption) {
      addGalleryImage({ ...newImage, id: Date.now() } as GalleryImage);
      setNewImage({ url: '', caption: '' });
      setIsAdding(false);
    }
  };

  const handleDelete = (id: number) => {
    if (confirm('Bạn có chắc chắn muốn xóa hình ảnh này khỏi thư viện?')) {
      deleteGalleryImage(id);
    }
  };

  return (
    <div className="relative">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Quản lý Thư viện Ảnh</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Cập nhật hình ảnh hoạt động cho Trang chủ và Trang giới thiệu.</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="flex items-center px-5 py-2.5 bg-primary text-white rounded-xl font-bold hover:bg-blue-600 transition-colors shadow-lg shadow-primary/20 active:scale-95"
        >
          <Plus className="w-5 h-5 mr-2" /> Thêm ảnh mới
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {gallery.map(image => (
          <div key={image.id} className="group relative bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-xl transition-all">
            <div className="aspect-[4/3] relative overflow-hidden">
               <img src={image.url} alt={image.caption} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
               <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button className="p-2 bg-white/20 hover:bg-white/40 text-white rounded-lg backdrop-blur-sm transition-colors">
                     <ZoomIn className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => handleDelete(image.id)}
                    className="p-2 bg-red-500/80 hover:bg-red-500 text-white rounded-lg backdrop-blur-sm transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
               </div>
            </div>
            <div className="p-4 bg-white dark:bg-[#1e293b]">
               <p className="font-medium text-gray-900 dark:text-white truncate text-sm" title={image.caption}>{image.caption}</p>
               <p className="text-xs text-gray-400 mt-1">ID: {image.id}</p>
            </div>
          </div>
        ))}
      </div>

      {isAdding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={() => setIsAdding(false)}></div>
          <div className="relative w-full max-w-lg bg-white dark:bg-[#1e293b] rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-gray-800">
              <h2 className="text-xl font-bold dark:text-white">Thêm ảnh hoạt động</h2>
              <button onClick={() => setIsAdding(false)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"><X className="dark:text-white" /></button>
            </div>
            
            <form onSubmit={handleSave} className="p-6 space-y-6">
               <div>
                  <label className="block text-sm font-bold mb-2 dark:text-gray-300">Đường dẫn ảnh (URL)</label>
                  <div className="relative">
                    <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                      required 
                      className="w-full pl-10 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-black/20 dark:text-white focus:ring-2 focus:ring-primary/50 outline-none" 
                      value={newImage.url} 
                      onChange={e => setNewImage({...newImage, url: e.target.value})} 
                      placeholder="https://..." 
                    />
                  </div>
               </div>
               
               {newImage.url && (
                 <div className="aspect-video w-full rounded-xl overflow-hidden bg-gray-100 dark:bg-black/20 border border-gray-200 dark:border-gray-700">
                    <img src={newImage.url} alt="Preview" className="w-full h-full object-cover" />
                 </div>
               )}

               <div>
                  <label className="block text-sm font-bold mb-2 dark:text-gray-300">Chú thích</label>
                  <input 
                    required 
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-black/20 dark:text-white focus:ring-2 focus:ring-primary/50 outline-none" 
                    value={newImage.caption} 
                    onChange={e => setNewImage({...newImage, caption: e.target.value})} 
                    placeholder="Mô tả ngắn gọn về hoạt động..." 
                  />
               </div>

               <div className="pt-2 flex justify-end gap-3">
                  <button type="button" onClick={() => setIsAdding(false)} className="px-5 py-2.5 rounded-xl text-gray-600 dark:text-gray-300 font-bold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">Hủy bỏ</button>
                  <button type="submit" className="px-8 py-2.5 rounded-xl bg-primary text-white font-bold hover:bg-blue-600 shadow-lg flex items-center">
                      <Save className="w-5 h-5 mr-2" /> Lưu ảnh
                  </button>
               </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryManager;
