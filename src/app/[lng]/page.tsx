import Image from 'next/image';
import { useTranslation } from '@/app/i18n';
import AsteroidEntryGroup from '@/components/AsteroidEntryGroup/AsteroidEntryGroup';
import Cart from '@/components/Cart/Cart';
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
      <div className={styles.earthAndFeedContainer}>
        <Image
          src={earth}
          alt="Earth from space"
          className={styles.earth}
          priority
        />
        <div className={styles.feedContainer}>
          <DistanceUnitsProvider>
            <div className={styles.headerContainer}>
              <h1>{t('title')}</h1>
              <UnitsSwitcher lng={lng} />
            </div>
            <AsteroidEntryGroup asteroids={asteroids} lng={lng} />
          </DistanceUnitsProvider>
        </div>
      </div>
      <div className={styles.cartContainer}>
        <Cart lng={lng} />
      </div>
    </main>
  );
}
