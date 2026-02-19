import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, Clock, ArrowLeft, Share2, Tag } from 'lucide-react';
import { useData } from '../context/DataContext';
import ScrollReveal from '../components/ScrollReveal';

const NewsDetail: React.FC = () => {
  const { id } = useParams();
  const { news } = useData();
  const article = news.find(n => n.id === Number(id));

  // Recommendations
  const relatedNews = news
    .filter(n => n.id !== Number(id) && n.category === article?.category)
    .slice(0, 3);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-darkBg">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Bài viết không tồn tại</h2>
          <Link to="/tin-tuc" className="text-primary hover:underline">Quay lại trang tin tức</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-darkBg min-h-screen pb-20 transition-colors duration-300 font-sans">
      
      {/* 1. Header/Hero Image */}
      <div className="relative h-[400px] md:h-[500px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <img 
          src={article.image} 
          alt={article.title} 
          className="w-full h-full object-cover fixed-bg"
        />
        <div className="absolute bottom-0 left-0 w-full z-20 p-6 md:p-12 bg-gradient-to-t from-black/90 to-transparent">
          <div className="container mx-auto max-w-4xl">
             <Link to="/tin-tuc" className="inline-flex items-center text-white/80 hover:text-white mb-4 text-sm font-medium transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" /> Quay lại danh sách
             </Link>
             <span className="inline-block px-3 py-1 bg-primary text-white text-xs font-bold uppercase rounded mb-3 shadow-lg">
                {article.category}
             </span>
             <h1 className="text-3xl md:text-5xl font-serif font-bold text-white leading-tight mb-4 drop-shadow-md">
                {article.title}
             </h1>
             <div className="flex flex-wrap items-center gap-6 text-white/90 text-sm">
                <div className="flex items-center">
                   <User className="w-4 h-4 mr-2" />
                   <span>{article.author || 'Ban biên tập'}</span>
                </div>
                <div className="flex items-center">
                   <Calendar className="w-4 h-4 mr-2" />
                   <span>{article.date}</span>
                </div>
                <div className="flex items-center">
                   <Clock className="w-4 h-4 mr-2" />
                   <span>5 phút đọc</span>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* 2. Content */}
      <div className="container mx-auto px-4 mt-12 max-w-4xl">
         <div className="flex flex-col lg:flex-row gap-12">
            {/* Main Article */}
            <div className="lg:w-3/4">
               <ScrollReveal>
                  {/* Summary/Lead */}
                  <div className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-serif leading-relaxed italic mb-8 border-l-4 border-primary pl-6">
                     {article.summary}
                  </div>

                  {/* HTML Content Render */}
                  <div 
                    className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-serif prose-headings:font-bold prose-a:text-primary prose-img:rounded-xl"
                    dangerouslySetInnerHTML={{ __html: article.content || '<p>Đang cập nhật nội dung...</p>' }}
                  />

                  {/* Share / Tags */}
                  <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
                     <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-bold text-gray-500">Tags:</span>
                        <div className="flex gap-2">
                           <span className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-1 rounded text-xs">Tâm lý học</span>
                           <span className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-1 rounded text-xs">Giáo dục</span>
                        </div>
                     </div>
                     <button className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors">
                        <Share2 className="w-4 h-4" /> <span className="text-sm font-bold">Chia sẻ bài viết</span>
                     </button>
                  </div>
               </ScrollReveal>
            </div>

            {/* Sidebar / Related */}
            <div className="lg:w-1/4 space-y-8">
               <div className="sticky top-24">
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-800 pb-2">
                     Tin liên quan
                  </h3>
                  <div className="space-y-6">
                     {relatedNews.map((item, idx) => (
                        <Link to={`/tin-tuc/${item.id}`} key={idx} className="block group">
                           <div className="aspect-video rounded-lg overflow-hidden mb-3">
                              <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                           </div>
                           <h4 className="font-bold text-gray-900 dark:text-white text-sm line-clamp-2 group-hover:text-primary transition-colors mb-1">
                              {item.title}
                           </h4>
                           <span className="text-xs text-gray-500">{item.date}</span>
                        </Link>
                     ))}
                  </div>
                  
                  {/* Banner Ad / CTA */}
                  <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 text-center border border-blue-100 dark:border-blue-800">
                     <h4 className="font-bold text-primary mb-2">Đăng ký tư vấn?</h4>
                     <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Liên hệ ngay với chuyên gia của chúng tôi để được hỗ trợ.</p>
                     <Link to="/lien-he" className="inline-block px-4 py-2 bg-primary text-white text-sm font-bold rounded hover:bg-blue-600 transition-colors">
                        Đặt lịch ngay
                     </Link>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default NewsDetail;
