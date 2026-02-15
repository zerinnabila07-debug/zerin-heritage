import HeroSlider from './components/HeroSlider';
import EidSection from './components/EidSection';
import FalgunSection from './components/FalgunSection';
import TrendingNow from './components/TrendingNow';
import CollectionGrid from './components/CollectionGrid';
import LookbookGallery from './components/LookbookGallery';

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
