'use client';

import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';

import { useTranslation } from '@/app/i18n/client';
import leftArrow from '../../../public/left-arrow.svg';
import rigthArrow from '../../../public/right-arrow.svg';
import asteroid from '../../../public/asteroid.png';
import styles from './AsteroidEntry.module.css';
import DistanceToEarth from './DistanceToEarth';
import OrderButton from '../OrderButton/OrderButton';

export interface AsteroidShort {
  id: number;
  name: string;
  size: number;
  isHazardous: boolean;
  closeApproachDate: string;
  missDistance: { lunar: number; kilometers: number };
}

interface AsteroidEntryInterface extends AsteroidShort {
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
  lng,
}: AsteroidEntryInterface) {
  const { t } = useTranslation(lng, 'AsteroidEntry');

  return (
    <div className={styles.container}>
      <Link href={`/${lng}/asteroid/${id}`}>
        <div className={styles.headerFooterContainer}>
          <h2>
            {t('date', {
              val: new Date(closeApproachDate),
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
            <DistanceToEarth lng={lng} missDistance={missDistance} />
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
            <span className={styles.sizeText}>
              {t('size', { count: size })}
            </span>
          </div>
        </div>
      </Link>
      <div className={styles.headerFooterContainer}>
        <OrderButton lng={lng} id={id} />
        {isHazardous && (
          <span className={styles.dangerText}>{t('hazardous')}</span>
        )}
      </div>
    </div>
  );
}
