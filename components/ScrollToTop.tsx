import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Add a small delay (50ms) to allow the Mobile Menu close animation 
    // and the body scroll unlock to finish BEFORE we try to scroll to top.
    // This fixes the issue where the page stays scrolled down on mobile after navigation.
    const timer = setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant' 
      });
    }, 50);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
