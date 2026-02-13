import React, { useState } from 'react';
import { Save, Globe, Phone, Mail, MapPin, Facebook, Youtube } from 'lucide-react';
import { SiteSettings } from '../../types';

const SettingsManager: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings>({
    siteName: 'VIỆN TÂM LÝ ỨNG DỤNG',
    email: 'vientamlyungdung@gmail.com',
    phone: '0986 77 6878',
    address: '286/5 Thống Nhất, phường An Hội Đông, Thành phố Hồ Chí Minh',
    facebookUrl: 'https://facebook.com/vientamlyungdung',
    youtubeUrl: 'https://youtube.com'
  });

  const handleChange = (key: keyof SiteSettings, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Đã lưu cấu hình hệ thống thành công!");
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Cấu hình Hệ thống</h1>
      
      <form onSubmit={handleSave} className="space-y-8">
        {/* General Info */}
        <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
           <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <Globe className="w-5 h-5 mr-2 text-primary" /> Thông tin chung
           </h2>
           <div className="space-y-4">
              <div>
                 <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Tên Website / Tổ chức</label>
                 <input type="text" className="w-full p-2.5 rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-black/20 dark:text-white" value={settings.siteName} onChange={(e) => handleChange('siteName', e.target.value)} />
              </div>
           </div>
        </div>

        {/* Contact Info */}
        <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
           <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-red-500" /> Thông tin liên hệ
           </h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                 <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Hotline</label>
                 <div className="relative">
                    <Phone className="absolute top-3 left-3 w-4 h-4 text-gray-400" />
                    <input type="text" className="w-full pl-10 p-2.5 rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-black/20 dark:text-white" value={settings.phone} onChange={(e) => handleChange('phone', e.target.value)} />
                 </div>
              </div>
              <div>
                 <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Email</label>
                 <div className="relative">
                    <Mail className="absolute top-3 left-3 w-4 h-4 text-gray-400" />
                    <input type="email" className="w-full pl-10 p-2.5 rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-black/20 dark:text-white" value={settings.email} onChange={(e) => handleChange('email', e.target.value)} />
                 </div>
              </div>
              <div className="md:col-span-2">
                 <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Địa chỉ trụ sở</label>
                 <input type="text" className="w-full p-2.5 rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-black/20 dark:text-white" value={settings.address} onChange={(e) => handleChange('address', e.target.value)} />
              </div>
           </div>
        </div>

        {/* Social Media */}
        <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
           <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <Facebook className="w-5 h-5 mr-2 text-blue-600" /> Mạng xã hội
           </h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                 <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Facebook Fanpage URL</label>
                 <input type="text" className="w-full p-2.5 rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-black/20 dark:text-white" value={settings.facebookUrl} onChange={(e) => handleChange('facebookUrl', e.target.value)} />
              </div>
              <div>
                 <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Youtube Channel URL</label>
                 <input type="text" className="w-full p-2.5 rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-black/20 dark:text-white" value={settings.youtubeUrl} onChange={(e) => handleChange('youtubeUrl', e.target.value)} />
              </div>
           </div>
        </div>

        <div className="flex justify-end">
           <button type="submit" className="px-8 py-3 bg-primary text-white font-bold rounded-xl hover:bg-blue-600 shadow-lg shadow-primary/30 flex items-center">
              <Save className="w-5 h-5 mr-2" /> Lưu thay đổi
           </button>
        </div>
      </form>
    </div>
  );
};

export default SettingsManager;