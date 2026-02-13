import React from 'react';
import { GraduationCap, Calendar, Clock, MapPin, User, CheckCircle2, ArrowRight } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import TextEffect from '../components/TextEffect';
import { useData } from '../context/DataContext';

const Training: React.FC = () => {
  const { courses } = useData();

  return (
    <div className="bg-white dark:bg-darkBg min-h-screen pb-20 transition-colors duration-300 font-sans">
      
      {/* Hero Banner */}
      <div className="relative py-16 md:py-24 bg-gradient-to-r from-[#38b6ff] to-blue-600 text-white">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <ScrollReveal>
             <div className="inline-flex items-center justify-center p-2 bg-white/20 backdrop-blur-sm rounded-full mb-4">
                <GraduationCap className="w-5 h-5 text-white" />
             </div>
             <h1 className="font-serif text-3xl md:text-5xl font-bold mb-4">
                <TextEffect text="Chương trình Đào tạo" />
             </h1>
             <p className="text-blue-100 max-w-2xl mx-auto font-light">
                Các khóa tập huấn chuyên môn, kỹ năng thực hành dành cho sinh viên và nhà chuyên môn.
             </p>
          </ScrollReveal>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12">
         {/* Course List */}
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {courses.length === 0 ? (
               <div className="col-span-3 text-center py-12 border border-dashed border-gray-300 rounded-lg text-gray-500">
                  Hiện chưa có khóa đào tạo nào.
               </div>
            ) : courses.map((course, idx) => (
               <ScrollReveal key={course.id} delay={idx * 100} direction="up">
                  <div className="bg-white dark:bg-[#1e293b] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800 flex flex-col h-full group">
                     {/* Image */}
                     <div className="relative h-56 overflow-hidden">
                        <img src={course.image} alt={course.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute top-4 right-4">
                           <span className={`px-3 py-1 text-xs font-bold uppercase rounded-full shadow-md ${
                              course.status === 'upcoming' 
                                 ? 'bg-blue-500 text-white' 
                                 : course.status === 'ongoing' 
                                 ? 'bg-green-500 text-white' 
                                 : 'bg-gray-500 text-white'
                           }`}>
                              {course.status === 'upcoming' ? 'Sắp khai giảng' : course.status === 'ongoing' ? 'Đang diễn ra' : 'Đã kết thúc'}
                           </span>
                        </div>
                     </div>

                     {/* Content */}
                     <div className="p-6 flex-1 flex flex-col">
                        <h3 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-[#38b6ff] transition-colors">
                           {course.title}
                        </h3>
                        
                        <div className="space-y-3 mb-6 text-sm text-gray-600 dark:text-gray-300">
                           <div className="flex items-center">
                              <User className="w-4 h-4 mr-3 text-[#38b6ff]" />
                              <span className="font-semibold">{course.instructor}</span>
                           </div>
                           <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-3 text-[#38b6ff]" />
                              <span>Khai giảng: {course.startDate}</span>
                           </div>
                           <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-3 text-[#38b6ff]" />
                              <span>Thời lượng: {course.duration}</span>
                           </div>
                           <div className="flex items-start">
                              <MapPin className="w-4 h-4 mr-3 mt-0.5 text-[#38b6ff]" />
                              <span className="line-clamp-1">{course.location}</span>
                           </div>
                        </div>

                        <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 line-clamp-3 leading-relaxed flex-1">
                           {course.description}
                        </p>

                        <div className="mt-auto pt-6 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                           <div>
                              <p className="text-xs text-gray-400 uppercase font-bold">Học phí</p>
                              <p className="text-lg font-bold text-[#38b6ff]">{course.fee}</p>
                           </div>
                           <button className="px-5 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white font-bold rounded-lg hover:bg-[#38b6ff] hover:text-white transition-colors flex items-center">
                              Chi tiết <ArrowRight className="w-4 h-4 ml-1" />
                           </button>
                        </div>
                     </div>
                  </div>
               </ScrollReveal>
            ))}
         </div>

         {/* Benefits Section */}
         <div className="mt-20 bg-gray-50 dark:bg-[#151f32] rounded-3xl p-8 md:p-12 border border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
               <ScrollReveal>
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 dark:text-white mb-6">
                     Quyền lợi khi tham gia khóa học
                  </h2>
                  <ul className="space-y-4">
                     {[
                        "Được cấp giấy chứng nhận hoàn thành khóa học từ Viện Tâm lý Ứng dụng.",
                        "Tiếp cận tài liệu học tập và các ca lâm sàng thực tế.",
                        "Được hỗ trợ chuyên môn và giám sát (supervision) sau khóa học.",
                        "Cơ hội thực tập và làm việc tại các cơ sở liên kết của Viện."
                     ].map((item, idx) => (
                        <li key={idx} className="flex items-start">
                           <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 mt-0.5 shrink-0" />
                           <span className="text-gray-700 dark:text-gray-300">{item}</span>
                        </li>
                     ))}
                  </ul>
               </ScrollReveal>
               <ScrollReveal direction="left">
                   <div className="relative">
                      <div className="absolute inset-0 bg-[#38b6ff] rounded-2xl transform rotate-3 opacity-20"></div>
                      <img 
                        src="https://picsum.photos/seed/training_benefit/600/400" 
                        alt="Training Class" 
                        className="relative rounded-2xl shadow-lg w-full"
                      />
                   </div>
               </ScrollReveal>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Training;