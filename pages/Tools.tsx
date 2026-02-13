import React from 'react';
import { PenTool, MessageCircle, CheckCircle, Info } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import TextEffect from '../components/TextEffect';
import { useData } from '../context/DataContext';
import { Link } from 'react-router-dom';

const Tools: React.FC = () => {
  const { products } = useData();
  
  // Filter only tools from context
  const dynTools = products.filter(p => p.type === 'tool');

  const staticTools = [
      { title: "Thang đo Trầm cảm BECK (BDI-II)", desc: "Công cụ tự đánh giá mức độ trầm cảm phổ biến nhất hiện nay.", tag: "Lâm sàng" },
      { title: "Thang đo Lo âu Zung (SAS)", desc: "Đánh giá mức độ lo âu của người bệnh qua 20 mục hỏi.", tag: "Lâm sàng" },
      { title: "Trắc nghiệm Trí tuệ RAVEN", desc: "Đánh giá chỉ số IQ qua hình ảnh, không phụ thuộc ngôn ngữ.", tag: "Trí tuệ" },
      { title: "Thang đo Phát triển Denver II", desc: "Sàng lọc sự phát triển của trẻ từ 0 - 6 tuổi.", tag: "Phát triển" },
      { title: "Bảng kiểm M-CHAT-R/F", desc: "Sàng lọc nguy cơ tự kỷ ở trẻ mới biết đi.", tag: "Sàng lọc" },
      { title: "Trắc nghiệm Nhân cách MMPI-2", desc: "Đánh giá cấu trúc nhân cách và các bệnh lý tâm thần.", tag: "Nhân cách" }
  ];

  return (
    <div className="bg-white dark:bg-darkBg min-h-screen pb-20 transition-colors duration-300 font-sans">
      {/* Hero */}
      <div className="relative py-16 md:py-24 bg-gradient-to-r from-teal-500 to-emerald-600 text-white">
         <div className="container mx-auto px-4 relative z-10 text-center">
            <ScrollReveal>
               <div className="inline-flex items-center justify-center p-2 bg-white/20 backdrop-blur-sm rounded-full mb-4">
                  <PenTool className="w-5 h-5 text-white" />
               </div>
               <h1 className="font-serif text-3xl md:text-5xl font-bold mb-4">
                  <TextEffect text="Công cụ Trắc nghiệm & Đánh giá" />
               </h1>
               <p className="text-teal-100 max-w-2xl mx-auto font-light">
                  Hệ thống các thang đo, bài test tâm lý chuẩn hóa phục vụ chẩn đoán và nghiên cứu.
               </p>
            </ScrollReveal>
         </div>
      </div>

      <div className="container mx-auto px-4 mt-12">
        {/* Dynamic Tools from Admin */}
        {dynTools.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {dynTools.map((tool, index) => (
                    <ScrollReveal key={tool.id} delay={index * 50} direction="up">
                        <div className="bg-white dark:bg-[#1e293b] p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-all border-l-4 border-l-primary">
                            <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">{tool.title}</h3>
                            <p className="text-sm text-gray-500 mb-4">{tool.description}</p>
                            <Link to={`/san-pham/${tool.id}`} className="text-primary text-sm font-bold flex items-center hover:underline">
                                <Info className="w-4 h-4 mr-1" /> Xem chi tiết
                            </Link>
                        </div>
                    </ScrollReveal>
                ))}
            </div>
        )}

        {/* Standard/Static Tools Section */}
        <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-8 border-l-4 border-teal-500 pl-4">
           Các công cụ tiêu chuẩn
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {staticTools.map((tool, idx) => (
                <ScrollReveal key={idx} delay={idx * 50} direction="up">
                    <div className="bg-white dark:bg-[#1e293b] p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-all border-l-4 border-l-teal-500">
                            <div className="flex justify-between items-start mb-4">
                            <span className="px-2 py-1 bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-300 text-xs font-bold uppercase rounded">
                                {tool.tag}
                            </span>
                            <CheckCircle className="w-5 h-5 text-teal-500" />
                            </div>
                            <h3 className="font-serif font-bold text-xl text-gray-900 dark:text-white mb-3">
                                {tool.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 leading-relaxed">
                                {tool.desc}
                            </p>
                            <Link to="/lien-he" className="inline-flex items-center text-sm font-bold text-teal-600 hover:underline">
                            <MessageCircle className="w-4 h-4 mr-2" /> Liên hệ sử dụng
                            </Link>
                    </div>
                </ScrollReveal>
            ))}
        </div>
         
         <div className="mt-16 bg-gray-50 dark:bg-[#151f32] p-8 rounded-xl text-center border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Bạn cần tìm công cụ chuyên biệt?</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Viện cung cấp dịch vụ chuyển giao và tập huấn sử dụng các công cụ đánh giá tâm lý chuẩn quốc tế.</p>
            <Link to="/lien-he" className="inline-block px-6 py-2 bg-teal-600 text-white font-bold rounded hover:bg-teal-700 transition-colors">
                Gửi yêu cầu
            </Link>
         </div>
      </div>
    </div>
  );
};

export default Tools;