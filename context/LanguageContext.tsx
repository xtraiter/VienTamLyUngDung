import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'vi' | 'en';

type Translations = {
  [key: string]: {
    [key: string]: string;
  };
};

const translations: Translations = {
  vi: {
    // Header & Nav
    "nav.home": "Trang chủ",
    "nav.about": "Về Viện",
    "nav.about.intro": "Giới thiệu chung",
    "nav.about.structure": "Cơ cấu tổ chức",
    "nav.research_training": "Nghiên cứu & Đào tạo",
    "nav.research.topics": "Đề tài Nghiên cứu",
    "nav.training": "Chương trình Tập huấn",
    "nav.cooperation": "Hợp tác Phát triển",
    "nav.resources": "Tài nguyên & Ấn phẩm",
    "nav.books": "Thư viện Sách",
    "nav.tools": "Công cụ Trắc nghiệm",
    "nav.gallery": "Thư viện Ảnh",
    "nav.news": "Tin tức",
    "nav.news.activities": "Tin hoạt động",
    "nav.news.events": "Sự kiện",
    "nav.news.articles": "Bài viết chuyên môn",
    "nav.contact": "Liên hệ",
    "header.slogan": "Khoa học cho cuộc sống hạnh phúc",
    "header.title": "VIỆN TÂM LÝ ỨNG DỤNG",
    "header.subtitle": "Institute of Applied Psychology",

    // Home Hero
    "hero.tagline": "VIỆN TÂM LÝ ỨNG DỤNG - IAP",
    "hero.title": "Nghiên cứu Khoa học & Ứng dụng Thực tiễn",
    "hero.desc": "Tiên phong nghiên cứu, đào tạo và trị liệu tâm lý vì sự phát triển toàn diện của con người.",
    "btn.intro": "Giới thiệu",
    "btn.contact": "Liên hệ",
    "stat.years": "Năm hoạt động",
    "stat.research": "Công trình NCKH",
    "stat.partners": "Đối tác chiến lược",
    "stat.clients": "Khách hàng/năm",

    // Home: Core Values (New)
    "sect.values": "Giá trị Cốt lõi",
    "val.science": "Khoa học",
    "val.science.desc": "Nền tảng dựa trên bằng chứng.",
    "val.dedication": "Tận tâm",
    "val.dedication.desc": "Vì sức khỏe tinh thần cộng đồng.",
    "val.pro": "Chuyên nghiệp",
    "val.pro.desc": "Minh bạch, hiệu quả và bảo mật.",

    // Home: Research Highlights (New)
    "sect.research_highlight": "Nghiên cứu Nổi bật",
    "btn.view_research": "Xem tất cả",

    // Sections
    "sect.news": "Tin tức & Sự kiện",
    "btn.view_all": "Xem tất cả",
    "sect.about": "Về Viện Tâm lý Ứng dụng",
    "about.desc": "Viện Tâm lý Ứng dụng là đơn vị khoa học công nghệ hoạt động chuyên sâu trong lĩnh vực tâm lý học, kết hợp chặt chẽ giữa nghiên cứu hàn lâm và ứng dụng thực tiễn.",
    "about.li1": "Nghiên cứu khoa học tâm lý giáo dục.",
    "about.li2": "Đào tạo, bồi dưỡng nhân lực chuyên môn.",
    "about.li3": "Tham vấn, trị liệu và can thiệp rối loạn.",
    "btn.learn_more": "Tìm hiểu thêm",
    "sect.fields": "Lĩnh vực hoạt động",
    "field.research": "Nghiên cứu",
    "field.research.desc": "Thực hiện các đề tài khoa học cấp Bộ và Nhà nước.",
    "field.training": "Đào tạo",
    "field.training.desc": "Tập huấn kỹ năng chuyên môn cho nhân sự ngành.",
    "field.therapy": "Trị liệu",
    "field.therapy.desc": "Đánh giá và can thiệp tâm lý lâm sàng chuẩn mực.",
    "field.publish": "Xuất bản",
    "field.publish.desc": "Biên soạn sách và tài liệu hướng dẫn chuyên sâu.",
    "sect.publications": "Ấn phẩm & Tư liệu",
    "btn.view_library": "Xem thư viện",
    "sect.council": "Hội đồng Khoa học",
    "council.subtitle": "Đội ngũ chuyên gia uy tín hàng đầu",
    "btn.view_council": "Xem danh sách",

    // Footer
    "footer.desc": "Đơn vị trực thuộc Liên hiệp Khoa học Kinh tế - Đô thị Nam Bộ. Tiên phong trong nghiên cứu và ứng dụng khoa học tâm lý tại Việt Nam.",
    "footer.intro": "Giới thiệu",
    "footer.expertise": "Chuyên môn",
    "footer.contact": "Liên hệ",
    "footer.address": "Trụ sở: 286/5 Thống Nhất, P. An Hội Đông, TP.HCM",
    "footer.working_hours": "Thứ 2 - Thứ 7: 8:00 - 17:30",
    "footer.copyright": "Bản quyền thuộc về Viện Tâm lý Ứng dụng.",
    "footer.link.about": "Về chúng tôi",
    "footer.link.structure": "Cơ cấu tổ chức",
    "footer.link.partners": "Đối tác chiến lược",
    "footer.link.careers": "Tuyển dụng",
    "footer.link.research": "Nghiên cứu khoa học",
    "footer.link.training": "Đào tạo & Tập huấn",
    "footer.link.therapy": "Tham vấn trị liệu",
    "footer.link.library": "Thư viện ấn phẩm",
    "footer.link.news": "Tin tức sự kiện",
    
    // News Page
    "news.search": "Tìm kiếm...",
    "news.categories": "Danh mục",
    "news.featured": "Tiêu điểm",
    "news.latest": "Mới nhất",
    "news.read_more": "Chi tiết",
    "news.no_result": "Không tìm thấy nội dung.",
  },
  en: {
    // Header & Nav
    "nav.home": "Home",
    "nav.about": "About Us",
    "nav.about.intro": "Overview",
    "nav.about.structure": "Structure",
    "nav.research_training": "Research & Training",
    "nav.research.topics": "Research Projects",
    "nav.training": "Training Programs",
    "nav.cooperation": "Cooperation",
    "nav.resources": "Resources",
    "nav.books": "Book Library",
    "nav.tools": "Psych Tools",
    "nav.gallery": "Gallery",
    "nav.news": "News",
    "nav.news.activities": "Activities",
    "nav.news.events": "Events",
    "nav.news.articles": "Articles",
    "nav.contact": "Contact",
    "header.slogan": "Science for a happy life",
    "header.title": "INSTITUTE OF APPLIED PSYCHOLOGY",
    "header.subtitle": "Institute of Applied Psychology",

    // Home Hero
    "hero.tagline": "INSTITUTE OF APPLIED PSYCHOLOGY",
    "hero.title": "Scientific Research & Practical Application",
    "hero.desc": "Pioneering in psychological research, training, and therapy for comprehensive human development.",
    "btn.intro": "Introduction",
    "btn.contact": "Contact",
    "stat.years": "Years",
    "stat.research": "Projects",
    "stat.partners": "Partners",
    "stat.clients": "Clients",

    // Home: Core Values (New)
    "sect.values": "Core Values",
    "val.science": "Science",
    "val.science.desc": "Evidence-based foundation.",
    "val.dedication": "Dedication",
    "val.dedication.desc": "Prioritizing mental health.",
    "val.pro": "Professionalism",
    "val.pro.desc": "Transparent and effective.",

    // Home: Research Highlights (New)
    "sect.research_highlight": "Research Highlights",
    "btn.view_research": "View All",

    // Sections
    "sect.news": "News & Events",
    "btn.view_all": "View All",
    "sect.about": "About IAP",
    "about.desc": "The Institute of Applied Psychology operates deeply in the field of psychology, closely combining academic research and practical application.",
    "about.li1": "Psychological scientific research.",
    "about.li2": "Professional training.",
    "about.li3": "Therapy and intervention.",
    "btn.learn_more": "Learn more",
    "sect.fields": "Key Areas",
    "field.research": "Research",
    "field.research.desc": "Conducting scientific projects.",
    "field.training": "Training",
    "field.training.desc": "Professional skill training.",
    "field.therapy": "Therapy",
    "field.therapy.desc": "Clinical assessment and intervention.",
    "field.publish": "Publishing",
    "field.publish.desc": "Books and materials.",
    "sect.publications": "Publications",
    "btn.view_library": "Library",
    "sect.council": "Scientific Council",
    "council.subtitle": "Leading experts",
    "btn.view_council": "View List",

    // Footer
    "footer.desc": "Pioneering in research and application of psychological science in Vietnam.",
    "footer.intro": "Intro",
    "footer.expertise": "Expertise",
    "footer.contact": "Contact",
    "footer.address": "HQ: 286/5 Thong Nhat, HCMC",
    "footer.working_hours": "Mon - Sat: 8:00 - 17:30",
    "footer.copyright": "© Institute of Applied Psychology.",
    "footer.link.about": "About Us",
    "footer.link.structure": "Structure",
    "footer.link.partners": "Partners",
    "footer.link.careers": "Careers",
    "footer.link.research": "Research",
    "footer.link.training": "Training",
    "footer.link.therapy": "Therapy",
    "footer.link.library": "Library",
    "footer.link.news": "News",

    // News Page
    "news.search": "Search...",
    "news.categories": "Categories",
    "news.featured": "Featured",
    "news.latest": "Latest",
    "news.read_more": "Read more",
    "news.no_result": "No content found.",
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('vi');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};