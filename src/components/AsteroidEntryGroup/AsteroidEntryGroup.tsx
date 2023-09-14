import dynamic from 'next/dynamic';
import { useTranslation } from '@/app/i18n/';
import DistanceUnitsProvider from '@/contexts/distanceUnitsContext';
import AsteroidEntry from '../AsteroidEntry/AsteroidEntry';
import styles from './AsteroidEntryGroup.module.css';

const UnitsSwitcher = dynamic(() => import('./UnitsSwitcher'));

const data = {
  id: 465633,
  name: '465633 (2009 JR5)',
  size: Number('485.4'), //estimated_diameter / meters / estimated_diameter_max
  isHazardous: true, // is_potentially_hazardous_asteroid
  closeApproachDate: new Date('2015-09-08'),
  missDistance: {
    lunar: Number('117.7685618773'),
    kilometers: Number('45290298.225725659'),
  },
};

export default async function AsteroidEntryGroup({ lng }: { lng: string }) {
  const { t } = await useTranslation(lng, 'AsteroidEntryGroup');

  return (
    <div className={styles.container}>
      <DistanceUnitsProvider>
        <div className={styles.headerContainer}>
          <h1 className={styles.header}>{t('title')}</h1>
          <UnitsSwitcher lng={lng} />
        </div>
        {[1, 2, 4, 5].map((e) => (
          <AsteroidEntry key={data.id} {...data} lng={lng} />
        ))}
      </DistanceUnitsProvider>
    </div>
  );
}
