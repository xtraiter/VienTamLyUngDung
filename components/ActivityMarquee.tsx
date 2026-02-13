import React from 'react';
import { GalleryImage } from '../types';

interface ActivityMarqueeProps {
  images: GalleryImage[];
}

const ActivityMarquee: React.FC<ActivityMarqueeProps> = ({ images }) => {
  if (images.length === 0) return null;

  return (
    <div className="w-full bg-white dark:bg-darkBg py-12 overflow-hidden relative group">
      {/* Fade Gradients */}
      <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-white dark:from-darkBg to-transparent z-20 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white dark:from-darkBg to-transparent z-20 pointer-events-none"></div>

      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
        {/* Render triple for seamless loop */}
        {[...images, ...images, ...images].map((img, index) => (
          <div 
            key={`${img.id}-${index}`} 
            className="relative mx-4 w-72 h-48 md:w-96 md:h-64 rounded-2xl overflow-hidden shadow-lg transform transition-all duration-500 hover:scale-105 cursor-pointer border border-gray-100 dark:border-gray-800"
          >
             <img 
               src={img.url} 
               alt={img.caption} 
               className="w-full h-full object-cover"
               loading="lazy"
             />
             {/* Caption Overlay */}
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
               <p className="text-white font-bold text-sm md:text-base drop-shadow-md">{img.caption}</p>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityMarquee;