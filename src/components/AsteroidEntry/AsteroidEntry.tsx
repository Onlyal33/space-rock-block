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

interface AsteroidEntryInterface {
  item: AsteroidShort;
  lng: string;
  cart?: boolean;
}

const LARGE_SIZE_TRESHOLD = 1000;

export default function AsteroidEntry({
  item,
  lng,
  cart = false,
}: AsteroidEntryInterface) {
  const { t } = useTranslation(lng, 'AsteroidEntry');

  return (
    <div className={styles.container}>
      <div className={styles.headerFooterContainer}>
        <h2 suppressHydrationWarning>
          {t('date', {
            val: new Date(item.closeApproachDate),
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
          <DistanceToEarth lng={lng} missDistance={item.missDistance} />
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
              [styles.largeImage]: item.size > LARGE_SIZE_TRESHOLD,
              [styles.smallImage]: item.size <= LARGE_SIZE_TRESHOLD,
            })}
          />
        </div>
        <div className={styles.sizeContainer}>
          <Link href={`/${lng}/asteroid/${item.id}`}>
            <span className={styles.typeText}>{item.name}</span>
          </Link>
          <span className={styles.sizeText}>
            {t('size', { count: item.size })}
          </span>
        </div>
      </div>
      <div className={styles.headerFooterContainer}>
        {!cart && <OrderButton lng={lng} item={item} />}
        {item.isHazardous && (
          <span className={styles.dangerText}>{t('hazardous')}</span>
        )}
      </div>
    </div>
  );
}
