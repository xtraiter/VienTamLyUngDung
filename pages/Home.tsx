import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Calendar, ChevronRight, FileText, Activity, Users, Microscope, Newspaper, Quote, CheckCircle2 } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import PartnerMarquee from '../components/PartnerMarquee';
import { useData } from '../context/DataContext';
import { useLanguage } from '../context/LanguageContext';

const Home: React.FC = () => {
  const { news, products, research, gallery } = useData();
  const { t } = useLanguage();

  // Data processing
  const publishedNews = news.filter(n => n.status === 'published');
  const featuredNews = publishedNews.find(n => n.featured) || publishedNews[0];
  const secondaryNews = publishedNews.filter(n => n.id !== featuredNews?.id).slice(0, 4);
  const researchProjects = research.slice(0, 5);
  const featuredBooks = products.filter(p => p.type === 'textbook' || p.type === 'research').slice(0, 3);

  const SectionHeader = ({ title, link, linkText }: { title: string, link?: string, linkText?: string }) => (
    <div className="flex items-center justify-between border-b-2 border-primary/20 mb-8 pb-3 relative">
      <h2 className="text-xl md:text-2xl font-serif font-bold text-[#0055d4] uppercase relative">
        {title}
        <span className="absolute bottom-[-14px] left-0 w-1/3 h-[3px] bg-primary"></span>
      </h2>
      {link && (
        <Link to={link} className="text-sm font-medium text-gray-500 hover:text-primary flex items-center transition-colors">
          {linkText || t('btn.view_all')} <ChevronRight className="w-4 h-4 ml-1" />
        </Link>
      )}
    </div>
  );

  return (
    <div className="bg-white dark:bg-[#121212] font-sans transition-colors duration-300">
      
      {/* 1. NEW HERO SECTION: BRANDING & INTRO */}
      <section className="relative pt-20 pb-20 bg-white dark:bg-[#0f172a] overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 bg-[radial-gradient(#38b6ff_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.05] pointer-events-none"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-100/50 dark:bg-blue-900/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

        <div className="container mx-auto px-4 relative z-10">
           <ScrollReveal>
              <div className="text-center max-w-5xl mx-auto">
                 {/* Main Title - Highlighted */}
                 <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-[#38b6ff] to-blue-700 drop-shadow-sm">
                       VIỆN TÂM LÝ ỨNG DỤNG
                    </span>
                 </h1>
                 
                 {/* Decorative Divider */}
                 <div className="flex items-center justify-center gap-4 mb-8">
                    <div className="h-px w-16 bg-gray-300 dark:bg-gray-700"></div>
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <div className="h-px w-16 bg-gray-300 dark:bg-gray-700"></div>
                 </div>

                 {/* Description */}
                 <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-4xl mx-auto font-light">
                    {t('about.desc')} Viện hướng tới mục tiêu trở thành trung tâm hàng đầu về nghiên cứu, đào tạo và cung cấp dịch vụ tâm lý uy tín, chất lượng cao tại Việt Nam.
                 </p>
              </div>
           </ScrollReveal>
        </div>
      </section>

      {/* 2. FEATURED NEWS (Moved Down) */}
      <section className="bg-white dark:bg-[#121212] py-16 border-t border-gray-100 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <SectionHeader title="Tin tức & Sự kiện Nổi bật" link="/tin-tuc" />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Featured Article (Left - 2 cols) */}
            <div className="lg:col-span-2">
              {featuredNews ? (
                <ScrollReveal direction="right">
                    <div className="group relative h-full min-h-[450px] rounded-2xl overflow-hidden block shadow-md border border-gray-200 dark:border-gray-700">
                    <Link to={`/tin-tuc/${featuredNews.id}`} className="block h-full">
                        <div className="absolute inset-0">
                        <img 
                            src={featuredNews.image} 
                            alt={featuredNews.title} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-8">
                        <span className="inline-block px-3 py-1 mb-3 text-xs font-bold text-white bg-primary rounded uppercase tracking-wider shadow-sm">
                            {featuredNews.category}
                        </span>
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-white leading-tight mb-4 group-hover:text-blue-200 transition-colors">
                            {featuredNews.title}
                        </h2>
                        <div className="flex items-center text-gray-300 text-sm space-x-4">
                            <span className="flex items-center"><Calendar className="w-4 h-4 mr-1.5" /> {featuredNews.date}</span>
                            <span className="hidden md:inline-block border-l border-gray-500 pl-4 text-gray-200">{featuredNews.summary.substring(0, 120)}...</span>
                        </div>
                        </div>
                    </Link>
                    </div>
                </ScrollReveal>
              ) : (
                <div className="h-[400px] bg-gray-200 flex items-center justify-center text-gray-500 rounded-2xl">Đang cập nhật tin tức...</div>
              )}
            </div>

            {/* Secondary News List (Right - 1 col) */}
            <div className="lg:col-span-1 flex flex-col h-full">
              <ScrollReveal direction="left" delay={200} className="h-full">
                  <div className="bg-gray-50 dark:bg-[#1e293b] rounded-2xl border border-gray-200 dark:border-gray-700 p-6 h-full flex flex-col">
                    <h3 className="font-serif font-bold text-lg text-gray-900 dark:text-white uppercase mb-4 pb-2 border-b border-gray-200 dark:border-gray-700 flex items-center">
                        <Newspaper className="w-5 h-5 mr-2 text-primary" /> Mới cập nhật
                    </h3>
                    <div className="flex flex-col gap-5 flex-1 overflow-y-auto custom-scrollbar pr-2">
                        {secondaryNews.map((item) => (
                        <Link to={`/tin-tuc/${item.id}`} key={item.id} className="group flex gap-4 items-start">
                            <div className="w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-gray-200">
                                <img src={item.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-800 dark:text-gray-200 text-sm mb-1 leading-snug group-hover:text-primary transition-colors line-clamp-2">
                                    {item.title}
                                </h4>
                                <div className="flex items-center mt-2">
                                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                                        {item.date}
                                    </span>
                                </div>
                            </div>
                        </Link>
                        ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 text-center">
                        <Link to="/tin-tuc" className="text-sm font-bold text-primary hover:underline flex items-center justify-center">
                            Xem tất cả tin tức <ArrowRight className="w-4 h-4 ml-1" />
                        </Link>
                    </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MAIN CONTENT: RESEARCH & PUBLICATIONS */}
      <section className="py-16 bg-gray-50 dark:bg-[#0f172a] border-t border-gray-200 dark:border-gray-800">
         <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
               
               {/* Left Column: Research (75%) */}
               <div className="lg:col-span-3">
                  <SectionHeader title={t('nav.research.topics')} link="/nghien-cuu" />
                  
                  <div className="space-y-6">
                     {researchProjects.map((project, idx) => (
                        <ScrollReveal key={project.id} delay={idx * 50} direction="up">
                           <div className="flex flex-col md:flex-row gap-6 group cursor-pointer bg-white dark:bg-[#1e293b] p-5 rounded-xl border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all">
                              <Link to="/nghien-cuu" className="md:w-56 h-36 shrink-0 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-600">
                                 {project.image ? (
                                    <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                 ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                       <Microscope className="w-8 h-8" />
                                    </div>
                                 )}
                              </Link>
                              <div className="flex-1">
                                 <div className="flex items-center gap-2 mb-2">
                                     <span className="text-[10px] font-bold text-primary border border-primary/30 px-2 py-0.5 rounded uppercase bg-blue-50 dark:bg-blue-900/20">
                                        {project.category}
                                     </span>
                                     <span className="text-xs text-gray-500 font-medium">{project.year}</span>
                                 </div>
                                 <h3 className="text-lg font-serif font-bold text-gray-900 dark:text-white mb-2 group-hover:text-[#0055d4] transition-colors leading-tight">
                                    <Link to="/nghien-cuu">{project.title}</Link>
                                 </h3>
                                 <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3 leading-relaxed">
                                    {project.summary}
                                 </p>
                                 <div className="flex items-center text-xs text-gray-500 font-medium">
                                    <span className="mr-4 flex items-center"><Users className="w-3 h-3 mr-1" /> {project.leader}</span>
                                    {project.status === 'completed' && (
                                       <span className="flex items-center text-green-600"><CheckCircle2 className="w-3 h-3 mr-1" /> Đã nghiệm thu</span>
                                    )}
                                 </div>
                              </div>
                           </div>
                        </ScrollReveal>
                     ))}
                  </div>
               </div>

               {/* Right Column: Publications Sidebar (25%) */}
               <div className="lg:col-span-1">
                   <SectionHeader title="Ấn phẩm mới" link="/san-pham" />
                   
                   <div className="bg-white dark:bg-[#1e293b] rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
                      <div className="space-y-6">
                         {featuredBooks.map((book) => (
                            <Link to={`/san-pham/${book.id}`} key={book.id} className="flex gap-4 group">
                               <div className="w-16 h-24 shrink-0 bg-gray-100 shadow-sm rounded-sm overflow-hidden border border-gray-200">
                                  <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                               </div>
                               <div>
                                  <h4 className="text-sm font-bold text-gray-900 dark:text-white leading-snug mb-1 group-hover:text-primary transition-colors line-clamp-3">
                                     {book.title}
                                  </h4>
                                  <span className="text-[10px] text-gray-500 uppercase block mb-2">{book.type === 'research' ? 'Chuyên khảo' : 'Giáo trình'}</span>
                                  <span className="text-xs text-primary font-bold flex items-center group-hover:underline">
                                     Chi tiết <ChevronRight className="w-3 h-3 ml-1" />
                                  </span>
                               </div>
                            </Link>
                         ))}
                      </div>
                      <Link to="/san-pham" className="block w-full py-2.5 mt-6 text-center text-xs font-bold uppercase border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300">
                         Xem thư viện sách
                      </Link>
                   </div>

                   {/* Quick Links Widget */}
                   <div className="mt-8">
                      <h3 className="font-serif font-bold text-gray-900 dark:text-white uppercase text-sm mb-4 border-l-4 border-primary pl-3">Liên kết nhanh</h3>
                      <ul className="space-y-2">
                         {[
                            { label: "Tuyển sinh đào tạo", link: "/dao-tao" },
                            { label: "Hợp tác quốc tế", link: "/hop-tac" },
                            { label: "Hội đồng khoa học", link: "/hoi-dong" },
                            { label: "Thư viện ảnh", link: "/thu-vien" },
                         ].map((item, i) => (
                            <li key={i}>
                               <Link to={item.link} className="flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-primary hover:pl-1 transition-all py-1.5 border-b border-gray-100 dark:border-gray-800">
                                  <ChevronRight className="w-3 h-3 mr-2 text-primary" /> {item.label}
                               </Link>
                            </li>
                         ))}
                      </ul>
                   </div>
               </div>

            </div>
         </div>
      </section>

      {/* 4. FIELDS OF ACTIVITY (Clean Grid) */}
      <section className="py-16 bg-white dark:bg-[#121212] border-t border-gray-100 dark:border-gray-800">
         <div className="container mx-auto px-4">
             <div className="text-center mb-10">
                <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white uppercase">Lĩnh vực hoạt động</h2>
                <div className="w-12 h-1 bg-primary mx-auto mt-2 rounded-full"></div>
             </div>

             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { icon: Microscope, title: "Nghiên cứu", desc: "Thực hiện đề tài khoa học các cấp" },
                  { icon: Users, title: "Đào tạo", desc: "Tập huấn chuyên môn & kỹ năng" },
                  { icon: Activity, title: "Trị liệu", desc: "Tham vấn & Can thiệp lâm sàng" },
                  { icon: BookOpen, title: "Xuất bản", desc: "Sách, giáo trình & công cụ" },
                ].map((field, i) => (
                   <ScrollReveal key={i} delay={i * 100} direction="up">
                      <div className="bg-gray-50 dark:bg-[#1e293b] p-6 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-primary hover:shadow-lg transition-all text-center h-full group">
                         <div className="w-14 h-14 bg-white dark:bg-gray-700 shadow-sm rounded-full flex items-center justify-center mx-auto mb-4 text-[#0055d4] group-hover:bg-[#0055d4] group-hover:text-white transition-all duration-300 transform group-hover:-translate-y-1">
                            <field.icon className="w-7 h-7" />
                         </div>
                         <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-lg">{field.title}</h3>
                         <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{field.desc}</p>
                      </div>
                   </ScrollReveal>
                ))}
             </div>
         </div>
      </section>

      {/* 5. GALLERY STRIP */}
      {gallery.length > 0 && (
         <section className="bg-white dark:bg-[#121212] py-8">
            <div className="container mx-auto px-4">
               <SectionHeader title="Hình ảnh hoạt động" link="/thu-vien" />
               <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {gallery.slice(0, 6).map((img) => (
                     <div key={img.id} className="relative aspect-square group overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 cursor-pointer">
                        <img src={img.url} alt={img.caption} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2 text-center">
                           <span className="text-white text-xs font-bold uppercase tracking-wide">{img.caption}</span>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </section>
      )}

      {/* 6. PARTNERS */}
      <section className="bg-gray-50 dark:bg-[#0f172a] border-t border-gray-200 dark:border-gray-800">
         <PartnerMarquee />
      </section>

    </div>
  );
};

export default Home;
