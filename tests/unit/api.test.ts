import { afterEach, describe, expect, it, vi } from 'vitest';
import { fetchtAsteroidData, fetchtAsteroidsFeed } from '@/services/api';

const asteroid = {
  id: 42,
  name: 'Test Rock',
  nasa_jpl_url: 'https://example.test/42',
  estimated_diameter: {
    meters: { estimated_diameter_min: 12.3, estimated_diameter_max: 45.6 },
  },
  is_potentially_hazardous_asteroid: true,
  close_approach_data: [
    {
      close_approach_date: '2099-01-02',
      close_approach_date_full: '2099-Jan-02 00:00',
      epoch_date_close_approach: 4070995200000,
      miss_distance: { lunar: 2.4, kilometers: 1234.5 },
      relative_velocity: { kilometers_per_second: 12.345 },
      orbiting_body: 'Earth',
    },
  ],
};

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

describe('NASA API service', () => {
  it('requests a dated feed with hourly revalidation and maps future approaches', async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-08-19T12:00:00Z'));
    vi.stubEnv('NASA_API_URL', 'http://nasa.test');
    const fetchMock = vi.fn().mockResolvedValue({
      json: () =>
        Promise.resolve({
          near_earth_objects: {
            '2026-08-19': [
              asteroid,
              {
                ...asteroid,
                id: 43,
                close_approach_data: [
                  {
                    ...asteroid.close_approach_data[0],
                    epoch_date_close_approach: 1,
                  },
                ],
              },
            ],
          },
        }),
    });
    vi.stubGlobal('fetch', fetchMock);

    await expect(fetchtAsteroidsFeed(0)).resolves.toEqual([
      {
        id: 42,
        name: 'Test Rock',
        isHazardous: true,
        size: 46,
        closeApproachDate: '2099-01-02',
        missDistance: { lunar: 2, kilometers: 1235 },
      },
    ]);
    expect(fetchMock).toHaveBeenCalledWith(
      'http://nasa.test/feed?start_date=2026-08-19&end_date=2026-08-19&api_key=DEMO_KEY',
      { next: { revalidate: 3600 } },
    );
  });

  it('requests and flattens asteroid details with hourly revalidation', async () => {
    vi.stubEnv('NASA_API_URL', 'http://nasa.test');
    const fetchMock = vi.fn().mockResolvedValue({
      json: () => Promise.resolve(asteroid),
    });
    vi.stubGlobal('fetch', fetchMock);

    await expect(fetchtAsteroidData('42')).resolves.toMatchObject({
      id: 42,
      estimated_diameter_min: 12,
      estimated_diameter_max: 46,
      closestApproachId: 0,
      close_approach_data: [
        {
          relative_velocity_kps: 12.35,
          miss_distance_lunar: 2,
          miss_distance_kilometers: 1235,
        },
      ],
    });
    expect(fetchMock).toHaveBeenCalledWith(
      'http://nasa.test/neo/42?api_key=DEMO_KEY',
      { next: { revalidate: 3600 } },
    );
  });
});
