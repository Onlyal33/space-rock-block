import { useTranslation } from '@/app/i18n';
import AsteroidEntryGroup from '@/components/AsteroidEntryGroup/AsteroidEntryGroup';
import UnitsSwitcher from '@/components/UnitsSwither/UnitsSwitcher';
import DistanceUnitsProvider from '@/contexts/distanceUnitsContext';
import { fetchtAsteroidsFeed } from '@/services/api';
import styles from './page.module.css';

export default async function Home({
  params: { lng },
  searchParams: { page = '0' },
}: {
  params: { lng: string };
  searchParams: {
    page: string;
  };
}) {
  const initPage = Number(page);
  const asteroids = await fetchtAsteroidsFeed(initPage);
  const { t } = await useTranslation(lng, 'translation');

  return (
    <section className={styles.feedContainer}>
      <DistanceUnitsProvider>
        <div className={styles.headerContainer}>
          <h1>{t('title')}</h1>
          <UnitsSwitcher lng={lng} />
        </div>
        <AsteroidEntryGroup
          asteroids={asteroids}
          lng={lng}
          initPage={initPage}
        />
      </DistanceUnitsProvider>
    </section>
  );
}
