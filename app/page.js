import HeroSlider from './components/HeroSlider';
import EidSection from './components/EidSection';
import FalgunSection from './components/FalgunSection';
import TrendingNow from './components/TrendingNow';
import CollectionGrid from './components/CollectionGrid';
import LookbookGallery from './components/LookbookGallery';

export const metadata = {
  title: 'Zerin Heritage | Luxury South Asian Fashion & Heritage Wear',
  description: 'Explore Zerin Heritage for exclusive, high-fashion sarees, kurtis, and accessories. Experience timeless elegance with our handcrafted collections for Eid, Falgun, and special occasions.',
  alternates: {
    canonical: 'https://zerin-heritage.vercel.app',
  },
  openGraph: {
    title: 'Zerin Heritage | Luxury South Asian Fashion & Heritage Wear',
    description: 'Explore Zerin Heritage for exclusive, high-fashion sarees, kurtis, and accessories. Experience timeless elegance with our handcrafted collections for Eid, Falgun, and special occasions.',
    url: 'https://zerin-heritage.vercel.app',
    images: [
      {
        url: 'https://zerin-heritage.vercel.app/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Zerin Heritage - Premium Collections',
        type: 'image/jpeg',
      }
    ],
  },
};

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <HeroSlider />
      <EidSection />
      <FalgunSection />
      <TrendingNow />
      <CollectionGrid />
      <LookbookGallery />
    </main>
  );
}
