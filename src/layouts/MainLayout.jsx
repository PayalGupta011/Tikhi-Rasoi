import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import AuthModal from '../components/common/AuthModal';
import MobileNav from '../components/common/MobileNav';
import CartDrawer from '../components/cart/CartDrawer';
import SearchModal from '../components/common/SearchModal';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background text-gray-text font-body relative pb-16 md:pb-0">
      <Navbar />
      
      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
      <SearchModal />
      <CartDrawer />
      <AuthModal />
      <MobileNav />
    </div>
  );
};

export default MainLayout;
