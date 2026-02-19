import React from 'react';
import { CalendarDays, MapPin, Clock, ArrowRight } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import TextEffect from '../components/TextEffect';
import { useData } from '../context/DataContext';
import { Link } from 'react-router-dom';

const Events: React.FC = () => {
  const { news } = useData();
  
  // Filter events
  const events = news.filter(n => n.category === 'Sự kiện');

  return (
    <div className="bg-white dark:bg-darkBg min-h-screen pb-20 transition-colors duration-300 font-sans">
      {/* Hero */}
      <div className="relative py-16 md:py-24 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
         <div className="container mx-auto px-4 relative z-10 text-center">
            <ScrollReveal>
               <div className="inline-flex items-center justify-center p-2 bg-white/20 backdrop-blur-sm rounded-full mb-4">
                  <CalendarDays className="w-5 h-5 text-white" />
               </div>
               <h1 className="font-serif text-3xl md:text-5xl font-bold mb-4">
                  <TextEffect text="Sự kiện & Hội thảo" />
               </h1>
               <p className="text-purple-100 max-w-2xl mx-auto font-light">
                  Các hội nghị khoa học, tọa đàm và hoạt động chuyên môn nổi bật.
               </p>
            </ScrollReveal>
         </div>
      </div>

      <div className="container mx-auto px-4 mt-12 max-w-5xl">
         {events.length === 0 ? (
             <div className="text-center py-20 text-gray-500">Chưa có sự kiện nào được cập nhật.</div>
         ) : (
             <div className="space-y-8">
                {events.map((event, idx) => (
                    <ScrollReveal key={event.id} delay={idx * 100} direction="up">
                        <div className="bg-white dark:bg-[#1e293b] rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col md:flex-row hover:shadow-md transition-all group">
                            <div className="md:w-1/3 relative overflow-hidden">
                                <img src={event.image} alt={event.title} className="w-full h-full object-cover min-h-[200px] transition-transform duration-700 group-hover:scale-105" />
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded text-center min-w-[60px] shadow-sm">
                                    <span className="block text-xs font-bold text-gray-500 uppercase">{new Date(event.date).toLocaleString('default', { month: 'short' })}</span>
                                    <span className="block text-2xl font-bold text-purple-600">{new Date(event.date).getDate()}</span>
                                </div>
                            </div>
                            <div className="p-6 md:p-8 flex-1 flex flex-col justify-center">
                                <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                                    <span className="flex items-center"><Clock className="w-4 h-4 mr-1" /> 08:00 - 17:00</span>
                                    <span className="flex items-center"><MapPin className="w-4 h-4 mr-1" /> Hội trường A</span>
                                </div>
                                <h3 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-3 group-hover:text-purple-500 transition-colors">
                                    <Link to={`/tin-tuc/${event.id}`}>{event.title}</Link>
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-2">
                                    {event.summary}
                                </p>
                                <Link to={`/tin-tuc/${event.id}`} className="inline-flex items-center font-bold text-purple-600 hover:underline">
                                    Xem chi tiết <ArrowRight className="w-4 h-4 ml-1" />
                                </Link>
                            </div>
                        </div>
                    </ScrollReveal>
                ))}
             </div>
         )}
      </div>
    </div>
  );
};

export default Events;
