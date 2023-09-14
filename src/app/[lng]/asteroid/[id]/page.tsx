import { useTranslation } from '@/app/i18n';
import AsteroidEntryGroup from '@/components/AsteroidEntryGroup/AsteroidEntryGroup';
import UnitsSwitcher from '@/components/UnitsSwither/UnitsSwitcher';
import DistanceUnitsProvider from '@/contexts/distanceUnitsContext';
import { fetchtAsteroidsFeed } from '@/services/api';
import styles from './page.module.css';

export default async function Asteroid({
  params: { lng, id },
}: {
  params: { lng: string; id: number };
}) {
  //const asteroids = await fetchtAsteroidsFeed(0);
  const { t } = await useTranslation(lng, 'translation');

  return (
    <main>
      <div className={styles.container}>{id}</div>
    </main>
  );
}
