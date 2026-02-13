import React, { useState, useEffect } from 'react';
import { Search, BookOpen, MessageCircle } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import TextEffect from '../components/TextEffect';
import { useData } from '../context/DataContext';
import { Link, useSearchParams } from 'react-router-dom';

const Products: React.FC = () => {
  const { products } = useData();
  const [searchParams] = useSearchParams();
  const [filterType, setFilterType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Update filter when URL changes
  useEffect(() => {
    const typeFromUrl = searchParams.get('type');
    if (typeFromUrl) {
      setFilterType(typeFromUrl);
    }
  }, [searchParams]);

  const filteredProducts = products.filter(product => {
    let matchesType = true;
    if (filterType === 'all') {
      matchesType = true;
    } else if (filterType === 'book') {
       matchesType = product.type === 'textbook' || product.type === 'research';
    } else {
       matchesType = product.type === filterType;
    }

    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="bg-white dark:bg-darkBg min-h-screen pb-20 transition-colors duration-300 font-sans">
      {/* Hero */}
      <div className="relative py-16 md:py-24 bg-gradient-to-r from-[#38b6ff] to-blue-600 text-white">
         <div className="container mx-auto px-4 relative z-10 text-center">
            <ScrollReveal>
               <h1 className="font-serif text-3xl md:text-5xl font-bold mb-4">
                  <TextEffect text="Thư viện Ấn phẩm" />
               </h1>
               <p className="text-blue-100 max-w-2xl mx-auto font-light">
                  Sách chuyên khảo, giáo trình và công cụ hỗ trợ can thiệp tâm lý.
               </p>
            </ScrollReveal>
         </div>
      </div>

      <div className="container mx-auto px-4 mt-8">
         {/* Filter Bar */}
         <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 bg-gray-50 dark:bg-[#1e293b] p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex gap-2">
               {[
                 { id: 'all', label: 'Tất cả' },
                 { id: 'book', label: 'Sách & Giáo trình' },
                 { id: 'tool', label: 'Công cụ' },
               ].map((type) => (
                 <button
                   key={type.id}
                   onClick={() => setFilterType(type.id)}
                   className={`px-4 py-2 rounded text-sm font-medium transition-all ${
                     filterType === type.id
                       ? 'bg-[#38b6ff] text-white shadow-sm'
                       : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100'
                   }`}
                 >
                   {type.label}
                 </button>
               ))}
            </div>

            <div className="relative w-full md:w-64">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
               <input 
                  type="text" 
                  placeholder="Tìm kiếm tài liệu..." 
                  className="w-full pl-9 pr-4 py-2 rounded border border-gray-200 dark:border-gray-600 bg-white dark:bg-black/20 focus:border-[#38b6ff] outline-none text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
               />
            </div>
         </div>

         {/* Grid */}
         {filteredProducts.length === 0 ? (
             <div className="text-center py-20 text-gray-500">
                 <p className="text-xl">Không tìm thấy tài liệu nào.</p>
             </div>
         ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {filteredProducts.map((product, index) => (
                <ScrollReveal key={product.id} delay={index * 50} direction="up">
                    <div className="group flex flex-col h-full">
                        <Link to={`/san-pham/${product.id}`} className="relative aspect-[3/4] overflow-hidden rounded bg-gray-100 dark:bg-black/20 shadow-sm border border-gray-200 dark:border-gray-800 mb-3 block">
                            <img 
                              src={product.coverImage} 
                              alt={product.title} 
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                            />
                            {product.status === 'unavailable' && (
                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-xs font-bold uppercase">Tạm hết</div>
                            )}
                        </Link>

                        <div className="flex-1 flex flex-col">
                            <div className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-1">
                                {product.type === 'textbook' ? 'Giáo trình' : product.type === 'research' ? 'Chuyên khảo' : 'Công cụ'}
                            </div>
                            <h3 className="font-serif font-bold text-gray-900 dark:text-white text-sm md:text-base mb-1 line-clamp-2 group-hover:text-[#38b6ff] transition-colors leading-tight min-h-[2.5em]">
                                <Link to={`/san-pham/${product.id}`}>{product.title}</Link>
                            </h3>
                            <p className="text-xs text-gray-500 mb-3 line-clamp-2">
                               {product.description}
                            </p>
                            
                            <div className="mt-auto">
                                <Link 
                                    to={`/san-pham/${product.id}`}
                                    className="w-full py-2 border border-[#38b6ff] text-[#38b6ff] rounded text-xs font-bold uppercase hover:bg-[#38b6ff] hover:text-white transition-colors flex items-center justify-center gap-2"
                                >
                                    <BookOpen className="w-3 h-3" /> Xem chi tiết
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

export default Products;