import { createServer } from 'node:http';
import { spawn } from 'node:child_process';
import { networkInterfaces } from 'node:os';

const listen = (server, port = 0, host = '127.0.0.1') =>
  new Promise((resolve, reject) => {
    const handleError = (error) => {
      server.off('listening', handleListening);
      reject(error);
    };
    const handleListening = () => {
      server.off('error', handleError);
      resolve();
    };
    server.once('error', handleError);
    server.once('listening', handleListening);
    server.listen(port, host);
  });

const getPort = (server) => {
  const address = server.address();
  if (!address || typeof address === 'string') {
    throw new Error('Expected a TCP server address');
  }
  return address.port;
};

const findAvailablePort = async (host) => {
  const probe = createServer();
  await listen(probe, 0, host);
  const port = getPort(probe);
  await new Promise((resolve, reject) =>
    probe.close((error) => (error ? reject(error) : resolve())),
  );
  return port;
};

const findLanHost = () => {
  for (const addresses of Object.values(networkInterfaces())) {
    const address = addresses?.find(
      (candidate) => candidate.family === 'IPv4' && !candidate.internal,
    );

    if (address) return address.address;
  }

  throw new Error('No non-loopback IPv4 address is available for the LAN development test');
};

function asteroid(id, name) {
  return {
    id,
    name,
    nasa_jpl_url: `https://example.test/neo/${id}`,
    estimated_diameter: { meters: { estimated_diameter_min: 12.3, estimated_diameter_max: 45.6 } },
    is_potentially_hazardous_asteroid: true,
    close_approach_data: [{
      close_approach_date: '2099-01-02',
      close_approach_date_full: '2099-Jan-02 00:00',
      epoch_date_close_approach: 4070995200000,
      miss_distance: { lunar: 2.4, kilometers: 1234.5 },
      relative_velocity: { kilometers_per_second: 12.345 },
      orbiting_body: 'Earth',
    }],
  };
}

const server = createServer((req, res) => {
  const url = new URL(req.url || '/', 'http://127.0.0.1');
  const detail = url.pathname.match(/^\/neo\/(\d+)$/);
  const body = detail
    ? asteroid(Number(detail[1]), 'Asteroid One')
    : {
        near_earth_objects: {
          [url.searchParams.get('start_date')]: [
            asteroid(
              url.searchParams.get('start_date') === new Date().toLocaleDateString('swe') ? 1 : 2,
              url.searchParams.get('start_date') === new Date().toLocaleDateString('swe')
                ? 'Asteroid One'
                : 'Asteroid Two',
            ),
          ],
        },
      };
  res.writeHead(200, { 'content-type': 'application/json' });
  res.end(JSON.stringify(body));
});

await listen(server);
const fixturePort = getPort(server);
const isDevLan = process.argv.includes('--dev-lan');
const appHost = isDevLan ? findLanHost() : '127.0.0.1';
const appBindHost = isDevLan ? '0.0.0.0' : '127.0.0.1';
const appPort = await findAvailablePort(appBindHost);
const environment = {
  ...process.env,
  E2E_APP_HOST: appHost,
  E2E_APP_PORT: String(appPort),
  E2E_DEV_LAN: isDevLan ? '1' : '0',
  NASA_API_URL: `http://127.0.0.1:${fixturePort}`,
  ...(isDevLan
    ? {
        ALLOWED_DEV_ORIGINS: appHost,
        E2E_NEXT_DIST_DIR: 'output/playwright/dev-next',
      }
    : {}),
};
const run = (command, args) =>
  new Promise((resolve, reject) => {
    const child = spawn(command, args, { env: environment, stdio: 'inherit' });
    child.on('error', reject);
    child.on('exit', (code) => (code === 0 ? resolve() : reject(new Error(`${command} exited ${code}`))));
  });

try {
  if (!isDevLan) await run('npm', ['run', 'build']);
  await run('./node_modules/.bin/playwright', ['test']);
} finally {
  await new Promise((resolve) => server.close(resolve));
}
