import React, { useState, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, X, Puzzle, ChevronDown, 
  Home, Info, Microscope, Newspaper, BookOpen, 
  Phone, Mail, MapPin, Globe 
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { NavItem } from '../types';

const Header: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
  const location = useLocation();

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setActiveSubMenu(null);
  }, [location]);

  const navItems: NavItem[] = useMemo(() => [
    { label: t('nav.home'), path: '/', icon: Home },
    { 
      label: t('nav.about'), 
      path: '/gioi-thieu', 
      icon: Info,
      children: [
        { label: t('nav.about.intro'), path: '/gioi-thieu' },
        { label: t('nav.about.structure'), path: '/hoi-dong' },
      ]
    },
    { 
      label: t('nav.research_training'), 
      path: '/nghien-cuu', 
      icon: Microscope,
      children: [
        { label: t('nav.research.topics'), path: '/nghien-cuu' },
        { label: t('nav.training'), path: '/dao-tao' },
        { label: t('nav.cooperation'), path: '/hop-tac' },
      ]
    },
    { 
      label: t('nav.resources'), 
      path: '/san-pham', 
      icon: BookOpen,
      children: [
        { label: t('nav.books'), path: '/sach' },
        { label: t('nav.tools'), path: '/cong-cu' },
        { label: t('nav.gallery'), path: '/thu-vien' },
      ]
    },
    { 
      label: t('nav.news'), 
      path: '/tin-tuc', 
      icon: Newspaper,
      children: [
        { label: t('nav.news.activities'), path: '/tin-hoat-dong' },
        { label: t('nav.news.events'), path: '/su-kien' },
        { label: t('nav.news.articles'), path: '/bai-viet' },
      ]
    },
    { label: t('nav.contact'), path: '/lien-he', icon: Phone }
  ], [t]);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="w-full z-[100] relative font-sans">
      
      {/* 1. TOP BAR (Dark Blue) - Corporate Feel */}
      <div className="bg-[#0f172a] text-white py-2 text-[11px] md:text-xs tracking-wide border-b border-white/10 hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-6">
             <div className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
                <Mail className="w-3.5 h-3.5 text-primary" />
                <span>vientamlyungdung@gmail.com</span>
             </div>
             <div className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
                <MapPin className="w-3.5 h-3.5 text-primary" />
                <span>TP. Hồ Chí Minh, Việt Nam</span>
             </div>
          </div>
          <div className="flex items-center space-x-4">
             <div className="flex items-center gap-1 cursor-pointer hover:text-primary transition-colors" onClick={() => setLanguage(language === 'vi' ? 'en' : 'vi')}>
                <Globe className="w-3.5 h-3.5" />
                <span className="uppercase font-bold">{language}</span>
             </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER */}
      <div className={`w-full transition-all duration-300 bg-white dark:bg-[#1a1a1a] ${
         scrolled ? 'fixed top-0 shadow-lg py-2' : 'relative py-4 md:py-5 border-b border-gray-100 dark:border-gray-800'
      }`}>
         <div className="container mx-auto px-4 flex items-center justify-between">
            
            {/* LOGO */}
            <Link to="/" className="flex items-center gap-3 group shrink-0">
               <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center transition-all duration-300">
                  <img src="/logo.png" alt="IAP Logo" className="w-full h-full object-contain group-hover:scale-110 transition-transform" />
               </div>
               <div className="flex flex-col">
                  <span className="font-serif font-bold text-lg md:text-xl leading-none text-gray-900 dark:text-white uppercase tracking-tight">
                     Viện Tâm Lý Ứng Dụng
                  </span>
                  <span className="text-[10px] md:text-[11px] font-medium text-gray-500 dark:text-gray-400 uppercase tracking-[0.2em] mt-1 group-hover:text-primary transition-colors">
                     Institute of Applied Psychology
                  </span>
               </div>
            </Link>

            {/* DESKTOP NAV - PILL STYLE */}
            <nav className="hidden xl:flex items-center gap-1 bg-gray-50/80 dark:bg-white/5 px-2 py-1.5 rounded-full border border-gray-100 dark:border-gray-800 ml-auto mr-6 backdrop-blur-sm">
               {navItems.map((item) => {
                  const active = isActive(item.path);
                  const hasSub = !!item.children;

                  return (
                     <div key={item.path} className="relative group">
                        <Link 
                           to={item.path}
                           className={`flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                              active 
                              ? 'bg-primary text-white shadow-md shadow-blue-500/25 transform scale-105' 
                              : 'text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-white dark:hover:bg-gray-800'
                           }`}
                        >
                           {item.label}
                           {hasSub && <ChevronDown className="w-3.5 h-3.5 opacity-60 group-hover:rotate-180 transition-transform duration-300" />}
                        </Link>

                        {/* Dropdown */}
                        {hasSub && (
                           <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-60 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 z-50">
                              <div className="bg-white dark:bg-[#1e293b] rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden p-1.5">
                                 {item.children?.map((sub, idx) => (
                                    <Link 
                                       key={idx} 
                                       to={sub.path}
                                       className="block px-4 py-2.5 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-primary transition-colors"
                                    >
                                       {sub.label}
                                    </Link>
                                 ))}
                              </div>
                           </div>
                        )}
                     </div>
                  );
               })}
            </nav>

            {/* ACTIONS */}
            <div className="flex items-center gap-3">
               <a 
                  href="tel:0986776878" 
                  className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-[#0055d4] hover:bg-blue-700 text-white rounded-full font-bold text-sm transition-all shadow-lg shadow-blue-900/20 hover:-translate-y-0.5"
               >
                  <Phone className="w-4 h-4" />
                  <span>0986 77 6878</span>
               </a>
               
               <button 
                  onClick={() => setIsMenuOpen(true)}
                  className="xl:hidden p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
               >
                  <Menu className="w-7 h-7" />
               </button>
            </div>
         </div>
      </div>

      {/* MOBILE MENU DRAWER */}
       <div className={`fixed inset-0 z-[150] xl:hidden transition-all duration-300 ${isMenuOpen ? 'visible' : 'invisible'}`}>
          <div 
             className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`} 
             onClick={() => setIsMenuOpen(false)}
          />
          <div className={`absolute top-0 right-0 w-[85%] max-w-sm h-full bg-white dark:bg-[#1a1a1a] shadow-2xl transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
             <div className="flex flex-col h-full">
                <div className="p-5 flex items-center justify-between border-b border-gray-100 dark:border-gray-800">
                   <div className="flex items-center gap-2">
                       <Puzzle className="w-6 h-6 text-primary" />
                       <span className="font-serif font-bold text-lg text-gray-900 dark:text-white">MENU</span>
                   </div>
                   <button onClick={() => setIsMenuOpen(false)} className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-500 hover:text-red-500 transition-colors">
                      <X className="w-5 h-5" />
                   </button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-5 space-y-2">
                   {navItems.map((item) => {
                      const hasSub = !!item.children;
                      const isOpen = activeSubMenu === item.label;

                      return (
                         <div key={item.label} className="border-b border-gray-50 dark:border-gray-800/50 last:border-0 pb-2">
                            <div 
                               className="flex items-center justify-between py-3 cursor-pointer group"
                               onClick={() => {
                                  if (hasSub) setActiveSubMenu(isOpen ? null : item.label);
                                  else {
                                    setIsMenuOpen(false);
                                  }
                               }}
                            >
                               {hasSub ? (
                                  <div className="flex items-center gap-3">
                                     <item.icon className={`w-5 h-5 ${isOpen ? 'text-primary' : 'text-gray-400'}`} />
                                     <span className={`font-bold text-base ${isOpen ? 'text-primary' : 'text-gray-800 dark:text-gray-200'}`}>{item.label}</span>
                                  </div>
                               ) : (
                                  <Link to={item.path} onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 font-bold text-base text-gray-800 dark:text-gray-200 w-full group-hover:text-primary transition-colors">
                                     <item.icon className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
                                     {item.label}
                                  </Link>
                               )}
                               {hasSub && <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary' : ''}`} />}
                            </div>
                            
                            {hasSub && (
                               <div className={`space-y-1 overflow-hidden transition-all duration-300 ease-in-out pl-9 ${isOpen ? 'max-h-96 opacity-100 mt-1' : 'max-h-0 opacity-0'}`}>
                                  {item.children?.map((sub, i) => (
                                     <Link 
                                        key={i} 
                                        to={sub.path} 
                                        onClick={() => setIsMenuOpen(false)}
                                        className="block py-2.5 px-4 rounded-lg bg-gray-50 dark:bg-gray-800 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-blue-50 dark:hover:bg-gray-700 relative border-l-2 border-transparent hover:border-primary transition-all"
                                     >
                                        {sub.label}
                                     </Link>
                                  ))}
                               </div>
                            )}
                         </div>
                      )
                   })}
                </div>

                <div className="p-5 bg-gray-50 dark:bg-[#151f32] border-t border-gray-100 dark:border-gray-800">
                   <div className="grid grid-cols-2 gap-3 mb-4">
                      <button onClick={() => setLanguage('vi')} className={`py-2 rounded-lg text-sm font-bold border transition-all ${language === 'vi' ? 'bg-primary text-white border-primary shadow-md' : 'bg-white border-gray-200 text-gray-600'}`}>Tiếng Việt</button>
                      <button onClick={() => setLanguage('en')} className={`py-2 rounded-lg text-sm font-bold border transition-all ${language === 'en' ? 'bg-primary text-white border-primary shadow-md' : 'bg-white border-gray-200 text-gray-600'}`}>English</button>
                   </div>
                   <div className="text-center text-xs text-gray-400">
                      © 2024 Institute of Applied Psychology
                   </div>
                </div>
             </div>
          </div>
       </div>

    </header>
  );
};

export default Header;