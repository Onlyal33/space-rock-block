'use client';
import { useState } from 'react';
import AsteroidEntry from '../AsteroidEntry/AsteroidEntry';
import styles from './AsteroidEntryGroup.module.css';
import classNames from 'classnames';

const data = {
  id: 465633,
  name: '465633 (2009 JR5)',
  size: Number('485'), //estimated_diameter / meters / estimated_diameter_max
  isHazardous: true, // is_potentially_hazardous_asteroid
  closeApproachDate: new Date('2015-09-08'),
  missDistance: {
    lunar: Math.round(Number('117.7685618773')),
    kilometers: Math.round(Number('45290298.225725659')),
  },
};

export default function AsteroidEntryGroup() {
  const [distanceUnits, setDistanceUnits] = useState<'lunar' | 'kilometers'>(
    'lunar',
  );

  const unitsClasses = classNames({});

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <h1 className={styles.header}>Ближайшие подлёты астероидов</h1>
        <div className={styles.text}>
          <a
            className={
              distanceUnits === 'kilometers' ? styles.active : styles.inactive
            }
            onClick={() => setDistanceUnits('kilometers')}
          >
            в километрах
          </a>
          {' | '}
          <a
            className={
              distanceUnits === 'lunar' ? styles.active : styles.inactive
            }
            onClick={() => setDistanceUnits('lunar')}
          >
            в лунных орбитах
          </a>
        </div>
      </div>
      {[1, 2, 4, 5].map((e) => (
        <AsteroidEntry key={data.id} {...data} distanceUnits={distanceUnits} />
      ))}
    </div>
  );
}
