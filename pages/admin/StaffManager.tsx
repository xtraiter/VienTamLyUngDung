import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, Save, UserCircle, Users } from 'lucide-react';
import { CouncilMember } from '../../types';
import { useData } from '../../context/DataContext';

const StaffManager: React.FC = () => {
  const { council, addCouncilMember, updateCouncilMember, deleteCouncilMember } = useData();
  const [isEditing, setIsEditing] = useState(false);
  const [currentMember, setCurrentMember] = useState<Partial<CouncilMember>>({});

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentMember.id) {
       updateCouncilMember(currentMember as CouncilMember);
    } else {
       addCouncilMember({ ...currentMember, id: Date.now() } as CouncilMember);
    }
    setIsEditing(false);
  };

  const handleDelete = (id: number) => {
      if(confirm('Xóa thành viên này khỏi hội đồng?')) {
          deleteCouncilMember(id);
      }
  }

  return (
    <div className="relative">
       <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
             Quản lý Nhân sự
             <span className="text-xs font-normal text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">{council.length} thành viên</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">Quản lý Hội đồng Khoa học và Ban lãnh đạo.</p>
        </div>
        <button onClick={() => { setCurrentMember({name: '', role: '', title: '', image: '', bio: ''}); setIsEditing(true); }} className="flex items-center px-5 py-2.5 bg-primary text-white rounded-xl font-bold hover:bg-blue-600 transition-colors shadow-lg shadow-primary/20 active:scale-95">
          <Plus className="w-5 h-5 mr-2" /> Thêm thành viên
        </button>
      </div>

      <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50/50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
                <tr>
                    <th className="p-5 text-xs font-bold text-gray-500 uppercase tracking-wider">Thành viên</th>
                    <th className="p-5 text-xs font-bold text-gray-500 uppercase tracking-wider">Học hàm/Học vị</th>
                    <th className="p-5 text-xs font-bold text-gray-500 uppercase tracking-wider">Chức vụ</th>
                    <th className="p-5 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Thao tác</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {council.map(member => (
                    <tr key={member.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">
                        <td className="p-5">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-100 dark:border-gray-700 shrink-0">
                                   <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900 dark:text-white text-sm">{member.name}</p>
                                    <p className="text-xs text-gray-500 truncate max-w-[200px] mt-0.5">{member.bio}</p>
                                </div>
                            </div>
                        </td>
                        <td className="p-5">
                           <span className="text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded-md">
                              {member.title}
                           </span>
                        </td>
                        <td className="p-5">
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300">
                                {member.role}
                            </span>
                        </td>
                        <td className="p-5 text-right">
                            <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => { setCurrentMember(member); setIsEditing(true); }} className="p-2 text-gray-400 hover:bg-primary/10 hover:text-primary rounded-lg transition-colors"><Edit2 className="w-4 h-4" /></button>
                                <button onClick={() => handleDelete(member.id)} className="p-2 text-gray-400 hover:bg-red-500/10 hover:text-red-500 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
            </table>
        </div>
      </div>

      {isEditing && (
        <div className="fixed inset-0 z-[100] overflow-hidden">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={() => setIsEditing(false)}></div>
          <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex sm:pl-16">
            <div className="w-screen max-w-md transform transition-transform ease-in-out duration-300 translate-x-0">
               <div className="h-full flex flex-col bg-white dark:bg-[#1e293b] shadow-2xl">
                  {/* Header */}
                  <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between bg-gray-50 dark:bg-[#0f172a]">
                     <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <Users className="w-5 h-5 text-primary" />
                        {currentMember.id ? 'Sửa thông tin' : 'Thêm thành viên'}
                     </h2>
                     <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800"><X className="w-6 h-6" /></button>
                  </div>
                  
                  {/* Form */}
                  <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-6">
                     <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Họ và tên</label>
                        <input required className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-black/20 dark:text-white focus:ring-2 focus:ring-primary/50 outline-none" value={currentMember.name} onChange={e => setCurrentMember({...currentMember, name: e.target.value})} placeholder="VD: TS. Nguyễn Văn A" />
                     </div>
                     
                     <div className="grid grid-cols-2 gap-4">
                        <div>
                           <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Học vị (Title)</label>
                           <input className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-black/20 dark:text-white focus:ring-2 focus:ring-primary/50 outline-none" value={currentMember.title} onChange={e => setCurrentMember({...currentMember, title: e.target.value})} placeholder="Tiến sĩ" />
                        </div>
                        <div>
                           <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Chức vụ</label>
                           <input className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-black/20 dark:text-white focus:ring-2 focus:ring-primary/50 outline-none" value={currentMember.role} onChange={e => setCurrentMember({...currentMember, role: e.target.value})} placeholder="Uỷ viên" />
                        </div>
                     </div>
                     
                     <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Tiểu sử ngắn (Bio)</label>
                        <textarea rows={4} className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-black/20 dark:text-white focus:ring-2 focus:ring-primary/50 outline-none resize-none" value={currentMember.bio || ''} onChange={e => setCurrentMember({...currentMember, bio: e.target.value})} placeholder="Chuyên gia..." />
                     </div>

                     <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Ảnh đại diện (URL)</label>
                        <div className="flex gap-4">
                           <div className="relative flex-1">
                              <UserCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                              <input className="w-full pl-10 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-black/20 dark:text-white focus:ring-2 focus:ring-primary/50 outline-none" value={currentMember.image} onChange={e => setCurrentMember({...currentMember, image: e.target.value})} placeholder="https://..." />
                           </div>
                           {currentMember.image && (
                               <img src={currentMember.image} className="w-12 h-12 rounded-full object-cover border border-gray-200" alt="Preview" />
                           )}
                        </div>
                     </div>
                  </form>

                  {/* Footer */}
                  <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#0f172a] flex justify-end gap-3">
                     <button onClick={() => setIsEditing(false)} className="px-6 py-2.5 rounded-xl text-gray-600 dark:text-gray-300 font-bold hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">Hủy bỏ</button>
                     <button onClick={handleSave} className="px-8 py-2.5 rounded-xl bg-primary text-white font-bold hover:bg-blue-600 shadow-lg flex items-center">
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

export default StaffManager;
