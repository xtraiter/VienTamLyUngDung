import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, CheckCircle, BookOpen, MessageCircle, Star, ShieldCheck, ChevronRight } from 'lucide-react';
import { useData } from '../context/DataContext';
import ScrollReveal from '../components/ScrollReveal';

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const { products } = useData();
  const [activeTab, setActiveTab] = useState<'details' | 'author'>('details');
  
  const product = products.find(p => p.id === Number(id));
  const relatedProducts = products
    .filter(p => p.id !== Number(id) && p.type === product?.type)
    .slice(0, 4);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-darkBg">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Ấn phẩm không tồn tại</h2>
          <Link to="/san-pham" className="text-primary hover:underline">Quay lại thư viện</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-darkBg min-h-screen pb-20 transition-colors duration-300 font-sans">
      
      {/* Breadcrumb */}
      <div className="bg-gray-50 dark:bg-[#151f32] border-b border-gray-100 dark:border-gray-800">
         <div className="container mx-auto px-4 py-4">
            <div className="flex items-center text-sm text-gray-500">
               <Link to="/" className="hover:text-primary">Trang chủ</Link>
               <ChevronRight className="w-4 h-4 mx-2" />
               <Link to="/san-pham" className="hover:text-primary">Thư viện</Link>
               <ChevronRight className="w-4 h-4 mx-2" />
               <span className="text-gray-900 dark:text-white font-medium truncate">{product.title}</span>
            </div>
         </div>
      </div>

      <div className="container mx-auto px-4 mt-12">
         {/* Main Product Section */}
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Image Gallery Side */}
            <ScrollReveal>
               <div className="bg-gray-100 dark:bg-black/20 rounded-2xl p-8 flex items-center justify-center border border-gray-200 dark:border-gray-800">
                  <div className="relative shadow-2xl rounded w-3/4 aspect-[3/4] max-w-sm transform hover:scale-105 transition-transform duration-500">
                     <img src={product.coverImage} alt={product.title} className="w-full h-full object-cover rounded" />
                     {/* 3D Spine Effect */}
                     <div className="absolute top-0 left-0 w-3 h-full bg-gradient-to-r from-black/20 to-transparent rounded-l"></div>
                  </div>
               </div>
            </ScrollReveal>

            {/* Info Side */}
            <ScrollReveal direction="left">
               <div className="flex flex-col h-full">
                  <div className="mb-2">
                     <span className={`inline-block px-3 py-1 text-xs font-bold uppercase rounded ${
                        product.type === 'textbook' ? 'bg-blue-100 text-blue-700' : 
                        product.type === 'research' ? 'bg-purple-100 text-purple-700' : 'bg-teal-100 text-teal-700'
                     }`}>
                        {product.type === 'textbook' ? 'Giáo trình' : product.type === 'research' ? 'Sách Chuyên khảo' : 'Công cụ'}
                     </span>
                  </div>
                  
                  <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                     {product.title}
                  </h1>

                  <div className="flex items-center gap-4 mb-6">
                     <div className="flex text-yellow-400">
                        <Star className="w-5 h-5 fill-current" />
                        <Star className="w-5 h-5 fill-current" />
                        <Star className="w-5 h-5 fill-current" />
                        <Star className="w-5 h-5 fill-current" />
                        <Star className="w-5 h-5 fill-current" />
                     </div>
                     <span className="text-gray-400 text-sm">|</span>
                     <span className="text-gray-600 dark:text-gray-300 text-sm">Đã bán: 100+</span>
                  </div>

                  <div className="bg-gray-50 dark:bg-[#1e293b] p-6 rounded-xl border border-gray-100 dark:border-gray-800 mb-8">
                     <div className="flex flex-col gap-2 mb-4">
                        <div className="flex justify-between">
                           <span className="text-gray-500 dark:text-gray-400">Tác giả:</span>
                           <span className="font-bold text-gray-900 dark:text-white">{product.author || 'Viện Tâm lý Ứng dụng'}</span>
                        </div>
                        <div className="flex justify-between">
                           <span className="text-gray-500 dark:text-gray-400">Năm xuất bản:</span>
                           <span className="font-bold text-gray-900 dark:text-white">{product.publishYear || '2023'}</span>
                        </div>
                        <div className="flex justify-between">
                           <span className="text-gray-500 dark:text-gray-400">Tình trạng:</span>
                           <span className={`font-bold ${product.status === 'available' ? 'text-green-600' : 'text-red-500'}`}>
                              {product.status === 'available' ? 'Còn hàng' : 'Tạm hết hàng'}
                           </span>
                        </div>
                     </div>
                     
                     <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-4">
                        <span className="text-gray-500 dark:text-gray-400">Giá bìa:</span>
                        <span className="text-3xl font-bold text-primary">
                           {product.price ? product.price.toLocaleString('vi-VN') + ' đ' : 'Liên hệ'}
                        </span>
                     </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed text-lg">
                     {product.description}
                  </p>

                  <div className="mt-auto flex gap-4">
                     <Link 
                        to="/lien-he"
                        className="flex-1 py-4 bg-primary text-white font-bold rounded-xl hover:bg-blue-600 transition-colors shadow-lg shadow-primary/30 flex items-center justify-center gap-2"
                     >
                        <ShoppingCart className="w-5 h-5" /> Đặt mua ngay
                     </Link>
                     <Link 
                        to="/lien-he"
                        className="flex-1 py-4 border-2 border-primary text-primary font-bold rounded-xl hover:bg-primary/5 transition-colors flex items-center justify-center gap-2"
                     >
                        <MessageCircle className="w-5 h-5" /> Tư vấn thêm
                     </Link>
                  </div>
               </div>
            </ScrollReveal>
         </div>

         {/* Details Tabs */}
         <div className="mb-20">
             <div className="flex border-b border-gray-200 dark:border-gray-800 mb-8">
                <button 
                  onClick={() => setActiveTab('details')}
                  className={`px-8 py-4 font-bold text-lg border-b-2 transition-colors ${activeTab === 'details' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-gray-300'}`}
                >
                   Nội dung chi tiết
                </button>
                <button 
                   onClick={() => setActiveTab('author')}
                   className={`px-8 py-4 font-bold text-lg border-b-2 transition-colors ${activeTab === 'author' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-gray-300'}`}
                >
                   Về tác giả
                </button>
             </div>

             <div className="bg-white dark:bg-[#1e293b] p-8 rounded-2xl border border-gray-100 dark:border-gray-800 min-h-[300px]">
                {activeTab === 'details' ? (
                   <div className="prose prose-lg dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: product.details || '<p>Đang cập nhật...</p>' }} />
                ) : (
                   <div className="flex items-start gap-6">
                      <div className="w-24 h-24 rounded-full bg-gray-200 shrink-0 overflow-hidden">
                         <img src={`https://ui-avatars.com/api/?name=${product.author}&size=200`} alt="Author" className="w-full h-full object-cover" />
                      </div>
                      <div>
                         <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2">{product.author}</h3>
                         <p className="text-gray-600 dark:text-gray-300">
                            Các chuyên gia tại Viện Tâm lý Ứng dụng với nhiều năm kinh nghiệm trong lĩnh vực nghiên cứu và thực hành lâm sàng.
                         </p>
                      </div>
                   </div>
                )}
             </div>
         </div>

         {/* Related Products */}
         <div>
            <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-8 border-l-4 border-primary pl-4">
               Có thể bạn quan tâm
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
               {relatedProducts.map((item, idx) => (
                  <ScrollReveal key={item.id} delay={idx * 50} direction="up">
                     <Link to={`/san-pham/${item.id}`} className="group block h-full bg-white dark:bg-[#1e293b] rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-all">
                        <div className="aspect-[3/4] relative bg-gray-100">
                           <img src={item.coverImage} alt={item.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                        </div>
                        <div className="p-4">
                           <h3 className="font-bold text-gray-900 dark:text-white text-sm line-clamp-2 group-hover:text-primary transition-colors mb-2">{item.title}</h3>
                           <p className="font-bold text-primary text-sm">{item.price ? item.price.toLocaleString() + ' đ' : 'Liên hệ'}</p>
                        </div>
                     </Link>
                  </ScrollReveal>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
};

export default ProductDetail;