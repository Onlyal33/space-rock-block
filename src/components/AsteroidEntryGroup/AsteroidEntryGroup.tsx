'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslation } from '@/app/i18n/client';
import AsteroidEntry, { AsteroidShort } from '../AsteroidEntry/AsteroidEntry';

export default function AsteroidEntryGroup({
  lng,
  asteroids,
}: {
  lng: string;
  asteroids: AsteroidShort[];
}) {
  const [astList, setAstList] = useState(asteroids);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  const { t } = useTranslation(lng, 'AsteroidEntryGroup');

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '400px',
      threshold: 1,
    };

    const observer = new IntersectionObserver(
      async (entries: IntersectionObserverEntry[]) => {
        if (entries[0].isIntersecting) {
          setIsLoading(true);
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/feed?page=${page + 1}`,
          );
          const fetched = await res.json();
          setPage((p) => p + 1);
          setAstList((prev) => [...prev, ...fetched]);
          setIsLoading(false);
        }
      },
      options,
    );

    const target = ref.current;

    target && observer.observe(target);

    return () => {
      target && observer.unobserve(target);
    };
  }, [page]);

  return (
    <>
      {astList.map((asteroid, idx) => (
        <AsteroidEntry key={`${idx}-${asteroid.id}`} {...asteroid} lng={lng} />
      ))}
      {isLoading && <p style={{ color: 'white' }}>{t('loading')}</p>}
      <div ref={ref}></div>
    </>
  );
}
