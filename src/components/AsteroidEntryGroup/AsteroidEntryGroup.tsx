'use client';
import { useState } from 'react';
import AsteroidEntry from '../AsteroidEntry/AsteroidEntry';
import styles from './AsteroidEntryGroup.module.css';
import classNames from 'classnames';
import { useTranslation } from '@/app/i18n/client';

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

export default function AsteroidEntryGroup({ lng = 'en' }) {
  const [distanceUnits, setDistanceUnits] = useState<'lunar' | 'kilometers'>(
    'lunar',
  );

  const { t } = useTranslation(lng, 'AsteroidEntryGroup');

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <h1 className={styles.header}>{t('title')}</h1>
        <div className={styles.text}>
          <a
            className={
              distanceUnits === 'kilometers' ? styles.active : styles.inactive
            }
            onClick={() => setDistanceUnits('kilometers')}
          >
            {t('kilometers')}
          </a>
          {' | '}
          <a
            className={
              distanceUnits === 'lunar' ? styles.active : styles.inactive
            }
            onClick={() => setDistanceUnits('lunar')}
          >
            {t('lunar')}
          </a>
        </div>
      </div>
      {[1, 2, 4, 5].map((e) => (
        <AsteroidEntry
          key={data.id}
          {...data}
          distanceUnits={distanceUnits}
          lng={lng}
        />
      ))}
    </div>
  );
}
