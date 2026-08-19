import { getTranslation } from '@/app/i18n';
import DistanceUnitsProvider from '@/contexts/distanceUnitsContext';
import styles from './page.module.css';
import OrderItems from './OrderItems';

export default async function Order({
  params,
}: {
  params: Promise<{ lng: string }>;
}) {
  const { lng } = await params;
  const { t } = await getTranslation(lng, 'Order');

  return (
    <section className={styles.feedContainer}>
      <div className={styles.container}>
        <h1>{t('title')}</h1>
        <DistanceUnitsProvider>
          <OrderItems lng={lng} />
        </DistanceUnitsProvider>
      </div>
      <div>{t('footer')}</div>
    </section>
  );
}
