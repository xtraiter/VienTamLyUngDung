import React from 'react';
import { FileText, ArrowRight, User } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import TextEffect from '../components/TextEffect';
import { useData } from '../context/DataContext';
import { Link } from 'react-router-dom';

const Articles: React.FC = () => {
  const { news } = useData();
  
  // Filter research and specialized articles
  const articles = news.filter(n => n.category === 'Nghiên cứu' || n.category === 'Bài viết');

  return (
    <div className="bg-white dark:bg-darkBg min-h-screen pb-20 transition-colors duration-300 font-sans">
      {/* Hero */}
      <div className="relative py-16 md:py-24 bg-gray-900 text-white">
         <div className="container mx-auto px-4 relative z-10 text-center">
            <ScrollReveal>
               <div className="inline-flex items-center justify-center p-2 bg-white/10 backdrop-blur-sm rounded-full mb-4">
                  <FileText className="w-5 h-5 text-white" />
               </div>
               <h1 className="font-serif text-3xl md:text-5xl font-bold mb-4">
                  <TextEffect text="Bài viết Chuyên môn" />
               </h1>
               <p className="text-gray-400 max-w-2xl mx-auto font-light">
                  Tổng hợp các bài viết nghiên cứu, phân tích chuyên sâu từ đội ngũ chuyên gia.
               </p>
            </ScrollReveal>
         </div>
      </div>

      <div className="container mx-auto px-4 mt-16 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.length === 0 ? (
                <div className="col-span-3 text-center py-12 border border-dashed border-gray-300 rounded-lg text-gray-500">Chưa có bài viết chuyên môn nào.</div>
            ) : articles.map((article, idx) => (
                <ScrollReveal key={article.id} delay={idx * 50} direction="up">
                    <div className="group h-full flex flex-col border-b border-gray-200 dark:border-gray-800 pb-8 md:border-0 md:pb-0">
                        <div className="relative aspect-[3/2] overflow-hidden rounded-lg mb-4 bg-gray-100">
                             <img src={article.image} alt={article.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 grayscale group-hover:grayscale-0" />
                        </div>
                        <div className="flex items-center text-xs font-bold text-primary uppercase mb-2 tracking-wider">
                            {article.category}
                        </div>
                        <h3 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-3 leading-tight group-hover:text-primary transition-colors">
                            <Link to={`/tin-tuc/${article.id}`}>{article.title}</Link>
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-4 flex-1">
                            {article.summary}
                        </p>
                        <div className="flex items-center justify-between mt-auto pt-4">
                            <div className="flex items-center text-xs text-gray-500">
                                <User className="w-3 h-3 mr-1" /> Ban biên tập
                            </div>
                            <Link to={`/tin-tuc/${article.id}`} className="text-sm font-bold text-gray-900 dark:text-white hover:text-primary flex items-center">
                                Đọc toàn văn <ArrowRight className="w-4 h-4 ml-1" />
                            </Link>
                        </div>
                    </div>
                </ScrollReveal>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Articles;
