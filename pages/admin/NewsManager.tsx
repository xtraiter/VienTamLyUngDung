import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2, Filter, X, Save, Image as ImageIcon, Eye, Calendar, MoreHorizontal, CheckCircle, AlertCircle } from 'lucide-react';
import { NewsItem } from '../../types';
import { useData } from '../../context/DataContext';

const NewsManager: React.FC = () => {
  const { news, addNews, updateNews, deleteNews } = useData();
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState<Partial<NewsItem>>({});
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Handlers
  const handleAddNew = () => {
    setCurrentItem({
      title: '',
      category: 'Tin tức',
      status: 'published',
      summary: '',
      image: '',
      date: new Date().toISOString().split('T')[0],
      featured: false,
      views: 0,
      content: ''
    });
    setIsEditing(true);
  };

  const handleEdit = (item: NewsItem) => {
    setCurrentItem(item);
    setIsEditing(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Bạn có chắc chắn muốn xóa bài viết này?')) {
      deleteNews(id);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentItem.id) {
      updateNews(currentItem as NewsItem);
    } else {
      const newItem = { ...currentItem, id: Date.now() } as NewsItem;
      addNews(newItem);
    }
    setIsEditing(false);
  };

  const filteredNews = news.filter(n => {
    const matchesStatus = filterStatus === 'all' || n.status === filterStatus;
    const matchesSearch = n.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="relative">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
             Quản lý Tin tức
             <span className="text-xs font-normal text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">{news.length} bài viết</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">Quản lý các bài viết, sự kiện và thông báo của Viện.</p>
        </div>
        <button 
          onClick={handleAddNew}
          className="flex items-center justify-center px-5 py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-colors shadow-lg shadow-primary/25 active:scale-95"
        >
          <Plus className="h-5 w-5 mr-2" />
          Thêm bài viết
        </button>
      </div>

      {/* Toolbar */}
      <div className="bg-white dark:bg-[#1e293b] p-4 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 mb-6 flex flex-col lg:flex-row gap-4 justify-between items-center">
        {/* Search */}
        <div className="relative w-full lg:w-96 group">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
           <input 
             type="text" 
             placeholder="Tìm kiếm theo tiêu đề..." 
             className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-gray-900 dark:text-white transition-all"
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
           />
        </div>
        
        {/* Filters */}
        <div className="flex items-center space-x-2 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 custom-scrollbar">
           <div className="flex bg-gray-100 dark:bg-[#0f172a] p-1 rounded-xl">
             {['all', 'published', 'draft', 'archived'].map((status) => (
               <button
                 key={status}
                 onClick={() => setFilterStatus(status)}
                 className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide whitespace-nowrap transition-all ${
                   filterStatus === status 
                     ? 'bg-white dark:bg-[#1e293b] text-primary shadow-sm' 
                     : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                 }`}
               >
                 {status === 'all' ? 'Tất cả' : status === 'published' ? 'Đã đăng' : status === 'draft' ? 'Nháp' : 'Lưu trữ'}
               </button>
             ))}
           </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
                <th className="p-5 text-xs font-bold text-gray-500 uppercase tracking-wider w-[40%]">Bài viết</th>
                <th className="p-5 text-xs font-bold text-gray-500 uppercase tracking-wider">Danh mục</th>
                <th className="p-5 text-xs font-bold text-gray-500 uppercase tracking-wider">Trạng thái</th>
                <th className="p-5 text-xs font-bold text-gray-500 uppercase tracking-wider">Thống kê</th>
                <th className="p-5 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filteredNews.length === 0 ? (
                  <tr>
                      <td colSpan={5} className="p-12 text-center text-gray-500">
                          <div className="flex flex-col items-center">
                             <Search className="w-12 h-12 text-gray-300 mb-3" />
                             <p>Không tìm thấy bài viết nào phù hợp.</p>
                          </div>
                      </td>
                  </tr>
              ) : filteredNews.map((item) => (
                <tr key={item.id} className="group hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="p-5">
                    <div className="flex items-start space-x-4">
                      <div className="relative shrink-0 group-hover:scale-105 transition-transform duration-300">
                         <img src={item.image} alt="" className="h-16 w-24 rounded-lg object-cover shadow-sm bg-gray-200" />
                         {item.featured && (
                             <span className="absolute -top-1.5 -right-1.5 bg-yellow-400 text-white text-[10px] p-0.5 rounded-full border-2 border-white dark:border-[#1e293b]" title="Nổi bật">
                               <CheckCircle className="w-3 h-3" />
                             </span>
                         )}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-gray-900 dark:text-white line-clamp-2 leading-snug group-hover:text-primary transition-colors cursor-pointer" onClick={() => handleEdit(item)}>
                            {item.title}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-1">{item.summary}</p>
                        <div className="flex items-center mt-2 text-[10px] text-gray-400 space-x-2">
                           <span className="flex items-center"><Calendar className="w-3 h-3 mr-1" /> {item.date}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-5">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                      {item.category}
                    </span>
                  </td>
                  <td className="p-5">
                     <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                       item.status === 'published' ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-900/30' : 
                       item.status === 'draft' ? 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-900/30' :
                       'bg-gray-50 text-gray-600 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700'
                     }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                          item.status === 'published' ? 'bg-green-500' : 
                          item.status === 'draft' ? 'bg-yellow-500' : 'bg-gray-500'
                      }`}></span>
                      {item.status === 'published' ? 'Đã đăng' : item.status === 'draft' ? 'Bản nháp' : 'Lưu trữ'}
                    </span>
                  </td>
                  <td className="p-5 text-sm text-gray-500 dark:text-gray-400">
                     <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4 text-gray-400" />
                        <span className="font-mono">{item.views.toLocaleString()}</span>
                     </div>
                  </td>
                  <td className="p-5 text-right">
                    <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleEdit(item)}
                        className="p-2 rounded-lg text-gray-500 hover:text-primary hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                        title="Chỉnh sửa"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="p-2 rounded-lg text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        title="Xóa"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slide-over Form (Drawer) */}
      {isEditing && (
        <div className="fixed inset-0 z-[100] overflow-hidden">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={() => setIsEditing(false)}></div>
          
          <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex sm:pl-16">
            <div className="w-screen max-w-2xl transform transition-transform ease-in-out duration-300 translate-x-0">
              <div className="h-full flex flex-col bg-white dark:bg-[#1e293b] shadow-2xl">
                
                {/* Drawer Header */}
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between bg-gray-50 dark:bg-[#0f172a]">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    {currentItem.id ? <Edit2 className="w-5 h-5 text-primary" /> : <Plus className="w-5 h-5 text-primary" />}
                    {currentItem.id ? 'Chỉnh sửa bài viết' : 'Thêm bài viết mới'}
                  </h2>
                  <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-800 p-2 rounded-full transition-colors">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Drawer Content */}
                <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-6">
                  
                  {/* Title & Slug */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-2">
                       Tiêu đề bài viết <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-black/20 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none text-gray-900 dark:text-white transition-all text-lg font-medium placeholder:font-normal"
                      value={currentItem.title || ''}
                      onChange={(e) => setCurrentItem({...currentItem, title: e.target.value})}
                      placeholder="Nhập tiêu đề bài viết..."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-2">Danh mục</label>
                      <div className="relative">
                         <select 
                           className="w-full appearance-none px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-black/20 focus:ring-2 focus:ring-primary/50 outline-none text-gray-900 dark:text-white cursor-pointer"
                           value={currentItem.category || 'Tin tức'}
                           onChange={(e) => setCurrentItem({...currentItem, category: e.target.value})}
                         >
                           <option>Tin tức</option>
                           <option>Đào tạo</option>
                           <option>Hợp tác</option>
                           <option>Sự kiện</option>
                           <option>Nghiên cứu</option>
                           <option>Thông báo</option>
                           <option>Bài viết</option>
                         </select>
                         <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-500">
                            <MoreHorizontal className="w-4 h-4" />
                         </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-2">Trạng thái</label>
                      <div className="relative">
                        <select 
                          className="w-full appearance-none px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-black/20 focus:ring-2 focus:ring-primary/50 outline-none text-gray-900 dark:text-white cursor-pointer"
                          value={currentItem.status || 'draft'}
                          onChange={(e) => setCurrentItem({...currentItem, status: e.target.value as any})}
                        >
                          <option value="draft">Bản nháp (Draft)</option>
                          <option value="published">Đã đăng (Published)</option>
                          <option value="archived">Lưu trữ (Archived)</option>
                        </select>
                         <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-500">
                            <MoreHorizontal className="w-4 h-4" />
                         </div>
                      </div>
                    </div>
                  </div>

                  {/* Date & Author (Optional) */}
                  <div className="grid grid-cols-2 gap-6">
                     <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-2">Ngày đăng</label>
                        <input 
                           type="date" 
                           className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-black/20 focus:ring-2 focus:ring-primary/50 outline-none text-gray-900 dark:text-white"
                           value={currentItem.date || ''}
                           onChange={(e) => setCurrentItem({...currentItem, date: e.target.value})}
                        />
                     </div>
                     <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-2">Tác giả</label>
                        <input 
                           type="text" 
                           className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-black/20 focus:ring-2 focus:ring-primary/50 outline-none text-gray-900 dark:text-white"
                           value={currentItem.author || ''}
                           onChange={(e) => setCurrentItem({...currentItem, author: e.target.value})}
                           placeholder="VD: Ban Biên Tập"
                        />
                     </div>
                  </div>

                  {/* Summary */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-2">
                       Tóm tắt (Excerpt)
                       <span className="text-xs font-normal text-gray-500 ml-2">Hiển thị ở danh sách tin</span>
                    </label>
                    <textarea 
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-black/20 focus:ring-2 focus:ring-primary/50 outline-none text-gray-900 dark:text-white transition-all resize-none"
                      value={currentItem.summary || ''}
                      onChange={(e) => setCurrentItem({...currentItem, summary: e.target.value})}
                      placeholder="Mô tả ngắn gọn về nội dung bài viết..."
                    />
                  </div>

                  {/* Image */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-2">Ảnh đại diện (URL)</label>
                    <div className="space-y-3">
                       <div className="flex rounded-xl shadow-sm">
                          <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-500">
                             <ImageIcon className="h-5 w-5" />
                          </span>
                          <input 
                            type="text" 
                            className="flex-1 block w-full px-4 py-3 rounded-none rounded-r-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-black/20 focus:ring-2 focus:ring-primary/50 outline-none text-gray-900 dark:text-white sm:text-sm"
                            placeholder="https://example.com/image.jpg"
                            value={currentItem.image || ''}
                            onChange={(e) => setCurrentItem({...currentItem, image: e.target.value})}
                          />
                       </div>
                       
                       {/* Preview */}
                       {currentItem.image && (
                         <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-100">
                            <img src={currentItem.image} alt="Preview" className="w-full h-full object-cover" />
                         </div>
                       )}
                    </div>
                  </div>

                   {/* Featured Toggle */}
                   <div className="flex items-center justify-between p-4 bg-yellow-50 dark:bg-yellow-900/10 rounded-xl border border-yellow-100 dark:border-yellow-900/30">
                      <div>
                         <span className="block text-sm font-bold text-gray-900 dark:text-white">Bài viết nổi bật (Featured)</span>
                         <span className="text-xs text-gray-500 dark:text-gray-400">Bài viết sẽ được ghim lên đầu trang tin tức.</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                           type="checkbox" 
                           className="sr-only peer"
                           checked={currentItem.featured || false}
                           onChange={(e) => setCurrentItem({...currentItem, featured: e.target.checked})}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 dark:peer-focus:ring-yellow-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-yellow-400"></div>
                      </label>
                  </div>

                  {/* Content Editor Placeholder */}
                  <div>
                     <label className="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-2">Nội dung chi tiết (HTML)</label>
                     <div className="border border-gray-300 dark:border-gray-600 rounded-xl overflow-hidden">
                        <div className="bg-gray-50 dark:bg-gray-800 px-4 py-2 border-b border-gray-300 dark:border-gray-600 flex gap-2">
                           <button type="button" className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-xs font-bold">B</button>
                           <button type="button" className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-xs italic">I</button>
                           <button type="button" className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-xs underline">U</button>
                        </div>
                        <textarea 
                           rows={10}
                           className="w-full p-4 bg-white dark:bg-black/20 outline-none text-gray-900 dark:text-white font-mono text-sm"
                           value={currentItem.content || ''}
                           onChange={(e) => setCurrentItem({...currentItem, content: e.target.value})}
                           placeholder="Nhập nội dung bài viết (hỗ trợ thẻ HTML cơ bản)..."
                        ></textarea>
                     </div>
                  </div>

                </form>

                {/* Drawer Footer */}
                <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#0f172a] flex items-center justify-end gap-3">
                   <button 
                      onClick={() => setIsEditing(false)}
                      className="px-6 py-2.5 rounded-xl text-sm font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                   >
                      Hủy bỏ
                   </button>
                   <button 
                      onClick={handleSave}
                      className="px-8 py-2.5 rounded-xl text-sm font-bold bg-primary text-white hover:bg-primary-dark shadow-lg shadow-primary/30 flex items-center transition-transform active:scale-95"
                   >
                      <Save className="w-4 h-4 mr-2" />
                      Lưu thay đổi
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

export default NewsManager;