import React from 'react';
import { HeartHandshake } from 'lucide-react';

const partners = [
  { name: 'Trung tâm Hỗ trợ Phát triển Giáo dục Hòa nhập Thiên Thần', icon: HeartHandshake },
];

const PartnerMarquee: React.FC = () => {
  const isSinglePartner = partners.length === 1;
  const PartnerIcon = partners[0].icon;

  return (
    <div className="w-full bg-white dark:bg-darkBg border-y border-primary/10 dark:border-gray-800 py-8 overflow-hidden relative">
      {/* Gradients to fade edges - Only needed if marquee */}
      {!isSinglePartner && (
        <>
          <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-white dark:from-darkBg to-transparent z-10 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-white dark:from-darkBg to-transparent z-10 pointer-events-none"></div>
        </>
      )}

      {isSinglePartner ? (
        <div className="container mx-auto px-4 text-center">
           <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Đối tác Chiến lược</p>
           <div className="inline-flex items-center justify-center p-4 bg-blue-50 dark:bg-gray-800 rounded-2xl border border-primary/10 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="p-3 bg-white dark:bg-[#1e293b] rounded-xl shadow-sm mr-4 text-primary">
                 <PartnerIcon className="h-8 w-8" />
              </div>
              <span className="text-lg md:text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                {partners[0].name}
              </span>
           </div>
        </div>
      ) : (
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          {/* Render the list twice to create the infinite loop effect */}
          {[...partners, ...partners, ...partners].map((partner, index) => (
            <div 
              key={index} 
              className="flex items-center space-x-3 mx-8 opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 cursor-default group"
            >
              <div className="p-2.5 bg-sky-50 dark:bg-gray-800 rounded-xl group-hover:bg-primary/10 transition-colors">
                <partner.icon className="h-6 w-6 text-primary" />
              </div>
              <span className="text-sm md:text-base font-bold text-gray-700 dark:text-gray-300 whitespace-nowrap group-hover:text-primary transition-colors">
                {partner.name}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PartnerMarquee;