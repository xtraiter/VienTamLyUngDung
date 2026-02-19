import React, { useState } from 'react';
import { Microscope, FileText, X, Users, Calendar, ArrowRight } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import TextEffect from '../components/TextEffect';
import { useData } from '../context/DataContext';
import { ResearchProject } from '../types';

const Research: React.FC = () => {
  const { research } = useData();
  const [selectedProject, setSelectedProject] = useState<ResearchProject | null>(null);

  const openDetail = (project: ResearchProject) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };

  const closeDetail = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="bg-white dark:bg-darkBg min-h-screen pb-20 transition-colors duration-300 font-sans">
      {/* Hero */}
      <div className="relative py-16 md:py-24 bg-gradient-to-r from-[#38b6ff] to-blue-600 text-white">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
         <div className="container mx-auto px-4 relative z-10 text-center">
            <ScrollReveal>
               <div className="inline-flex items-center justify-center p-2 bg-white/20 backdrop-blur-sm rounded-full mb-4">
                  <Microscope className="w-5 h-5 text-white" />
               </div>
               <h1 className="font-serif text-3xl md:text-5xl font-bold mb-4">
                  <TextEffect text="Nghiên cứu Khoa học" />
               </h1>
               <p className="text-blue-100 max-w-2xl mx-auto font-light">
                  Các đề tài, dự án nghiên cứu mang tính thực tiễn và ứng dụng cao.
               </p>
            </ScrollReveal>
         </div>
      </div>

      <div className="container mx-auto px-4 mt-12">
         <div className="grid grid-cols-1 gap-6 max-w-5xl mx-auto">
            {research.length === 0 ? (
                <div className="text-center py-12 text-gray-500 border border-dashed border-gray-300 rounded-lg">Chưa có đề tài nghiên cứu nào.</div>
            ) : research.map((project, index) => (
               <ScrollReveal key={project.id} delay={index * 100} direction="up">
                  <div className="bg-white dark:bg-[#1e293b] p-0 md:p-6 rounded-lg md:border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-all duration-300 flex flex-col md:flex-row gap-6 group overflow-hidden md:overflow-visible">
                     
                     {/* Thumbnail */}
                     <div className="w-full md:w-64 h-48 md:h-40 shrink-0 md:rounded overflow-hidden relative">
                        <img 
                          src={project.image || `https://ui-avatars.com/api/?name=${project.title}&background=random`} 
                          alt={project.title} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                        />
                        <div className="absolute top-2 left-2">
                           <span className={`px-2 py-1 rounded text-xs font-bold uppercase shadow-sm ${
                              project.status === 'completed' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-blue-100 text-blue-700'
                           }`}>
                              {project.status === 'completed' ? 'Hoàn thành' : 'Đang thực hiện'}
                           </span>
                        </div>
                     </div>

                     {/* Content */}
                     <div className="flex-1 flex flex-col p-4 md:p-0">
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-2 gap-3">
                           <span className="font-bold text-[#38b6ff] uppercase">{project.category}</span>
                           <span className="flex items-center"><Calendar className="w-3 h-3 mr-1" /> {project.year}</span>
                        </div>
                        
                        <h3 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-3 group-hover:text-[#38b6ff] transition-colors cursor-pointer leading-tight" onClick={() => openDetail(project)}>
                           {project.title}
                        </h3>
                        
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                           {project.summary}
                        </p>
                        
                        <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                           <div className="flex items-center text-sm">
                              <span className="text-gray-500 mr-2">Chủ nhiệm:</span>
                              <span className="font-bold text-gray-900 dark:text-white">{project.leader}</span>
                           </div>
                           <button 
                              onClick={() => openDetail(project)}
                              className="text-sm font-bold text-[#38b6ff] hover:underline flex items-center"
                           >
                              Xem chi tiết <ArrowRight className="w-4 h-4 ml-1" />
                           </button>
                        </div>
                     </div>
                  </div>
                  {/* Mobile Divider */}
                  <div className="md:hidden w-full h-px bg-gray-100 my-6"></div>
               </ScrollReveal>
            ))}
         </div>
      </div>

      {/* Modal Detail */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
           <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={closeDetail}></div>
           <div className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-[#151f32] rounded-xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
              <div className="flex justify-between items-center p-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-[#1e293b]">
                 <h2 className="text-lg font-bold text-gray-900 dark:text-white truncate pr-4">{selectedProject.title}</h2>
                 <button onClick={closeDetail} className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-red-500 hover:text-white transition-colors"><X className="w-5 h-5" /></button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
                 <div className="flex flex-col md:flex-row gap-6 mb-8">
                     <img src={selectedProject.image} alt="" className="w-full md:w-1/3 rounded-lg object-cover shadow-md" />
                     <div className="space-y-3 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg flex-1">
                        <div className="flex"><span className="w-32 text-gray-500 text-sm">Chủ nhiệm:</span> <span className="font-bold">{selectedProject.leader}</span></div>
                        <div className="flex"><span className="w-32 text-gray-500 text-sm">Thành viên:</span> <span>{selectedProject.members || 'N/A'}</span></div>
                        <div className="flex"><span className="w-32 text-gray-500 text-sm">Năm:</span> <span>{selectedProject.year}</span></div>
                        <div className="flex"><span className="w-32 text-gray-500 text-sm">Lĩnh vực:</span> <span className="text-[#38b6ff] font-bold">{selectedProject.category}</span></div>
                     </div>
                 </div>
                 
                 <div className="prose dark:prose-invert max-w-none">
                    <h3 className="text-xl font-bold mb-4">Nội dung đề tài</h3>
                    <div dangerouslySetInnerHTML={{ __html: selectedProject.description || selectedProject.summary }} />
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default Research;
