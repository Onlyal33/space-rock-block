# Armageddon, or Space Rock Blocker

This app allows user to get NASA data about asteroids that are on course to their closest approach to Earth, add them to cart, and send an order to deal with them 😄.

Technology stack: TypeScript, React, Next.js, i18next

It is deployed [here](https://space-rock-block.vercel.app/) - check it out!

Project's design is largely based on [this figma file](https://www.figma.com/file/N9aUcWK3o189lZcwQyzU79/Armaggedon-V3).

## Getting Started

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app), so standart routine applies.

Install the dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The development server also allows this project's current LAN address,
`192.168.100.32`. If that address changes, pass the new hostname or IP (without
a scheme or port):

```bash
ALLOWED_DEV_ORIGINS=192.168.1.23 npm run dev
```

Multiple development hosts can be supplied as a comma-separated list.

## API Keys

The project utilizes [NASA API](https://api.nasa.gov), so if you plan to use it extensively you might consider to get your own (free) api key and put it into the environment variable API_KEY in .env.local.

Demo key will be used otherwise with the following rate limits:

- Hourly Limit: 30 requests per IP address per hour
- Daily Limit: 50 requests per IP address per day
