import React from 'react';
import { Users, FileText, Eye, TrendingUp, Calendar, ArrowUpRight, Microscope, BookOpen, Clock, Activity, MoreHorizontal, Image as ImageIcon } from 'lucide-react';
import ScrollReveal from '../../components/ScrollReveal';
import { useData } from '../../context/DataContext';

const Dashboard: React.FC = () => {
  const { news, products, research, council } = useData();

  // Calculate real stats
  const totalNews = news.length;
  const totalViews = news.reduce((acc, curr) => acc + (curr.views || 0), 0);
  const totalProducts = products.length;
  const totalResearch = research.length;
  const totalStaff = council.length;

  const stats = [
    { title: 'Tổng bài viết', value: totalNews, change: '+12%', sub: 'so với tháng trước', icon: FileText, color: 'text-primary', bg: 'bg-primary' },
    { title: 'Lượt truy cập', value: totalViews.toLocaleString(), change: '+24%', sub: 'đang tăng trưởng', icon: Eye, color: 'text-green-500', bg: 'bg-green-500' },
    { title: 'Ấn phẩm', value: totalProducts, change: '+5', sub: 'mới cập nhật', icon: BookOpen, color: 'text-purple-500', bg: 'bg-purple-500' },
    { title: 'Đề tài Nghiên cứu', value: totalResearch, change: '12', sub: 'đang thực hiện', icon: Microscope, color: 'text-orange-500', bg: 'bg-orange-500' },
  ];

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
        <div>
           <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Dashboard Overview</h1>
           <p className="text-gray-500 dark:text-gray-400 mt-2 flex items-center">
              <Calendar className="w-4 h-4 mr-2" /> Hôm nay, {new Date().toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
           </p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white dark:bg-[#1e293b] text-gray-700 dark:text-gray-200 font-medium rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
             Làm mới
          </button>
          <button className="flex items-center px-4 py-2 bg-primary text-white font-medium rounded-xl hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20">
             <TrendingUp className="h-4 w-4 mr-2" />
             Xuất báo cáo
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <ScrollReveal key={index} delay={index * 100}>
            <div className="bg-white dark:bg-[#1e293b] rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-all group">
              <div className="flex items-start justify-between mb-4">
                <div>
                   <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.title}</p>
                   <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-1 group-hover:scale-105 transition-transform origin-left">{stat.value}</h3>
                </div>
                <div className={`p-3 rounded-xl ${stat.bg} bg-opacity-10 dark:bg-opacity-20`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
              <div className="flex items-center text-xs">
                 <span className={`flex items-center font-bold ${stat.color} bg-opacity-10 px-2 py-0.5 rounded-full mr-2`}>
                    <ArrowUpRight className="h-3 w-3 mr-1" /> {stat.change}
                 </span>
                 <span className="text-gray-400">{stat.sub}</span>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Charts & Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart Area (Simulated) */}
        <div className="lg:col-span-2 space-y-8">
           {/* Chart Card */}
           <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
              <div className="flex items-center justify-between mb-6">
                 <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
                    <Activity className="w-5 h-5 mr-2 text-primary" /> Thống kê truy cập
                 </h2>
                 <select className="bg-gray-50 dark:bg-gray-800 border-none text-xs font-bold rounded-lg px-3 py-1 outline-none text-gray-600 dark:text-gray-300 cursor-pointer">
                    <option>7 ngày qua</option>
                    <option>Tháng này</option>
                    <option>Năm nay</option>
                 </select>
              </div>
              
              {/* CSS Bar Chart Simulation */}
              <div className="h-64 flex items-end justify-between gap-2 md:gap-4 px-2">
                 {[40, 65, 45, 80, 55, 90, 70, 60, 85, 50, 75, 95].map((height, i) => (
                    <div key={i} className="w-full bg-gray-100 dark:bg-gray-800 rounded-t-lg relative group">
                       <div 
                          className="absolute bottom-0 left-0 right-0 bg-primary/80 group-hover:bg-primary rounded-t-lg transition-all duration-500"
                          style={{ height: `${height}%` }}
                       ></div>
                       {/* Tooltip */}
                       <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                          {height * 10} views
                       </div>
                    </div>
                 ))}
              </div>
              <div className="flex justify-between mt-4 text-xs text-gray-400 font-medium px-2">
                 <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
                 <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
              </div>
           </div>

           {/* Recent Articles Table */}
           <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
               <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">Bài viết mới nhất</h2>
                  <button className="text-sm text-primary font-bold hover:underline">Xem tất cả</button>
               </div>
               <div className="overflow-x-auto">
                  <table className="w-full text-left">
                     <thead className="bg-gray-50 dark:bg-gray-800/50">
                        <tr>
                           <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase">Tiêu đề</th>
                           <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase">Danh mục</th>
                           <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase">Ngày đăng</th>
                           <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase">Trạng thái</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                        {news.slice(0, 5).map((item) => (
                           <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                              <td className="px-6 py-4">
                                 <div className="flex items-center gap-3">
                                    <img src={item.image} alt="" className="w-10 h-10 rounded-lg object-cover" />
                                    <span className="font-medium text-gray-900 dark:text-white text-sm line-clamp-1 max-w-[200px]">{item.title}</span>
                                 </div>
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-500">{item.category}</td>
                              <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{item.date}</td>
                              <td className="px-6 py-4">
                                 <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                                    item.status === 'published' 
                                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                                    : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                                 }`}>
                                    {item.status === 'published' ? 'Đã đăng' : 'Bản nháp'}
                                 </span>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
           </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-8">
           {/* System Status */}
           <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                 <Microscope className="w-24 h-24" />
              </div>
              <h2 className="text-lg font-bold mb-1">Trạng thái Hệ thống</h2>
              <p className="text-blue-200 text-sm mb-6">Mọi thứ đang hoạt động ổn định.</p>
              
              <div className="space-y-4">
                 <div className="flex justify-between text-sm mb-1">
                    <span>Server Load</span>
                    <span className="font-bold">24%</span>
                 </div>
                 <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-green-400 h-full w-[24%]"></div>
                 </div>

                 <div className="flex justify-between text-sm mb-1">
                    <span>Database</span>
                    <span className="font-bold">45%</span>
                 </div>
                 <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-blue-400 h-full w-[45%]"></div>
                 </div>

                 <div className="flex justify-between text-sm mb-1">
                    <span>Storage</span>
                    <span className="font-bold">78%</span>
                 </div>
                 <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-orange-400 h-full w-[78%]"></div>
                 </div>
              </div>
           </div>

           {/* Quick Actions */}
           <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Thao tác nhanh</h2>
              <div className="grid grid-cols-2 gap-4">
                 {[
                    { label: 'Thêm bài viết', icon: FileText, color: 'text-primary', bg: 'bg-primary bg-opacity-10 dark:bg-opacity-20' },
                    { label: 'Thêm nhân sự', icon: Users, color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20' },
                    { label: 'Tải ảnh lên', icon: ImageIcon, color: 'text-pink-500', bg: 'bg-pink-50 dark:bg-pink-900/20' },
                    { label: 'Cấu hình', icon: MoreHorizontal, color: 'text-gray-500', bg: 'bg-gray-50 dark:bg-gray-800' },
                 ].map((action, i) => (
                    <button key={i} className={`flex flex-col items-center justify-center p-4 rounded-xl ${action.bg} hover:opacity-80 transition-opacity`}>
                       <action.icon className={`w-6 h-6 ${action.color} mb-2`} />
                       <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{action.label}</span>
                    </button>
                 ))}
              </div>
           </div>

           {/* Recent Log */}
           <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Nhật ký hoạt động</h2>
              <div className="space-y-6">
                 {[
                    { text: 'Đã cập nhật bài viết "Hội thảo 2023"', time: '5 phút trước', user: 'Admin' },
                    { text: 'Thêm mới thành viên Hội đồng', time: '2 giờ trước', user: 'Admin' },
                    { text: 'Đăng tải 3 ảnh mới vào thư viện', time: '5 giờ trước', user: 'Editor' },
                 ].map((log, i) => (
                    <div key={i} className="flex gap-3 relative pl-4 border-l border-gray-200 dark:border-gray-700">
                       <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-gray-300 dark:bg-gray-600 ring-4 ring-white dark:ring-[#1e293b]"></div>
                       <div>
                          <p className="text-sm text-gray-800 dark:text-gray-200">{log.text}</p>
                          <p className="text-xs text-gray-500 mt-1">{log.user} • {log.time}</p>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
