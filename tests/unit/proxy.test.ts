import { NextRequest } from 'next/server';
import { describe, expect, it } from 'vitest';
import { cookieName } from '@/app/i18n/settings';
import { proxy } from '@/proxy';

const request = (path: string, headers: HeadersInit = {}) =>
  new NextRequest(`https://space-rock.test${path}`, { headers });

describe('locale proxy', () => {
  it('prefers a supported locale cookie over the Accept-Language header', () => {
    const response = proxy(
      request('/', {
        cookie: `${cookieName}=ru`,
        'accept-language': 'en-US,en;q=0.9',
      }),
    );

    expect(response.headers.get('location')).toBe(
      'https://space-rock.test/ru/',
    );
  });

  it('redirects an unprefixed request using the accepted language', () => {
    const response = proxy(
      request('/asteroid/42', { 'accept-language': 'ru-RU' }),
    );

    expect(response.headers.get('location')).toBe(
      'https://space-rock.test/ru/asteroid/42',
    );
  });

  it('keeps an already localized path and syncs the locale from its referer', () => {
    const response = proxy(
      request('/en', { referer: 'https://space-rock.test/ru' }),
    );

    expect(response.headers.get('location')).toBeNull();
    expect(response.cookies.get(cookieName)?.value).toBe('ru');
  });
});
