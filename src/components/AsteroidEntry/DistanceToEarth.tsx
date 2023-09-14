'use client';

import { useTranslation } from '@/app/i18n/client';
import { useDistanceUnits } from '@/contexts/distanceUnitsContext';
import { AsteroidShort } from './AsteroidEntry';
import styles from './AsteroidEntry.module.css';

export default function DistanceToEarth({
  missDistance,
  lng,
}: {
  missDistance: AsteroidShort['missDistance'];
  lng: string;
}) {
  const { t } = useTranslation(lng, 'AsteroidEntry');

  const distanceUnits = useDistanceUnits();

  return (
    <div className={styles.distanceText}>
      {t(distanceUnits, { count: missDistance[distanceUnits] })}
    </div>
  );
}
