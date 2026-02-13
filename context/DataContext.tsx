import React, { createContext, useContext, useState, useEffect } from 'react';
import { NewsItem, Product, CouncilMember, ResearchProject, GalleryImage, TrainingCourse } from '../types';

interface DataContextType {
  // Data
  news: NewsItem[];
  products: Product[];
  council: CouncilMember[];
  research: ResearchProject[];
  gallery: GalleryImage[];
  courses: TrainingCourse[];
  
  // Actions
  addNews: (item: NewsItem) => void;
  updateNews: (item: NewsItem) => void;
  deleteNews: (id: number) => void;

  addProduct: (item: Product) => void;
  updateProduct: (item: Product) => void;
  deleteProduct: (id: number) => void;

  addCouncilMember: (item: CouncilMember) => void;
  updateCouncilMember: (item: CouncilMember) => void;
  deleteCouncilMember: (id: number) => void;

  addResearch: (item: ResearchProject) => void;
  updateResearch: (item: ResearchProject) => void;
  deleteResearch: (id: number) => void;

  addGalleryImage: (item: GalleryImage) => void;
  deleteGalleryImage: (id: number) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// --- INITIAL MOCK DATA ---
const initialNews: NewsItem[] = [
  {
    id: 1,
    title: 'Tổ chức thành công Hội thảo Quốc gia về Tâm lý học đường lần thứ V',
    summary: 'Hội thảo quy tụ hơn 200 chuyên gia, nhà nghiên cứu và giảng viên từ các trường đại học hàng đầu, thảo luận về các giải pháp hỗ trợ sức khỏe tâm thần trong trường học.',
    content: `
      <p class="lead">Ngày 15/10/2023, Viện Tâm lý Ứng dụng đã phối hợp cùng Đại học Khoa học Xã hội & Nhân văn tổ chức thành công Hội thảo Quốc gia về Tâm lý học đường lần thứ V.</p>
      
      <h3>Bối cảnh và Mục tiêu</h3>
      <p>Trong bối cảnh áp lực học tập và các vấn đề sức khỏe tâm thần ở thanh thiếu niên ngày càng gia tăng, hội thảo được tổ chức nhằm tạo ra diễn đàn trao đổi học thuật, chia sẻ kinh nghiệm thực tiễn giữa các nhà nghiên cứu, chuyên gia tâm lý và đội ngũ giáo viên.</p>
      
      <img src="https://picsum.photos/seed/news_conf_detail/800/400" alt="Hội thảo" class="rounded-xl my-6 w-full object-cover" />

      <h3>Nội dung chính</h3>
      <p>Hội thảo tập trung vào 3 phiên thảo luận chính:</p>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li><strong>Phiên 1:</strong> Thực trạng sức khỏe tâm thần học sinh THPT hậu Covid-19.</li>
        <li><strong>Phiên 2:</strong> Mô hình phòng tham vấn tâm lý học đường: Kinh nghiệm quốc tế và bài học tại Việt Nam.</li>
        <li><strong>Phiên 3:</strong> Vai trò của gia đình trong việc hỗ trợ tâm lý cho trẻ vị thành niên.</li>
      </ul>

      <h3>Kết quả đạt được</h3>
      <p>Hội thảo đã nhận được hơn 50 bài tham luận chất lượng. Các đại biểu đã thống nhất đề xuất Bộ Giáo dục & Đào tạo xem xét ban hành quy chế cụ thể hơn về định biên nhân sự tâm lý trong trường phổ thông.</p>
      
      <p><em>Ban Truyền thông Viện Tâm lý Ứng dụng đưa tin.</em></p>
    `,
    category: 'Sự kiện',
    date: '2023-10-15',
    image: 'https://picsum.photos/seed/news_conf/800/600',
    status: 'published',
    views: 1250,
    featured: true,
    author: 'Ban Truyền Thông'
  },
  {
    id: 2,
    title: 'Khai giảng khóa tập huấn CBT cơ bản cho sinh viên tâm lý',
    summary: 'Khóa học cung cấp kiến thức nền tảng và kỹ năng thực hành liệu pháp nhận thức hành vi (CBT) dưới sự hướng dẫn của TS. Lê Văn C.',
    content: `
      <p>Nhằm nâng cao năng lực thực hành nghề nghiệp cho sinh viên và cử nhân tâm lý học, Viện Tâm lý Ứng dụng chính thức khai giảng khóa đào tạo: <strong>"Liệu pháp Nhận thức Hành vi (CBT) căn bản"</strong>.</p>
      
      <h3>Thông tin khóa học</h3>
      <ul>
        <li><strong>Giảng viên:</strong> TS. Lê Văn C - Chuyên gia trị liệu với 15 năm kinh nghiệm.</li>
        <li><strong>Thời lượng:</strong> 10 buổi (Lý thuyết kết hợp thực hành ca lâm sàng).</li>
        <li><strong>Hình thức:</strong> Trực tiếp tại trụ sở Viện.</li>
      </ul>

      <h3>Nội dung đào tạo</h3>
      <p>Học viên sẽ được tiếp cận mô hình ABC trong CBT, kỹ thuật tái cấu trúc nhận thức, và cách xây dựng kế hoạch can thiệp cho các rối loạn lo âu, trầm cảm nhẹ.</p>
      <p>Đây là bước đệm quan trọng để các nhà thực hành tâm lý tương lai nắm vững một trong những liệu pháp có bằng chứng khoa học mạnh mẽ nhất hiện nay.</p>
    `,
    category: 'Đào tạo',
    date: '2023-10-10',
    image: 'https://picsum.photos/seed/news_training/800/600',
    status: 'published',
    views: 890,
    featured: false,
    author: 'Phòng Đào tạo'
  },
  {
    id: 3,
    title: 'Lễ ký kết thỏa thuận hợp tác (MOU) với ĐH Sư phạm TP.HCM',
    summary: 'Hai bên thống nhất hợp tác trao đổi chuyên môn, tiếp nhận sinh viên thực tập và phối hợp thực hiện các đề tài nghiên cứu cấp Bộ.',
    content: `
      <p>Sáng nay, đại diện Viện Tâm lý Ứng dụng và Trường Đại học Sư phạm TP.HCM đã tiến hành ký kết biên bản ghi nhớ hợp tác (MOU) giai đoạn 2023-2028.</p>
      <img src="https://picsum.photos/seed/news_mou/800/600" class="rounded-xl my-4 w-full" />
      <p>Sự kiện đánh dấu bước phát triển mới trong mối quan hệ giữa cơ sở đào tạo và đơn vị ứng dụng thực tiễn. Theo đó, sinh viên khoa Tâm lý học sẽ có cơ hội kiến tập, thực tập và tham gia các dự án nghiên cứu thực tế tại Viện.</p>
    `,
    category: 'Hợp tác',
    date: '2023-10-05',
    image: 'https://picsum.photos/seed/news_mou/800/600',
    status: 'published',
    views: 2100,
    featured: false,
    author: 'Ban Hợp tác Quốc tế'
  }
];

const initialProducts: Product[] = [
  {
    id: 1,
    title: "PHÁT TRIỂN NGÔN NGỮ VÀ TƯ DUY CHO TRẺ TỪ 0 – 6 TUỔI",
    description: "Cẩm nang thiết yếu giúp cha mẹ và giáo viên nắm bắt các mốc phát triển quan trọng.",
    details: `
      <h3>Giới thiệu sách</h3>
      <p>Cuốn sách là kết quả của 5 năm nghiên cứu và thực hành lâm sàng của nhóm tác giả tại Viện Tâm lý Ứng dụng. Sách cung cấp lộ trình phát triển ngôn ngữ chuẩn cho trẻ em Việt Nam, đồng thời đưa ra hệ thống bài tập kích thích tư duy logic phù hợp với từng độ tuổi.</p>
      
      <h3>Mục lục tóm tắt</h3>
      <ul class="list-disc pl-5 space-y-1">
        <li>Chương 1: Các mốc phát triển ngôn ngữ (0-12 tháng, 1-3 tuổi, 3-6 tuổi).</li>
        <li>Chương 2: Dấu hiệu cảnh báo chậm nói và rối loạn ngôn ngữ.</li>
        <li>Chương 3: 100 Trò chơi phát triển tư duy tại nhà.</li>
        <li>Chương 4: Hướng dẫn cha mẹ tương tác hiệu quả cùng con.</li>
      </ul>
      
      <h3>Thông tin chi tiết</h3>
      <ul class="space-y-1 mt-2">
        <li><strong>Khổ sách:</strong> 16 x 24 cm</li>
        <li><strong>Số trang:</strong> 250 trang</li>
        <li><strong>Nhà xuất bản:</strong> ĐHQG TP.HCM</li>
      </ul>
    `,
    coverImage: "https://picsum.photos/seed/book_ngonngu/600/850",
    type: "textbook",
    status: "available",
    author: "ThS. Bùi Thị Hương (Chủ biên)",
    publishYear: 2022,
    price: 150000
  },
  {
    id: 2,
    title: "THỰC HÀNH DẠY TRẺ TỰ KỶ",
    description: "Tài liệu chuyên sâu hướng dẫn các phương pháp can thiệp sớm, kỹ thuật ABA.",
    details: `
      <h3>Nội dung chính</h3>
      <p>Cuốn sách tập trung vào các kỹ thuật can thiệp dựa trên Phân tích hành vi ứng dụng (ABA), được trình bày dưới dạng hướng dẫn thực hành từng bước (step-by-step). Đây là tài liệu gối đầu giường cho giáo viên giáo dục đặc biệt và phụ huynh có con rối loạn phổ tự kỷ.</p>
      <h3>Điểm nổi bật</h3>
      <p>Sách đi kèm bộ thẻ tranh (PECS) và video hướng dẫn mẫu qua mã QR Code.</p>
    `,
    coverImage: "https://picsum.photos/seed/book_tuky/600/850",
    type: "research",
    status: "available",
    author: "TS. Vũ Quang Hà",
    publishYear: 2021,
    price: 220000
  },
  {
    id: 3,
    title: "TUYỆT CHIÊU DẠY CON XUẤT CHÚNG",
    description: "Đúc kết những phương pháp giáo dục hiện đại, kết hợp tâm lý học hành vi.",
    details: `
      <h3>Giới thiệu</h3>
      <p>Không chỉ là lý thuyết, cuốn sách mang đến những câu chuyện thực tế về nuôi dạy con cái trong thời đại số. Làm sao để làm bạn cùng con? Làm sao để kỷ luật tích cực mà không dùng đòn roi?</p>
    `,
    coverImage: "https://picsum.photos/seed/book_xuatchung/600/850",
    type: "textbook",
    status: "available",
    author: "Tập thể tác giả IAP",
    publishYear: 2023,
    price: 180000
  },
  {
    id: 4,
    title: "BỘ CÔNG CỤ ĐÁNH GIÁ TÂM LÝ LÂM SÀNG TRẺ EM",
    description: "Tổng hợp các thang đo và bảng kiểm chuẩn hóa dành cho chẩn đoán nhi khoa.",
    details: "<p>Bộ công cụ bao gồm 10 thang đo quan trọng nhất trong đánh giá trẻ em...</p>",
    coverImage: "https://picsum.photos/seed/tool_clinical/600/850",
    type: "tool",
    status: "available",
    author: "Viện Tâm lý Ứng dụng",
    publishYear: 2024,
    price: 1500000
  }
];

const initialCouncil: CouncilMember[] = [
  { 
    id: 1, 
    name: "TS. GVCC. Vũ Quang Hà", 
    title: "Tiến sĩ", 
    role: "Cố vấn Chuyên môn", 
    image: "https://picsum.photos/seed/chairman_new/800/800", 
    bio: "Chuyên gia đầu ngành với hàng chục năm kinh nghiệm quản lý giáo dục và nghiên cứu khoa học." 
  },
  { 
    id: 2, 
    name: "ThS.NCS Bùi Thị Hương", 
    alias: "Bùi Ngát Hương",
    title: "Thạc sĩ, NCS", 
    role: "Viện trưởng", 
    image: "https://picsum.photos/seed/director_huong/800/1000", 
    bio: "Cố vấn Chuyên môn cho 8 Trung Tâm/Trường dạy trẻ trên toàn quốc. Tác giả 3 cuốn sách: Phát triển ngôn ngữ và tư duy cho trẻ từ 0 – 6 tuổi, Thực hành dạy trẻ tự kỷ, Tuyệt chiêu dạy con xuất chúng.",
    education: [
      "Nghiên cứu sinh ngành Quản lý giáo dục, Trường ĐH Khoa học Xã hội và Nhân văn TP.HCM.",
      "Thạc sỹ Tâm lý học – Học viện Khoa học Xã hội Việt Nam.",
      "Cử nhân ngành Tâm lý học, chuyên ngành Tham vấn và Trị liệu tâm lý – ĐH Văn Hiến TP. HCM."
    ],
    achievements: [
      "Bằng Khen của Hội tâm lý học Việt Nam: 'Đã có thành tích xuất sắc trong nghiên cứu và đào tạo tâm lý học' (2018).",
      "Giải thưởng Chu Văn An: 'Bảng vàng vì có thành tích xuất sắc trong đào tạo giáo dục thế hệ trẻ Việt Nam' (2014).",
      "Ủy viên BCH Hội Tâm lý Xã hội Việt Nam năm 2018."
    ],
    certificates: [
      "Chứng chỉ Nghiệp vụ sư phạm Lý luận dạy học và giáo dục",
      "Chứng chỉ Bồi dưỡng nghiệp vụ Sư phạm về Giáo dục hòa nhập",
      "Chứng chỉ Bồi dưỡng theo tiêu chuẩn chức danh nghề nghiệp giảng viên đại học",
      "Chứng nhận Test: Hướng dẫn sử dụng và diễn giải kết quả trắc nghiệm đánh giá trí tuệ WECHSLER cho trẻ em Việt Nam (ĐH Giáo Dục, 2016)",
      "Đánh giá Tâm lý cho trẻ Sử dụng Trắc nghiệm BAYLEY – III và YCAT (ĐH Sư Phạm Hà Nội, 2018)",
      "Hướng dẫn sử dụng và diễn giải kết quả thang VINELAND II (2018)",
      "Chứng nhận về Phân Tích hành vi Ứng dụng (ABA)",
      "Chứng chỉ đào tạo liên tục: Vai trò âm ngữ trị liệu trong lượng giá và can thiệp rối loạn nuốt/ăn uống",
      "Chứng nhận tập huấn về tham vấn trị liệu tâm lý, phương pháp dạy trẻ tự kỷ, can thiệp cho trẻ tăng động giảm chú ý (ADHD)."
    ],
    pressLinks: [
      { 
        title: "Người mang trái tim và tầm nhìn đến các trẻ em có nhu cầu đặc biệt", 
        url: "https://tintucngaymoi.vn/doanh-nghiep/diem-sang/ths-tam-ly-bui-ngat-huong-nguoi-mang-trai-tim-va-tam-nhin-den-cac-tre-em-co-nhu-cau-dac-biet-noi-rieng-va-tre-em-viet-nam.htm",
        source: "Tin Tức Ngày Mới"
      },
      {
        title: "Người phụ nữ mở cánh cửa giao tiếp cho trẻ đặc biệt",
        url: "https://giaoducthoidai.vn/nguoi-phu-nu-mo-canh-cua-giao-tiep-cho-tre-dac-biet-post760578.html",
        source: "Báo Giáo Dục & Thời Đại"
      }
    ]
  },
  { 
    id: 3, 
    name: "Bùi Thị Ngát", 
    title: "Cử nhân", 
    role: "Viện phó", 
    image: "https://ui-avatars.com/api/?name=Bui+Thi+Ngat&background=0D8ABC&color=fff&size=256", 
    bio: "Chuyên gia giàu kinh nghiệm trong lĩnh vực giáo dục đặc biệt và trị liệu ngôn ngữ.",
    education: [
      "Cử nhân Ngữ văn",
      "Cử nhân Tâm lý học"
    ],
    certificates: [
      "Nghiệp vụ sư phạm Lý luận dạy học và giáo dục",
      "Giáo dục đặc biệt",
      "Ngôn ngữ trị liệu dành cho trẻ tự kỷ",
      "Chuẩn bị cho trẻ vào lớp 1",
      "Quản lý giáo dục trường mầm non"
    ]
  },
  { id: 4, name: "PGS. TS. Trần Văn A", title: "Phó Giáo sư", role: "Thành viên Hội đồng", image: "https://ui-avatars.com/api/?name=Tran+Van+A&background=random", bio: "Chuyên gia Tâm lý học Xã hội" },
  { id: 5, name: "TS. Nguyễn Thị B", title: "Tiến sĩ", role: "Thành viên Hội đồng", image: "https://ui-avatars.com/api/?name=Nguyen+Thi+B&background=random", bio: "Chuyên gia Tâm lý học Phát triển" },
  { id: 6, name: "TS. Lê Văn C", title: "Tiến sĩ", role: "Thành viên Hội đồng", image: "https://ui-avatars.com/api/?name=Le+Van+C&background=random", bio: "Chuyên gia Tham vấn Trị liệu" }
];

const initialResearch: ResearchProject[] = [
  {
    id: 1,
    title: "Nghiên cứu mô hình can thiệp sớm cho trẻ rối loạn phổ tự kỷ tại TP.HCM",
    summary: "Đề tài cấp Thành phố, tập trung xây dựng quy trình sàng lọc và can thiệp sớm dựa trên mô hình Denver (ESDM).",
    description: "Nghiên cứu này tập trung vào việc áp dụng Mô hình Denver (ESDM) - một phương pháp can thiệp sớm toàn diện dựa trên bằng chứng khoa học cho trẻ tự kỷ từ 12-48 tháng tuổi. Mục tiêu là xây dựng bộ quy trình chuẩn hóa phù hợp với văn hóa và điều kiện thực tế tại Việt Nam.<br/><br/>Kết quả nghiên cứu cho thấy sự cải thiện rõ rệt về ngôn ngữ, nhận thức và kỹ năng xã hội của nhóm trẻ được can thiệp so với nhóm đối chứng.",
    leader: "TS. Vũ Quang Hà",
    members: "ThS. Bùi Thị Hương, CN. Nguyễn Văn A",
    status: "completed",
    year: "2022",
    category: "Tâm lý học Phát triển",
    image: "https://picsum.photos/seed/research_autism/800/600",
    pdfUrl: "#"
  },
  {
    id: 2,
    title: "Thực trạng sức khỏe tâm thần của học sinh THPT hậu COVID-19",
    summary: "Khảo sát trên 5000 học sinh tại các tỉnh phía Nam nhằm đánh giá mức độ lo âu, trầm cảm.",
    description: "Đại dịch COVID-19 đã để lại những hậu quả nặng nề không chỉ về thể chất mà còn về tinh thần. Đề tài tiến hành khảo sát diện rộng trên 5000 học sinh THPT tại TP.HCM, Bình Dương và Đồng Nai.<br/><br/>Số liệu cho thấy tỷ lệ học sinh có biểu hiện lo âu ở mức độ vừa và nặng chiếm 32.5%, trầm cảm là 18.2%. Nghiên cứu đề xuất các giải pháp tham vấn học đường cấp thiết.",
    leader: "ThS. Bùi Thị Hương",
    status: "completed",
    year: "2023",
    category: "Tâm lý học Đường",
    image: "https://picsum.photos/seed/research_covid/800/600",
    pdfUrl: "#"
  },
  {
    id: 3,
    title: "Xây dựng thang đo đánh giá trí tuệ cảm xúc (EQ) cho nhân sự quản lý",
    summary: "Nghiên cứu nhằm chuẩn hóa bộ công cụ đánh giá EQ phục vụ công tác tuyển dụng và đào tạo nhân sự.",
    description: "Trí tuệ cảm xúc (EQ) ngày càng được coi trọng trong môi trường doanh nghiệp. Đề tài tập trung việt hóa và chuẩn hóa thang đo EQ-i 2.0 trên mẫu 1000 nhân sự quản lý cấp trung.<br/><br/>Sản phẩm của đề tài là bộ công cụ trắc nghiệm trực tuyến có độ tin cậy cao, phục vụ đắc lực cho công tác HR.",
    leader: "PGS. TS. Trần Văn A",
    status: "ongoing",
    year: "2024",
    category: "Tâm lý học Tổ chức",
    image: "https://picsum.photos/seed/research_eq/800/600"
  }
];

const initialGallery: GalleryImage[] = [
  { id: 1, url: 'https://picsum.photos/seed/activity_1/800/600', caption: 'Lễ Khai trương Viện' },
  { id: 2, url: 'https://picsum.photos/seed/activity_2/800/600', caption: 'Hội thảo Khoa học 2023' },
  { id: 3, url: 'https://picsum.photos/seed/activity_3/800/600', caption: 'Tập huấn Chuyên môn' },
  { id: 4, url: 'https://picsum.photos/seed/activity_4/800/600', caption: 'Hoạt động Trị liệu nhóm' },
  { id: 5, url: 'https://picsum.photos/seed/activity_5/800/600', caption: 'Tham quan cơ sở vật chất' },
  { id: 6, url: 'https://picsum.photos/seed/activity_6/800/600', caption: 'Ký kết hợp tác quốc tế' },
];

const initialCourses: TrainingCourse[] = [
  {
    id: 1,
    title: "Kỹ năng Tham vấn & Trị liệu Tâm lý Căn bản",
    instructor: "TS. Lê Văn C",
    startDate: "15/05/2024",
    duration: "10 buổi",
    location: "Viện Tâm lý Ứng dụng (Offline)",
    image: "https://picsum.photos/seed/course_1/800/600",
    description: "Khóa học trang bị các kỹ năng cốt lõi cho nhà tham vấn: Lắng nghe, thấu cảm, đặt câu hỏi và xây dựng liên minh trị liệu. Phù hợp cho sinh viên năm cuối và người mới bắt đầu.",
    status: "upcoming",
    fee: "3.500.000 VNĐ"
  },
  {
    id: 2,
    title: "Ứng dụng Liệu pháp Nhận thức Hành vi (CBT) trong Trầm cảm",
    instructor: "ThS. Bùi Thị Hương",
    startDate: "01/04/2024",
    duration: "8 buổi",
    location: "Online qua Zoom",
    image: "https://picsum.photos/seed/course_2/800/600",
    description: "Đi sâu vào kỹ thuật CBT để nhận diện và thay đổi các niềm tin cốt lõi tiêu cực. Phân tích ca lâm sàng thực tế.",
    status: "ongoing",
    fee: "4.000.000 VNĐ"
  },
  {
    id: 3,
    title: "Đánh giá và Can thiệp Rối loạn Phổ Tự kỷ (ASD)",
    instructor: "TS. Vũ Quang Hà",
    startDate: "10/01/2024",
    duration: "12 buổi",
    location: "Viện Tâm lý Ứng dụng",
    image: "https://picsum.photos/seed/course_3/800/600",
    description: "Hướng dẫn sử dụng các công cụ sàng lọc M-CHAT, CARS và xây dựng kế hoạch can thiệp cá nhân (IEP).",
    status: "completed",
    fee: "5.000.000 VNĐ"
  }
];

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [news, setNews] = useState<NewsItem[]>(() => {
    const saved = localStorage.getItem('iap_news');
    return saved ? JSON.parse(saved) : initialNews;
  });
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('iap_products');
    return saved ? JSON.parse(saved) : initialProducts;
  });
  const [council, setCouncil] = useState<CouncilMember[]>(() => {
    const saved = localStorage.getItem('iap_council');
    return saved ? JSON.parse(saved) : initialCouncil;
  });
  const [research, setResearch] = useState<ResearchProject[]>(() => {
    const saved = localStorage.getItem('iap_research');
    return saved ? JSON.parse(saved) : initialResearch;
  });
  const [gallery, setGallery] = useState<GalleryImage[]>(() => {
    const saved = localStorage.getItem('iap_gallery');
    return saved ? JSON.parse(saved) : initialGallery;
  });
  const [courses, setCourses] = useState<TrainingCourse[]>(() => {
    const saved = localStorage.getItem('iap_courses');
    return saved ? JSON.parse(saved) : initialCourses;
  });

  // Persist to localStorage
  useEffect(() => { localStorage.setItem('iap_news', JSON.stringify(news)); }, [news]);
  useEffect(() => { localStorage.setItem('iap_products', JSON.stringify(products)); }, [products]);
  useEffect(() => { localStorage.setItem('iap_council', JSON.stringify(council)); }, [council]);
  useEffect(() => { localStorage.setItem('iap_research', JSON.stringify(research)); }, [research]);
  useEffect(() => { localStorage.setItem('iap_gallery', JSON.stringify(gallery)); }, [gallery]);
  useEffect(() => { localStorage.setItem('iap_courses', JSON.stringify(courses)); }, [courses]);

  // --- ACTIONS ---

  // News
  const addNews = (item: NewsItem) => setNews(prev => [item, ...prev]);
  const updateNews = (item: NewsItem) => setNews(prev => prev.map(n => n.id === item.id ? item : n));
  const deleteNews = (id: number) => setNews(prev => prev.filter(n => n.id !== id));

  // Products
  const addProduct = (item: Product) => setProducts(prev => [item, ...prev]);
  const updateProduct = (item: Product) => setProducts(prev => prev.map(p => p.id === item.id ? item : p));
  const deleteProduct = (id: number) => setProducts(prev => prev.filter(p => p.id !== id));

  // Council
  const addCouncilMember = (item: CouncilMember) => setCouncil(prev => [...prev, item]);
  const updateCouncilMember = (item: CouncilMember) => setCouncil(prev => prev.map(c => c.id === item.id ? item : c));
  const deleteCouncilMember = (id: number) => setCouncil(prev => prev.filter(c => c.id !== id));

  // Research
  const addResearch = (item: ResearchProject) => setResearch(prev => [item, ...prev]);
  const updateResearch = (item: ResearchProject) => setResearch(prev => prev.map(r => r.id === item.id ? item : r));
  const deleteResearch = (id: number) => setResearch(prev => prev.filter(r => r.id !== id));

  // Gallery
  const addGalleryImage = (item: GalleryImage) => setGallery(prev => [item, ...prev]);
  const deleteGalleryImage = (id: number) => setGallery(prev => prev.filter(g => g.id !== id));

  return (
    <DataContext.Provider value={{
      news, products, council, research, gallery, courses,
      addNews, updateNews, deleteNews,
      addProduct, updateProduct, deleteProduct,
      addCouncilMember, updateCouncilMember, deleteCouncilMember,
      addResearch, updateResearch, deleteResearch,
      addGalleryImage, deleteGalleryImage
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
