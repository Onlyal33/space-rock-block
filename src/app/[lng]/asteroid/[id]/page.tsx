import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from '@/app/i18n';
import OrderButton from '@/components/OrderButton/OrderButton';
import { fetchtAsteroidData } from '@/services/api';
import hazard from '../../../../../public/hazard.svg';
import styles from './page.module.css';

export default async function Asteroid({
  params: { lng, id },
}: {
  params: { lng: string; id: number };
}) {
  const data = await fetchtAsteroidData(id);
  const { t } = await useTranslation(lng, 'asteroid');

  return (
    <section id="asteroid" className={styles.container}>
      <div className={styles.titleContainer}>
        <h1>{data.name}</h1>
        {data.is_potentially_hazardous_asteroid && (
          <Image src={hazard} alt="hazard icon" />
        )}
      </div>
      <div className={styles.subtitleContainer}>
        <h3>
          {t('nasaId')}
          <Link href={data.nasa_jpl_url} className={styles.link}>
            {data.id}
          </Link>
        </h3>
        <OrderButton
          lng={lng}
          item={{
            name: data.name,
            isHazardous: data.is_potentially_hazardous_asteroid,
            id: data.id,
            size: data.estimated_diameter_max,
            closeApproachDate:
              data.close_approach_data[data.closestApproachId]
                .close_approach_date,
            missDistance: {
              kilometers:
                data.close_approach_data[data.closestApproachId]
                  .miss_distance_kilometers,
              lunar:
                data.close_approach_data[data.closestApproachId]
                  .miss_distance_lunar,
            },
          }}
        />
      </div>
      <div className={styles.subtitleContainer}>
        <div>
          {t('estimated_diameter_min', { val: data.estimated_diameter_min })}
        </div>
        <div>
          {t('estimated_diameter_max', { val: data.estimated_diameter_max })}
        </div>
      </div>
      <div className={styles.tableContainer}>
        <h2>{t('tableTitle')}</h2>
        <span className={styles.micro}>{t('tableDesc')}</span>
        <table className={styles.table}>
          <thead className={styles.th}>
            <tr>
              {Object.keys(data.close_approach_data[0]).map((th, idth) => (
                <th key={idth} className={styles['pr' + idth]}>
                  {t(th)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={styles.tbody}>
            {data.close_approach_data.map((entry, idtr) => (
              <tr
                key={idtr}
                className={classNames({
                  [styles.current]: idtr === data.closestApproachId,
                })}
              >
                {Object.values(entry).map((td, idtd) => {
                  let transformed;
                  if (idtd === 0) {
                    transformed = t('date', {
                      val: new Date(td as string),
                      formatParams: {
                        val: {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        },
                      },
                    });
                  } else if (idtd === 4) {
                    transformed = t(td as string);
                  } else {
                    transformed = t('number', { count: td as number });
                  }

                  return (
                    <td key={idtd} className={styles['pr' + idtd]}>
                      {transformed}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
