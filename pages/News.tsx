import React, { useState, useEffect } from 'react';
import { Calendar, ArrowRight, Search, Clock, ChevronRight } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import TextEffect from '../components/TextEffect';
import { Link, useSearchParams } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useLanguage } from '../context/LanguageContext';

const News: React.FC = () => {
  const { news } = useData();
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'Tất cả';
  
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchTerm, setSearchTerm] = useState('');
  
  const categories = ['Tất cả', 'Sự kiện', 'Đào tạo', 'Hợp tác', 'Nghiên cứu', 'Thông báo'];

  // Update category when URL changes
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category');
    if (categoryFromUrl) {
      setActiveCategory(categoryFromUrl);
    }
  }, [searchParams]);

  const publishedNews = news.filter(n => n.status === 'published');
  
  // Filter logic
  let filteredNews = publishedNews.filter(n => {
      const matchesCategory = activeCategory === 'Tất cả' || n.category === activeCategory;
      const matchesSearch = n.title.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
  });

  // Separate featured news for the hero section (only if "Tất cả" is selected and no search)
  const showFeatured = activeCategory === 'Tất cả' && !searchTerm;
  const featuredArticle = showFeatured ? filteredNews.find(n => n.featured) || filteredNews[0] : null;
  const listArticles = showFeatured ? filteredNews.filter(n => n.id !== featuredArticle?.id) : filteredNews;

  return (
    <div className="bg-gray-50 dark:bg-darkBg min-h-screen pb-20 transition-colors duration-300 font-sans">
      
      {/* 1. Modern Page Header */}
      <div className="relative py-20 md:py-28 bg-[#0f172a] text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#38b6ff]/20 to-blue-900/40 opacity-50"></div>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <ScrollReveal>
            <span className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-xs font-bold uppercase tracking-wider mb-4 text-blue-200">
               News & Updates
            </span>
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6">
              <TextEffect text={t('nav.news')} />
            </h1>
            <p className="text-blue-100 max-w-2xl mx-auto text-lg font-light leading-relaxed">
              Cập nhật những thông tin mới nhất về hoạt động nghiên cứu, đào tạo và sự kiện tại Viện Tâm lý Ứng dụng.
            </p>
          </ScrollReveal>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-10 relative z-20">
        {/* 2. Featured Article (Hero Card) */}
        {featuredArticle && (
          <ScrollReveal className="mb-16">
            <Link to={`/tin-tuc/${featuredArticle.id}`} className="block group">
              <div className="bg-white dark:bg-[#1e293b] rounded-3xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-800 grid grid-cols-1 lg:grid-cols-2">
                 <div className="relative h-64 lg:h-auto overflow-hidden">
                    <img 
                      src={featuredArticle.image} 
                      alt={featuredArticle.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                       <span className="bg-primary text-white text-xs font-bold px-3 py-1.5 rounded uppercase tracking-wide shadow-md">
                          {t('news.featured')}
                       </span>
                    </div>
                 </div>
                 <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4 space-x-4">
                       <span className="font-bold text-primary uppercase tracking-wide text-xs">{featuredArticle.category}</span>
                       <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                       <span className="flex items-center"><Calendar className="w-4 h-4 mr-1.5" /> {featuredArticle.date}</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-gray-900 dark:text-white mb-4 leading-tight group-hover:text-primary transition-colors">
                       {featuredArticle.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg mb-8 line-clamp-3 leading-relaxed">
                       {featuredArticle.summary}
                    </p>
                    <div className="flex items-center text-primary font-bold group-hover:underline">
                       {t('news.read_more')} <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                    </div>
                 </div>
              </div>
            </Link>
          </ScrollReveal>
        )}

        <div className="flex flex-col lg:flex-row gap-12">
           {/* 3. Sidebar (Categories & Search) */}
           <div className="lg:w-1/4 shrink-0 space-y-8">
              {/* Search Widget */}
              <div className="bg-white dark:bg-[#1e293b] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4 flex items-center">
                     <Search className="w-5 h-5 mr-2 text-primary" /> Tìm kiếm
                  </h3>
                  <div className="relative">
                     <input 
                       type="text" 
                       placeholder={t('news.search')} 
                       className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm" 
                       value={searchTerm}
                       onChange={(e) => setSearchTerm(e.target.value)}
                     />
                     <Search className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                  </div>
              </div>

              {/* Categories Widget */}
              <div className="bg-white dark:bg-[#1e293b] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 sticky top-24">
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4 border-b border-gray-100 dark:border-gray-700 pb-2">
                     {t('news.categories')}
                  </h3>
                  <nav className="space-y-1">
                    {categories.map((cat, idx) => (
                      <button
                        key={idx}
                        onClick={() => { setActiveCategory(cat); setSearchTerm(''); }} // Clear search when changing category
                        className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center justify-between group ${
                          activeCategory === cat
                            ? 'bg-primary text-white shadow-md shadow-primary/20'
                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-primary'
                        }`}
                      >
                        <span>{cat}</span>
                        {activeCategory === cat && <ChevronRight className="w-4 h-4" />}
                      </button>
                    ))}
                  </nav>
              </div>
           </div>

           {/* 4. Main Content (Article Grid) */}
           <div className="lg:w-3/4">
              <div className="flex items-center justify-between mb-8">
                 <h3 className="text-2xl font-serif font-bold text-gray-900 dark:text-white">
                    {activeCategory === 'Tất cả' ? t('news.latest') : activeCategory}
                 </h3>
                 <span className="text-sm text-gray-500 font-medium">
                    {listArticles.length} bài viết
                 </span>
              </div>

              {listArticles.length === 0 ? (
                  <div className="text-center py-20 bg-white dark:bg-[#1e293b] rounded-2xl border border-dashed border-gray-200 dark:border-gray-700">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
                         <Search className="w-8 h-8 text-gray-400" />
                      </div>
                      <p className="text-gray-500 dark:text-gray-400 font-medium">{t('news.no_result')}</p>
                      <button 
                        onClick={() => {setActiveCategory('Tất cả'); setSearchTerm('')}}
                        className="mt-4 text-primary font-bold hover:underline"
                      >
                         Xem tất cả bài viết
                      </button>
                  </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {listArticles.map((item, idx) => (
                    <ScrollReveal key={item.id} delay={idx * 50} direction="up">
                      <Link to={`/tin-tuc/${item.id}`} className="group flex flex-col h-full bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 dark:border-gray-800 overflow-hidden">
                        <div className="relative aspect-video overflow-hidden">
                           <img 
                             src={item.image} 
                             alt={item.title} 
                             className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                           />
                           <div className="absolute top-3 left-3">
                              <span className="bg-white/90 dark:bg-black/80 backdrop-blur-sm text-gray-800 dark:text-gray-200 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider shadow-sm">
                                 {item.category}
                              </span>
                           </div>
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                           <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-3 space-x-2">
                              <Calendar className="w-3.5 h-3.5" />
                              <span>{item.date}</span>
                           </div>
                           <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                              {item.title}
                           </h3>
                           <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-4 flex-1">
                              {item.summary}
                           </p>
                           <div className="pt-4 border-t border-gray-100 dark:border-gray-800 mt-auto flex items-center text-sm font-bold text-primary group-hover:translate-x-1 transition-transform origin-left">
                              {t('news.read_more')} <ArrowRight className="w-4 h-4 ml-1" />
                           </div>
                        </div>
                      </Link>
                    </ScrollReveal>
                  ))}
                </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
};

export default News;
