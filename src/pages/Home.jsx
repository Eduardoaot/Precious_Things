import HeroCarousel from '../components/HeroCarousel';
import Ribbon from '../components/Ribbon';
import Highlights from '../components/Highlights';
import Collection from '../components/Collection';
import Reviews from '../components/Reviews';

export default function Home() {
  return (
    <main>
      <HeroCarousel />
      <Ribbon tone="brown" id="cinta" />
      <Highlights />
      <Ribbon tone="green" />
      <Collection />
      <Reviews />
    </main>
  );
}
