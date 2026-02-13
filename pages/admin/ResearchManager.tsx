import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, Microscope, Save, Image as ImageIcon, FileText, Calendar } from 'lucide-react';
import { ResearchProject } from '../../types';
import { useData } from '../../context/DataContext';

const ResearchManager: React.FC = () => {
  const { research, addResearch, updateResearch, deleteResearch } = useData();
  const [isEditing, setIsEditing] = useState(false);
  const [currentProject, setCurrentProject] = useState<Partial<ResearchProject>>({});

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentProject.id) {
       updateResearch(currentProject as ResearchProject);
    } else {
       addResearch({ ...currentProject, id: Date.now() } as ResearchProject);
    }
    setIsEditing(false);
  };

  const handleDelete = (id: number) => {
      if(confirm('Xóa đề tài nghiên cứu này?')) {
          deleteResearch(id);
      }
  }

  const handleAddNew = () => {
      setCurrentProject({
          title: '', 
          status: 'ongoing', 
          category: 'Tâm lý học',
          leader: '',
          members: '',
          year: new Date().getFullYear().toString(),
          summary: '',
          description: '',
          image: '',
          pdfUrl: ''
      }); 
      setIsEditing(true);
  }

  return (
    <div className="relative">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
             Quản lý Đề tài
             <span className="text-xs font-normal text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">{research.length} đề tài</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">Cập nhật các dự án và đề tài khoa học.</p>
        </div>
        <button onClick={handleAddNew} className="flex items-center px-5 py-2.5 bg-primary text-white rounded-xl font-bold hover:bg-blue-600 transition-colors shadow-lg shadow-primary/20 active:scale-95">
          <Plus className="w-5 h-5 mr-2" /> Thêm đề tài
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
         {research.map(proj => (
            <div key={proj.id} className="bg-white dark:bg-[#1e293b] p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-start hover:shadow-lg transition-all group">
               <div className="flex gap-5 flex-1 w-full">
                  <div className="w-24 h-24 rounded-xl bg-gray-100 dark:bg-black/20 shrink-0 overflow-hidden relative">
                     {proj.image ? (
                        <img src={proj.image} alt="" className="w-full h-full object-cover" />
                     ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400"><Microscope className="w-8 h-8 opacity-50" /></div>
                     )}
                     <div className={`absolute inset-x-0 bottom-0 h-1 ${proj.status === 'completed' ? 'bg-green-500' : proj.status === 'ongoing' ? 'bg-blue-500' : 'bg-gray-500'}`}></div>
                  </div>
                  <div className="flex-1">
                     <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <span className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded-md tracking-wide ${proj.status === 'completed' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' : proj.status === 'ongoing' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' : 'bg-gray-100 text-gray-700'}`}>
                           {proj.status === 'completed' ? 'Hoàn thành' : proj.status === 'ongoing' ? 'Đang thực hiện' : 'Đề xuất'}
                        </span>
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                           <Calendar className="w-3 h-3 mr-1" />
                           {proj.year}
                        </div>
                        <span className="text-xs font-bold text-gray-400">•</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">{proj.category}</span>
                     </div>
                     <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 leading-tight group-hover:text-primary transition-colors">{proj.title}</h3>
                     <div className="flex items-center text-sm font-semibold text-primary bg-primary/5 dark:bg-primary/10 inline-block px-3 py-1.5 rounded-lg mb-2">
                        <Microscope className="w-4 h-4 mr-2" />
                        Chủ nhiệm: {proj.leader}
                     </div>
                     {proj.members && <p className="text-xs text-gray-500 line-clamp-1 mt-1">Thành viên: {proj.members}</p>}
                  </div>
               </div>
               <div className="flex gap-2 mt-4 md:mt-0 md:ml-6 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity self-start">
                  <button onClick={() => { setCurrentProject(proj); setIsEditing(true); }} className="p-2.5 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors hover:text-primary"><Edit2 className="w-5 h-5" /></button>
                  <button onClick={() => handleDelete(proj.id)} className="p-2.5 text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-colors"><Trash2 className="w-5 h-5" /></button>
               </div>
            </div>
         ))}
      </div>

      {isEditing && (
         <div className="fixed inset-0 z-[100] overflow-hidden">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={() => setIsEditing(false)}></div>
            <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex sm:pl-16">
               <div className="w-screen max-w-2xl transform transition-transform ease-in-out duration-300 translate-x-0">
                  <div className="h-full flex flex-col bg-white dark:bg-[#1e293b] shadow-2xl">
                     {/* Header */}
                     <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between bg-gray-50 dark:bg-[#0f172a]">
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                           {currentProject.id ? 'Sửa đề tài' : 'Thêm đề tài mới'}
                        </h2>
                        <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800"><X className="w-6 h-6" /></button>
                     </div>
                     
                     {/* Form */}
                     <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-6">
                        <div>
                           <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Tên đề tài</label>
                           <textarea required rows={2} className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-black/20 dark:text-white focus:ring-2 focus:ring-primary/50 outline-none font-bold resize-none" value={currentProject.title} onChange={e => setCurrentProject({...currentProject, title: e.target.value})} placeholder="Nhập tên đề tài..." />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-6">
                           <div>
                              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Chủ nhiệm</label>
                              <input className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-black/20 dark:text-white focus:ring-2 focus:ring-primary/50 outline-none" value={currentProject.leader} onChange={e => setCurrentProject({...currentProject, leader: e.target.value})} placeholder="TS. ..." />
                           </div>
                           <div>
                              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Năm thực hiện</label>
                              <input className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-black/20 dark:text-white focus:ring-2 focus:ring-primary/50 outline-none" value={currentProject.year} onChange={e => setCurrentProject({...currentProject, year: e.target.value})} placeholder="2024" />
                           </div>
                        </div>

                        <div>
                           <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Thành viên tham gia</label>
                           <input className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-black/20 dark:text-white focus:ring-2 focus:ring-primary/50 outline-none" value={currentProject.members || ''} onChange={e => setCurrentProject({...currentProject, members: e.target.value})} placeholder="ThS. A, CN. B..." />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                           <div>
                              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Trạng thái</label>
                              <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-black/20 dark:text-white focus:ring-2 focus:ring-primary/50 outline-none cursor-pointer" value={currentProject.status} onChange={e => setCurrentProject({...currentProject, status: e.target.value as any})}>
                                 <option value="ongoing">Đang thực hiện</option>
                                 <option value="completed">Đã hoàn thành</option>
                                 <option value="proposed">Đề xuất mới</option>
                              </select>
                           </div>
                           <div>
                              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Lĩnh vực</label>
                              <input className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-black/20 dark:text-white focus:ring-2 focus:ring-primary/50 outline-none" value={currentProject.category} onChange={e => setCurrentProject({...currentProject, category: e.target.value})} placeholder="Tâm lý học..." />
                           </div>
                        </div>

                        <div>
                           <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Link Ảnh bìa (URL)</label>
                           <div className="relative">
                              <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                              <input className="w-full pl-10 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-black/20 dark:text-white focus:ring-2 focus:ring-primary/50 outline-none" value={currentProject.image || ''} onChange={e => setCurrentProject({...currentProject, image: e.target.value})} placeholder="https://..." />
                           </div>
                        </div>

                        <div>
                           <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Link File PDF (URL)</label>
                           <div className="relative">
                              <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                              <input className="w-full pl-10 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-black/20 dark:text-white focus:ring-2 focus:ring-primary/50 outline-none" value={currentProject.pdfUrl || ''} onChange={e => setCurrentProject({...currentProject, pdfUrl: e.target.value})} placeholder="https://...pdf" />
                           </div>
                        </div>

                        <div>
                           <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Tóm tắt ngắn</label>
                           <textarea rows={3} className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-black/20 dark:text-white focus:ring-2 focus:ring-primary/50 outline-none resize-none" value={currentProject.summary} onChange={e => setCurrentProject({...currentProject, summary: e.target.value})} placeholder="Mô tả ngắn gọn..." />
                        </div>

                        <div>
                           <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Nội dung chi tiết (HTML)</label>
                           <textarea rows={8} className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-black/20 dark:text-white focus:ring-2 focus:ring-primary/50 outline-none font-mono text-sm" value={currentProject.description || ''} onChange={e => setCurrentProject({...currentProject, description: e.target.value})} placeholder="Nội dung chi tiết, phương pháp nghiên cứu, kết quả..." />
                        </div>
                     </form>

                     {/* Footer */}
                     <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#0f172a] flex justify-end gap-3">
                        <button onClick={() => setIsEditing(false)} className="px-6 py-2.5 rounded-xl text-gray-600 dark:text-gray-300 font-bold hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">Hủy bỏ</button>
                        <button onClick={handleSave} className="px-8 py-2.5 rounded-xl bg-primary text-white font-bold hover:bg-blue-600 shadow-lg flex items-center">
                            <Save className="w-5 h-5 mr-2" /> Lưu đề tài
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

export default ResearchManager;