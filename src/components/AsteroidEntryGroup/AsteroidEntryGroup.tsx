import dynamic from 'next/dynamic';
import { useTranslation } from '@/app/i18n/';
import DistanceUnitsProvider from '@/contexts/distanceUnitsContext';
import { fetchtAsteroidsFeed } from '@/services/api';
import AsteroidEntry from '../AsteroidEntry/AsteroidEntry';
import styles from './AsteroidEntryGroup.module.css';

const UnitsSwitcher = dynamic(() => import('./UnitsSwitcher'));

export default async function AsteroidEntryGroup({ lng }: { lng: string }) {
  const asteroids = await fetchtAsteroidsFeed();
  const { t } = await useTranslation(lng, 'AsteroidEntryGroup');

  return (
    <div className={styles.container}>
      <DistanceUnitsProvider>
        <div className={styles.headerContainer}>
          <h1 className={styles.header}>{t('title')}</h1>
          <UnitsSwitcher lng={lng} />
        </div>
        {asteroids.map((asteroid) => (
          <AsteroidEntry key={asteroid.id} {...asteroid} lng={lng} />
        ))}
      </DistanceUnitsProvider>
    </div>
  );
}
