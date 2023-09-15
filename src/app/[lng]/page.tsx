import Image from 'next/image';
import { useTranslation } from '@/app/i18n';
import AsteroidEntryGroup from '@/components/AsteroidEntryGroup/AsteroidEntryGroup';
import UnitsSwitcher from '@/components/UnitsSwither/UnitsSwitcher';
import DistanceUnitsProvider from '@/contexts/distanceUnitsContext';
import { fetchtAsteroidsFeed } from '@/services/api';
import earth from '../../../public/earth.webp';
import styles from './page.module.css';

export default async function Home({
  params: { lng },
}: {
  params: { lng: string };
}) {
  const asteroids = await fetchtAsteroidsFeed(0);
  const { t } = await useTranslation(lng, 'translation');

  return (
    <main className={styles.main}>
      <Image src={earth} alt="Earth from space" className={styles.earth} />
      <div className={styles.feedContainer}>
        <DistanceUnitsProvider>
          <div className={styles.headerContainer}>
            <h1 className={styles.header}>{t('title')}</h1>
            <UnitsSwitcher lng={lng} />
          </div>
          <AsteroidEntryGroup asteroids={asteroids} lng={lng} />
        </DistanceUnitsProvider>
      </div>
    </main>
  );
}
