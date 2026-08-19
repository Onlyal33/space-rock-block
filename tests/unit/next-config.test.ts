import { execFileSync } from 'node:child_process';
import { describe, expect, it } from 'vitest';

function readAllowedDevOrigins(value?: string) {
  const environment = { ...process.env };

  if (value === undefined) {
    delete environment.ALLOWED_DEV_ORIGINS;
  } else {
    environment.ALLOWED_DEV_ORIGINS = value;
  }

  return JSON.parse(
    execFileSync(
      process.execPath,
      [
        '-e',
        'process.stdout.write(JSON.stringify(require("./next.config.js").allowedDevOrigins))',
      ],
      { cwd: process.cwd(), encoding: 'utf8', env: environment },
    ),
  ) as string[];
}

describe('development origin configuration', () => {
  it('allows the current LAN hostname by default', () => {
    expect(readAllowedDevOrigins()).toEqual(['192.168.100.32']);
  });

  it('accepts a comma-separated hostname override', () => {
    expect(readAllowedDevOrigins('192.168.1.23, dev.example.test')).toEqual([
      '192.168.1.23',
      'dev.example.test',
    ]);
  });
});
