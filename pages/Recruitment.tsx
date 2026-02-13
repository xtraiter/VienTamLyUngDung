import React from 'react';
import { Briefcase, CheckCircle2, Mail, Users, ArrowRight } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import TextEffect from '../components/TextEffect';
import { Link } from 'react-router-dom';

const Recruitment: React.FC = () => {
  return (
    <div className="bg-white dark:bg-darkBg min-h-screen pb-20 transition-colors duration-300 font-sans">
      {/* Hero */}
      <div className="relative py-16 md:py-24 bg-gradient-to-r from-[#38b6ff] to-blue-600 text-white">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <ScrollReveal>
             <div className="inline-flex items-center justify-center p-2 bg-white/20 backdrop-blur-sm rounded-full mb-4">
                <Briefcase className="w-5 h-5 text-white" />
             </div>
             <h1 className="font-serif text-3xl md:text-5xl font-bold mb-4">
                <TextEffect text="Tuyển dụng & Cơ hội nghề nghiệp" />
             </h1>
             <p className="text-blue-100 max-w-2xl mx-auto font-light">
                Gia nhập đội ngũ chuyên gia tâm lý hàng đầu và phát triển sự nghiệp trong môi trường học thuật chuyên nghiệp.
             </p>
          </ScrollReveal>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-16">
         {/* Introduction */}
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <ScrollReveal>
               <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-6">Môi trường làm việc tại Viện</h2>
               <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  Viện Tâm lý Ứng dụng tự hào sở hữu đội ngũ nhân sự chất lượng cao, bao gồm các Tiến sĩ, Thạc sĩ và chuyên gia giàu kinh nghiệm. Chúng tôi cam kết tạo ra một môi trường làm việc:
               </p>
               <ul className="space-y-4">
                  {[
                     "Chuyên nghiệp, nhân văn và tôn trọng sự khác biệt.",
                     "Khuyến khích nghiên cứu khoa học và phát triển chuyên môn.",
                     "Cơ hội tham gia các dự án cấp Bộ, cấp Nhà nước.",
                     "Chế độ đãi ngộ hấp dẫn, phù hợp với năng lực."
                  ].map((item, idx) => (
                     <li key={idx} className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">{item}</span>
                     </li>
                  ))}
               </ul>
            </ScrollReveal>
            <ScrollReveal direction="left">
               <div className="relative rounded-2xl overflow-hidden shadow-xl">
                  <img src="https://picsum.photos/seed/office_team/600/400" alt="Team" className="w-full object-cover" />
               </div>
            </ScrollReveal>
         </div>

         {/* Current Openings */}
         <div className="mb-20">
            <div className="text-center mb-12">
               <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 dark:text-white uppercase mb-3">Vị trí đang tuyển dụng</h2>
               <div className="w-16 h-1 bg-[#38b6ff] mx-auto"></div>
            </div>

            <div className="space-y-4">
               {/* Job Item 1 */}
               <ScrollReveal>
                  <div className="bg-white dark:bg-[#1e293b] p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-[#38b6ff] transition-all flex flex-col md:flex-row items-center justify-between gap-6 group">
                     <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-[#38b6ff] transition-colors">Chuyên viên Tâm lý lâm sàng</h3>
                        <div className="flex gap-4 text-sm text-gray-500 dark:text-gray-400">
                           <span className="flex items-center"><Users className="w-4 h-4 mr-1" /> Full-time</span>
                           <span className="flex items-center"><Briefcase className="w-4 h-4 mr-1" /> TP. Hồ Chí Minh</span>
                        </div>
                     </div>
                     <Link to="/lien-he" className="px-6 py-2 border border-[#38b6ff] text-[#38b6ff] font-bold rounded hover:bg-[#38b6ff] hover:text-white transition-colors">
                        Ứng tuyển ngay
                     </Link>
                  </div>
               </ScrollReveal>

               {/* Job Item 2 */}
               <ScrollReveal delay={100}>
                  <div className="bg-white dark:bg-[#1e293b] p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-[#38b6ff] transition-all flex flex-col md:flex-row items-center justify-between gap-6 group">
                     <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-[#38b6ff] transition-colors">Nghiên cứu viên (Part-time)</h3>
                        <div className="flex gap-4 text-sm text-gray-500 dark:text-gray-400">
                           <span className="flex items-center"><Users className="w-4 h-4 mr-1" /> Part-time / CTV</span>
                           <span className="flex items-center"><Briefcase className="w-4 h-4 mr-1" /> Linh hoạt</span>
                        </div>
                     </div>
                     <Link to="/lien-he" className="px-6 py-2 border border-[#38b6ff] text-[#38b6ff] font-bold rounded hover:bg-[#38b6ff] hover:text-white transition-colors">
                        Ứng tuyển ngay
                     </Link>
                  </div>
               </ScrollReveal>

               {/* Job Item 3 */}
               <ScrollReveal delay={200}>
                  <div className="bg-white dark:bg-[#1e293b] p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-[#38b6ff] transition-all flex flex-col md:flex-row items-center justify-between gap-6 group">
                     <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-[#38b6ff] transition-colors">Thực tập sinh Tâm lý học</h3>
                        <div className="flex gap-4 text-sm text-gray-500 dark:text-gray-400">
                           <span className="flex items-center"><Users className="w-4 h-4 mr-1" /> Internship</span>
                           <span className="flex items-center"><Briefcase className="w-4 h-4 mr-1" /> TP. Hồ Chí Minh</span>
                        </div>
                     </div>
                     <Link to="/lien-he" className="px-6 py-2 border border-[#38b6ff] text-[#38b6ff] font-bold rounded hover:bg-[#38b6ff] hover:text-white transition-colors">
                        Ứng tuyển ngay
                     </Link>
                  </div>
               </ScrollReveal>
            </div>
         </div>

         {/* CTA */}
         <div className="bg-gray-50 dark:bg-[#151f32] rounded-2xl p-8 text-center border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Không tìm thấy vị trí phù hợp?</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
               Chúng tôi luôn chào đón những nhân tài có đam mê. Hãy gửi CV của bạn về email nhân sự để được lưu vào hồ sơ tiềm năng.
            </p>
            <div className="inline-flex items-center gap-2 text-lg font-bold text-[#38b6ff]">
               <Mail className="w-5 h-5" />
               <a href="mailto:tuyendung@vientamlyungdung.com" className="hover:underline">tuyendung@vientamlyungdung.com</a>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Recruitment;