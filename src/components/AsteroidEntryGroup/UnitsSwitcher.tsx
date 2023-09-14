'use client';

import { useTranslation } from '@/app/i18n/client';
import {
  useDistanceUnits,
  useUnitsSwitcher,
} from '@/contexts/distanceUnitsContext';
import styles from './AsteroidEntryGroup.module.css';

export default function UnitsSwitcher({ lng }: { lng: string }) {
  const switchUnits = useUnitsSwitcher();
  const distanceUnits = useDistanceUnits();

  const { t } = useTranslation(lng, 'AsteroidEntryGroup');

  return (
    <div className={styles.text}>
      <span
        className={
          distanceUnits === 'kilometers' ? styles.active : styles.inactive
        }
        onClick={() => switchUnits('kilometers')}
      >
        {t('kilometers')}
      </span>
      {' | '}
      <span
        className={distanceUnits === 'lunar' ? styles.active : styles.inactive}
        onClick={() => switchUnits('lunar')}
      >
        {t('lunar')}
      </span>
    </div>
  );
}
