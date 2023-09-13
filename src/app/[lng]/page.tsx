import AsteroidEntryGroup from '@/components/AsteroidEntryGroup/AsteroidEntryGroup';
import styles from './page.module.css';

export default function Home({ params: { lng } }: { params: { lng: string } }) {
  return (
    <main>
      <AsteroidEntryGroup lng={lng} />
    </main>
  );
}
