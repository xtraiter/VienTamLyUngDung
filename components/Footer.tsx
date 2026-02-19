import React from 'react';
import { MapPin, Phone, Mail, Puzzle, Facebook, Youtube, Globe, ArrowRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#0f172a] text-white pt-16 pb-8 font-sans border-t border-gray-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Column 1: Brand */}
          <div className="space-y-6">
            <div className="flex items-start space-x-3">
              <div className="p-1 bg-white rounded shadow-sm shrink-0 w-12 h-12 flex items-center justify-center overflow-hidden">
                <img src={`${import.meta.env.BASE_URL}logo.png`} alt="IAP Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                 <h2 className="font-serif font-bold text-lg leading-tight uppercase">
                    {t('header.title')}
                 </h2>
                 <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">{t('header.subtitle')}</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-gray-400 text-justify border-t border-gray-800 pt-4 mt-4">
              {t('footer.desc')}
            </p>
            <div className="flex space-x-3">
               <a href="#" className="w-8 h-8 flex items-center justify-center bg-gray-800 hover:bg-[#38b6ff] hover:text-white rounded transition-colors"><Facebook className="w-4 h-4" /></a>
               <a href="#" className="w-8 h-8 flex items-center justify-center bg-gray-800 hover:bg-red-600 hover:text-white rounded transition-colors"><Youtube className="w-4 h-4" /></a>
               <a href="#" className="w-8 h-8 flex items-center justify-center bg-gray-800 hover:bg-[#38b6ff] hover:text-white rounded transition-colors"><Globe className="w-4 h-4" /></a>
            </div>
          </div>
          
          {/* Column 2: Navigation */}
          <div>
            <h3 className="font-bold text-white text-lg mb-6 uppercase border-b-2 border-[#38b6ff] inline-block pb-1">
               {t('footer.intro')}
            </h3>
            <ul className="space-y-2">
              {[
                { label: t('footer.link.about'), path: '/gioi-thieu' },
                { label: t('footer.link.structure'), path: '/hoi-dong' },
                { label: t('footer.link.partners'), path: '/hop-tac' },
                { label: t('footer.link.careers'), path: '/tuyen-dung' },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link to={link.path} className="text-sm text-gray-400 hover:text-[#38b6ff] hover:pl-2 transition-all duration-300 flex items-center border-b border-gray-800 pb-2 last:border-0">
                    <ArrowRight className="w-3 h-3 mr-2 text-[#38b6ff]" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h3 className="font-bold text-white text-lg mb-6 uppercase border-b-2 border-[#38b6ff] inline-block pb-1">
               {t('footer.expertise')}
            </h3>
             <ul className="space-y-2">
              {[
                { label: t('footer.link.research'), path: '/nghien-cuu' },
                { label: t('footer.link.training'), path: '/dao-tao' },
                { label: t('footer.link.therapy'), path: '/lien-he' },
                { label: t('footer.link.library'), path: '/san-pham' },
                { label: t('footer.link.news'), path: '/tin-tuc' },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link to={link.path} className="text-sm text-gray-400 hover:text-[#38b6ff] hover:pl-2 transition-all duration-300 flex items-center border-b border-gray-800 pb-2 last:border-0">
                     <ArrowRight className="w-3 h-3 mr-2 text-[#38b6ff]" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="font-bold text-white text-lg mb-6 uppercase border-b-2 border-[#38b6ff] inline-block pb-1">
               {t('footer.contact')}
            </h3>
            <ul className="space-y-4 mb-6">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-[#38b6ff] mr-3 shrink-0 mt-0.5" />
                <span className="text-sm text-gray-400 leading-tight">
                  {t('footer.address')}
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-[#38b6ff] mr-3 shrink-0" />
                <a href="tel:0986776878" className="text-sm font-bold text-white hover:text-[#38b6ff] transition-colors">
                  0986 77 6878
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-[#38b6ff] mr-3 shrink-0" />
                <a href="mailto:vientamlyungdung@gmail.com" className="text-sm text-gray-400 hover:text-white transition-colors">
                  vientamlyungdung@gmail.com
                </a>
              </li>
               <li className="flex items-center">
                <Clock className="h-5 w-5 text-[#38b6ff] mr-3 shrink-0" />
                <span className="text-sm text-gray-400">
                  {t('footer.working_hours')}
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-xs text-gray-500 text-center md:text-left">
            <p className="font-bold uppercase text-white mb-1">{t('hero.tagline')}</p>
            <p>&copy; {new Date().getFullYear()} {t('footer.copyright')}</p>
          </div>
          <div className="flex space-x-6 text-xs text-gray-500">
             <a href="#" className="hover:text-white transition-colors">Quy định sử dụng</a>
             <a href="#" className="hover:text-white transition-colors">Chính sách bảo mật</a>
             <a href="#" className="hover:text-white transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
