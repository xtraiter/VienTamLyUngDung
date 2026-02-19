import React from 'react';
import { Handshake, Library, Users, Presentation, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import PartnerMarquee from '../components/PartnerMarquee';
import TextEffect from '../components/TextEffect';

const Partnership: React.FC = () => {
  return (
    <div className="bg-white dark:bg-darkBg min-h-screen pb-20 transition-colors duration-300 font-sans">
      
      {/* 1. Hero */}
      <div className="relative py-16 md:py-24 bg-gradient-to-r from-[#38b6ff] to-blue-600 text-white">
         <div className="container mx-auto px-4 relative z-10 text-center">
             <ScrollReveal>
                <div className="inline-flex items-center px-3 py-1 bg-white/10 rounded-full text-xs font-bold uppercase tracking-widest mb-4 backdrop-blur-sm border border-white/20">
                   <Handshake className="h-3 w-3 mr-2" /> Hợp tác phát triển
                </div>
                <h1 className="font-serif text-3xl md:text-5xl font-bold mb-6 leading-tight">
                  <TextEffect text="Kiến tạo Hệ sinh thái Giáo dục" />
                </h1>
                <p className="text-lg text-blue-100 max-w-3xl mx-auto font-light leading-relaxed">
                   Kết nối nguồn lực nghiên cứu chuyên sâu của Viện với nền tảng học thuật của các trường Đại học và tổ chức giáo dục.
                </p>
                <div className="mt-8 flex justify-center gap-4">
                   <Link to="/lien-he" className="px-6 py-3 bg-white text-[#38b6ff] font-bold rounded hover:bg-gray-50 transition-colors shadow-lg">
                     Đăng ký Hợp tác
                   </Link>
                </div>
             </ScrollReveal>
         </div>
      </div>

      {/* 2. Marquee */}
      <div className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#1a1a1a]">
         <PartnerMarquee />
      </div>

      <div className="container mx-auto px-4 mt-16">
        
        {/* 3. Models */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
           {[
             {
               icon: Library,
               title: "Chuyển giao Giáo trình",
               desc: "Cung cấp hệ thống tài liệu, sách chuyên khảo và công cụ trắc nghiệm tâm lý chuẩn hóa cho thư viện."
             },
             {
               icon: Users,
               title: "Tiếp nhận Thực tập",
               desc: "Môi trường thực tế cho sinh viên ngành Tâm lý học tham gia kiến tập, thực tập và thực hiện khóa luận."
             },
             {
               icon: Presentation,
               title: "Hội thảo & Seminar",
               desc: "Phối hợp tổ chức các buổi báo cáo khoa học, workshop kỹ năng chuyên sâu."
             }
           ].map((item, idx) => (
             <ScrollReveal key={idx} delay={idx * 150} direction="up">
               <div className="bg-white dark:bg-[#1e293b] p-8 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-[#38b6ff] transition-all group h-full">
                 <div className={`w-12 h-12 rounded bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mb-6 text-[#38b6ff] group-hover:bg-[#38b6ff] group-hover:text-white transition-colors`}>
                   <item.icon className="h-6 w-6" />
                 </div>
                 <h3 className="font-serif font-bold text-xl text-gray-900 dark:text-white mb-3">{item.title}</h3>
                 <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">
                   {item.desc}
                 </p>
               </div>
             </ScrollReveal>
           ))}
        </div>

        {/* 4. Workflow & Benefits */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-gray-50 dark:bg-[#151f32] p-8 md:p-12 rounded-2xl border border-gray-200 dark:border-gray-700">
           <ScrollReveal>
              <h2 className="font-serif text-3xl font-bold text-gray-900 dark:text-white mb-6">
                 Tại sao chọn VIỆN TÂM LÝ ỨNG DỤNG?
              </h2>
              <div className="space-y-4">
                 {[
                   "Đội ngũ chuyên gia đầu ngành có học hàm, học vị cao.",
                   "Giáo trình và phương pháp can thiệp cập nhật chuẩn quốc tế.",
                   "Cơ sở vật chất hiện đại phục vụ nghiên cứu và thực hành.",
                   "Mạng lưới kết nối rộng khắp với các tổ chức tâm lý uy tín."
                 ].map((reason, i) => (
                   <div key={i} className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 mr-3 shrink-0" />
                      <p className="text-gray-700 dark:text-gray-300">{reason}</p>
                   </div>
                 ))}
              </div>
              <Link to="/lien-he" className="inline-flex items-center text-[#38b6ff] font-bold mt-8 hover:underline">
                 Liên hệ ngay <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
           </ScrollReveal>

           <ScrollReveal direction="left">
               <div className="relative">
                  <div className="absolute top-0 left-8 right-0 bottom-8 border-2 border-[#38b6ff] rounded-xl"></div>
                  <img src="https://picsum.photos/seed/partner_meeting/600/400" className="rounded-xl shadow-lg relative z-10 w-full" alt="Partner meeting" />
               </div>
           </ScrollReveal>
        </div>
      </div>
    </div>
  );
};

export default Partnership;
