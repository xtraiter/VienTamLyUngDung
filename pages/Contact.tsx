import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send, Clock } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    topic: 'consultation',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi sớm nhất!');
    setFormData({ name: '', email: '', phone: '', topic: 'consultation', message: '' });
  };

  return (
    <div className="bg-white dark:bg-darkBg min-h-screen pb-20 transition-colors duration-300 font-sans">
      
      {/* Hero */}
      <div className="relative py-16 md:py-24 bg-gradient-to-r from-[#38b6ff] to-blue-600 text-white">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <ScrollReveal>
            <h1 className="font-serif text-3xl md:text-5xl font-bold mb-4">Liên hệ Công tác</h1>
            <p className="text-blue-100 max-w-2xl mx-auto font-light">
              Kết nối với Viện để được tư vấn chuyên sâu và thảo luận các cơ hội hợp tác.
            </p>
          </ScrollReveal>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Info Sidebar */}
          <div className="lg:col-span-1 space-y-8">
             <ScrollReveal direction="right">
                <div className="bg-gray-50 dark:bg-[#1e293b] p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                    <h3 className="font-serif font-bold text-xl text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-3">Thông tin liên hệ</h3>
                    <div className="space-y-6">
                        <div className="flex items-start">
                            <MapPin className="w-5 h-5 text-[#38b6ff] mt-1 mr-3 shrink-0" />
                            <div>
                                <h4 className="font-bold text-gray-900 dark:text-white text-sm">Trụ sở chính</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">286/5 Thống Nhất, Phường An Hội Đông, TP. Hồ Chí Minh</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <Phone className="w-5 h-5 text-[#38b6ff] mt-1 mr-3 shrink-0" />
                            <div>
                                <h4 className="font-bold text-gray-900 dark:text-white text-sm">Điện thoại</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">0986 77 6878</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <Mail className="w-5 h-5 text-[#38b6ff] mt-1 mr-3 shrink-0" />
                            <div>
                                <h4 className="font-bold text-gray-900 dark:text-white text-sm">Email</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">vientamlyungdung@gmail.com</p>
                            </div>
                        </div>
                         <div className="flex items-start">
                            <Clock className="w-5 h-5 text-[#38b6ff] mt-1 mr-3 shrink-0" />
                            <div>
                                <h4 className="font-bold text-gray-900 dark:text-white text-sm">Giờ làm việc</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Thứ 2 - Thứ 7: 8:00 - 17:30</p>
                            </div>
                        </div>
                    </div>
                </div>
             </ScrollReveal>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <ScrollReveal direction="up" delay={200}>
              <div className="bg-white dark:bg-[#1e293b] p-8 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-6">Gửi tin nhắn trực tuyến</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Họ và tên</label>
                      <input 
                        required
                        type="text" 
                        className="w-full px-4 py-3 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-black/20 focus:border-[#38b6ff] outline-none transition-colors"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Số điện thoại</label>
                      <input 
                        required
                        type="tel" 
                        className="w-full px-4 py-3 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-black/20 focus:border-[#38b6ff] outline-none transition-colors"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Email</label>
                    <input 
                      required
                      type="email" 
                      className="w-full px-4 py-3 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-black/20 focus:border-[#38b6ff] outline-none transition-colors"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Nội dung</label>
                    <textarea 
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-black/20 focus:border-[#38b6ff] outline-none transition-colors"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    className="px-8 py-3 bg-[#38b6ff] text-white font-bold rounded hover:bg-blue-600 transition-colors flex items-center"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Gửi yêu cầu
                  </button>
                </form>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Map */}
        <div className="mt-12 h-96 w-full rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
           <div className="w-full h-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
              <div className="text-center text-gray-500">
                 <MapPin className="w-12 h-12 mx-auto mb-2 text-[#38b6ff]" />
                 <p>Google Map Integration Placeholder</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;