import classNames from 'classnames';
import { useTranslation } from '@/app/i18n';
import { passionOne } from '@/app/[lng]/fonts';
import styles from './Header.module.css';
import Link from 'next/link';

export default async function Header({ lng }: { lng: string }) {
  const { t } = await useTranslation(lng, 'Header');

  return (
    <header className={styles.container}>
      <Link href={'/'}>
        <h1 className={classNames(styles.title, passionOne.className)}>
          {t('title')}
        </h1>
      </Link>
      <div>{t('subtitle')}</div>
    </header>
  );
}
