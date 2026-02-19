import React from 'react';
import { Newspaper } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import TextEffect from '../components/TextEffect';
import { useData } from '../context/DataContext';
import { Link } from 'react-router-dom';

const Activities: React.FC = () => {
  const { news } = useData();
  
  // Filter general activities/news
  const activities = news.filter(n => n.category === 'Thông báo' || n.category === 'Tin tức' || n.category === 'Hợp tác');

  return (
    <div className="bg-white dark:bg-darkBg min-h-screen pb-20 transition-colors duration-300 font-sans">
      {/* Hero */}
      <div className="relative py-16 md:py-24 bg-gradient-to-r from-orange-500 to-red-500 text-white">
         <div className="container mx-auto px-4 relative z-10 text-center">
            <ScrollReveal>
               <div className="inline-flex items-center justify-center p-2 bg-white/20 backdrop-blur-sm rounded-full mb-4">
                  <Newspaper className="w-5 h-5 text-white" />
               </div>
               <h1 className="font-serif text-3xl md:text-5xl font-bold mb-4">
                  <TextEffect text="Tin tức & Hoạt động" />
               </h1>
               <p className="text-orange-100 max-w-2xl mx-auto font-light">
                  Cập nhật liên tục các hoạt động, thông báo mới nhất từ Viện Tâm lý Ứng dụng.
               </p>
            </ScrollReveal>
         </div>
      </div>

      <div className="container mx-auto px-4 mt-12 max-w-4xl">
         {activities.length === 0 ? (
             <div className="text-center py-20 text-gray-500">Chưa có tin hoạt động nào.</div>
         ) : (
             <div className="space-y-6">
                {activities.map((item, idx) => (
                    <ScrollReveal key={item.id} delay={idx * 100} direction="up">
                        <Link to={`/tin-tuc/${item.id}`} className="block bg-white dark:bg-[#1e293b] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:border-orange-200 dark:hover:border-orange-900 transition-all group">
                             <div className="flex flex-col md:flex-row gap-6">
                                <div className="w-full md:w-48 h-32 rounded-lg overflow-hidden shrink-0">
                                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs font-bold text-orange-500 uppercase">{item.category}</span>
                                        <span className="text-xs text-gray-400">{item.date}</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-orange-500 transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                                        {item.summary}
                                    </p>
                                </div>
                             </div>
                        </Link>
                    </ScrollReveal>
                ))}
             </div>
         )}
      </div>
    </div>
  );
};

export default Activities;
