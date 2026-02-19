import React from 'react';
import { BookOpen, MessageCircle, Star } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import TextEffect from '../components/TextEffect';
import { useData } from '../context/DataContext';
import { Link } from 'react-router-dom';

const Books: React.FC = () => {
  const { products } = useData();
  
  // Filter only books and research materials
  const books = products.filter(p => p.type === 'textbook' || p.type === 'research');

  return (
    <div className="bg-white dark:bg-darkBg min-h-screen pb-20 transition-colors duration-300 font-sans">
      {/* Hero */}
      <div className="relative py-16 md:py-24 bg-gradient-to-r from-[#38b6ff] to-blue-600 text-white">
         <div className="container mx-auto px-4 relative z-10 text-center">
            <ScrollReveal>
               <div className="inline-flex items-center justify-center p-2 bg-white/20 backdrop-blur-sm rounded-full mb-4">
                  <BookOpen className="w-5 h-5 text-white" />
               </div>
               <h1 className="font-serif text-3xl md:text-5xl font-bold mb-4">
                  <TextEffect text="Thư viện Sách & Giáo trình" />
               </h1>
               <p className="text-blue-100 max-w-2xl mx-auto font-light">
                  Các ấn phẩm chuyên khảo, giáo trình và tài liệu nghiên cứu tâm lý học mới nhất.
               </p>
            </ScrollReveal>
         </div>
      </div>

      <div className="container mx-auto px-4 mt-12">
        {books.length === 0 ? (
             <div className="text-center py-20 text-gray-500 border border-dashed border-gray-300 rounded-lg">
                 Hiện chưa có sách nào trong thư viện.
             </div>
         ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {books.map((book, index) => (
                <ScrollReveal key={book.id} delay={index * 50} direction="up">
                    <div className="group flex flex-col h-full bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-all duration-300 overflow-hidden">
                        <Link to={`/san-pham/${book.id}`} className="relative aspect-[3/4] overflow-hidden bg-gray-100 dark:bg-black/20 block">
                            <img 
                              src={book.coverImage} 
                              alt={book.title} 
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                            />
                            {book.status === 'unavailable' && (
                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-xs font-bold uppercase">Tạm hết</div>
                            )}
                            <div className="absolute top-3 left-3">
                                <span className={`px-2 py-1 text-[10px] font-bold uppercase rounded shadow-sm ${book.type === 'research' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                                    {book.type === 'research' ? 'Chuyên khảo' : 'Giáo trình'}
                                </span>
                            </div>
                        </Link>

                        <div className="p-6 flex-1 flex flex-col">
                            <h3 className="font-serif font-bold text-gray-900 dark:text-white text-lg mb-2 line-clamp-2 group-hover:text-[#38b6ff] transition-colors leading-tight">
                                <Link to={`/san-pham/${book.id}`}>{book.title}</Link>
                            </h3>
                            <div className="flex items-center gap-1 mb-3">
                                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-3 leading-relaxed flex-1">
                               {book.description}
                            </p>
                            
                            <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                                <Link 
                                    to={`/san-pham/${book.id}`}
                                    className="w-full py-2.5 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-bold hover:bg-[#38b6ff] hover:text-white transition-colors flex items-center justify-center gap-2"
                                >
                                    <BookOpen className="w-4 h-4" /> Xem chi tiết
                                </Link>
                            </div>
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

export default Books;
