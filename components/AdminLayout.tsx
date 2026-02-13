import React, { useState } from 'react';
import { NavLink, Outlet, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, FileText, Settings, LogOut, 
  BrainCircuit, Users, BookOpen, Menu, X, 
  Microscope, Image as ImageIcon, Bell, Search, ChevronRight 
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { Moon, Sun } from 'lucide-react';

const AdminLayout: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const menuItems = [
    { label: 'Tổng quan', path: '/admin', icon: LayoutDashboard, exact: true },
    { label: 'Tin tức & Sự kiện', path: '/admin/news', icon: FileText },
    { label: 'Nghiên cứu khoa học', path: '/admin/research', icon: Microscope },
    { label: 'Ấn phẩm & Tài liệu', path: '/admin/products', icon: BookOpen },
    { label: 'Nhân sự & Hội đồng', path: '/admin/staff', icon: Users },
    { label: 'Thư viện Hình ảnh', path: '/admin/gallery', icon: ImageIcon },
    { label: 'Cấu hình hệ thống', path: '/admin/settings', icon: Settings },
  ];

  const currentTitle = menuItems.find(item => 
    item.exact ? location.pathname === item.path : location.pathname.startsWith(item.path)
  )?.label || 'Dashboard';

  return (
    <div className="flex h-screen bg-[#f3f4f6] dark:bg-[#0f172a] font-sans transition-colors duration-300 overflow-hidden">
      
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-[#1e293b] border-r border-gray-200 dark:border-gray-800 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:relative lg:translate-x-0 shadow-2xl lg:shadow-none flex flex-col`}
      >
        {/* Logo Area */}
        <div className="h-20 flex items-center px-6 border-b border-gray-100 dark:border-gray-800">
          <Link to="/" className="flex items-center gap-3 group w-full">
             <div className="w-10 h-10 flex items-center justify-center transition-all duration-300">
                <img src="/logo.png" alt="IAP Admin" className="w-full h-full object-contain" />
             </div>
             <div>
                <h1 className="font-serif font-bold text-lg text-gray-900 dark:text-white leading-none">IAP Admin</h1>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider mt-1">Management</p>
             </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1 custom-scrollbar">
           <p className="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Main Menu</p>
           {menuItems.map((item) => (
             <NavLink
               key={item.path}
               to={item.path}
               end={item.exact}
               onClick={() => window.innerWidth < 1024 && setSidebarOpen(false)}
               className={({ isActive }) =>
                 `flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                   isActive
                     ? 'bg-primary text-white shadow-lg shadow-primary/30'
                     : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                 }`
               }
             >
               <div className="flex items-center gap-3">
                 <item.icon className="h-5 w-5" />
                 <span>{item.label}</span>
               </div>
               {location.pathname === item.path && <ChevronRight className="w-4 h-4 opacity-50" />}
             </NavLink>
           ))}
        </nav>

        {/* Footer Sidebar */}
        <div className="p-4 border-t border-gray-100 dark:border-gray-800">
           <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 mb-3">
              <div className="flex items-center gap-3 mb-2">
                 <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                 <span className="text-xs font-bold text-gray-600 dark:text-gray-300">Hệ thống ổn định</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full overflow-hidden">
                 <div className="bg-green-500 h-full w-[98%]"></div>
              </div>
           </div>
           <button className="flex items-center w-full px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-colors">
             <LogOut className="h-4 w-4 mr-3" />
             Đăng xuất
           </button>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Top Header */}
        <header className="h-20 bg-white/80 dark:bg-[#1e293b]/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4 lg:px-8 z-30 sticky top-0">
           <div className="flex items-center gap-4">
             <button 
               onClick={() => setSidebarOpen(!isSidebarOpen)}
               className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-white transition-colors"
             >
               {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
             </button>
             <h2 className="text-xl font-bold text-gray-800 dark:text-white hidden sm:block">{currentTitle}</h2>
           </div>

           <div className="flex items-center gap-2 sm:gap-4">
              {/* Search Bar (Hidden on mobile) */}
              <div className="hidden md:flex items-center bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2 w-64 border border-transparent focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                 <Search className="w-4 h-4 text-gray-400 mr-2" />
                 <input type="text" placeholder="Tìm kiếm nhanh..." className="bg-transparent border-none outline-none text-sm w-full text-gray-700 dark:text-gray-200" />
              </div>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-500 dark:text-gray-400 relative"
              >
                {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </button>

              {/* Notifications */}
              <button className="p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-500 dark:text-gray-400 relative">
                 <Bell className="h-5 w-5" />
                 <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-[#1e293b]"></span>
              </button>
              
              {/* User Profile */}
              <div className="flex items-center gap-3 pl-2 sm:pl-4 border-l border-gray-200 dark:border-gray-700">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold text-gray-900 dark:text-white">Admin User</p>
                  <p className="text-[10px] uppercase font-bold text-primary">Super Admin</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-primary-dark p-[2px] cursor-pointer hover:scale-105 transition-transform">
                   <img src="https://ui-avatars.com/api/?name=Admin+User&background=random" alt="Admin" className="rounded-full bg-white h-full w-full object-cover" />
                </div>
              </div>
           </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8 scroll-smooth custom-scrollbar">
          <div className="max-w-7xl mx-auto">
             <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;