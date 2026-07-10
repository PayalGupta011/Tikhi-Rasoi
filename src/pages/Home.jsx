import Hero from '../components/home/Hero';
import SpecialOffers from '../components/home/SpecialOffers';
import MenuCategories from '../components/home/MenuCategories';
import PopularDishes from '../components/home/PopularDishes';
import FeaturesRow from '../components/home/FeaturesRow';
import GalleryPreview from '../components/home/GalleryPreview';
import Testimonials from '../components/home/Testimonials';
import ReservationCTA from '../components/home/ReservationCTA';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <SpecialOffers />
      <MenuCategories />
      <PopularDishes />
      <FeaturesRow />
      <GalleryPreview />
      <Testimonials />
      <ReservationCTA />
    </div>
  );
};

export default Home;
