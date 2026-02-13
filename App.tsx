import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { DataProvider } from './context/DataContext';
import { LanguageProvider } from './context/LanguageContext';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import AdminLayout from './components/AdminLayout';
import ScrollToTop from './components/ScrollToTop';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Council from './pages/Council';
import Products from './pages/Products';
import Partnership from './pages/Partnership';
import Contact from './pages/Contact';
import News from './pages/News';
import Research from './pages/Research';
import Training from './pages/Training';
import Gallery from './pages/Gallery';
import Recruitment from './pages/Recruitment';

// Detail Pages
import NewsDetail from './pages/NewsDetail';
import ProductDetail from './pages/ProductDetail';

// New Dedicated Pages
import Books from './pages/Books';
import Tools from './pages/Tools';
import Events from './pages/Events';
import Articles from './pages/Articles';
import Activities from './pages/Activities';

// Admin Pages
import Dashboard from './pages/admin/Dashboard';
import NewsManager from './pages/admin/NewsManager';
import ProductManager from './pages/admin/ProductManager';
import StaffManager from './pages/admin/StaffManager';
import ResearchManager from './pages/admin/ResearchManager';
import SettingsManager from './pages/admin/SettingsManager';
import GalleryManager from './pages/admin/GalleryManager';

const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-[#1A1A1A] transition-colors duration-300 flex flex-col font-sans">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gioi-thieu" element={<About />} />
          <Route path="/hoi-dong" element={<Council />} />
          <Route path="/nghien-cuu" element={<Research />} />
          <Route path="/dao-tao" element={<Training />} />
          
          <Route path="/tin-tuc" element={<News />} />
          <Route path="/tin-tuc/:id" element={<NewsDetail />} /> {/* Updated Route */}
          
          <Route path="/san-pham" element={<Products />} />
          <Route path="/san-pham/:id" element={<ProductDetail />} /> {/* New Route */}
          
          <Route path="/thu-vien" element={<Gallery />} />
          <Route path="/hop-tac" element={<Partnership />} />
          <Route path="/lien-he" element={<Contact />} />
          <Route path="/tuyen-dung" element={<Recruitment />} />
          
          {/* New Dedicated Routes */}
          <Route path="/sach" element={<Books />} />
          <Route path="/cong-cu" element={<Tools />} />
          <Route path="/su-kien" element={<Events />} />
          <Route path="/bai-viet" element={<Articles />} />
          <Route path="/tin-hoat-dong" element={<Activities />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <DataProvider>
          <CartProvider>
            <Router>
              <ScrollToTop />
              <Routes>
                {/* Admin Routes */}
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="news" element={<NewsManager />} />
                  <Route path="products" element={<ProductManager />} />
                  <Route path="staff" element={<StaffManager />} />
                  <Route path="research" element={<ResearchManager />} />
                  <Route path="gallery" element={<GalleryManager />} />
                  <Route path="settings" element={<SettingsManager />} />
                </Route>

                {/* Public Routes */}
                <Route path="/*" element={<PublicLayout />} />
              </Routes>
            </Router>
          </CartProvider>
        </DataProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
};

export default App;