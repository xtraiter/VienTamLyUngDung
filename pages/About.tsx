import React from 'react';
import { Target, Scale, CheckCircle2, FileText, Download, Building2, Microscope, Users, GraduationCap, ClipboardCheck, Globe, Heart, ShieldCheck, Sparkles, Brain, Star } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import TextEffect from '../components/TextEffect';
import { useData } from '../context/DataContext';

const About: React.FC = () => {
  const { gallery } = useData();

  return (
    <div className="bg-white dark:bg-darkBg min-h-screen pb-20 transition-colors duration-300 font-sans">
      
      {/* 1. HERO BANNER */}
      <div className="relative py-16 md:py-24 bg-gradient-to-r from-[#38b6ff] to-blue-600 text-white">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
         <div className="container mx-auto px-4 relative z-10 text-center">
            <ScrollReveal>
               <span className="inline-block px-3 py-1 bg-white/10 border border-white/20 rounded-full text-xs font-bold uppercase tracking-widest mb-4 backdrop-blur-sm">
                  Giới thiệu chung
               </span>
               <h1 className="font-serif text-3xl md:text-5xl font-bold mb-6">
                  VIỆN TÂM LÝ ỨNG DỤNG
               </h1>
               <p className="text-xl md:text-2xl font-light text-blue-100 mb-8 max-w-3xl mx-auto">
                  The Institute of Applied Psychology – IAP
               </p>
               <div className="max-w-4xl mx-auto text-blue-50 text-base md:text-lg leading-relaxed text-justify md:text-center font-light">
                  <p className="mb-4">
                     Tổ chức khoa học và công nghệ hoạt động chuyên sâu trong lĩnh vực tâm lý học, được thành lập và hoạt động theo đúng quy định của pháp luật Việt Nam.
                  </p>
                  <p>
                     Được <strong>Bộ Khoa học và Công nghệ</strong> cấp phép triển khai các hoạt động nghiên cứu, ứng dụng, đào tạo và dịch vụ khoa học.
                  </p>
               </div>
            </ScrollReveal>
         </div>
      </div>

      <div className="container mx-auto px-4 mt-16 space-y-20">

        {/* 2. MISSION & VISION */}
        <section>
           <ScrollReveal>
              <div className="bg-white dark:bg-[#1e293b] border-l-4 border-primary shadow-sm rounded-r-xl p-8 md:p-12">
                  <div className="flex flex-col md:flex-row gap-8 items-start">
                      <div className="shrink-0">
                          <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center text-primary">
                              <Target className="w-8 h-8" />
                          </div>
                      </div>
                      <div>
                          <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 dark:text-white mb-4">
                             Sứ mệnh và Định hướng
                          </h2>
                          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed text-justify">
                             Viện Tâm lý Ứng dụng hướng tới việc nghiên cứu, ứng dụng và chuyển giao các thành tựu của khoa học tâm lý vào thực tiễn đời sống, góp phần nâng cao sức khỏe tinh thần, chất lượng cuộc sống cho cá nhân, gia đình và cộng đồng. Viện chú trọng kết hợp chặt chẽ giữa nghiên cứu khoa học, ứng dụng thực tiễn và đào tạo chuyên môn.
                          </p>
                      </div>
                  </div>
              </div>
           </ScrollReveal>
        </section>

        {/* 3. FIELDS OF ACTIVITY */}
        <section>
            <ScrollReveal>
               <div className="text-center mb-12">
                  <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white uppercase mb-3">Lĩnh vực Chuyên môn</h2>
                  <div className="h-1 w-20 bg-primary mx-auto"></div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { icon: Microscope, title: "Nghiên cứu Khoa học", desc: "Nghiên cứu cơ bản và ứng dụng trong tâm lý học và các lĩnh vực liên ngành." },
                    { icon: Heart, title: "Tư vấn & Can thiệp", desc: "Tham vấn, trị liệu tâm lý cho cá nhân, gia đình và cộng đồng." },
                    { icon: GraduationCap, title: "Đào tạo & Bồi dưỡng", desc: "Nâng cao trình độ chuyên môn, kỹ năng thực hành tâm lý." },
                    { icon: ClipboardCheck, title: "Đánh giá & Sàng lọc", desc: "Sàng lọc, chẩn đoán sớm các rối loạn phát triển (ASD, ADHD...).", highlight: true },
                    { icon: Globe, title: "Hợp tác Quốc tế", desc: "Chuyển giao công nghệ, hợp tác khoa học đa phương." },
                    { icon: Building2, title: "Tư vấn Tổ chức", desc: "Xây dựng văn hóa doanh nghiệp và chăm sóc sức khỏe tinh thần nhân sự." }
                  ].map((item, idx) => (
                      <div key={idx} className={`p-8 rounded-lg border transition-all duration-300 hover:shadow-lg group bg-white dark:bg-[#1e293b] ${item.highlight ? 'border-primary ring-1 ring-primary' : 'border-gray-200 dark:border-gray-800'}`}>
                         <div className={`w-12 h-12 rounded bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mb-4 text-primary group-hover:bg-primary group-hover:text-white transition-colors`}>
                            <item.icon className="w-6 h-6" />
                         </div>
                         <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                         <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed text-justify">
                            {item.desc}
                         </p>
                      </div>
                  ))}
               </div>
            </ScrollReveal>
        </section>

        {/* 4. ORGANIZATION & LEGAL */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Organization */}
            <ScrollReveal direction="right">
               <div className="bg-gray-50 dark:bg-[#151f32] rounded-xl p-8 border border-gray-200 dark:border-gray-700 h-full">
                  <div className="flex items-center gap-3 mb-6">
                     <Building2 className="w-6 h-6 text-primary" />
                     <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white">Cơ cấu Tổ chức</h2>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-justify mb-6">
                     Cơ cấu tổ chức của Viện bao gồm: <strong>Hội đồng Viện, Ban Lãnh đạo, Hội đồng Khoa học và các Phòng/Ban chuyên môn</strong>. Hệ thống quản trị được xây dựng theo hướng chuyên nghiệp, tinh gọn và hiệu quả.
                  </p>
                  <div className="p-4 bg-white dark:bg-[#1e293b] rounded border-l-4 border-gray-400 dark:border-gray-600">
                     <p className="text-sm italic text-gray-600 dark:text-gray-400">
                        "Minh bạch - Khoa học - Nhân văn là giá trị cốt lõi trong mọi hoạt động."
                     </p>
                  </div>
               </div>
            </ScrollReveal>

            {/* Legal */}
            <ScrollReveal direction="left">
               <div className="bg-white dark:bg-[#1e293b] rounded-xl p-8 border border-gray-200 dark:border-gray-700 h-full shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                     <Scale className="w-6 h-6 text-primary" />
                     <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white">Cơ sở Pháp lý</h2>
                  </div>
                  <ul className="space-y-4">
                     <li className="flex items-start gap-3 p-3 rounded hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">Trực thuộc <strong>Liên hiệp Khoa học Kinh tế - Đô thị Nam Bộ</strong>.</span>
                     </li>
                     <li className="flex items-start gap-3 p-3 rounded hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">Hoạt động theo <strong>Luật Khoa học và Công nghệ</strong>.</span>
                     </li>
                     <li className="flex items-start gap-3 p-3 rounded hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <FileText className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                        <div className="flex-1">
                           <span className="text-sm font-bold text-gray-900 dark:text-white block">Quyết định thành lập & Giấy phép hoạt động KHCN</span>
                           <a href="#" className="text-xs text-primary hover:underline flex items-center mt-1">
                              <Download className="w-3 h-3 mr-1" /> Tải về hồ sơ pháp lý
                           </a>
                        </div>
                     </li>
                  </ul>
               </div>
            </ScrollReveal>
        </section>

        {/* 5. GALLERY */}
        <section className="pb-12">
           <ScrollReveal>
              <div className="mb-8 border-b border-gray-200 dark:border-gray-700 pb-4">
                 <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white uppercase">Hình ảnh Hoạt động</h2>
              </div>

              {gallery.length > 0 ? (
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {gallery.map((img, i) => (
                       <div key={img.id} className="relative group overflow-hidden rounded bg-gray-100 dark:bg-gray-800 aspect-square">
                          <img src={img.url} alt={img.caption} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2 text-center">
                             <span className="text-white text-xs font-bold">{img.caption}</span>
                          </div>
                       </div>
                    ))}
                 </div>
              ) : (
                  <div className="p-8 text-center text-gray-500 border border-dashed border-gray-300 rounded">Chưa có hình ảnh.</div>
              )}
           </ScrollReveal>
        </section>

      </div>
    </div>
  );
};

export default About;
