import React from 'react';
import { BookOpen, Download, Star, CheckCircle } from 'lucide-react';
import { Book } from '../types';
import ScrollReveal from '../components/ScrollReveal';

const books: Book[] = [
  {
    id: 1,
    title: "PHÁT TRIỂN NGÔN NGỮ VÀ TƯ DUY CHO TRẺ TỪ 0 – 6 TUỔI",
    description: "Cẩm nang thiết yếu giúp cha mẹ và giáo viên nắm bắt các mốc phát triển quan trọng, cung cấp bài tập thực hành giúp trẻ phát triển ngôn ngữ mạch lạc và tư duy logic trong giai đoạn vàng.",
    coverImage: "https://picsum.photos/seed/book_ngonngu/600/850",
    type: "textbook"
  },
  {
    id: 2,
    title: "THỰC HÀNH DẠY TRẺ TỰ KỶ",
    description: "Tài liệu chuyên sâu hướng dẫn các phương pháp can thiệp sớm, kỹ thuật ABA và các bài tập cụ thể để hỗ trợ trẻ rối loạn phổ tự kỷ hòa nhập cộng đồng.",
    coverImage: "https://picsum.photos/seed/book_tuky/600/850",
    type: "research"
  },
  {
    id: 3,
    title: "TUYỆT CHIÊU DẠY CON XUẤT CHÚNG",
    description: "Đúc kết những phương pháp giáo dục hiện đại, kết hợp tâm lý học hành vi để khơi dậy tiềm năng, rèn luyện nhân cách và kỹ năng sống vượt trội cho trẻ.",
    coverImage: "https://picsum.photos/seed/book_xuatchung/600/850",
    type: "textbook"
  }
];

const Publications: React.FC = () => {
  return (
    <div className="bg-white dark:bg-darkBg min-h-screen pb-20 transition-colors duration-300 overflow-hidden">
      <div className="relative py-20 lg:py-28 bg-gradient-to-b from-blue-50/50 to-white dark:from-darkSurface dark:to-darkBg">
         <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.05]" />
         <div className="absolute top-0 left-0 -ml-20 -mt-20 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl animate-blob" />
         <div className="absolute top-0 right-1/4 w-[300px] h-[300px] bg-purple-300/10 rounded-full blur-3xl animate-blob animation-delay-2000" />
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <ScrollReveal>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-6">Ấn phẩm & Sách</h1>
            <div className="h-1 w-24 bg-primary rounded-full mx-auto mb-6"></div>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-light">
              Những công trình tâm huyết của đội ngũ chuyên gia Viện Tâm lý Ứng dụng.
            </p>
          </ScrollReveal>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {books.map((book, index) => (
            <ScrollReveal key={book.id} delay={index * 150} direction="up">
              <div 
                className="group bg-white dark:bg-darkSurface rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 border border-gray-100 dark:border-gray-800 flex flex-col h-full hover:-translate-y-2 relative"
              >
                {/* Book Cover Container */}
                <div className="relative p-6 bg-gray-50 dark:bg-black/20 flex justify-center items-center">
                   <div className="relative w-48 h-64 rounded-r-md shadow-2xl transform group-hover:scale-105 group-hover:-rotate-2 transition-all duration-500">
                      <img 
                        src={book.coverImage} 
                        alt={book.title} 
                        className="w-full h-full object-cover rounded-r-md" 
                      />
                      {/* Book Spine Effect */}
                      <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-r from-gray-800/20 to-transparent"></div>
                      <div className="absolute top-0 left-1 w-[1px] h-full bg-white/20"></div>
                   </div>
                </div>
                
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                     <Star className="w-4 h-4 text-yellow-400 fill-current" />
                     <span className="text-xs font-bold text-primary uppercase tracking-wider">{book.type === 'research' ? 'Sách Chuyên khảo' : 'Sách Kỹ năng'}</span>
                  </div>
                  <h3 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-primary transition-colors min-h-[3.5rem]">
                    {book.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 flex-1 line-clamp-4 leading-relaxed">
                    {book.description}
                  </p>
                  
                  <div className="space-y-3 pt-4 border-t border-gray-100 dark:border-gray-800 mt-auto">
                    <button className="w-full flex items-center justify-center space-x-2 py-3 bg-primary text-white font-bold rounded-xl hover:bg-secondary transition-all shadow-lg shadow-primary/20">
                      <BookOpen className="h-4 w-4" />
                      <span>Xem chi tiết</span>
                    </button>
                    <div className="flex items-center justify-center text-xs text-gray-500 gap-1">
                       <CheckCircle className="w-3 h-3 text-green-500" />
                       <span>Có sẵn tại thư viện Viện</span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Publications;