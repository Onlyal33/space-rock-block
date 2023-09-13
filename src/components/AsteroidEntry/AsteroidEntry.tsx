import classNames from 'classnames';
import Image from 'next/image';

import leftArrow from '../../../public/left-arrow.svg';
import rigthArrow from '../../../public/right-arrow.svg';
import asteroid from '../../../public/asteroid.png';
import styles from './AsteroidEntry.module.css';
import { useTranslation } from '@/app/i18n/client';

interface AsteroidShort {
  id: number;
  name: string;
  size: number;
  isHazardous: boolean;
  closeApproachDate: Date;
  missDistance: { lunar: number; kilometers: number };
  distanceUnits?: 'kilometers' | 'lunar';
  lng: string;
}

const LARGE_SIZE_TRESHOLD = 1000;

export default function AsteroidEntry({
  id,
  name,
  size,
  isHazardous,
  closeApproachDate,
  missDistance,
  distanceUnits = 'lunar',
  lng,
}: AsteroidShort) {
  const { t } = useTranslation(lng, 'AsteroidEntry');

  return (
    <div className={styles.container}>
      <div className={styles.headerFooterContainer}>
        <h2 className={styles.date}>
          {t('date', {
            val: closeApproachDate,
            formatParams: {
              val: {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              },
            },
          })}
        </h2>
      </div>
      <div className={styles.mainContainer}>
        <div className={styles.distanceContainer}>
          <div className={styles.distanceText}>
            {t(distanceUnits, { count: missDistance[distanceUnits] })}
          </div>
          <div className={styles.svgContainer}>
            <Image src={leftArrow} alt="" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="6"
              fill="none"
            >
              <rect
                x="-0.5"
                y="2.5"
                width="101%"
                height="1"
                fill="white"
                fillOpacity="0.5"
              />
            </svg>
            <Image src={rigthArrow} alt="" />
          </div>
        </div>
        <div className={styles.imageContainer}>
          <Image
            src={asteroid}
            alt="Asteroid"
            className={classNames({
              [styles.largeImage]: size > LARGE_SIZE_TRESHOLD,
              [styles.smallImage]: size <= LARGE_SIZE_TRESHOLD,
            })}
          />
        </div>
        <div className={styles.sizeContainer}>
          <span className={styles.typeText}>{name}</span>
          <span className={styles.sizeText}>{t('size', { count: size })}</span>
        </div>
      </div>
      <div className={styles.headerFooterContainer}>
        <button className={styles.orderButton}>
          <span className={styles.buttonText}>{t('order')}</span>
        </button>
        {isHazardous && (
          <span className={classNames(styles.dangerText, styles.bodySmall)}>
            {t('hazardous')}
          </span>
        )}
      </div>
    </div>
  );
}
