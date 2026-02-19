import React, { useState } from 'react';
import { Image as ImageIcon, X, ZoomIn } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import TextEffect from '../components/TextEffect';
import { useData } from '../context/DataContext';

const Gallery: React.FC = () => {
  const { gallery } = useData();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openLightbox = (url: string) => {
    setSelectedImage(url);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="bg-white dark:bg-darkBg min-h-screen pb-20 transition-colors duration-300 font-sans">
      {/* Hero */}
      <div className="relative py-16 md:py-24 bg-gradient-to-r from-[#38b6ff] to-blue-600 text-white">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        <div className="container mx-auto px-4 relative z-10 text-center">
           <ScrollReveal>
              <div className="inline-flex items-center justify-center p-2 bg-white/20 backdrop-blur-sm rounded-full mb-4">
                 <ImageIcon className="w-5 h-5 text-white" />
              </div>
              <h1 className="font-serif text-3xl md:text-5xl font-bold mb-4">
                 <TextEffect text="Thư viện Hình ảnh" />
              </h1>
              <p className="text-blue-100 max-w-2xl mx-auto font-light">
                 Những khoảnh khắc đáng nhớ trong hoạt động nghiên cứu, đào tạo và hợp tác của Viện.
              </p>
           </ScrollReveal>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12">
        {gallery.length === 0 ? (
           <div className="text-center py-20 text-gray-500 border border-dashed border-gray-300 rounded-lg">
             Thư viện ảnh đang được cập nhật.
           </div>
        ) : (
           <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {gallery.map((img, idx) => (
                 <ScrollReveal key={img.id} delay={idx * 50} direction="up">
                    <div 
                      className="break-inside-avoid relative group rounded-2xl overflow-hidden cursor-pointer"
                      onClick={() => openLightbox(img.url)}
                    >
                       <img src={img.url} alt={img.caption} className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" />
                       <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <ZoomIn className="text-white w-8 h-8 opacity-80" />
                       </div>
                       <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <p className="text-white font-bold text-sm">{img.caption}</p>
                       </div>
                    </div>
                 </ScrollReveal>
              ))}
           </div>
        )}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200" onClick={closeLightbox}>
           <button className="absolute top-4 right-4 p-2 text-white/70 hover:text-white bg-white/10 rounded-full transition-colors">
              <X className="w-8 h-8" />
           </button>
           <img 
             src={selectedImage} 
             alt="Full size" 
             className="max-w-full max-h-[90vh] object-contain rounded shadow-2xl animate-in zoom-in-95 duration-300" 
             onClick={(e) => e.stopPropagation()} 
           />
        </div>
      )}
    </div>
  );
};

export default Gallery;
